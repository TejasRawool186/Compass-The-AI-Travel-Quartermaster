from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")


@dataclass(frozen=True)
class Settings:
    port: int = int(os.getenv("PORT", "5000"))
    travelpayouts_token: str = os.getenv("TRAVELPAYOUTS_TOKEN", "")
    travelpayouts_api_base_url: str = os.getenv("TRAVELPAYOUTS_API_BASE_URL", "https://api.travelpayouts.com")
    travelpayouts_hotel_lookup_base_url: str = os.getenv(
        "TRAVELPAYOUTS_HOTEL_LOOKUP_BASE_URL",
        "https://engine.hotellook.com/api/v2",
    )
    travelpayouts_hotel_data_base_url: str = os.getenv(
        "TRAVELPAYOUTS_HOTEL_DATA_BASE_URL",
        "https://yasen.hotellook.com",
    )
    openweather_api_key: str = os.getenv("OPENWEATHER_API_KEY", "")
    openweather_base_url: str = os.getenv("OPENWEATHER_BASE_URL", "https://api.openweathermap.org")
    google_calendar_api_key: str = os.getenv("GOOGLE_CALENDAR_API_KEY", "")
    google_calendar_id: str = os.getenv("GOOGLE_CALENDAR_ID", "primary")
    google_calendar_base_url: str = os.getenv(
        "GOOGLE_CALENDAR_BASE_URL",
        "https://www.googleapis.com/calendar/v3",
    )
    budget_store_path: Path = BASE_DIR / "data" / "budget.json"


settings = Settings()
