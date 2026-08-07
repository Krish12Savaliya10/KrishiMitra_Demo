import json
from django.conf import settings
from django.http import StreamingHttpResponse
import requests
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import (
    User, Farm, CropPlan, MarketPrice, ScheduleTask,
    Recommendation, Alert, Expense, Notification,
    WeatherCache, ChatMessage
)
from .serializers import (
    UserSerializer, FarmSerializer, CropPlanSerializer,
    MarketPriceSerializer, ScheduleTaskSerializer,
    RecommendationSerializer, AlertSerializer,
    ExpenseSerializer, NotificationSerializer,
    WeatherCacheSerializer, ChatMessageSerializer
)
from . import ml_loader
import pandas as pd
import os

# ─── Helpers ────────────────────────────────────────────────────────────


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class OwnerViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# ─── Auth Views ─────────────────────────────────────────────────────────


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def auth_register(request):
    """Register a new user. Returns { token, user }."""
    data = request.data
    email = data.get('email', '').lower().strip()
    phone = data.get('phone', '').strip()
    password = data.get('password', '')
    first_name = data.get('firstName', '').strip()
    last_name = data.get('lastName', '').strip()

    if not email or not password:
        return Response(
            {'message': 'Email and password are required.'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response(
            {'message': 'An account with this email already exists.'}, status=400)

    if phone and User.objects.filter(phone=phone).exists():
        return Response(
            {'message': 'Phone number already registered.'}, status=400)

    if not phone:
        import random
        import string
        phone = ''.join(random.choices(string.digits, k=10))

    user = User.objects.create(
        username=email,
        email=email,
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        password=make_password(password),
        role=data.get('role', 'farmer'),
        location=data.get('location', {}),
        farmingMode=data.get('farmingMode', 'moderate'),
    )

    token = get_tokens_for_user(user)
    serializer = UserSerializer(user)
    return Response({'token': token, 'user': serializer.data}, status=201)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def auth_login(request):
    """Login with email + password. Returns { token, user }."""
    email = request.data.get('email', '').lower().strip()
    password = request.data.get('password', '')

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'message': 'Invalid email or password.'}, status=401)

    user = authenticate(request, username=user_obj.username, password=password)
    if not user:
        return Response({'message': 'Invalid email or password.'}, status=401)

    token = get_tokens_for_user(user)
    serializer = UserSerializer(user)
    return Response({'token': token, 'user': serializer.data})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def auth_me(request):
    """Get logged-in user profile."""
    serializer = UserSerializer(request.user)
    # Frontend expects { user: {...} }
    return Response({'user': serializer.data})


