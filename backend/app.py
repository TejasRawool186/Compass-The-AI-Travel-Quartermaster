from __future__ import annotations

from flask import Flask, jsonify, request
from flask_cors import CORS

from config import settings
from services.budget_store import BudgetStore
from services.providers.calendar import CalendarProvider
from services.providers.openweather import OpenWeatherProvider
from services.providers.travelpayouts import TravelPayoutsProvider
from services.travel_service import TravelService


app = Flask(__name__)
CORS(app)

budget_store = BudgetStore(settings.budget_store_path)
travel_service = TravelService(
    travelpayouts_provider=TravelPayoutsProvider(
        settings.travelpayouts_token,
        settings.travelpayouts_api_base_url,
        settings.travelpayouts_hotel_lookup_base_url,
        settings.travelpayouts_hotel_data_base_url,
    ),
    weather_provider=OpenWeatherProvider(
        settings.openweather_api_key,
        settings.openweather_base_url,
    ),
    calendar_provider=CalendarProvider(
        settings.google_calendar_api_key,
        settings.google_calendar_id,
        settings.google_calendar_base_url,
    ),
    budget_store=budget_store,
)


@app.get("/api/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "providers": {
                "travelpayouts": travel_service.travelpayouts_provider.configured,
                "openweather": travel_service.weather_provider.configured,
                "googleCalendar": travel_service.calendar_provider.configured,
            },
        }
    )


@app.get("/api/presets")
def presets():
    return jsonify({"items": travel_service.get_presets()})


@app.get("/api/ports")
def ports():
    return jsonify({"items": travel_service.get_ports()})


@app.get("/api/weather")
def weather():
    return jsonify({"items": travel_service.get_weather_snapshot()})


@app.get("/api/calendar")
def calendar():
    return jsonify({"items": travel_service.get_calendar_snapshot()})


@app.get("/api/budget")
def budget():
    return jsonify(budget_store.get_budget())


@app.put("/api/budget")
def update_budget():
    payload = request.get_json(force=True, silent=True) or {}
    total_limit = payload.get("totalLimit")
    if total_limit is None:
        return jsonify({"error": "totalLimit is required"}), 400
    try:
        updated = budget_store.update_limit(float(total_limit))
    except ValueError:
        return jsonify({"error": "totalLimit must be numeric"}), 400
    return jsonify(updated)


@app.post("/api/query")
def query():
    payload = request.get_json(force=True, silent=True) or {}
    query_text = (payload.get("query") or "").strip()
    budget_limit = payload.get("budgetLimit")
    if not query_text:
        return jsonify({"error": "query is required"}), 400
    try:
        result = travel_service.plan_trip(
            query_text=query_text,
            budget_limit=float(budget_limit) if budget_limit is not None else None,
        )
        return jsonify(result)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/api/budget/reserve")
def reserve():
    payload = request.get_json(force=True, silent=True) or {}
    reservation = payload.get("reservation")
    if not reservation:
        return jsonify({"error": "reservation is required"}), 400
    return jsonify(budget_store.reserve_trip(reservation))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=settings.port, debug=True)
