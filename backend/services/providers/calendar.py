from __future__ import annotations

from datetime import datetime, timedelta, timezone
from urllib.parse import parse_qs, unquote, urlparse

import requests


class CalendarProvider:
    def __init__(self, api_key: str, calendar_id: str, base_url: str):
        self.api_key = api_key
        self.calendar_id = self._normalize_calendar_id(calendar_id)
        self.base_url = base_url.rstrip("/")

    @property
    def configured(self) -> bool:
        return bool(self.api_key and self.calendar_id)

    def get_events(self, days: int = 30) -> list[dict]:
        time_min = datetime.now(timezone.utc).isoformat()
        time_max = (datetime.now(timezone.utc) + timedelta(days=days)).isoformat()
        response = requests.get(
            f"{self.base_url}/calendars/{self.calendar_id}/events",
            params={
                "key": self.api_key,
                "timeMin": time_min,
                "timeMax": time_max,
                "singleEvents": "true",
                "orderBy": "startTime",
                "maxResults": 10,
            },
            timeout=20,
        )
        response.raise_for_status()
        items = response.json().get("items", [])
        events = []
        for item in items:
            start = item.get("start", {}).get("dateTime") or item.get("start", {}).get("date")
            end = item.get("end", {}).get("dateTime") or item.get("end", {}).get("date")
            events.append(
                {
                    "date": start,
                    "event": item.get("summary", "Untitled event"),
                    "duration": end,
                    "conflict": False,
                    "block": "Scheduled",
                }
            )
        return events

    def _normalize_calendar_id(self, raw_value: str) -> str:
        if not raw_value:
            return raw_value
        if "calendar.google.com" not in raw_value:
            return raw_value
        parsed = urlparse(raw_value)
        src_values = parse_qs(parsed.query).get("src", [])
        if src_values:
            return unquote(src_values[0])
        return raw_value