@api_view(['PATCH', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def auth_update_profile(request):
    """Update the logged-in user's profile."""
    user = request.user
    data = request.data

    if 'firstName' in data:
        user.first_name = data['firstName']
    if 'lastName' in data:
        user.last_name = data['lastName']
    if 'phone' in data:
        user.phone = data['phone']
    if 'language' in data:
        user.language = data['language']
    if 'farmingMode' in data:
        user.farmingMode = data['farmingMode']
    if 'avatarUrl' in data:
        user.avatarUrl = data['avatarUrl']
    if 'location' in data:
        user.location = data['location']
    if 'settings' in data:
        user.settings = data['settings']

    user.save()
    serializer = UserSerializer(user)
    return Response({'user': serializer.data})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def auth_google(request):
    from google.oauth2 import id_token
    from google.auth.transport import requests as google_requests
    from django.conf import settings
    
    token = request.data.get('credential')
    if not token:
        return Response({'message': 'No token provided'}, status=400)
        
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), getattr(settings, 'GOOGLE_CLIENT_ID', ''))
        
        email = idinfo['email']
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        google_id = idinfo['sub']
        
        user = User.objects.filter(email=email).first()
        if not user:
            user = User.objects.create(
                username=email,
                email=email,
                first_name=first_name,
                last_name=last_name,
                googleId=google_id,
                isVerified=True,
                phone=email # Fallback for unique constraint
            )
            user.set_unusable_password()
            user.save()
            
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'user': UserSerializer(user).data
        })
    except ValueError:
        # Invalid token
        return Response({'message': 'Invalid Google token'}, status=400)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def auth_forgot_password(request):
    from django.core.mail import send_mail
    from django.conf import settings
    from django.utils import timezone
    from datetime import timedelta
    import random
    
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()
    
    if user:
        # Generate 6-digit OTP
        otp_code = str(random.randint(100000, 999999))
        
        # Save OTP to DB
        PasswordResetOTP.objects.filter(user=user).delete() # Remove old OTPs
        PasswordResetOTP.objects.create(
            user=user,
            otp=otp_code,
            expires_at=timezone.now() + timedelta(minutes=15)
        )
        
        # Send email
        try:
            send_mail(
                'KrishiMitra - Password Reset OTP',
                f'Your password reset OTP is: {otp_code}. It will expire in 15 minutes.',
                getattr(settings, 'EMAIL_HOST_USER', 'noreply@krishimitra.com'),
                [email],
                fail_silently=False,
            )
        except Exception as e:
            import logging
            logging.getLogger("krishi_core").error("Failed to send email: %s", e)
            return Response({'message': 'Failed to send email. Check SMTP settings.'}, status=500)
            
    return Response({'message': 'If this email is registered, a reset OTP has been sent.'})

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def auth_reset_password(request):
    email = request.data.get('email')
    otp_code = request.data.get('otp')
    new_password = request.data.get('newPassword')
    
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({'message': 'Invalid request.'}, status=400)
        
    otp_record = PasswordResetOTP.objects.filter(user=user).last()
    
    if not otp_record or not otp_record.is_valid():
        return Response({'message': 'OTP has expired or does not exist.'}, status=400)
        
    if otp_record.otp != otp_code:
        return Response({'message': 'Invalid OTP.'}, status=400)
        
    user.set_password(new_password)
    user.save()
    
    # Clean up OTP
    otp_record.delete()
    
    return Response({'message': 'Password has been reset successfully. You can now login.'})

