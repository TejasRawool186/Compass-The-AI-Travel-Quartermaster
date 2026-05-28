from __future__ import annotations

from datetime import date, timedelta

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
            return None

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
        }

    def search_hotel(self, query_text: str) -> dict | None:
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
        results = payload.get("results") or payload
        hotels = results.get("hotels") if isinstance(results, dict) else []
        locations = results.get("locations") if isinstance(results, dict) else []

        if hotels:
            selected = hotels[0]
            name = selected.get("label") or selected.get("fullName") or "Hotel option"
            rating = float(selected.get("rating") or 0)
            hotel_id = selected.get("id") or selected.get("Id")
            lat = selected.get("location", {}).get("lat")
            lon = selected.get("location", {}).get("lon")
            city_name = selected.get("locationName") or query_text
        elif locations:
            selected = locations[0]
            name = f"{selected.get('name', query_text)} stay"
            rating = 0
            hotel_id = None
            lat = selected.get("location", {}).get("lat")
            lon = selected.get("location", {}).get("lon")
            city_name = selected.get("name") or query_text
        else:
            return None

        estimated_price = self._estimate_hotel_price(query_text)
        details = self._fetch_hotel_details(hotel_id)
        return {
            "id": hotel_id or city_name,
            "city": city_name,
            "name": details.get("name", name),
            "pricePerNight": estimated_price,
            "rating": details.get("guestScore", rating),
            "amenities": details.get("amenities", "Wi-Fi, breakfast, central location"),
        }

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
