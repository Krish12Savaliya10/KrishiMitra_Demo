"""
Django REST Framework views — one-to-one replacement for the old Flask routes:

    Flask route                    -> DRF view (same URL, same JSON contract)
    ---------------------------------------------------------------------
    POST /api/retrieve             -> RetrieveView
    POST /api/soil_recommend       -> SoilRecommendView
    POST /api/crop_stage_tips      -> CropStageTipsView
    POST /api/predict_disease      -> PredictDiseaseView
    GET  /api/health                -> HealthView
    GET  /api/weather                -> WeatherView

Every response shape is unchanged, so the Node backend (which calls this
service) needs zero changes.
"""
import io
import json
import logging
import traceback

import numpy as np
import pandas as pd
import requests
from PIL import Image

from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from . import ml_loader
from .utils import CROPS, WATER_COMPAT, get_crop_meta, check_image_quality, extract_section
from .serializers import (
    RetrieveRequestSerializer,
    SoilRecommendRequestSerializer,
    CropStageTipsRequestSerializer,
)

logger = logging.getLogger("core.views")


class RetrieveView(APIView):
    """RAG semantic search over the ChromaDB knowledge base."""
    parser_classes = [JSONParser]

    def post(self, request):
        chroma_client = ml_loader.state.get("chroma_client")
        if not chroma_client:
            return Response({"error": "ChromaDB client not initialized."}, status=500)

        serializer = RetrieveRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        query = serializer.validated_data["query"]
        n_results = serializer.validated_data.get("n_results", 5)

        try:
            all_collections = chroma_client.list_collections()
            pooled_results = []

            for col_meta in all_collections:
                try:
                    col_name = col_meta.name if hasattr(col_meta, "name") else col_meta
                    # chromadb doesn't automatically apply ef if we just use get_collection without ef in some older versions,
                    # but since it's already instantiated in state, we can use the main embedding function.
                    # Actually, the quickest way is to just use the ef attached to the main collection if available.
                    main_col = ml_loader.state.get("collection")
                    ef = main_col._embedding_function if main_col else None
                    col = chroma_client.get_collection(col_name, embedding_function=ef)
                    
                    if col.count() == 0:
                        continue
                        
                    res = col.query(query_texts=[query], n_results=min(col.count(), n_results))
                    if res.get("documents") and len(res["documents"]) > 0 and len(res["documents"][0]) > 0:
                        docs = res["documents"][0]
                        dists = res.get("distances", [[]])[0]
                        metas = res.get("metadatas", [[]])[0]
                        for i in range(len(docs)):
                            pooled_results.append({
                                "document": docs[i],
                                "distance": dists[i] if i < len(dists) else 999.0,
                                "metadata": metas[i] if i < len(metas) else {}
                            })
                except Exception as e:
                    logger.warning("Error querying collection %s: %s", getattr(col_meta, "name", col_meta), e)

            # Sort pooled results by distance (lower is better for L2)
            pooled_results.sort(key=lambda x: x["distance"])

            # Remove duplicates by document text
            seen = set()
            unique_results = []
            for r in pooled_results:
                if r["document"] not in seen:
                    seen.add(r["document"])
                    unique_results.append(r)

            # Slice top K
            top_results = unique_results[:n_results]

            documents = [r["document"] for r in top_results]
            distances = [r["distance"] for r in top_results]

            context = "\n\n".join(documents)

            return Response({
                "context": context, 
                "distances": distances, 
                "raw_results": {"documents": [documents], "distances": [distances]} 
            })
            
        except Exception as e:
            logger.error("Error during retrieval: %s", traceback.format_exc())
            return Response({"error": str(e)}, status=500)


