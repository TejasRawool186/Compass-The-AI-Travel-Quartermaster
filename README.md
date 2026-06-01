# Compass: The AI Travel Quartermaster

Compass is an agentic, pirate-themed AI travel-planning dashboard built specifically for the Coral Personal Agent Track hackathon. By utilizing Coral's cross-source SQL engine, Compass translates conversational, natural-language travel inquiries into unified SQL queries. These queries dynamically join real-time flight rates, hotel inventories, weather forecasts, Google Calendar events, and local travel budgets, giving users a cohesive travel intelligence interface in sub-seconds.

This repository contains:
*   A responsive, cinematic, pirate-themed React frontend built with Vite, Tailwind CSS v4, and Framer Motion.
*   A robust Python Flask backend interfacing with live external APIs, exposing a local Model Context Protocol (MCP) server, and routing database abstractions.

---

## Technical Architecture and Data Flow

Compass unifies distributed, multi-source operations through a clean, multi-layered agentic layout:

```text
[ User Interface (React / Tailwind) ]
                |
                v (Natural Language Query / Dashboard Events)
[ Agent Intelligence / LLM Broker ]
                |
                v (Converts query to SQL / Generates custom tool calls)
[ Coral Federated SQL Engine ] <======> [ Model Context Protocol (MCP) Tools ]
                |
        +-------+-------+---------------+---------------+
        |               |               |               |
        v               v               v               v
[ Flights API ]  [ Hotels API ]  [ Weather API ]  [ Google Calendar API ]
 (Travelpayouts)  (Travelpayouts)  (OpenWeather)     (Google API Core)
```

1.  **User Inquiry**: A user submits a query such as: "Plan a sunny Nassau trip under $400."
2.  **SQL Synthesis**: The AI agent translates the conversational parameters (sunny weather, budget threshold of $400, destination location) into a single, federated SQL statement.
3.  **Coral Execution**: The Coral engine executes the query by querying virtual tables backed by live schemas.
4.  **API Resolution & Caching**: Custom connectors fetch flight availability, hotel details, weather forecasts, and calendar schedules, applying cached metadata for optimized response times.
5.  **Conflict & Budget Analysis**: The backend performs a multi-dimensional validation of budget limits and calendar overlaps, returning a final verdict and recommended actions.

---

## The Problem: Fragmented Travel Intelligence

Planning a trip typically requires interacting with five or more separate applications:
1.  **Flights**: Browsing regional portals to match dates and prices.
2.  **Inns and Lodgings**: Scraping comparison sites for hotel availability, star ratings, and guest reviews.
3.  **Weather**: Consulting meteorology sites to avoid rain or seasonal storms.
4.  **Schedules**: Cross-referencing Google Calendar or personal agendas to detect scheduling conflicts.
5.  **Budgets**: Keeping track of expenses via spreadsheets or local notes to ensure the total trip cost remains within bounds.

This manual process creates a high cognitive load, increases context-switching, and leads to booking errors due to outdated rates or overlooked calendar events.

---

## The Solution: A Unified SQL Engine for Travel

Compass resolves this fragmentation by exposing a standard, unified SQL interface over independent third-party APIs. Users query their entire travel context simultaneously through a single, cohesive dashboard:

*   **Conversational Agent**: An AI agent that processes natural language requests, builds appropriate SQL statements, and provides highly-customized travel briefings.
*   **Conflict Detection**: Real-time integration with Google Calendar to warn users of scheduled events on potential travel dates.
*   **Smart Budgets**: A dedicated budget store that tracks total limits, spent amounts, and pending holds, with the ability to reserve trips instantly.
*   **Cinematic Interactive Map**: A dynamic, stylized virtual map allowing travelers to select destinations and visually track their routes.

---

## Deep Dive: Coral Technologies Used

### 1. Cross-Source Federated SQL Joins
The core power of Compass lies in Coral's ability to join entirely separate, live, and distributed data sources within a single SQL statement. Rather than writing complex glue code with multiple asynchronous HTTP fetch statements, filters, and manual joins in memory, developers can write high-performance SQL queries.

For example, Compass joins:
*   `travelpayouts.flights` (flight offers and rates)
*   `travelpayouts.hotels` (hotel properties and nightly pricing)
*   `openweather.current` (live climate forecasts)
*   `google_calendar.events` (user schedule entries)
*   `budget.allowance` (local monetary restrictions)

### 2. Custom Source Connectors
Compass maps REST API calls directly to relational database schemas by implementing custom Coral source specifications. These schemas define the tables, column types, and input parameters, transforming third-party endpoints into queryable relations:
*   **Flights & Hotels**: Configured to parse token-based Travelpayouts cheap flight price endpoints and cached hotel metadata engines.
*   **Weather**: Dynamically binds latitude and longitude attributes to map destination climate tables in Celsius, wind speed, and humidity metric formats.
*   **Calendar**: Connects to the primary Google Calendar API feed, converting event payloads into standardized rows with start times and event names.

### 3. Model Context Protocol (MCP) Integration
Compass exposes its Coral-backed query logic as standard Model Context Protocol (MCP) tools. This protocol enables an LLM agent to inspect the schema of the travel sources and execute operations natively:
*   `plan_trip`: Initiates a unified cross-source check for flights, accommodations, and itinerary metrics.
*   `check_weather`: Resolves weather snapshots for specific geographic coordinates.
*   `compare_destinations`: Aggregates pricing and score comparisons across all travel ports.
*   `verify_budget`: Checks user balance sheets prior to committing financial holds.

### 4. Schema Learning and Auto-Discovery
Coral automatically discovers external schemas at boot time, inspecting field definitions and structural relationships. This ensures that changes in the underlying API return formats are instantly reflected in the relational schema without requiring manual database migration scripts.

