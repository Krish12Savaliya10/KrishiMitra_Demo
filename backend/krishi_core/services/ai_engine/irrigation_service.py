import os
import logging
import joblib
import pandas as pd
from django.conf import settings

logger = logging.getLogger("core.ai_engine.irrigation")

MODELS_DIR = os.path.join(settings.BASE_DIR, "krishi_core", "ml_models", "artifacts")
MODEL_PATH = os.path.join(MODELS_DIR, "irrigation_model.pkl")

class IrrigationPredictionService:
    def __init__(self):
        self.model = None
        self.encoder = None
        self._loaded = False
        self._load_models()

    def _load_models(self):
        try:
            self.model = joblib.load(MODEL_PATH)
            encoder_path = os.path.join(MODELS_DIR, "irrigation_label_encoder.pkl")
            if os.path.exists(encoder_path):
                self.encoder = joblib.load(encoder_path)
            self._loaded = True
            logger.info("Irrigation model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load irrigation model: {e}")

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
                "Water_Source": data.get("Water_Source", "Groundwater"),
                "Mulching_Used": data.get("Mulching_Used", "No"),
                "Region": data.get("Region", "Maharashtra"),
                "Soil_pH": float(data.get("Soil_pH", 6.5)),
                "Soil_Moisture": float(data.get("Soil_Moisture", 40.0)),
                "Organic_Carbon": float(data.get("Organic_Carbon", 0.5)),
                "Electrical_Conductivity": float(data.get("Electrical_Conductivity", 0.4)),
                "Temperature_C": float(data.get("Temperature_C", 25.0)),
                "Humidity": float(data.get("Humidity", 60.0)),
                "Rainfall_mm": float(data.get("Rainfall_mm", 100.0)),
                "Sunlight_Hours": float(data.get("Sunlight_Hours", 8.0)),
                "Wind_Speed_kmh": float(data.get("Wind_Speed_kmh", 10.0)),
                "Field_Area_hectare": float(data.get("Field_Area_hectare", 1.0)),
                "Previous_Irrigation_mm": float(data.get("Previous_Irrigation_mm", 0.0)),
            }])

            prediction = self.model.predict(features)[0]
            
            if self.encoder and hasattr(self.encoder, 'inverse_transform'):
                try:
                    irrigation = self.encoder.inverse_transform([prediction])[0]
                    return irrigation
                except:
                    return str(prediction)
            
            return str(prediction)
        except Exception as e:
            logger.error(f"Irrigation prediction error: {e}")
            return "Error (Prediction failed)"

irrigation_service = IrrigationPredictionService()
