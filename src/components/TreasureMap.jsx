import React from 'react';
import { Anchor, Compass, Eye, ShieldAlert, Navigation, Coins, Sun, CloudRain } from 'lucide-react';
import { queryCoral } from '../mockCoralEngine';

export default function TreasureMap({ onPortSelect }) {
  const [selectedPort, setSelectedPort] = React.useState(null);
  const [hoveredPort, setHoveredPort] = React.useState(null);

  const ports = [
    { id: 'nassau', name: 'Nassau Port', x: 420, y: 150, query: 'Plan a sunny Nassau trip under $400', desc: 'Sunny haven, high flight savings.' },
    { id: 'tortuga', name: 'Tortuga Cove', x: 620, y: 280, query: 'Plan a voyage to Tortuga for rum and sailing', desc: 'Hurricane squalls, gale warnings!' },
    { id: 'port_royal', name: 'Port Royal', x: 280, y: 350, query: 'Plan a luxury voyage to Port Royal', desc: 'Governor gold deficit, high luxury.' },
    { id: 'havana', name: 'Havana Port', x: 180, y: 180, query: 'Plan a trip to Havana', desc: 'Pleasant tropical showers.' }
  ];

  const handlePortClick = (port) => {
    setSelectedPort(port.id);
    const data = queryCoral(port.query);
    onPortSelect(data);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0B3C5D]/25 p-5 rounded-2xl border border-sandy-gold/10">
        <div>
          <h3 className="text-xl font-bold text-white font-sans">Interactive Treasure Map</h3>
          <p className="text-xs text-gray-400 font-sans mt-0.5">Explore active shipping routes & ports. Click an anchor to inspect Coral SQL schemas.</p>
        </div>
        
        <div className="flex gap-2">
          {['Nassau', 'Havana'].map((p) => (
            <span key={p} className="text-[11px] font-mono px-3 py-1.5 bg-[#051329] border border-palm-green/30 text-palm-green rounded-full font-bold">⚓ {p}: Safe Port</span>
          ))}
          <span className="text-[11px] font-mono px-3 py-1.5 bg-[#051329] border border-sunset-red/30 text-sunset-red rounded-full font-bold">⚓ Tortuga: Storm Gale</span>
        </div>
      </div>

      {/* Map Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Interactive Map Grid (Spans 3 Columns) */}
        <div className="lg:col-span-3 rounded-2xl glass-panel border-[#F4C95D]/20 overflow-hidden relative bg-[#051329]/80 min-h-[500px]">
          
          {/* Compass grid coordinate markers */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-ocean-blue bg-[#051329]/85 px-3 py-1.5 rounded border border-ocean-blue/20">
            RADAR RADIAL: 25° 04&apos; N, 77° 20&apos; W
          </div>

          <div className="absolute top-4 right-4 animate-spin [animation-duration:60s] pointer-events-none opacity-20">
            <Compass className="w-24 h-24 text-sandy-gold" />
          </div>

          {/* SVG Canvas Map */}
          <svg viewBox="0 0 800 500" className="w-full h-full select-none cursor-grab active:cursor-grabbing">
            
            {/* Ambient Ocean Waves Paths (Visual representation) */}
            <path d="M 50,450 Q 150,440 250,450 T 450,450 T 650,450 T 750,450" fill="none" stroke="rgba(76, 201, 240, 0.08)" strokeWidth="3" />
            <path d="M 100,250 Q 200,240 300,250 T 500,250 T 700,250" fill="none" stroke="rgba(76, 201, 240, 0.05)" strokeWidth="2" />
            
            {/* Interactive Dotted Flight Paths connecting ports */}
            <line x1="180" y1="180" x2="420" y2="150" stroke="rgba(244, 201, 93, 0.25)" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="420" y1="150" x2="620" y2="280" stroke="rgba(244, 201, 93, 0.25)" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="280" y1="350" x2="620" y2="280" stroke="rgba(244, 201, 93, 0.25)" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="180" y1="180" x2="280" y2="350" stroke="rgba(244, 201, 93, 0.25)" strokeWidth="2" strokeDasharray="6,6" />

            {/* Sea Monster Silhouette Illustration */}
            <g transform="translate(480, 320) scale(0.6)" opacity="0.15">
              <path d="M10,20 Q30,-10 50,20 T90,20 T130,20" fill="none" stroke="#4CC9F0" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="45" fill="#4CC9F0" className="text-[12px] font-mono">Kraken Sightings</text>
            </g>

            {/* Ship Indicator icon sailing to Nassau */}
            <g transform="translate(300, 150) rotate(-5)" className="animate-float-slow">
              <rect x="0" y="0" width="28" height="18" rx="4" fill="rgba(11, 60, 93, 0.8)" stroke="#F4C95D" strokeWidth="1" />
              <text x="6" y="13" fill="#F4C95D" className="text-[10px] font-mono font-bold">⛵</text>
            </g>

            {/* Port Anchor Markers */}
            {ports.map((port) => {
              const isSelected = selectedPort === port.id;
              const isHovered = hoveredPort === port.id;
              
              // Define marker colors based on destination warnings
              let markerColor = '#F4C95D'; // Gold
              if (port.id === 'tortuga') markerColor = '#FF8C42'; // Orange
              if (port.id === 'port_royal') markerColor = '#E63946'; // Red

              return (
                <g 
                  key={port.id}
                  transform={`translate(${port.x}, ${port.y})`}
                  onClick={() => handlePortClick(port)}
                  onMouseEnter={() => setHoveredPort(port.id)}
                  onMouseLeave={() => setHoveredPort(null)}
                  className="cursor-pointer group"
                >
                  {/* Radar Glow Ring */}
                  <circle r={isSelected ? 24 : isHovered ? 18 : 12} fill="none" stroke={markerColor} strokeWidth="1.5" className={`opacity-60 ${isSelected ? 'animate-ping' : ''}`} />
                  
                  {/* Solid anchor core */}
                  <circle r="7" fill={markerColor} stroke="#051329" strokeWidth="2" />
                  
                  {/* Text Label */}
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
          
          {/* Watermark Compass Graphic */}
          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-gray-500">
            MAP COMPILATION © 1716 CORAL HYDROGRAPHIC OFFICE
          </div>
        </div>

        {/* Right Column: Sidebar ledger details (Parchment Paper style) */}
        <div className="rounded-2xl parchment-paper p-6 flex flex-col justify-between min-h-[400px] lg:min-h-none">
          <div>
            <div className="flex items-center gap-2 border-b border-[#5C4033]/20 pb-3 mb-4">
              <Anchor className="w-5 h-5 text-[#8B5E3C] shrink-0" />
              <h4 className="font-extrabold tracking-wider text-[#5C4033] font-sans text-base">Port Inspector Ledger</h4>
            </div>

            {selectedPort ? (
              (() => {
                const port = ports.find(p => p.id === selectedPort);
                const data = queryCoral(port.query);
                const res = data.results[0];
                return (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono bg-[#8B5E3C]/10 text-[#8B5E3C] px-2 py-0.5 rounded border border-[#8B5E3C]/20 font-bold">ACTIVE SECTOR</span>
                      <h5 className="text-xl font-extrabold text-[#5C4033] font-sans mt-1">{res.destination}</h5>
                      <p className="text-xs text-[#8B5E3C] font-mono mt-0.5">LAT/LONG: 18.24° N, 76.79° W</p>
                    </div>

                    <p className="text-sm text-[#5C4033]/90 italic leading-relaxed font-sans border-l-2 border-[#8B5E3C]/30 pl-3">
                      "{port.desc}"
                    </p>

                    <div className="space-y-2 border-t border-b border-[#5C4033]/10 py-3 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8B5E3C]">Flight Fare:</span>
                        <span className="font-bold text-[#5C4033]">${res.flight.price} doubloons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B5E3C]">Lodging Rate:</span>
                        <span className="font-bold text-[#5C4033]">${res.hotel.pricePerNight}/night</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B5E3C]">Sailing Forecast:</span>
                        <span className="font-bold text-[#5C4033]">{res.weather.forecast} ({res.weather.temp})</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-[#8B5E3C] block mb-1">AI QUARTERMASTER VERDICT:</span>
                      <p className="text-xs text-[#5C4033] leading-relaxed font-sans font-medium">{data.verdict}</p>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#8B5E3C]/60 py-16">
                <Navigation className="w-10 h-10 stroke-1 text-[#8B5E3C] mb-2 animate-bounce" />
                <span className="text-sm font-sans">Sextant standing by. Click on any port coordinates on the sea chart to inspect the active voyage ledger.</span>
              </div>
            )}
          </div>

          {selectedPort && (
            <button
              onClick={() => {
                const portObj = ports.find(p => p.id === selectedPort);
                onPortSelect(queryCoral(portObj.query));
              }}
              className="w-full mt-6 py-3 bg-[#8B5E3C] text-white hover:bg-[#5C4033] font-bold rounded-xl shadow transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Load Full Voyage</span>
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