### 5. Smart Query Caching
To maintain compliance with external rate limits and optimize response times, the Coral layer caches API calls. Repeated searches for a particular route or hotel lookups utilize cached metadata, delivering sub-second response times (under 2 seconds) while avoiding API token blockages.

### 6. Local-First Execution
All coordinate routing, schema mapping, and query logic run 100% locally. By avoiding external proprietary database engines, user data remains private, local performance is maximized, and connection dependencies are minimized.

---

## Hero Federated SQL Query

The following SQL statement illustrates how Compass joins multiple external data schemas to retrieve a comprehensive travel recommendation:

```sql
SELECT
  flights.offer_price,
  hotels.nightly_rate,
  weather.forecast,
  calendar.event_name,
  budget.remaining
FROM travelpayouts.flights
JOIN travelpayouts.hotels 
  ON hotels.city_name = flights.destination_code
JOIN openweather.current 
  ON openweather.current.city = hotels.city_name
LEFT JOIN google_calendar.events 
  ON google_calendar.events.date = flights.departure_date
LEFT JOIN budget.allowance 
  ON budget.allowance.category = 'travel'
WHERE flights.destination_code = 'NAS'
ORDER BY flights.offer_price ASC;
```

---

## Core Technical Stack

### Frontend
*   **React 19**: Modern component lifecycle architecture for high performance.
*   **Vite**: Extremely fast frontend tooling and dev server compilation.
*   **Tailwind CSS v4**: PostCSS integration for highly flexible utility-first styling.
*   **Framer Motion**: Smooth micro-animations and page transitions to enhance user interaction.
*   **Lucide React**: Premium icon set for consistent visual styling.

### Backend
*   **Flask 3.1.1**: Lightweight, robust Python web server routing backend requests.
*   **Flask-Cors**: Manages Cross-Origin Resource Sharing protocols between the React client and the backend server.
*   **python-dotenv**: Handles localized application settings and configuration.
*   **Requests**: Manages external REST API network processes.

### Integrated APIs
*   **Travelpayouts API**: Retrieves live, cheap flight options and hotel metadata profiles.
*   **OpenWeather API**: Fetches real-time temperature, wind speed, and climate descriptions.
*   **Google Calendar API**: Queries active calendars to check for event dates and schedule conflicts.

---

## Visual Demonstration

Below are visual captures of the cinematic pirate-themed dashboard interface:

### 1. Interactive Treasure Deck and Map
The main cockpit displays the active travel routes, local budget state controls, and weather systems on an interactive custom map interface.

![Interactive Treasure Map](src/assets/hero.png)

### 2. AI Chat and Coral SQL Audit Console
The AI Chat panel allows users to plan voyages in natural language. In real-time, the interface exposes the exact Coral SQL queries compiled by the system, ensuring complete developer auditing and transparency.

![AI Chat Interface](src/assets/parrot.png)

---

## Backend API Documentation

The Flask server hosts the following REST API endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Verifies server state and configurations for Travelpayouts, OpenWeather, and Google Calendar integrations. |
| `GET` | `/api/presets` | Supplies preset voyages for prompt shortcuts. |
| `GET` | `/api/ports` | Retrieves geographical coordinates and details for map markers. |
| `GET` | `/api/weather` | Returns a consolidated weather snapshot for all target ports. |
| `GET` | `/api/calendar` | Pulls the upcoming 30-day schedule ledger from the Google Calendar API. |
| `GET` | `/api/budget` | Returns the current budget allowance status, spent balance, and reservations list. |
| `PUT` | `/api/budget` | Updates the maximum allowed budget limit. |
| `POST` | `/api/query` | Triggers the agentic workflow to plan a trip, compile the Coral SQL query, and fetch live details. |
| `POST` | `/api/budget/reserve` | Places a permanent budget hold/reservation on a proposed trip. |

---

## Installation and Configuration

### Prerequisites
*   Node.js (v18.0.0 or higher)
*   Python (v3.10 or higher)

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create and activate a Python virtual environment:
    *   **Windows**:
        ```bash
        python -m venv venv
        venv\Scripts\activate
        ```
    *   **macOS/Linux**:
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```

3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Configure the environment variables:
    Create a `.env` file based on `.env.example` and supply your API credentials:
    ```ini
    FLASK_ENV=development
    PORT=5000

    TRAVELPAYOUTS_TOKEN=your_travelpayouts_token_here
    OPENWEATHER_API_KEY=your_openweather_api_key_here
    GOOGLE_CALENDAR_API_KEY=your_google_calendar_api_key_here
    GOOGLE_CALENDAR_ID=primary
    ```

5.  Launch the Flask server:
    ```bash
    python app.py
    ```
    The server will start running at `http://localhost:5000`.

### 2. Frontend Setup

1.  Navigate back to the project root:
    ```bash
    cd ..
    ```

2.  Install the Node packages:
    ```bash
    npm install
    ```

3.  Configure the environment variables:
    Create a `.env` file in the root directory:
    ```ini
    VITE_API_BASE_URL=http://localhost:5000
    ```

4.  Start the Vite development server:
    ```bash
    npm run dev
    ```
    The web interface will be accessible at `http://localhost:5173`.

---

## Future Roadmap

*   **Offline Mode**: Enable fallback SQLite mock data schemas when running without internet access.
*   **Group Multi-Agent Co-op**: Support team travel planning where multiple user schedules are merged via Coral.
*   **Automated Booking**: Connect the reservation engine directly to active airline and hotel booking portals.
*   **Local LLM Integration**: Incorporate fully local models like Llama-3 or Mistral via Ollama to maintain a 100% private, offline stack.
