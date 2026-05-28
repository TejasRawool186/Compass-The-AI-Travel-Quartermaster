# Compass

Compass is a pirate-themed travel planner with:

- `React + Vite` frontend in `src/`
- `Flask` backend in `backend/`
- live integration hooks for `Travelpayouts`, `OpenWeather`, and `Google Calendar`

## Frontend setup

1. Copy `.env.example` to `.env`
2. Set `VITE_API_BASE_URL`, usually `http://localhost:5000`
3. Run:

```bash
npm install
npm run dev
```

## Backend setup

1. Copy `backend/.env.example` to `backend/.env`
2. Fill in:
   `TRAVELPAYOUTS_TOKEN`
   `OPENWEATHER_API_KEY`
   `GOOGLE_CALENDAR_API_KEY`
   `GOOGLE_CALENDAR_ID`
3. Create and activate a Python virtual environment
4. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

5. Start the API:

```bash
python backend/app.py
```

## API routes

- `GET /api/health`
- `GET /api/presets`
- `GET /api/ports`
- `GET /api/weather`
- `GET /api/calendar`
- `GET /api/budget`
- `PUT /api/budget`
- `POST /api/query`
- `POST /api/budget/reserve`

## Notes

- The old frontend mock engine has been removed.
- Weather and calendar screens now read from the backend instead of hardcoded arrays.
- Trip planning depends on valid third-party API credentials, so live search results will fail until those keys are configured.
- The current Travelpayouts integration uses token-based data endpoints and cached hotel metadata rather than the separate approved real-time search API.
