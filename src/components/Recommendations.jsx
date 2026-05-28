import React from 'react';
import { ShieldAlert, Compass, CheckCircle2, CloudLightning, ShieldX, Calendar, Coins, ArrowRight, Plane, Hotel, Navigation } from 'lucide-react';

export default function Recommendations({ queryResult }) {
  if (!queryResult) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center max-w-sm mx-auto">
        <Compass className="w-16 h-16 text-sandy-gold/30 animate-compass-spin mb-4" />
        <h4 className="text-lg font-bold text-sandy-gold font-sans">No Sailing Coordinates Set</h4>
        <p className="text-sm text-gray-400 mt-2 font-sans">
          Search for a voyage in the search bar above or whisper to the AI Quartermaster to chart yer recommendation ledger!
        </p>
      </div>
    );
  }

  const { results, verdict, status, weatherAlert, calendarConflict, destination } = queryResult;
  const item = results[0];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      
      {/* 1. Large Verdict Box */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-sandy-gold/10 to-transparent pointer-events-none"></div>
        
        {status === 'success' && (
          <div className="p-6 rounded-2xl glass-panel border-palm-green/40 bg-[#0B3C5D]/30 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-palm-green/20 border border-palm-green/30 text-palm-green rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-palm-green tracking-widest font-bold">AI VERDICT: CLEAR SAILING</span>
              <h4 className="text-lg font-bold text-white mt-1 font-sans">Safe Passage Confirmed</h4>
              <p className="text-sm text-gray-300 mt-1.5 leading-relaxed font-sans">{verdict}</p>
            </div>
          </div>
        )}

        {status === 'warning' && (
          <div className="p-6 rounded-2xl glass-panel border-[#FF8C42]/40 bg-[#0B3C5D]/30 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-coral-orange/20 border border-coral-orange/30 text-[#FF8C42] rounded-xl flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#FF8C42] tracking-widest font-bold">AI VERDICT: STORM WARNING</span>
              <h4 className="text-lg font-bold text-white mt-1 font-sans">Nautical Hazards Ahead</h4>
              <p className="text-sm text-gray-300 mt-1.5 leading-relaxed font-sans">{verdict}</p>
            </div>
          </div>
        )}

        {status === 'danger' && (
          <div className="p-6 rounded-2xl glass-panel border-sunset-red/40 bg-[#0B3C5D]/30 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-sunset-red/20 border border-sunset-red/30 text-[#E63946] rounded-xl flex items-center justify-center shrink-0">
              <ShieldX className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#E63946] tracking-widest font-bold">AI VERDICT: GOLD DEFICIT</span>
              <h4 className="text-lg font-bold text-white mt-1 font-sans">Chest Overdrawn Warning</h4>
              <p className="text-sm text-gray-300 mt-1.5 leading-relaxed font-sans">{verdict}</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Recommendation Flight & Hotel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Flight segment */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-[#F4C95D]/10 bg-[#0B3C5D]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Plane className="w-5 h-5 text-sandy-gold" />
              <h4 className="font-bold text-white font-sans text-sm tracking-wide">Charter Vessel (Flight)</h4>
            </div>
            <span className="text-xs px-2.5 py-1 bg-sandy-gold/15 text-sandy-gold border border-sandy-gold/25 rounded-full font-mono font-bold">
              ${item.flight.price} doubloons
            </span>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-400">CARRIER FLEET</span>
                <p className="text-base font-bold text-white font-sans mt-0.5">{item.flight.airline}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-400">SAILING WIND</span>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">{item.flight.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3 border-t border-b border-white/5 justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-500">DEPART PORT</span>
                <p className="text-sm font-bold text-white font-mono">{item.flight.origin}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-sandy-gold animate-pulse shrink-0" />
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-500">BOUND COVE</span>
                <p className="text-sm font-bold text-white font-mono">{item.flight.destination}</p>
              </div>
            </div>

            <div className="text-xs text-gray-400 leading-relaxed font-sans">
              Includes complimentary barrel of rum, cabin bag, and full ocean passage guarantees.
            </div>
          </div>
        </div>

        {/* Lodging segment */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-[#F4C95D]/10 bg-[#0B3C5D]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Hotel className="w-5 h-5 text-sandy-gold" />
              <h4 className="font-bold text-white font-sans text-sm tracking-wide">Island Inn (Hotel)</h4>
            </div>
            <span className="text-xs px-2.5 py-1 bg-sandy-gold/15 text-sandy-gold border border-sandy-gold/25 rounded-full font-mono font-bold">
              ${item.hotel.pricePerNight} doubloons/N
            </span>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-400">INN TAVERN</span>
                <p className="text-base font-bold text-white font-sans mt-0.5">{item.hotel.name}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-400">STELLARS</span>
                <p className="text-xs font-mono text-sandy-gold mt-0.5">⭐ {item.hotel.rating}</p>
              </div>
            </div>

            <div className="py-3 border-t border-b border-white/5">
              <span className="text-[10px] font-mono text-gray-500 block mb-1">CABIN AMENITIES</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {item.hotel.amenities.split(', ').map((a) => (
                  <span key={a} className="text-[10px] px-2 py-1 bg-[#051329] border border-ocean-blue/20 text-[#EAE1D5] rounded font-sans">⚔️ {a}</span>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-400 leading-relaxed font-sans">
              Innkeeper certified clean of buccaneer brawls. Full beach access and close to local trade tables.
            </div>
          </div>
        </div>

      </div>

      {/* 3. Alerts section */}
      {(weatherAlert || calendarConflict) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Weather Alert Panel */}
          {weatherAlert && (
            <div className="rounded-2xl glass-panel border-[#FF8C42]/20 p-5 bg-[#E63946]/5 flex gap-4">
              <CloudLightning className="w-10 h-10 text-[#FF8C42] shrink-0" />
              <div>
                <h5 className="font-bold text-[#FF8C42] font-sans">Severe Weather Alert</h5>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed font-sans">{weatherAlert.description}</p>
                <span className="text-[10px] font-mono text-[#FF8C42]/60 mt-2 block font-bold">WIND VELOCITY: {weatherAlert.windSpeed}</span>
              </div>
            </div>
          )}

          {/* Calendar Conflict Panel */}
          {calendarConflict && (
            <div className="rounded-2xl glass-panel border-sunset-red/20 p-5 bg-[#E63946]/5 flex gap-4">
              <Calendar className="w-10 h-10 text-[#E63946] shrink-0 animate-pulse" />
              <div>
                <h5 className="font-bold text-[#E63946] font-sans">Google Calendar Conflict</h5>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed font-sans">
                  Captain, ye scheduled the event "{calendarConflict.eventName}" on June 6th which overlaps this voyage!
                </p>
                <span className="text-[10px] font-mono text-[#E63946]/60 mt-2 block font-bold">LEDGER OVERLAP BLOCKED</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 4. Voyage summary stats bar */}
      <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-5 bg-[#0B3C5D]/30 flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-6">
          <div>
            <span className="text-[10px] font-mono text-gray-400">TOTAL GOLD PASSAGE</span>
            <p className="text-xl font-bold text-sandy-gold font-mono mt-0.5">${item.totalCost} doubloons</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400">VOYAGE TIMELINE</span>
            <p className="text-sm font-bold text-white font-sans mt-0.5">{item.duration}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400">REMAINING GOLD</span>
            <p className="text-sm font-bold text-white font-mono mt-0.5">${item.remainingBudget} doubloons</p>
          </div>
        </div>

        <button 
          onClick={() => alert(`🏴‍☠️ Voyage booked, Captain! Setting sail to ${item.destination}!`)}
          className="px-6 py-3 bg-gradient-to-r from-sandy-gold to-[#FF8C42] text-[#5C4033] hover:brightness-110 font-bold rounded-xl shadow transition-all duration-300 transform active:scale-95 flex items-center gap-2"
        >
          <span>Claim Passage</span>
          <Navigation className="w-4 h-4 rotate-45" />
        </button>
      </div>

    </div>
  );
}
