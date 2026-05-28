from __future__ import annotations

import requests


class OpenWeatherProvider:
    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")

    @property
    def configured(self) -> bool:
        return bool(self.api_key)

    def get_weather(self, latitude: float, longitude: float) -> dict:
        response = requests.get(
            f"{self.base_url}/data/2.5/weather",
            params={
                "lat": latitude,
                "lon": longitude,
                "appid": self.api_key,
                "units": "metric",
            },
            timeout=20,
        )
        response.raise_for_status()
        payload = response.json()
        wind_speed = payload.get("wind", {}).get("speed", 0)
        weather = (payload.get("weather") or [{}])[0]
        return {
            "forecast": weather.get("main", "Unknown"),
            "temp": f"{round(payload.get('main', {}).get('temp', 0))}°C",
            "windSpeed": f"{round(wind_speed)} m/s",
            "humidity": f"{payload.get('main', {}).get('humidity', 0)}%",
            "description": weather.get("description", "No description"),
        }
