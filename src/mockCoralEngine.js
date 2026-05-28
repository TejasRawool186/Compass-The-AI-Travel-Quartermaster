// Mock Coral Cross-Source SQL Engine
// Simulates joining Flights, Hotels, Weather, Calendar, and Budget sources.

const FLIGHTS_SEARCH = [
  { id: 'FL-01', origin: 'Miami', destination: 'Nassau', date: '2026-06-05', price: 150, airline: 'Royal Caribbean Air', duration: '1h 15m' },
  { id: 'FL-02', origin: 'Miami', destination: 'Tortuga', date: '2026-06-05', price: 280, airline: 'Blackbeard Airways', duration: '2h 10m' },
  { id: 'FL-03', origin: 'Miami', destination: 'Port Royal', date: '2026-06-12', price: 180, airline: 'Buccaneer Charter', duration: '1h 45m' },
  { id: 'FL-04', origin: 'Miami', destination: 'Nassau', date: '2026-06-19', price: 120, airline: 'Royal Caribbean Air', duration: '1h 15m' },
  { id: 'FL-05', origin: 'Miami', destination: 'Havana', date: '2026-06-25', price: 210, airline: 'Cigar City Flyers', duration: '1h 30m' }
];

const HOTELS_SEARCH = [
  { id: 'HT-01', city: 'Nassau', name: 'Blackbeard\'s Cove Resort', pricePerNight: 120, rating: 4.8, amenities: 'All-inclusive Rum, Private beach' },
  { id: 'HT-02', city: 'Tortuga', name: 'The Rusty Anchor Inn', pricePerNight: 80, rating: 4.2, amenities: 'Tavern access, Sea views' },
  { id: 'HT-03', city: 'Port Royal', name: 'Governor\'s Mansion Suites', pricePerNight: 250, rating: 4.9, amenities: 'Royal guard, Ocean-view terrace' },
  { id: 'HT-04', city: 'Havana', name: 'La Bodeguita Hotel', pricePerNight: 110, rating: 4.5, amenities: 'Live salsa music, Courtyard pool' }
];

const WEATHER_FORECAST = [
  { city: 'Nassau', forecast: 'Clear', temp: '29°C', windSpeed: '12 knots', humidity: '65%', description: 'Perfect sailing breeze' },
  { city: 'Tortuga', forecast: 'Storm', temp: '26°C', windSpeed: '38 knots', humidity: '95%', description: 'Gale force winds, heavy rain' },
  { city: 'Port Royal', forecast: 'Clear', temp: '30°C', windSpeed: '8 knots', humidity: '70%', description: 'Calm waters, high sun' },
  { city: 'Havana', forecast: 'Cloudy', temp: '28°C', windSpeed: '15 knots', humidity: '80%', description: 'Passing tropical showers' }
];

const CALENDAR_EVENTS = [
  { date: '2026-06-06', eventName: 'Grand Fleet Inspection', type: 'military', conflict: true },
  { date: '2026-06-13', eventName: 'None', type: 'free', conflict: false },
  { date: '2026-06-20', eventName: 'Treasure Map Auction', type: 'trade', conflict: false }
];

const BUDGET_ALLOWANCE = {
  category: 'travel',
  totalLimit: 500,
  spent: 120,
  remaining: 380
};

export const sampleQueries = [
  {
    text: "Find me a sunny beach getaway under $400 next weekend.",
    category: "budget"
  },
  {
    text: "Plan a trip to Tortuga for a weekend of rum and sailing.",
    category: "weather"
  },
  {
    text: "Show me weekend flights and inns in Nassau without calendar conflicts.",
    category: "calendar"
  },
  {
    text: "Plan a luxury voyage to Port Royal.",
    category: "luxury"
  }
];

