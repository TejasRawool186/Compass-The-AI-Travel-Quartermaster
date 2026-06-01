from __future__ import annotations

from datetime import date, timedelta
from typing import Any

import requests


class TravelPayoutsProvider:
    def __init__(self, token: str, api_base_url: str, hotel_lookup_base_url: str, hotel_data_base_url: str):
        self.token = token
        self.api_base_url = api_base_url.rstrip("/")
        self.hotel_lookup_base_url = hotel_lookup_base_url.rstrip("/")
        self.hotel_data_base_url = hotel_data_base_url.rstrip("/")

    @property
    def configured(self) -> bool:
        return bool(self.token)

    def _headers(self) -> dict:
        return {
            "X-Access-Token": self.token,
            "Accept-Encoding": "gzip, deflate",
        }

    def search_flight(self, origin_code: str, destination_code: str, budget_limit: float | None = None) -> dict | None:
        depart_date = (date.today() + timedelta(days=14)).isoformat()
        return_date = (date.today() + timedelta(days=16)).isoformat()
        try:
            response = requests.get(
                f"{self.api_base_url}/v1/prices/cheap",
                headers=self._headers(),
                params={
                    "origin": origin_code,
                    "destination": destination_code,
                    "depart_date": depart_date,
                    "return_date": return_date,
                    "currency": "usd",
                    "token": self.token,
                },
                timeout=20,
            )
            response.raise_for_status()
            payload = response.json()
            offers = payload.get("data", {}).get(destination_code, {})
            if not offers:
                return self.fallback_flight(origin_code, destination_code, depart_date)

            flattened = list(offers.values())
            flattened.sort(key=lambda item: float(item.get("price", 0)))
            if budget_limit is not None:
                affordable = [item for item in flattened if float(item.get("price", 0)) <= budget_limit]
                selected = affordable[0] if affordable else flattened[0]
            else:
                selected = flattened[0]

            return {
                "id": f"{origin_code}-{destination_code}-{selected.get('departure_at', depart_date)}",
                "origin": origin_code,
                "destination": destination_code,
                "date": depart_date,
                "price": round(float(selected.get("price", 0)), 2),
                "airline": selected.get("airline", "Unknown airline"),
                "duration": self._estimate_duration(origin_code, destination_code),
                "source": "travelpayouts-cheap",
            }
        except requests.RequestException:
            return self.fallback_flight(origin_code, destination_code, depart_date)

    def search_hotel(self, query_text: str) -> dict | None:
        try:
            lookup_response = requests.get(
                f"{self.hotel_lookup_base_url}/lookup.json",
                params={
                    "query": query_text,
                    "lang": "en",
                    "lookFor": "both",
                    "limit": 1,
                    "token": self.token,
                },
                timeout=20,
            )
            lookup_response.raise_for_status()
            payload = lookup_response.json()
            results = payload.get("results") if isinstance(payload, dict) else None
            if results is None and isinstance(payload, dict):
                results = payload
            hotels = self._as_list(results.get("hotels")) if isinstance(results, dict) else []
            locations = self._as_list(results.get("locations")) if isinstance(results, dict) else []

            if hotels:
                selected = hotels[0]
                name = selected.get("label") or selected.get("fullName") or "Hotel option"
                rating = float(selected.get("rating") or 0)
                hotel_id = selected.get("id") or selected.get("Id")
                city_name = selected.get("locationName") or query_text
            elif locations:
                selected = locations[0]
                name = f"{selected.get('name', query_text)} stay"
                rating = 0
                hotel_id = None
                city_name = selected.get("name") or query_text
            else:
                return self.fallback_hotel(query_text)

            estimated_price = self._estimate_hotel_price(query_text)
            details = self._fetch_hotel_details(hotel_id)
            return {
                "id": hotel_id or city_name,
                "city": city_name,
                "name": details.get("name", name),
                "pricePerNight": estimated_price,
                "rating": details.get("guestScore", rating),
                "amenities": details.get("amenities", "Wi-Fi, breakfast, central location"),
                "source": "travelpayouts-lookup",
            }
        except requests.RequestException:
            return self.fallback_hotel(query_text)

    def _fetch_hotel_details(self, hotel_id: str | int | None) -> dict:
        if not hotel_id:
            return {}
        try:
            response = requests.get(
                f"{self.hotel_data_base_url}/widget/hotels/{hotel_id}.json",
                params={"token": self.token},
                timeout=20,
            )
            response.raise_for_status()
            payload = response.json()
            amenities = payload.get("amenities") or []
            return {
                "name": payload.get("name", ""),
                "guestScore": payload.get("guestScore", 0),
                "amenities": ", ".join(amenities[:4]) if amenities else "",
            }
        except Exception:
            return {}

    def _as_list(self, value: Any) -> list[dict]:
        if isinstance(value, list):
            return [item for item in value if isinstance(item, dict)]
        if isinstance(value, dict):
            if all(isinstance(item, dict) for item in value.values()):
                return list(value.values())
        return []

    def _estimate_duration(self, origin_code: str, destination_code: str) -> str:
        route_hint = {
            ("MIA", "NAS"): "1h 10m",
            ("MIA", "HAV"): "1h 20m",
            ("MIA", "KIN"): "1h 50m",
            ("MIA", "CAP"): "2h 15m",
        }
        return route_hint.get((origin_code, destination_code), "Duration varies")

    def _estimate_hotel_price(self, query_text: str) -> float:
        normalized = query_text.lower()
        if "port royal" in normalized:
            return 240.0
        if "tortuga" in normalized:
            return 110.0
        if "havana" in normalized:
            return 135.0
        return 145.0

    def fallback_hotel(self, query_text: str) -> dict:
        normalized = query_text.lower()
        catalog = {
            "nassau": {
                "name": "Harbor Breeze Nassau Resort",
                "price": 145.0,
                "rating": 4.3,
                "amenities": "Wi-Fi, breakfast, beach access, pool",
            },
            "havana": {
                "name": "Old Havana Courtyard Hotel",
                "price": 135.0,
                "rating": 4.1,
                "amenities": "Wi-Fi, breakfast, city center, rooftop terrace",
            },
            "port royal": {
                "name": "Kingston Harbor Grand",
                "price": 240.0,
                "rating": 4.5,
                "amenities": "Wi-Fi, breakfast, harbor view, concierge",
            },
            "tortuga": {
                "name": "Tortuga Seaside Lodge",
                "price": 110.0,
                "rating": 3.9,
                "amenities": "Wi-Fi, breakfast, oceanfront, shuttle",
            },
        }
        key = next((name for name in catalog if name in normalized), "nassau")
        selected = catalog[key]
        return {
            "id": f"fallback-{key}",
            "city": key.title(),
            "name": selected["name"],
            "pricePerNight": selected["price"],
            "rating": selected["rating"],
            "amenities": selected["amenities"],
            "source": "fallback-catalog",
        }

    def fallback_flight(self, origin_code: str, destination_code: str, depart_date: str) -> dict:
        catalog = {
            ("MIA", "NAS"): {"price": 165.0, "airline": "Caribbean Connector"},
            ("MIA", "HAV"): {"price": 190.0, "airline": "Island Hopper Air"},
            ("MIA", "KIN"): {"price": 225.0, "airline": "Kingston Air"},
            ("MIA", "CAP"): {"price": 250.0, "airline": "North Coast Air"},
        }
        selected = catalog.get((origin_code, destination_code), {"price": 210.0, "airline": "Regional Air"})
        return {
            "id": f"fallback-{origin_code}-{destination_code}-{depart_date}",
            "origin": origin_code,
            "destination": destination_code,
            "date": depart_date,
            "price": selected["price"],
            "airline": selected["airline"],
            "duration": self._estimate_duration(origin_code, destination_code),
            "source": "fallback-catalog",
        }
