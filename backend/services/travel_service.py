from __future__ import annotations

import re
from datetime import date, datetime, timedelta


DESTINATIONS = [
    {
        "id": "nassau",
        "name": "Nassau",
        "label": "Nassau Port",
        "airportCode": "NAS",
        "cityCode": "NAS",
        "latitude": 25.0443,
        "longitude": -77.3504,
        "query": "Plan a sunny Nassau trip under $400",
        "description": "Bright beaches and easy Caribbean weekends.",
    },
    {
        "id": "havana",
        "name": "Havana",
        "label": "Havana Port",
        "airportCode": "HAV",
        "cityCode": "HAV",
        "latitude": 23.1136,
        "longitude": -82.3666,
        "query": "Plan a trip to Havana",
        "description": "Historic streets, warm water, and food trails.",
    },
    {
        "id": "port_royal",
        "name": "Port Royal",
        "label": "Port Royal",
        "airportCode": "KIN",
        "cityCode": "KIN",
        "latitude": 17.9374,
        "longitude": -76.8418,
        "query": "Plan a luxury voyage to Port Royal",
        "description": "Luxury-leaning harbor stays near Kingston.",
    },
    {
        "id": "tortuga",
        "name": "Tortuga",
        "label": "Tortuga Cove",
        "airportCode": "CAP",
        "cityCode": "CAP",
        "latitude": 19.7793,
        "longitude": -72.2021,
        "query": "Plan a voyage to Tortuga for rum and sailing",
        "description": "Haiti north coast routes with adventure appeal.",
    },
]


