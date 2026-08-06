import random
from datetime import datetime, timedelta

class WeatherProvider:
    """
    Mock weather provider for the rule engine.
    In a real implementation, this would call OpenMeteo or IMD APIs.
    """
    @staticmethod
    def get_forecast(district, target_date=None):
        """
        Returns mock weather for today and the next 2 days.
        """
        # Deterministic mock based on district name length just to simulate conditions
        # if district starts with 'S' or length > 6, we'll pretend there's rain to trigger rules
        
        base_rain = 0
        humidity = 60
        
        district_str = str(district).lower() if district else ""
        if district_str.startswith('s') or len(district_str) > 7:
            base_rain = 25  # High rain
            humidity = 85   # High humidity
            
        return {
            "current": {
                "rain_mm": base_rain,
                "humidity": humidity,
                "temp": 28
            },
            "forecast_24h": {
                "rain_mm": base_rain,
                "humidity": humidity,
            },
            "forecast_48h": {
                "rain_mm": max(0, base_rain - 10),
                "humidity": max(50, humidity - 10),
            }
        }
