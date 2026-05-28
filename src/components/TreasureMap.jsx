import React from 'react';
import { Anchor, Compass, Eye, Navigation } from 'lucide-react';

export default function TreasureMap({
  ports = [],
  onPortSelect,
  activeQueryInfo,
  isSearching = false
}) {
  const [selectedPort, setSelectedPort] = React.useState(null);
  const [hoveredPort, setHoveredPort] = React.useState(null);

  const handlePortClick = (port) => {
    setSelectedPort(port.id);
    onPortSelect(port.query);
  };

  const inspectedPort = ports.find((port) => port.id === selectedPort);
  const matchingResult = activeQueryInfo?.destination
    ? ports.find((port) => activeQueryInfo.destination.toLowerCase().includes(port.name.split(' ')[0].toLowerCase()))
    : null;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0B3C5D]/25 p-5 rounded-2xl border border-sandy-gold/10">
        <div>
          <h3 className="text-xl font-bold text-white font-sans">Interactive Treasure Map</h3>
          <p className="text-xs text-gray-400 font-sans mt-0.5">Live route shortcuts that trigger the real backend planner.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {ports.slice(0, 3).map((port) => (
            <span key={port.id} className="text-[11px] font-mono px-3 py-1.5 bg-[#051329] border border-palm-green/30 text-palm-green rounded-full font-bold">
              {port.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 rounded-2xl glass-panel border-[#F4C95D]/20 overflow-hidden relative bg-[#051329]/80 min-h-[500px]">
          <div className="absolute top-4 left-4 font-mono text-[10px] text-ocean-blue bg-[#051329]/85 px-3 py-1.5 rounded border border-ocean-blue/20">
            Live API route grid
          </div>

          <div className="absolute top-4 right-4 animate-spin [animation-duration:60s] pointer-events-none opacity-20">
            <Compass className="w-24 h-24 text-sandy-gold" />
          </div>

          <svg viewBox="0 0 800 500" className="w-full h-full select-none cursor-grab active:cursor-grabbing">
            <path d="M 50,450 Q 150,440 250,450 T 450,450 T 650,450 T 750,450" fill="none" stroke="rgba(76, 201, 240, 0.08)" strokeWidth="3" />
            <path d="M 100,250 Q 200,240 300,250 T 500,250 T 700,250" fill="none" stroke="rgba(76, 201, 240, 0.05)" strokeWidth="2" />

            {ports.map((port) => {
              const isSelected = selectedPort === port.id || matchingResult?.id === port.id;
              const isHovered = hoveredPort === port.id;

              return (
                <g
                  key={port.id}
                  transform={`translate(${port.x}, ${port.y})`}
                  onClick={() => handlePortClick(port)}
                  onMouseEnter={() => setHoveredPort(port.id)}
                  onMouseLeave={() => setHoveredPort(null)}
                  className="cursor-pointer group"
                >
                  <circle
                    r={isSelected ? 24 : isHovered ? 18 : 12}
                    fill="none"
                    stroke={isSelected ? '#FF8C42' : '#F4C95D'}
                    strokeWidth="1.5"
                    className={`opacity-60 ${isSelected ? 'animate-ping' : ''}`}
                  />
                  <circle r="7" fill={isSelected ? '#FF8C42' : '#F4C95D'} stroke="#051329" strokeWidth="2" />
                  <text
                    y="-18"
                    textAnchor="middle"
                    fill={isSelected || isHovered ? '#FFFFFF' : '#EAE1D5'}
                    className="text-[11px] font-mono font-bold tracking-wider filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    {port.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-gray-500">
            Routing overlay powered by live query API
          </div>
        </div>

        <div className="rounded-2xl parchment-paper p-6 flex flex-col justify-between min-h-[400px] lg:min-h-none">
          <div>
            <div className="flex items-center gap-2 border-b border-[#5C4033]/20 pb-3 mb-4">
              <Anchor className="w-5 h-5 text-[#8B5E3C] shrink-0" />
              <h4 className="font-extrabold tracking-wider text-[#5C4033] font-sans text-base">Port Inspector Ledger</h4>
            </div>

            {inspectedPort ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono bg-[#8B5E3C]/10 text-[#8B5E3C] px-2 py-0.5 rounded border border-[#8B5E3C]/20 font-bold">ACTIVE SECTOR</span>
                  <h5 className="text-xl font-extrabold text-[#5C4033] font-sans mt-1">{inspectedPort.name}</h5>
                </div>

                <p className="text-sm text-[#5C4033]/90 italic leading-relaxed font-sans border-l-2 border-[#8B5E3C]/30 pl-3">
                  "{inspectedPort.desc}"
                </p>

                {activeQueryInfo?.results?.[0] ? (
                  <div className="space-y-2 border-t border-b border-[#5C4033]/10 py-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#8B5E3C]">Flight Fare:</span>
                      <span className="font-bold text-[#5C4033]">${activeQueryInfo.results[0].flight.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B5E3C]">Lodging Rate:</span>
                      <span className="font-bold text-[#5C4033]">${activeQueryInfo.results[0].hotel.pricePerNight}/night</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B5E3C]">Sailing Forecast:</span>
                      <span className="font-bold text-[#5C4033]">{activeQueryInfo.results[0].weather.forecast} ({activeQueryInfo.results[0].weather.temp})</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#5C4033]/70">Choose a port to fetch live trip data from the backend.</p>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#8B5E3C]/60 py-16">
                <Navigation className="w-10 h-10 stroke-1 text-[#8B5E3C] mb-2 animate-bounce" />
                <span className="text-sm font-sans">Click a port marker to trigger a real API search.</span>
              </div>
            )}
          </div>

          {inspectedPort && (
            <button
              onClick={() => onPortSelect(inspectedPort.query)}
              className="w-full mt-6 py-3 bg-[#8B5E3C] text-white hover:bg-[#5C4033] font-bold rounded-xl shadow transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>{isSearching ? 'Loading live route' : 'Load Full Voyage'}</span>
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