class SoilRecommendView(APIView):
    """
    Soil-powered crop recommendation engine (Unit 4/5: regression + classification
    features feed a RandomForest classifier; falls back to a rule-based heuristic
    scorer if the model isn't loaded).
    """
    parser_classes = [JSONParser]

    def post(self, request):
        serializer = SoilRecommendRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        ph = d["ph"]
        nitrogen = d["nitrogen"]
        phosphorus = d["phosphorus"]
        potassium = d["potassium"]
        org_carbon = d["organicCarbon"]
        season_in = d["season"].lower()
        area_acres = d["areaAcres"]
        water_avail = d["waterAvailability"].lower()

        collection = ml_loader.state["collection"]
        crop_rf_model = ml_loader.state["crop_rf_model"]
        results = []

        # Try to use Gemini as the primary recommendation engine
        gemini_key = settings.GEMINI_API_KEY
        if gemini_key:
            try:
                available_crops = [c["name"] for c in CROPS]
                prompt = (
                    f"You are an agricultural expert. Given these soil and conditions: "
                    f"Nitrogen={nitrogen}, Phosphorus={phosphorus}, Potassium={potassium}, "
                    f"pH={ph}, OrganicCarbon={org_carbon}, Season={season_in}, WaterAvailability={water_avail}. "
                    f"Rank the top 3 most suitable crops from this list: {', '.join(available_crops)}. "
                    f"Reply with ONLY a comma-separated list of the 3 crop names, nothing else."
                )
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
                res = requests.post(
                    url,
                    json={"contents": [{"parts": [{"text": prompt}]}]},
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                if res.status_code == 200:
                    text_resp = res.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
                    recommended_names = [name.strip().lower() for name in text_resp.split(",") if name.strip()]
                    
                    # Generate metrics using the heuristic engine, but only for Gemini's recommended crops
                    all_heuristics = self._heuristic_fallback(ph, org_carbon, season_in, area_acres, water_avail, collection)
                    
                    # Map Gemini's order to high suitability scores
                    for i, r_name in enumerate(recommended_names):
                        for h in all_heuristics:
                            if h["cropName"].lower() == r_name:
                                h["suitabilityScore"] = max(90 - (i * 10), h["suitabilityScore"])
                                results.append(h)
                                break
            except Exception as e:
                logger.error("Error predicting with Gemini model: %s", e)

        if not results:
            results = self._heuristic_fallback(ph, org_carbon, season_in, area_acres, water_avail, collection)

        results.sort(key=lambda x: x["suitabilityScore"], reverse=True)
        results = results[:5]
        if results:
            results[0]["isTopPick"] = True

        return Response({"recommendations": results})

    @staticmethod
    def _rag_reason(collection, crop_name, ph):
        reason = f"{crop_name} suits your soil's pH {ph} and current nutrient profile."
        if collection:
            try:
                query = f"{crop_name} soil requirements pH nitrogen phosphorus recommendation"
                rag = collection.query(query_texts=[query], n_results=1, where={"source": "timeline_kb"})
                docs = rag.get("documents", [[]])[0]
                if docs:
                    why = extract_section(docs[0] + "\n", "Why it matters") or None
                    if why:
                        reason = why
            except Exception:
                pass
        return reason

    def _heuristic_fallback(self, ph, org_carbon, season_in, area_acres, water_avail, collection):
        results = []
        for crop in CROPS:
            ph_lo, ph_hi = crop["phRange"]
            if ph_lo <= ph <= ph_hi:
                ph_score = 25.0
            else:
                deviation = min(abs(ph - ph_lo), abs(ph - ph_hi))
                ph_score = max(0, 25 - deviation * 12)
            suit = ph_score
            if crop["season"] != season_in:
                suit = max(0, suit - 20)
            suit = round(min(100, max(0, suit)))

            soil_match = 100 if ph_lo <= ph <= ph_hi else max(0, 100 - abs(ph - (ph_lo + ph_hi) / 2) * 20)
            soil_match = round(min(100, soil_match * (1 + (org_carbon - 0.5) * 0.3)))

            water_mult = WATER_COMPAT.get(water_avail, {}).get(crop["water"], 0.5)
            weather_pct = round(60 + water_mult * 35)

            yield_kg = round(crop["yieldKgPerAcre"] * area_acres)
            cost = round(crop["costPerAcre"] * area_acres)
            revenue = round(crop["yieldKgPerAcre"] * area_acres * crop["pricePerKg"])
            margin = revenue - cost

            results.append({
                "cropName": crop["name"], "suitabilityScore": suit,
                "soilMatchPct": soil_match, "weatherMatchPct": weather_pct,
                "expectedYieldKg": yield_kg, "expectedMarginRs": margin,
                "durationDays": crop["durationDays"],
                "reason": self._rag_reason(collection, crop["name"], ph),
                "isTopPick": False,
            })
        return results


class CropStageTipsView(APIView):
    """RAG-powered field tips for a crop + growth stage (Crop Plan timeline)."""
    parser_classes = [JSONParser]

    def post(self, request):
        collection = ml_loader.state["collection"]
        if not collection:
            return Response({"error": "ChromaDB collection not initialized."}, status=500)

        serializer = CropStageTipsRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        crop = serializer.validated_data["crop"]
        stage = serializer.validated_data["stage"]

        try:
            query_text = f"{crop} {stage} field notes tasks irrigation fertilizer watch for"
            results = collection.query(query_texts=[query_text], n_results=3, where={"source": "timeline_kb"})
            documents = results.get("documents", [[]])[0]

            if not documents:
                results = collection.query(query_texts=[query_text], n_results=2)
                documents = results.get("documents", [[]])[0]

            if not documents:
                return Response({"found": False, "crop": crop, "stage": stage, "tips": {}})

            raw_text = documents[0]
            import re
            tasks_block = re.search(r"Key tasks:\n((?:- .+\n?)+)", raw_text)
            key_tasks = []
            if tasks_block:
                key_tasks = [l.strip("- ").strip() for l in tasks_block.group(1).strip().split("\n") if l.strip()]

            irrigation = extract_section(raw_text, "Irrigation")
            fertilizer = extract_section(raw_text, "Fertilizer")
            watch_for = extract_section(raw_text, "Watch for")
            treatment = extract_section(raw_text, "Treatment if needed")
            why_matters = extract_section(raw_text, "Why it matters")
            critical_raw = extract_section(raw_text, "Critical")
            is_critical = critical_raw.upper().startswith("YES")

            return Response({
                "found": True, "crop": crop, "stage": stage, "raw_text": raw_text,
                "tips": {
                    "key_tasks": key_tasks, "irrigation": irrigation, "fertilizer": fertilizer,
                    "watch_for": watch_for, "treatment": treatment, "why_it_matters": why_matters,
                    "critical": is_critical,
                },
            })
        except Exception as e:
            logger.error("Error in crop_stage_tips: %s", traceback.format_exc())
            return Response({"error": str(e)}, status=500)


class PredictDiseaseView(APIView):
    """
    Multimodal disease classification (Unit 6): Uses Gemini 1.5 Flash to analyze
    the uploaded image directly, avoiding heavy local CNN/YOLO models.
    """
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        gemini_key = settings.GEMINI_API_KEY
        fallback_payload = {
            "error": "Gemini API key is not configured. Disease inference is unavailable.",
            "fallback": True, "disease": "Unknown", "confidence": 0.0, "top3": [],
            "quality_passed": True, "quality_issues": [],
            "treatment": "Please configure GEMINI_API_KEY in the backend .env file.",
        }

        if not gemini_key:
            return Response(fallback_payload, status=200)

        image_file = request.FILES.get("image")
        if not image_file:
            return Response({**fallback_payload, "error": "No image uploaded in form-data field 'image'."}, status=200)

        try:
            import base64
            # Read image and encode to base64
            image_data = image_file.read()
            mime_type = image_file.content_type or "image/jpeg"
            b64_image = base64.b64encode(image_data).decode('utf-8')

            # Optional: We can still check image quality locally if needed,
            # but for now we rely on Gemini to understand the image.
            quality_passed = True
            quality_issues = []

            # Ask Gemini to diagnose and provide treatment
            prompt = (
                "You are an expert plant pathologist. Analyze this image of a crop leaf. "
                "Identify if there is any disease. If healthy, state 'Healthy'. "
                "Provide your response EXACTLY as a JSON object with the following keys: "
                "'disease' (string, the name of the disease or 'Healthy'), "
                "'confidence' (number between 0 and 1 representing your confidence), "
                "'treatment' (string, a concise 3-sentence treatment plan if diseased, or a maintenance tip if healthy)."
            )

            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
            
            payload = {
                "contents": [{
                    "parts": [
                        {"text": prompt},
                        {
                            "inline_data": {
                                "mime_type": mime_type,
                                "data": b64_image
                            }
                        }
                    ]
                }]
            }

            res = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=15)
            if res.status_code != 200:
                logger.error("Gemini API error: %s", res.text)
                return Response({**fallback_payload, "error": "Failed to get response from Gemini API."}, status=200)
            
            text_resp = res.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
            
            # Gemini might wrap JSON in markdown block
            if text_resp.startswith("```json"):
                text_resp = text_resp[7:]
            if text_resp.endswith("```"):
                text_resp = text_resp[:-3]
            text_resp = text_resp.strip()
            
            try:
                parsed = json.loads(text_resp)
                pretty_class = parsed.get("disease", "Unknown")
                confidence = parsed.get("confidence", 0.0)
                treatment = parsed.get("treatment", "No treatment recommendation available.")
            except json.JSONDecodeError:
                # Fallback if Gemini didn't return perfect JSON
                pretty_class = "Unknown (Parsing Error)"
                confidence = 0.5
                treatment = text_resp

            top3 = [
                {"label": pretty_class, "prob": confidence}
            ]

            return Response({
                "disease": pretty_class, "confidence": confidence, "raw_class": pretty_class,
                "top3": top3, "quality_passed": quality_passed, "quality_issues": quality_issues,
                "treatment": treatment,
            })
        except Exception as e:
            logger.error("Error during disease prediction with Gemini: %s", traceback.format_exc())
            return Response({**fallback_payload, "error": f"Prediction failed: {str(e)}"}, status=200)


class HealthView(APIView):
    def get(self, request):
        return Response({
            "status": "ok",
            "db_connected": ml_loader.state["collection"] is not None,
            "ml_ready": ml_loader.state["disease_model"] is not None,
        })


class WeatherView(APIView):
    def get(self, request):
        lat_str = request.query_params.get("latitude")
        lon_str = request.query_params.get("longitude")
        if not lat_str or not lon_str:
            return Response({"error": "Missing latitude or longitude parameters"}, status=400)
        try:
            lat, lon = float(lat_str), float(lon_str)
        except ValueError:
            return Response({"error": "Latitude and longitude must be valid numbers"}, status=400)

        from krishi_core.services.openmeteo_service import OpenMeteoService
        forecast = OpenMeteoService().get_forecast(latitude=lat, longitude=lon)
        if forecast is None:
            return Response({"error": "Failed to fetch weather data from upstream service"}, status=502)
        return Response(forecast)