# ─── CRUD ViewSets ──────────────────────────────────────────────────────


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class FarmViewSet(OwnerViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        serializer = self.get_serializer(qs, many=True)
        # Frontend expects a plain array for /api/farms
        return Response(serializer.data)


class CropPlanViewSet(OwnerViewSet):
    queryset = CropPlan.objects.all()
    serializer_class = CropPlanSerializer

    def get_queryset(self):
        if not self.request.user or self.request.user.is_anonymous:
            qs = CropPlan.objects.none()
        else:
            qs = super().get_queryset()
        farm_id = self.request.query_params.get('farm')
        if farm_id:
            qs = qs.filter(farm_id=farm_id)
        return qs

    def perform_create(self, serializer):
        plan = serializer.save(owner=self.request.user)
        try:
            from .services.schedule_engine import generate_schedule_for_crop_plan
            # Only generate the first 3 days of tasks on plan creation
            generate_schedule_for_crop_plan(plan, start_day=0, end_day=3)
        except Exception as e:
            import logging
            logging.getLogger("krishi_core").error("Failed to generate schedule: %s", e) 

    @action(detail=True, methods=['post'], url_path='drop')
    def drop_plan(self, request, pk=None):
        plan = self.get_object()
        plan.delete()
        return Response({'message': 'Plan dropped', 'tasksRemoved': 0})

    @action(detail=True, methods=['post'], url_path='start-daily-schedule')
    def start_daily_schedule(self, request, pk=None):
        self.get_object()
        # Optionally handle startOver and scheduleDate from request.data
        return Response({'message': 'Daily schedule started'})

    @action(detail=True, methods=['post'], url_path='shift-today')
    def shift_today(self, request, pk=None):
        from datetime import timedelta
        plan = self.get_object()
        
        # 1. Push all pending tasks currently in the DB forward by 1 day
        from .models import ScheduleTask
        tasks = ScheduleTask.objects.filter(cropPlan=plan, status__in=["pending", "delayed"])
        for t in tasks:
            t.date = t.date + timedelta(days=1)
            t.save()
            
        # 2. Shift the sowingDate forward by 1 day so future JIT tasks also shift
        plan.sowingDate = plan.sowingDate + timedelta(days=1)
        plan.expectedHarvestDate = plan.expectedHarvestDate + timedelta(days=1)
        plan.driftDays += 1
        
        # 3. Shift milestones
        if isinstance(plan.milestones, list):
            from datetime import datetime
            updated = []
            for m in plan.milestones:
                if m.get('status') == 'pending' and m.get('plannedDate'):
                    try:
                        orig = datetime.fromisoformat(m['plannedDate'])
                        m['plannedDate'] = (orig + timedelta(days=1)).isoformat()
                    except:
                        pass
                updated.append(m)
            plan.milestones = updated
            
        plan.save()
        return Response({'message': 'Schedule shifted successfully'})

    @action(detail=False,
            methods=['get'],
            url_path='supported-crops',
            permission_classes=[permissions.AllowAny])
    def supported_crops(self, request):
        try:
            csv_path = os.path.join(
                os.path.dirname(__file__),
                'data',
                '01_crop_profile.csv')
            df = pd.read_csv(csv_path)
            crops = df['crop_name'].dropna().unique().tolist()
            return Response(sorted(crops))
        except Exception:
            # Fallback
            return Response(['Wheat', 'Cotton', 'Soybean',
                            'Groundnut', 'Onion', 'Tomato'])

    @action(detail=False,
            methods=['get'],
            url_path='companion-suggestions',
            permission_classes=[permissions.AllowAny])
    def companion_suggestions(self, request):
        crop = request.query_params.get('crop', '').strip().lower()
        
        # Intercropping Compatibility Matrix
        matrix = {
            'wheat': ['Mustard', 'Chickpea', 'Linseed'],
            'cotton': ['Pigeon Pea', 'Cowpea', 'Soybean'],
            'soybean': ['Maize', 'Pigeon Pea', 'Sorghum'],
            'groundnut': ['Sunflower', 'Pearl Millet'],
            'tomato': ['Marigold', 'Basil', 'Onion'],
            'onion': ['Tomato', 'Cabbage', 'Carrot'],
            'maize': ['Soybean', 'Cowpea', 'Pumpkin']
        }
        
        if crop in matrix:
            return Response(matrix[crop])
        
        # Fallback to generic beneficial cover crops for unmapped crops
        return Response(['Clover', 'Alfalfa', 'Cowpea'])

class MarketPriceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MarketPrice.objects.all()
    serializer_class = MarketPriceSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = MarketPrice.objects.all()
        state = self.request.query_params.get('state')
        district = self.request.query_params.get('district')
        market_q = self.request.query_params.get('market')
        commodity = self.request.query_params.get('commodity')
        limit = int(self.request.query_params.get('limit', 200))
        if state:
            qs = qs.filter(state__iexact=state)
        if district:
            qs = qs.filter(district__iexact=district)
        if market_q:
            qs = qs.filter(market__iexact=market_q)
        if commodity:
            qs = qs.filter(commodity__icontains=commodity)
        return qs[:limit]

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        serializer = self.get_serializer(qs, many=True)
        last = MarketPrice.objects.order_by('-fetchedAt').first()
        return Response({
            'source': 'database',
            'records': serializer.data,
            'lastUpdated': last.fetchedAt if last else None,
            'needsRefresh': False,
        })


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def market_locations(request):
    """Return distinct states and commodities for dropdowns."""
    state_filter = request.query_params.get('state')
    qs = MarketPrice.objects.all()
    if state_filter:
        qs = qs.filter(state__iexact=state_filter)
    states = list(MarketPrice.objects.values_list(
        'state', flat=True).distinct().order_by('state'))
    commodities = list(
        qs.values_list(
            'commodity',
            flat=True).distinct().order_by('commodity'))
    districts = []
    if state_filter:
        districts = list(
            qs.values_list(
                'district',
                flat=True).distinct().order_by('district'))
    return Response({'states': states,
                     'commodities': commodities,
                     'districts': districts})


class ScheduleTaskViewSet(OwnerViewSet):
    queryset = ScheduleTask.objects.all()
    serializer_class = ScheduleTaskSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        farm_id = self.request.query_params.get('farm')
        if farm_id:
            qs = qs.filter(farm_id=farm_id)
        return qs.order_by('date')

    @action(detail=False, methods=['post'], url_path='shift-today')
    def shift_today(self, request):
        farm_id = request.headers.get('Farm-Id') or request.data.get('farm_id')
        if not farm_id:
            return Response({'error': 'Farm ID required'}, status=400)
            
        from .models import CropPlan
        plan = CropPlan.objects.filter(farm_id=farm_id, status='active', owner=request.user).first()
        if not plan:
            return Response({'error': 'No active crop plan'}, status=404)
            
        from datetime import timedelta
        from .models import ScheduleTask
        tasks = ScheduleTask.objects.filter(cropPlan=plan, status__in=["pending", "delayed"])
        for t in tasks:
            t.date = t.date + timedelta(days=1)
            t.save()
            
        plan.sowingDate = plan.sowingDate + timedelta(days=1)
        plan.expectedHarvestDate = plan.expectedHarvestDate + timedelta(days=1)
        plan.driftDays += 1
        
        if isinstance(plan.milestones, list):
            from datetime import datetime
            updated = []
            for m in plan.milestones:
                if m.get('status') == 'pending' and m.get('plannedDate'):
                    try:
                        orig = datetime.fromisoformat(m['plannedDate'])
                        m['plannedDate'] = (orig + timedelta(days=1)).isoformat()
                    except:
                        pass
                updated.append(m)
            plan.milestones = updated
            
        plan.save()
        return Response({'message': 'Schedule shifted successfully'})


class RecommendationViewSet(OwnerViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        farm_id = self.request.query_params.get('farm')
        if farm_id:
            qs = qs.filter(farm_id=farm_id)
        return qs


class AlertViewSet(OwnerViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer


class ExpenseViewSet(OwnerViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class NotificationViewSet(OwnerViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class ChatMessageViewSet(OwnerViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        session_id = self.request.query_params.get('sessionId')
        if session_id:
            qs = qs.filter(sessionId=session_id)
        return qs.order_by('created_at')


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def chat_stream(request):
    """Streams a chat response from Ollama (or Gemini if preferred)."""
    user_msg = request.data.get('message', '')
    session_id = request.data.get('sessionId', 'default')
    force_json = request.data.get('forceJson', False)
    field_id = request.data.get('field_id', None)

    # Retrieve RAG context from ChromaDB if available
    rag_context = ""
    chroma_client = ml_loader.state.get("chroma_client")
    if chroma_client:
        try:
            all_collections = chroma_client.list_collections()
            pooled_results = []
            main_col = ml_loader.state.get("collection")
            ef = main_col._embedding_function if main_col else None
            for col_meta in all_collections:
                col_name = col_meta.name if hasattr(
                    col_meta, "name") else col_meta
                col = chroma_client.get_collection(
                    col_name, embedding_function=ef)
                if col.count() > 0:
                    res = col.query(
                        query_texts=[user_msg], n_results=min(
                            col.count(), 3))
                    if res.get("documents") and len(res["documents"]) > 0:
                        pooled_results.extend(res["documents"][0])
            if pooled_results:
                rag_context = "\n\nContext from Knowledge Base:\n" + \
                    "\n---\n".join(pooled_results[:4])
        except Exception:
            pass

    # Inject Field History Context if provided
    if field_id:
        try:
            from .models import ScheduleTask
            recent_tasks = ScheduleTask.objects.filter(
                farm_id=field_id, owner=request.user).order_by('-updated_at')[:5]
            if recent_tasks.exists():
                history_text = "\n\nRecent Task History for the User's Field:\n"
                for rt in recent_tasks:
                    history_text += f"- Task: {
                        rt.title} | Status: {
                        rt.status} | Date: {
                        rt.date.date()} | Reason: {
                        rt.reason}\n"
                rag_context += history_text
        except Exception:
            pass

    from datetime import datetime
    datetime.now().strftime("%Y-%m-%d")

    if force_json:
        import re
        import os
        import pandas as pd
        from datetime import datetime, timedelta

        crop_match = re.search(r"Crop:\s*([^,]+)", user_msg, re.IGNORECASE)
        season_match = re.search(r"Season:\s*([^,]+)", user_msg, re.IGNORECASE)

        req_crop = crop_match.group(1).strip(
        ).capitalize() if crop_match else "Soybean"
        req_season = season_match.group(
            1).strip() if season_match else "Kharif"

        sowing_date_obj = datetime.now()
        sowing_date_str = sowing_date_obj.strftime("%Y-%m-%d")

        data_dir = os.path.join(settings.BASE_DIR, "krishi_core", "data")
        tasks_csv = os.path.join(data_dir, "02_crop_task_calendar.csv")
        fert_csv = os.path.join(data_dir, "06_crop_fertilizer_plan.csv")
        profile_csv = os.path.join(data_dir, "01_crop_profile.csv")

        milestones = []
        tasks = []
        irrigation_cycles = []
        fertilizer_events = []
        harvest_date_obj = sowing_date_obj + timedelta(days=100)  # Default

        try:
            # 1. Load data
            df_tasks = pd.read_csv(tasks_csv)
            df_fert = pd.read_csv(fert_csv)
            df_prof = pd.read_csv(profile_csv)

            # Filter for crop
            crop_tasks = df_tasks[df_tasks['crop_name'].str.lower(
            ) == req_crop.lower()]
            crop_fert = df_fert[df_fert['crop_name'].str.lower()
                                == req_crop.lower()]
            crop_prof = df_prof[df_prof['crop_name'].str.lower()
                                == req_crop.lower()]

            if not crop_prof.empty:
                harvest_days = crop_prof.iloc[0].get('harvest_days', 100)
                harvest_date_obj = sowing_date_obj + \
                    timedelta(days=int(harvest_days))

            if not crop_tasks.empty:
                # Group by stage to create milestones
                stages = crop_tasks['stage'].unique()
                for stage in stages:
                    stage_tasks = crop_tasks[crop_tasks['stage'] == stage]
                    start_day = stage_tasks['day_from_sowing_start'].min()
                    end_day = stage_tasks['day_from_sowing_end'].max()
                    start_date = sowing_date_obj + \
                        timedelta(days=int(max(0, start_day)))

                    milestones.append({
                        "stage": stage,
                        "plannedDate": start_date.strftime("%Y-%m-%d"),
                        "description": f"Expected duration around {int(end_day - start_day)} days."
                    })

                # Create detailed tasks
                for _, row in crop_tasks.iterrows():
                    start_day = int(max(0, row['day_from_sowing_start']))
                    task_date = sowing_date_obj + timedelta(days=start_day)

                    tasks.append({
                        "title": row['task'],
                        "date": task_date.strftime("%Y-%m-%d"),
                        "category": row['task_category'].lower().replace(' ', '_'),
                        "priority": row['priority'].lower(),
                        "description": row['description']
                    })

                    if "irrigat" in row['task_category'].lower(
                    ) or "irrigat" in row['task'].lower():
                        irrigation_cycles.append({
                            "day": start_day,
                            "method": "As per profile",
                            "duration": row['description']
                        })

            if not crop_fert.empty:
                # Inject fertilizer doses as tasks
                for _, row in crop_fert.iterrows():
                    stage = row['stage'].lower()
                    # Determine approx day
                    day_offset = 0
                    if "basal" in stage:
                        day_offset = 0
                    elif "top-dress 1" in stage:
                        day_offset = 30
                    elif "top-dress 2" in stage:
                        day_offset = 60

                    task_date = sowing_date_obj + timedelta(days=day_offset)

                    tasks.append({
                        "title": f"Apply Fertilizer ({row['stage']})",
                        "date": task_date.strftime("%Y-%m-%d"),
                        "category": "fertilizer",
                        "priority": "high",
                        "description": f"{row['products_and_dose']} - {row['purpose']}"
                    })
                    fertilizer_events.append({
                        "day": day_offset,
                        "type": "Specific",
                        "amount": row['products_and_dose']
                    })

        except Exception as e:
            print(f"Error parsing pandas plan: {e}")

        result = {
            "cropPlan": {
                "cropName": req_crop,
                "season": req_season,
                "sowingDate": sowing_date_str,
                "expectedHarvestDate": harvest_date_obj.strftime("%Y-%m-%d"),
                "milestones": milestones,
                "irrigationCycles": irrigation_cycles,
                "fertilizerEvents": fertilizer_events
            },
            "tasks": tasks
        }
        return Response({"result": result})

    # Save user message
    ChatMessage.objects.create(
        owner=request.user,
        sessionId=session_id,
        role='user',
        content=user_msg
    )

    def generate():
        ollama_url = f"{settings.OLLAMA_BASE_URL}/api/generate"

        system_prompt = "You are KrishiMitra, an agricultural AI assistant for Indian farmers. "
        if rag_context:
            system_prompt += f"You MUST answer the user's question ONLY using the following context. If the context does not contain the answer, explicitly state 'I do not have enough information to answer that based on the provided documents.' Do not hallucinate external information.\n{rag_context}\n\n"

        payload = {
            "model": settings.OLLAMA_MODEL,
            "prompt": f"{system_prompt}User Question: {user_msg}\nAnswer concisely:",
            "stream": True}

        full_response = ""
        try:
            with requests.post(ollama_url, json=payload, stream=True, timeout=30) as r:
                for line in r.iter_lines():
                    if line:
                        decoded = line.decode('utf-8')
                        try:
                            data = json.loads(decoded)
                            chunk = data.get("response", "")
                            full_response += chunk
                            yield f"data: {json.dumps({'chunk': chunk})}\n\n"
                        except json.JSONDecodeError:
                            pass
        except Exception:
            yield f"data: {json.dumps({'error': 'Failed to connect to AI server. Make sure Ollama is running.'})}\n\n"
            return

        yield "data: [DONE]\n\n"

        # Save AI response
        if full_response:
            ChatMessage.objects.create(
                owner=request.user,
                sessionId=session_id,
                role='assistant',
                content=full_response
            )

    response = StreamingHttpResponse(
        generate(), content_type='text/event-stream')
    response['Cache-Control'] = 'no-cache'
    return response


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def chat_sync_plan(request):
    """Saves a generated crop plan or schedule from the AI."""
    sync_data = request.data.get('syncData', {})
    farm_id = request.data.get('farmId')

    try:
        farm = Farm.objects.get(id=farm_id, owner=request.user)
    except Farm.DoesNotExist:
        return Response({'message': 'Farm not found.'}, status=404)

    tasks_generated = 0
    plan_obj = None

    import uuid
    plan_data = sync_data.get('cropPlan')
    if plan_data:
        # Match MongoDB structure for milestones
        milestones = plan_data.get('milestones', [])
        for m in milestones:
            m['_id'] = m.get('_id', str(uuid.uuid4()))
            m['status'] = m.get('status', 'pending')
            m['notes'] = m.get('notes', '')

        plan_obj = CropPlan.objects.create(
            owner=request.user,
            farm=farm,
            cropName=plan_data.get('cropName', 'Unknown Crop'),
            season=plan_data.get('season', 'Unknown'),
            sowingDate=plan_data.get('sowingDate', '2025-01-01'),
            expectedHarvestDate=plan_data.get('expectedHarvestDate', '2025-06-01'),
            milestones=plan_data.get('milestones', []),
            irrigationCycles=plan_data.get('irrigationCycles', []),
            fertilizerEvents=plan_data.get('fertilizerEvents', []),
            estimatedCost=plan_data.get('estimatedCost', 0) or 0,
            targetYieldKg=plan_data.get('targetYieldKg', 0) or 0,
            status='active'
        )

    tasks_data = sync_data.get('tasks')
    if isinstance(tasks_data, list):
        for t in tasks_data:
            ScheduleTask.objects.create(
                owner=request.user,
                farm=farm,
                cropPlan=plan_obj,  # Might be None if only schedule was generated
                title=t.get('title', 'AI Task'),
                description=t.get('description', ''),
                category=t.get('category', 'monitoring'),
                date=t.get('date', '2025-01-01T08:00:00Z'),
                status='pending',
                aiGenerated=True
            )
            tasks_generated += 1

    return Response({'success': True, 'tasksGenerated': tasks_generated})


@api_view(['GET'])
def soil_reports(request):
    # Dummy mock returning empty array for compatibility with frontend
    return Response([])


@api_view(['GET'])
def chat_sessions(request):
    # Get distinct session ids
    messages = ChatMessage.objects.filter(
        owner=request.user).order_by('-created_at')
    sessions = []
    seen = set()
    for msg in messages:
        if msg.sessionId not in seen:
            seen.add(msg.sessionId)
            sessions.append({
                'sessionId': msg.sessionId,
                'preview': str(msg.content)[:50] + '...' if msg.content else '',
                'timestamp': msg.created_at
            })
    return Response(sessions)


@api_view(['GET'])
def chat_history(request, sid):
    messages = ChatMessage.objects.filter(
        owner=request.user,
        sessionId=sid).order_by('created_at')
    data = []
    for m in messages:
        data.append({
            'role': m.role,
            'content': m.content,
            'timestamp': m.created_at
        })
    return Response(data)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def weather_cache_get(request, key):
    try:
        cache = WeatherCache.objects.get(locationKey=key)
        return Response(WeatherCacheSerializer(cache).data)
    except WeatherCache.DoesNotExist:
        return Response({'message': 'Not found'}, status=404)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def weather_cache_set(request):
    key = request.data.get('locationKey')
    if not key:
        return Response({'error': 'locationKey required'}, status=400)

    cache, created = WeatherCache.objects.update_or_create(
        locationKey=key,
        defaults={
            'cityName': request.data.get('cityName', ''),
            'lat': request.data.get('lat'),
            'lon': request.data.get('lon'),
            'data': request.data.get('data', {})
        }
    )
    return Response(WeatherCacheSerializer(cache).data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def daily_tasks(request):
    """
    POST /daily-tasks
    Returns tasks for today adjusted by the rule engine.
    """
    from datetime import datetime, timedelta
    from django.utils import timezone
    from .services.weather_provider import WeatherProvider
    from .models import Farm, CropPlan, ScheduleTask
    from .serializers import ScheduleTaskSerializer

    farm_id = request.data.get('field_id')
    date_str = request.data.get('date')  # YYYY-MM-DD

    if not farm_id:
        return Response({"error": "field_id required"}, status=400)

    try:
        farm = Farm.objects.get(id=farm_id, owner=request.user)
        active_plans = CropPlan.objects.filter(farm=farm, status="active")
    except Farm.DoesNotExist:
        return Response({"error": "Farm not found"}, status=404)

    if not active_plans.exists():
        return Response(
            {"error": "No active crop plan found for this field."}, status=404)

    target_date = datetime.strptime(
        date_str, "%Y-%m-%d").date() if date_str else timezone.now().date()

    # --- JIT Generation ---
    from .services.schedule_engine import generate_schedule_for_crop_plan
    
    for plan in active_plans:
        # Calculate elapsed days since sowing
        sowing_date = plan.sowingDate.date() if hasattr(plan.sowingDate, 'date') else plan.sowingDate
        elapsed_days = max(0, (target_date - sowing_date).days)
        
        # Generate tasks for today and the next 3 days dynamically (Rolling Window)
        try:
            generate_schedule_for_crop_plan(plan, start_day=max(0, elapsed_days - 1), end_day=elapsed_days + 3)
        except Exception as e:
            import logging
            logging.getLogger("krishi_core").error("JIT schedule generation failed for plan %s: %s", plan.id, e)
    # ----------------------

    # 1. Fetch weather
    weather = WeatherProvider.get_forecast(
        farm.district if hasattr(
            farm, 'district') else 'Unknown', target_date)
    rain_24h = weather.get("forecast_24h", {}).get("rain_mm", 0)
    humidity = weather.get("current", {}).get("humidity", 0)

    # 2. Rule Engine Application
    for plan in active_plans:
        # Rule 2: Overdue Check (Irrigation / Fertilizer)
        overdue_threshold = timezone.now() - timedelta(days=3)
        overdue_tasks = ScheduleTask.objects.filter(
            cropPlan=plan,
            status="pending",
            date__lt=overdue_threshold,
            category__in=["irrigation", "fertilizer"]
        )

        if overdue_tasks.exists():
            # Shift everything in this stage
            gap = 3  # Shift by 3 days for simplicity
            plan.driftDays += gap
            plan.save()

            for t in overdue_tasks:
                # Generate RAG explanation
                reason = "Task was severely overdue, shifting downstream schedule."
                t.status = "delayed"
                t.reason = reason
                t.save()

                # Shift downstream
                downstream = ScheduleTask.objects.filter(
                    cropPlan=plan, status="pending", date__gte=t.date
                )
                for dt in downstream:
                    dt.date = dt.date + timedelta(days=gap)
                    dt.save()

    # Rule 1 & 3: Daily specific adjustments
    tasks_today = ScheduleTask.objects.filter(
        cropPlan__in=active_plans,
        date__date__lte=target_date,
        status="pending"
    )

    for t in tasks_today:
        adjusted = False

        # Rule 1
        if t.category == "irrigation" and rain_24h > 15:
            t.status = "skipped"
            t.reason = f"Expected heavy rain ({rain_24h}mm), irrigation skipped."
            adjusted = True

        # Rule 3
        elif t.category == "monitoring" and "flowering" in (t.stageName or "").lower():
            if humidity > 80 and rain_24h > 0:
                t.priority = "critical"
                t.reason = "High humidity and rain increases fungal risk. Critical pest scouting required."
                adjusted = True

        if adjusted:
            if not t.reason.startswith("AI:"):
                t.reason = "AI: " + t.reason
            t.save()

    # Refetch today's active tasks to return
    tasks_to_return = ScheduleTask.objects.filter(
        cropPlan__in=active_plans,
        date__date__lte=target_date,
        status__in=["pending", "delayed"]
    )

    serializer = ScheduleTaskSerializer(tasks_to_return, many=True)
    # Sum driftDays across all plans for simplicity (or send dict mapping plan ID to driftDays)
    total_drift = sum(p.driftDays for p in active_plans)
    return Response({"tasks": serializer.data,
                     "weather": weather,
                     "driftDays": total_drift})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def task_complete(request):
    """
    POST /task-complete
    Logs actual completion date and updates drift.
    """
    from datetime import datetime, timedelta
    from django.utils import timezone
    from .models import ScheduleTask

    task_id = request.data.get('task_id')
    status = request.data.get('status', 'done')
    date_str = request.data.get('date')

    if not task_id:
        return Response({"error": "task_id required"}, status=400)

    try:
        task = ScheduleTask.objects.get(id=task_id, owner=request.user)
    except ScheduleTask.DoesNotExist:
        return Response({"error": "Task not found"}, status=404)

    completed_date = datetime.strptime(
        date_str, "%Y-%m-%d").date() if date_str else timezone.now().date()

    task.status = status
    task.completedDate = completed_date

    # Calculate drift
    scheduled_date = task.date.date()
    if completed_date > scheduled_date:
        days_late = (completed_date - scheduled_date).days
        plan = task.cropPlan
        if plan:
            plan.driftDays += days_late
            plan.save()

            # Shift downstream tasks
            downstream = ScheduleTask.objects.filter(
                cropPlan=plan, status="pending", date__gte=task.date
            )
            for dt in downstream:
                dt.date = dt.date + timedelta(days=days_late)
                dt.save()

    task.save()
    return Response({"message": "Task updated", "driftDaysAdded": (
        completed_date - scheduled_date).days if completed_date > scheduled_date else 0})