class TravelService:
    def __init__(self, travelpayouts_provider, weather_provider, calendar_provider, budget_store):
        self.travelpayouts_provider = travelpayouts_provider
        self.weather_provider = weather_provider
        self.calendar_provider = calendar_provider
        self.budget_store = budget_store

    def get_presets(self) -> list[dict]:
        return [
            {"text": item["query"], "category": "voyage"}
            for item in DESTINATIONS
        ]

    def get_ports(self) -> list[dict]:
        positions = {
            "nassau": {"x": 420, "y": 150},
            "tortuga": {"x": 620, "y": 280},
            "port_royal": {"x": 280, "y": 350},
            "havana": {"x": 180, "y": 180},
        }
        return [
            {
                "id": item["id"],
                "name": item["label"],
                "query": item["query"],
                "desc": item["description"],
                **positions[item["id"]],
            }
            for item in DESTINATIONS
        ]

    def _extract_budget_limit(self, query_text: str, fallback_limit: float | None) -> float | None:
        match = re.search(r"\$?\s*(\d{2,5})", query_text)
        if match:
            return float(match.group(1))
        return fallback_limit

    def _extract_destination(self, query_text: str) -> dict:
        lowered = query_text.lower()
        for destination in DESTINATIONS:
            if destination["id"].replace("_", " ") in lowered or destination["name"].lower() in lowered:
                return destination
        if "sunny" in lowered or "beach" in lowered:
            return DESTINATIONS[0]
        return DESTINATIONS[0]

    def _calendar_conflict(self, days_out: int = 14) -> dict | None:
        if not self.calendar_provider.configured:
            return None
        events = self.calendar_provider.get_events(days=30)
        target_day = date.today() + timedelta(days=days_out)
        for event in events:
            event_date = event["date"][:10]
            if event_date == target_day.isoformat():
                return {
                    "date": event_date,
                    "eventName": event["event"],
                    "type": "calendar",
                    "conflict": True,
                }
        return None

    def get_weather_snapshot(self) -> list[dict]:
        snapshots = []
        for destination in DESTINATIONS:
            if self.weather_provider.configured:
                weather = self.weather_provider.get_weather(destination["latitude"], destination["longitude"])
            else:
                weather = {
                    "forecast": "Unavailable",
                    "temp": "N/A",
                    "windSpeed": "N/A",
                    "humidity": "N/A",
                    "description": "OpenWeather is not configured yet.",
                }
            snapshots.append(
                {
                    "city": destination["label"],
                    "condition": weather["description"],
                    **weather,
                }
            )
        return snapshots

    def get_calendar_snapshot(self) -> list[dict]:
        if not self.calendar_provider.configured:
            return []
        return self.calendar_provider.get_events(days=30)

    def plan_trip(self, query_text: str, budget_limit: float | None = None) -> dict:
        destination = self._extract_destination(query_text)
        active_budget = self.budget_store.get_budget()
        max_budget = self._extract_budget_limit(query_text, budget_limit or active_budget["remaining"])

        if not self.travelpayouts_provider.configured:
            raise RuntimeError("Travelpayouts integration is not configured. Add the token in backend/.env.")
        if not self.weather_provider.configured:
            raise RuntimeError("OpenWeather integration is not configured. Add API credentials in backend/.env.")

        flight = self.travelpayouts_provider.search_flight("MIA", destination["airportCode"], max_budget)
        hotel = self.travelpayouts_provider.search_hotel(destination["name"])
        if not flight or not hotel:
            raise RuntimeError(f"No live travel inventory found for {destination['name']}.")

        weather = self.weather_provider.get_weather(destination["latitude"], destination["longitude"])
        total_cost = round(float(flight["price"]) + (float(hotel["pricePerNight"]) * 2), 2)
        remaining_budget = round(active_budget["remaining"] - total_cost, 2)
        calendar_conflict = self._calendar_conflict()

        status = "success"
        weather_alert = None
        if weather["forecast"].lower() in {"storm", "thunderstorm", "rain"}:
            status = "warning"
            weather_alert = {
                "severity": "High",
                "windSpeed": weather["windSpeed"],
                "description": weather["description"],
            }
        if remaining_budget < 0:
            status = "danger"
        elif calendar_conflict:
            status = "warning"

        verdict = self._build_verdict(
            destination_name=destination["name"],
            total_cost=total_cost,
            remaining_budget=remaining_budget,
            weather=weather,
            status=status,
            calendar_conflict=calendar_conflict,
        )

        sql = f"""SELECT
  flights.offer_price,
  hotels.nightly_rate,
  weather.forecast,
  calendar.event_name,
  budget.remaining
FROM travelpayouts.flights
JOIN travelpayouts.hotels ON hotels.city_name = flights.destination_code
JOIN openweather.current ON openweather.current.city = hotels.city_name
LEFT JOIN google_calendar.events ON google_calendar.events.date = flights.departure_date
LEFT JOIN budget.allowance ON budget.allowance.category = 'travel'
WHERE flights.destination_code = '{destination["airportCode"]}'
ORDER BY flights.offer_price ASC;"""

        result = {
            "sql": sql,
            "results": [
                {
                    "destination": destination["name"],
                    "flight": flight,
                    "hotel": hotel,
                    "weather": weather,
                    "duration": "2 Nights",
                    "totalCost": total_cost,
                    "remainingBudget": remaining_budget,
                }
            ],
            "verdict": verdict,
            "status": status,
            "weatherAlert": weather_alert,
            "calendarConflict": calendar_conflict,
            "destination": destination["name"],
            "timestamp": datetime.now().strftime("%H:%M:%S"),
            "budget": active_budget,
            "providerTrace": {
                "flights": "travelpayouts",
                "hotels": "travelpayouts",
                "weather": "openweather",
                "calendar": "google-calendar" if self.calendar_provider.configured else "not-configured",
            },
        }
        return result

    def _build_verdict(
        self,
        destination_name: str,
        total_cost: float,
        remaining_budget: float,
        weather: dict,
        status: str,
        calendar_conflict: dict | None,
    ) -> str:
        if status == "danger":
            return (
                f"{destination_name} is available, but the live trip total is ${total_cost:.2f} and it would "
                f"push your remaining travel budget to ${remaining_budget:.2f}."
            )
        if calendar_conflict:
            return (
                f"{destination_name} fits the route and the live total is ${total_cost:.2f}, but your calendar "
                f"already has {calendar_conflict['eventName']} on {calendar_conflict['date']}."
            )
        if status == "warning":
            return (
                f"{destination_name} is bookable at ${total_cost:.2f}, but the current weather report shows "
                f"{weather['description']} with winds around {weather['windSpeed']}."
            )
        return (
            f"{destination_name} is currently the best live option I found. Flight and stay total ${total_cost:.2f}, "
            f"with {weather['forecast'].lower()} weather and about ${remaining_budget:.2f} left in budget."
        )
