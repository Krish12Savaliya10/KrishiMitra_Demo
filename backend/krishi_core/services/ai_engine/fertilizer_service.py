import os
import logging
import joblib
import pandas as pd
from django.conf import settings

logger = logging.getLogger("core.ai_engine.fertilizer")

# We use the unified models directory in krishi_core/ml_models/artifacts
MODELS_DIR = os.path.join(settings.BASE_DIR, "krishi_core", "ml_models", "artifacts")
MODEL_PATH = os.path.join(MODELS_DIR, "fertilizer_model.pkl")

class FertilizerRecommendationService:
    def __init__(self):
        self.model = None
        self.encoder = None
        # Use a flag to avoid repeated load failures
        self._loaded = False
        self._load_models()

    def _load_models(self):
        try:
            self.model = joblib.load(MODEL_PATH)
            # Some pipelines include the encoder, some don't. The user's zip showed an encoder,
            # but in zalim models we have fertilizer_label_encoder.pkl.
            encoder_path = os.path.join(MODELS_DIR, "fertilizer_label_encoder.pkl")
            if os.path.exists(encoder_path):
                self.encoder = joblib.load(encoder_path)
            self._loaded = True
            logger.info("Fertilizer model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load fertilizer model: {e}")

    def predict(self, data):
        if not self._loaded or not self.model:
            return "N/A (Model unavailable)"
            
        try:
            features = pd.DataFrame([{
                "Soil_Type": data.get("Soil_Type", "Black"),
                "Crop_Type": data.get("Crop_Type", "Wheat"),
                "Crop_Growth_Stage": data.get("Crop_Growth_Stage", "Pre-emergence"),
                "Season": data.get("Season", "Kharif"),
                "Irrigation_Type": data.get("Irrigation_Type", "Drip"),
                "Previous_Crop": data.get("Previous_Crop", "Unknown"),
                "Region": data.get("Region", "Maharashtra"),
                "Soil_pH": float(data.get("Soil_pH", 6.5)),
                "Soil_Moisture": float(data.get("Soil_Moisture", 40.0)),
                "Organic_Carbon": float(data.get("Organic_Carbon", 0.5)),
                "Electrical_Conductivity": float(data.get("Electrical_Conductivity", 0.4)),
                "Nitrogen_Level": float(data.get("Nitrogen_Level", 100)),
                "Phosphorus_Level": float(data.get("Phosphorus_Level", 30)),
                "Potassium_Level": float(data.get("Potassium_Level", 200)),
                "Temperature": float(data.get("Temperature", 25.0)),
                "Humidity": float(data.get("Humidity", 60.0)),
                "Rainfall": float(data.get("Rainfall", 100.0)),
                "Fertilizer_Used_Last_Season": data.get("Fertilizer_Used_Last_Season", "None"),
                "Yield_Last_Season": float(data.get("Yield_Last_Season", 0.0)),
            }])

            prediction = self.model.predict(features)[0]
            
            # If the pipeline doesn't inherently invert the label, use the encoder
            if self.encoder and hasattr(self.encoder, 'inverse_transform'):
                try:
                    fertilizer = self.encoder.inverse_transform([prediction])[0]
                    return fertilizer
                except:
                    return str(prediction)
            
            return str(prediction)
        except Exception as e:
            logger.error(f"Fertilizer prediction error: {e}")
            return "Error (Prediction failed)"

fertilizer_service = FertilizerRecommendationService()
