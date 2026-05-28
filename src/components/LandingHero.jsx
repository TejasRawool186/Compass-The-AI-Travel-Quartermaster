import React from 'react';
import { Compass, MapPin, Search, Sparkles, Telescope, Waves } from 'lucide-react';

const destinationCards = [
  {
    title: 'The Pirates',
    accent: 'pirate-card-cyan',
    description: 'Find bright islands, soft tides, and quick itineraries for a weekend escape.',
    query: 'Find me a sunny beach getaway under $400 next weekend.'
  },
  {
    title: 'Jolly Roger',
    accent: 'pirate-card-red',
    description: 'Track lively ports, taverns, and storm warnings before you board the ship.',
    query: 'Plan a trip to Tortuga for a weekend of rum and sailing.'
  },
  {
    title: 'Pirate Bay',
    accent: 'pirate-card-gold',
    description: 'Browse luxury routes, warm weather, and scenic harbors with a treasure map feel.',
    query: 'Plan a luxury voyage to Port Royal.'
  }
];

export default function LandingHero({ onSearch, setActiveTab, presets = [], isSearching = false }) {
  const [queryInput, setQueryInput] = React.useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!queryInput.trim()) {
      return;
    }

    onSearch(queryInput);
  };

  const launchQuery = (text) => {
    setQueryInput(text);
    onSearch(text);
  };

  return (
    <div className="px-4 pb-12 pt-24 lg:px-8 lg:pt-2">
      <section className="pirate-hero-panel">
        <div className="pirate-hero-copy">
          <p className="pirate-kicker">Treasure routes and island stories</p>
          <h1 className="pirate-title">Pirate Treasure</h1>
          <p className="max-w-xl text-sm leading-7 text-[#4f5267] lg:text-base">
            Search flights, inns, budgets, and weather through one playful pirate interface.
            The whole landing screen is rebuilt to feel closer to the bright illustrated banners
            in your reference images.
          </p>

          <form onSubmit={handleSearchSubmit} className="pirate-search-shell">
            <div className="flex items-center gap-3 px-4 py-3">
              <Search className="h-5 w-5 text-[#a04924]" />
              <input
                type="text"
                value={queryInput}
                onChange={(event) => setQueryInput(event.target.value)}
                placeholder="Plan a sunny Nassau trip under $400"
                className="w-full bg-transparent text-sm text-[#4b275d] outline-none placeholder:text-[#8c8797]"
              />
            </div>

            <button type="submit" className="pirate-cta-button">
              <span>{isSearching ? 'Scanning...' : 'Learn More'}</span>
              <Compass className="h-4 w-4" />
            </button>
          </form>

          <div className="flex flex-wrap gap-3">
            {presets.map((item) => (
              <button
                key={item.text}
                onClick={() => launchQuery(item.text)}
                className="pirate-chip"
              >
                {item.category}
              </button>
            ))}
          </div>

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            <button onClick={() => setActiveTab('map')} className="pirate-stat-card">
              <MapPin className="h-5 w-5 text-[#4b275d]" />
              <strong>Gallery ports</strong>
              <span>Illustrated routes and island picks</span>
            </button>
            <button onClick={() => setActiveTab('recommendations')} className="pirate-stat-card">
              <Sparkles className="h-5 w-5 text-[#4b275d]" />
              <strong>Event picks</strong>
              <span>Trip recommendations with one click</span>
            </button>
            <button onClick={() => setActiveTab('weather')} className="pirate-stat-card">
              <Waves className="h-5 w-5 text-[#4b275d]" />
              <strong>Sea news</strong>
              <span>Weather and sailing conditions</span>
            </button>
          </div>
        </div>

        <div className="pirate-scene" aria-hidden="true">
          <div className="pirate-sun-glow"></div>
          <div className="pirate-cloud pirate-cloud-one"></div>
          <div className="pirate-cloud pirate-cloud-two"></div>
          <div className="pirate-cloud pirate-cloud-three"></div>
          <div className="pirate-palm pirate-palm-left">
            <span className="trunk"></span>
            <span className="leaf leaf-a"></span>
            <span className="leaf leaf-b"></span>
            <span className="leaf leaf-c"></span>
          </div>
          <div className="pirate-palm pirate-palm-right">
            <span className="trunk"></span>
            <span className="leaf leaf-a"></span>
            <span className="leaf leaf-b"></span>
            <span className="leaf leaf-c"></span>
          </div>
          <div className="pirate-rock pirate-rock-back"></div>
          <div className="pirate-rock pirate-rock-front"></div>
          <div className="pirate-water"></div>
          <div className="pirate-shore"></div>
          <div className="pirate-boat">
            <div className="pirate-boat-hull"></div>
            <div className="pirate-mast"></div>
            <div className="pirate-sail pirate-sail-main"></div>
            <div className="pirate-sail pirate-sail-top"></div>
            <div className="pirate-flag"></div>
          </div>
          <div className="pirate-chest">
            <div className="lid"></div>
            <div className="box"></div>
            <div className="coins"></div>
          </div>
          <div className="pirate-bottle"></div>
          <div className="pirate-telescope">
            <Telescope className="h-6 w-6" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl space-y-6">
        {destinationCards.map((card) => (
          <button
            key={card.title}
            onClick={() => launchQuery(card.query)}
            className={`pirate-banner-card ${card.accent}`}
          >
            <div className="pirate-banner-copy">
              <span className="pirate-banner-title">{card.title}</span>
              <p>{card.description}</p>
            </div>
            <div className="pirate-banner-art">
              <div className="pirate-banner-ship"></div>
              <div className="pirate-banner-skull"></div>
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}
