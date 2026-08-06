from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
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

# ─── Helpers ──────────────────────────────────────────────────────────────────

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

# ─── Auth Views ───────────────────────────────────────────────────────────────

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
        return Response({'message': 'Email and password are required.'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'message': 'An account with this email already exists.'}, status=400)

    if phone and User.objects.filter(phone=phone).exists():
        return Response({'message': 'Phone number already registered.'}, status=400)

    if not phone:
        import random, string
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
def auth_forgot_password(request):
    """Stub endpoint for forgot password."""
    return Response({'message': 'If this email is registered, a reset link has been sent.'})

# ─── CRUD ViewSets ────────────────────────────────────────────────────────────

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
        qs = super().get_queryset()
        farm_id = self.request.query_params.get('farm')
        if farm_id:
            qs = qs.filter(farm_id=farm_id)
        return qs

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
    states = list(MarketPrice.objects.values_list('state', flat=True).distinct().order_by('state'))
    commodities = list(qs.values_list('commodity', flat=True).distinct().order_by('commodity'))
    districts = []
    if state_filter:
        districts = list(qs.values_list('district', flat=True).distinct().order_by('district'))
    return Response({'states': states, 'commodities': commodities, 'districts': districts})


class ScheduleTaskViewSet(OwnerViewSet):
    queryset = ScheduleTask.objects.all()
    serializer_class = ScheduleTaskSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        farm_id = self.request.query_params.get('farm')
        if farm_id:
            qs = qs.filter(farm_id=farm_id)
        return qs.order_by('date')

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

import json
import requests
from django.http import StreamingHttpResponse
from django.conf import settings

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def chat_stream(request):
    """Streams a chat response from Ollama (or Gemini if preferred)."""
    user_msg = request.data.get('message', '')
    session_id = request.data.get('sessionId', 'default')
    
    # Save user message
    ChatMessage.objects.create(
        owner=request.user,
        sessionId=session_id,
        role='user',
        content=user_msg
    )

    def generate():
        ollama_url = f"{settings.OLLAMA_BASE_URL}/api/generate"
        payload = {
            "model": settings.OLLAMA_MODEL,
            "prompt": f"You are KrishiMitra, a helpful AI assistant for Indian farmers. Answer this concisely: {user_msg}",
            "stream": True
        }
        
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
        except Exception as e:
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

    response = StreamingHttpResponse(generate(), content_type='text/event-stream')
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

    plan_data = sync_data.get('cropPlan')
    if plan_data:
        plan_obj = CropPlan.objects.create(
            owner=request.user,
            farm=farm,
            cropName=plan_data.get('cropName', 'Unknown Crop'),
            season=plan_data.get('season', 'Unknown'),
            sowingDate=plan_data.get('sowingDate', '2025-01-01'),
            expectedHarvestDate=plan_data.get('expectedHarvestDate', '2025-06-01'),
            status='active'
        )
        
    tasks_data = sync_data.get('tasks')
    if isinstance(tasks_data, list):
        for t in tasks_data:
            ScheduleTask.objects.create(
                owner=request.user,
                farm=farm,
                cropPlan=plan_obj, # Might be None if only schedule was generated
                title=t.get('title', 'AI Task'),
                description=t.get('description', ''),
                category=t.get('category', 'monitoring'),
                date=t.get('date', '2025-01-01T08:00:00Z'),
                status='pending',
                aiGenerated=True
            )
            tasks_generated += 1

    return Response({'success': True, 'tasksGenerated': tasks_generated})