export function queryCoral(queryText) {
  const query = queryText.toLowerCase();

  // 1. Parsing & SQL Generation simulation
  let sql = '';
  let results = [];
  let verdict = '';
  let status = 'success'; // 'success' (clear sailing), 'warning' (calendar / storm), 'danger' (budget limit exceeded)
  let weatherAlert = null;
  let calendarConflict = null;
  let destination = '';

  if (query.includes('nassau') || query.includes('sunny') || query.includes('beach') || query.includes('400')) {
    destination = 'Nassau';
    const flight = FLIGHTS_SEARCH.find(f => f.destination === 'Nassau');
    const hotel = HOTELS_SEARCH.find(h => h.city === 'Nassau');
    const weather = WEATHER_FORECAST.find(w => w.city === 'Nassau');
    const totalCost = flight.price + (hotel.pricePerNight * 2); // 2 nights

    sql = `SELECT 
    f.destination_city, 
    f.price AS flight_price, 
    h.hotel_name, 
    h.price_per_night,
    w.forecast,
    b.remaining_budget
FROM flights.search f
JOIN hotels.search h ON h.city = f.destination_city
JOIN weather.forecast w ON w.city = f.destination_city
LEFT JOIN budget.allowance b ON b.category = 'travel'
WHERE w.forecast = 'Clear' 
  AND (f.price + (h.price_per_night * 2)) <= 400;`;

    results = [{
      destination: 'Nassau',
      flight: flight,
      hotel: hotel,
      weather: weather,
      duration: '2 Nights',
      totalCost: totalCost,
      remainingBudget: BUDGET_ALLOWANCE.remaining - totalCost
    }];

    if (query.includes('conflict') || query.includes('calendar')) {
      calendarConflict = CALENDAR_EVENTS.find(c => c.date === '2026-06-06');
      status = 'warning';
      verdict = `🏴‍☠️ Clear skies ahead in Nassau, Captain! But beware—yer ledger shows a conflict on June 6th: "${calendarConflict.eventName}". Clear yer deck before ye set sail!`;
    } else {
      status = 'success';
      verdict = `🏴‍☠️ Clear sailing, Captain! Nassau fits yer gold stash beautifully. Flight & Inn total is $${totalCost} doubloons (under yer limit), and the weather is a perfect 29°C with a gentle ${weather.windSpeed} sailing breeze!`;
    }

  } else if (query.includes('tortuga') || query.includes('storm') || query.includes('rum')) {
    destination = 'Tortuga';
    const flight = FLIGHTS_SEARCH.find(f => f.destination === 'Tortuga');
    const hotel = HOTELS_SEARCH.find(h => h.city === 'Tortuga');
    const weather = WEATHER_FORECAST.find(w => w.city === 'Tortuga');
    const totalCost = flight.price + (hotel.pricePerNight * 2);

    sql = `SELECT 
    f.destination_city, 
    h.hotel_name, 
    w.forecast,
    w.wind_speed
FROM flights.search f
JOIN hotels.search h ON h.city = f.destination_city
JOIN weather.forecast w ON w.city = f.destination_city
WHERE f.destination_city = 'Tortuga';`;

    results = [{
      destination: 'Tortuga',
      flight: flight,
      hotel: hotel,
      weather: weather,
      duration: '2 Nights',
      totalCost: totalCost,
      remainingBudget: BUDGET_ALLOWANCE.remaining - totalCost
    }];

    weatherAlert = {
      severity: 'High',
      windSpeed: weather.windSpeed,
      description: 'Gale force winds & extreme squalls. Dangerous sailing conditions!'
    };
    status = 'warning';
    verdict = `🏴‍☠️ Storm ahead, Captain! Tortuga has a fine tavern, but the skies are black as pitch! Wind is howling at ${weather.windSpeed} with torrential rains. Batten down the hatches or pick another port!`;

  } else if (query.includes('port royal') || query.includes('luxury')) {
    destination = 'Port Royal';
    const flight = FLIGHTS_SEARCH.find(f => f.destination === 'Port Royal');
    const hotel = HOTELS_SEARCH.find(h => h.city === 'Port Royal');
    const weather = WEATHER_FORECAST.find(w => w.city === 'Port Royal');
    const totalCost = flight.price + (hotel.pricePerNight * 2); // $180 + $500 = $680

    sql = `SELECT 
    f.destination_city, 
    h.hotel_name, 
    b.remaining_budget
FROM flights.search f
JOIN hotels.search h ON h.city = f.destination_city
LEFT JOIN budget.allowance b ON b.category = 'travel'
WHERE f.destination_city = 'Port Royal';`;

    results = [{
      destination: 'Port Royal',
      flight: flight,
      hotel: hotel,
      weather: weather,
      duration: '2 Nights',
      totalCost: totalCost,
      remainingBudget: BUDGET_ALLOWANCE.remaining - totalCost // negative
    }];

    status = 'danger';
    verdict = `🏴‍☠️ Bleeding chests, Captain! Port Royal is fit for a governor, but it'll cost ye $${totalCost} doubloons! Yer remaining travel budget is only $${BUDGET_ALLOWANCE.remaining} doubloons. Ye'll be throwing yerself to the sharks if ye spend that much!`;

  } else if (query.includes('havana')) {
    destination = 'Havana';
    const flight = FLIGHTS_SEARCH.find(f => f.destination === 'Havana');
    const hotel = HOTELS_SEARCH.find(h => h.city === 'Havana');
    const weather = WEATHER_FORECAST.find(w => w.city === 'Havana');
    const totalCost = flight.price + (hotel.pricePerNight * 2);

    sql = `SELECT * FROM flights.search f
JOIN hotels.search h ON h.city = f.destination_city
JOIN weather.forecast w ON w.city = f.destination_city
WHERE f.destination_city = 'Havana';`;

    results = [{
      destination: 'Havana',
      flight: flight,
      hotel: hotel,
      weather: weather,
      duration: '2 Nights',
      totalCost: totalCost,
      remainingBudget: BUDGET_ALLOWANCE.remaining - totalCost
    }];

    status = 'success';
    verdict = `🏴‍☠️ Clear skies in Havana, Captain! A fine choice. It will set ye back $${totalCost} doubloons, leaving ye with $${BUDGET_ALLOWANCE.remaining - totalCost} in yer chest. The weather is cloudy but pleasant with passing tropical showers.`;
  } else {
    // Default fallback - Nassau
    destination = 'Nassau';
    const flight = FLIGHTS_SEARCH[0];
    const hotel = HOTELS_SEARCH[0];
    const weather = WEATHER_FORECAST[0];
    const totalCost = flight.price + (hotel.pricePerNight * 2);

    sql = `SELECT * FROM flights.search f
JOIN hotels.search h ON h.city = f.destination_city
JOIN weather.forecast w ON w.city = f.destination_city
WHERE w.forecast = 'Clear';`;

    results = [{
      destination: 'Nassau',
      flight: flight,
      hotel: hotel,
      weather: weather,
      duration: '2 Nights',
      totalCost: totalCost,
      remainingBudget: BUDGET_ALLOWANCE.remaining - totalCost
    }];

    status = 'success';
    verdict = `🏴‍☠️ Ahoy, Captain! I've scanned the horizons and found Nassau to be the best voyage. Safe winds, clear skies, and $${totalCost} doubloons total cost. Ready to set sail?`;
  }

  return {
    sql,
    results,
    verdict,
    status,
    weatherAlert,
    calendarConflict,
    destination,
    timestamp: new Date().toLocaleTimeString()
  };
}
