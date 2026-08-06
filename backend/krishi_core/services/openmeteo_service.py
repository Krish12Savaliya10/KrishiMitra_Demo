import requests
import functools
from datetime import datetime
from typing import Optional

class OpenMeteoService:
    BASE_URL = "https://api.open-meteo.com/v1/forecast"

    CURRENT_PARAMS = [
        "temperature_2m", "relative_humidity_2m", "apparent_temperature",
        "is_day", "precipitation", "rain", "showers", "snowfall",
        "weather_code", "cloud_cover", "pressure_msl", "surface_pressure",
        "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m",
    ]

    HOURLY_PARAMS = [
        "temperature_2m", "relative_humidity_2m", "dew_point_2m",
        "apparent_temperature", "precipitation_probability", "precipitation",
        "rain", "showers", "snowfall", "weather_code", "pressure_msl",
        "surface_pressure", "cloud_cover", "cloud_cover_low", "cloud_cover_mid",
        "cloud_cover_high", "visibility", "evapotranspiration",
        "et0_fao_evapotranspiration", "vapour_pressure_deficit",
        "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m",
        "soil_temperature_0cm", "soil_temperature_6cm", "soil_temperature_18cm",
        "soil_temperature_54cm", "soil_moisture_0_to_1cm", "soil_moisture_1_to_3cm",
        "soil_moisture_3_to_9cm", "soil_moisture_9_to_27cm", "soil_moisture_27_to_81cm",
    ]

    DAILY_PARAMS = [
        "weather_code", "temperature_2m_max", "temperature_2m_min",
        "apparent_temperature_max", "apparent_temperature_min", "sunrise",
        "sunset", "daylight_duration", "sunshine_duration", "uv_index_max",
        "uv_index_clear_sky_max", "precipitation_sum", "rain_sum",
        "showers_sum", "snowfall_sum", "precipitation_hours",
        "precipitation_probability_max", "wind_speed_10m_max",
        "wind_gusts_10m_max", "wind_direction_10m_dominant",
        "shortwave_radiation_sum", "et0_fao_evapotranspiration",
    ]

    WEATHER_CODE_MAP = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing rime fog",
        51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
        56: "Light freezing drizzle", 57: "Dense freezing drizzle",
        61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
        66: "Light freezing rain", 67: "Heavy freezing rain",
        71: "Slight snow fall", 73: "Moderate snow fall", 75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
        85: "Slight snow showers", 86: "Heavy snow showers",
        95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail",
    }

    def __init__(self, timeout: int = 10):
        self.timeout = timeout

    @functools.lru_cache(maxsize=128)
    def get_forecast(
        self,
        latitude: float,
        longitude: float,
        forecast_days: int = 16,
        timezone: str = "Asia/Kolkata",
    ) -> Optional[dict]:
        """
        Fetch current + hourly + daily forecast from Open-Meteo.
        Cached up to 128 unique lat/lon combinations to save bandwidth.
        Returns parsed dict, or None on failure.
        """
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": ",".join(self.CURRENT_PARAMS),
            "hourly": ",".join(self.HOURLY_PARAMS),
            "daily": ",".join(self.DAILY_PARAMS),
            "forecast_days": forecast_days,
            "timezone": timezone,
        }

        try:
            resp = requests.get(self.BASE_URL, params=params, timeout=self.timeout)
            resp.raise_for_status()
            data = resp.json()
        except requests.exceptions.RequestException as e:
            print(f"[OpenMeteoService] Request failed: {e}")
            return None
        except ValueError as e:
            print(f"[OpenMeteoService] Invalid JSON response: {e}")
            return None

        return self._parse_response(data)

    def _parse_response(self, data: dict) -> dict:
        current = data.get("current", {})
        daily = data.get("daily", {})
        hourly = data.get("hourly", {})

        parsed = {
            "location": {
                "latitude": data.get("latitude"),
                "longitude": data.get("longitude"),
                "timezone": data.get("timezone"),
                "elevation": data.get("elevation"),
            },
            "current": {
                "time": current.get("time"),
                "temperature": current.get("temperature_2m"),
                "feels_like": current.get("apparent_temperature"),
                "humidity": current.get("relative_humidity_2m"),
                "is_day": bool(current.get("is_day")),
                "precipitation": current.get("precipitation"),
                "rain": current.get("rain"),
                "weather_code": current.get("weather_code"),
                "weather_description": self.WEATHER_CODE_MAP.get(
                    current.get("weather_code"), "Unknown"
                ),
                "cloud_cover": current.get("cloud_cover"),
                "pressure": current.get("pressure_msl"),
                "wind_speed": current.get("wind_speed_10m"),
                "wind_direction": current.get("wind_direction_10m"),
                "wind_gusts": current.get("wind_gusts_10m"),
            },
            "daily_forecast": self._parse_daily(daily),
            "hourly_forecast": self._parse_hourly(hourly),
        }
        return parsed

    def _parse_daily(self, daily: dict) -> list[dict]:
        if not daily or "time" not in daily:
            return []

        days = []
        for i, date in enumerate(daily["time"]):
            days.append({
                "date": date,
                "weather_code": daily.get("weather_code", [None])[i],
                "weather_description": self.WEATHER_CODE_MAP.get(
                    daily.get("weather_code", [None])[i], "Unknown"
                ),
                "temp_max": self._safe_get(daily, "temperature_2m_max", i),
                "temp_min": self._safe_get(daily, "temperature_2m_min", i),
                "feels_like_max": self._safe_get(daily, "apparent_temperature_max", i),
                "feels_like_min": self._safe_get(daily, "apparent_temperature_min", i),
                "sunrise": self._safe_get(daily, "sunrise", i),
                "sunset": self._safe_get(daily, "sunset", i),
                "uv_index_max": self._safe_get(daily, "uv_index_max", i),
                "precipitation_sum": self._safe_get(daily, "precipitation_sum", i),
                "precipitation_probability_max": self._safe_get(
                    daily, "precipitation_probability_max", i
                ),
                "rain_sum": self._safe_get(daily, "rain_sum", i),
                "wind_speed_max": self._safe_get(daily, "wind_speed_10m_max", i),
                "wind_gusts_max": self._safe_get(daily, "wind_gusts_10m_max", i),
                "et0_evapotranspiration": self._safe_get(
                    daily, "et0_fao_evapotranspiration", i
                ),
            })
        return days

    def _parse_hourly(self, hourly: dict) -> list[dict]:
        """Returns hourly array sliced to 48 hours to save payload size."""
        if not hourly or "time" not in hourly:
            return []

        hours = []
        # Slice to 48 hours max
        time_array = hourly["time"][:48]
        
        for i, time in enumerate(time_array):
            hours.append({
                "time": time,
                "temperature": self._safe_get(hourly, "temperature_2m", i),
                "humidity": self._safe_get(hourly, "relative_humidity_2m", i),
                "precipitation_probability": self._safe_get(
                    hourly, "precipitation_probability", i
                ),
                "precipitation": self._safe_get(hourly, "precipitation", i),
                "weather_code": self._safe_get(hourly, "weather_code", i),
                "wind_speed": self._safe_get(hourly, "wind_speed_10m", i),
                "soil_temperature_6cm": self._safe_get(hourly, "soil_temperature_6cm", i),
                "soil_moisture_3_to_9cm": self._safe_get(
                    hourly, "soil_moisture_3_to_9cm", i
                ),
            })
        return hours

    @staticmethod
    def _safe_get(d: dict, key: str, index: int):
        arr = d.get(key)
        if arr and index < len(arr):
            return arr[index]
        return None
