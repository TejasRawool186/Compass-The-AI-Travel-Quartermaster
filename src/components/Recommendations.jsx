import React from 'react';
import { ArrowRight, Calendar, CheckCircle2, CloudLightning, Compass, Hotel, Navigation, Plane, ShieldAlert, ShieldX } from 'lucide-react';

export default function Recommendations({ queryResult, onReserve, isReserving = false }) {
  if (!queryResult) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center max-w-sm mx-auto">
        <Compass className="w-16 h-16 text-sandy-gold/50 animate-compass-spin mb-4" />
        <h4 className="text-lg font-extrabold text-treasure-brown font-sans">No Sailing Coordinates Set</h4>
        <p className="text-sm text-gray-500 mt-2 font-sans font-medium">
          Search for a voyage in the search bar above or whisper to the AI Quartermaster to chart your live recommendation ledger.
        </p>
      </div>
    );
  }

  const { results, verdict, status, weatherAlert, calendarConflict } = queryResult;
  const item = results[0];
  const amenities = item.hotel.amenities ? item.hotel.amenities.split(', ') : [];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-sandy-gold/15 to-transparent pointer-events-none"></div>

        {status === 'success' && (
          <div className="p-6 rounded-2xl glass-panel border-palm-green bg-palm-green/5 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-palm-green/20 border-2 border-palm-green text-palm-green rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-palm-green tracking-widest font-extrabold">AI VERDICT: CLEAR SAILING</span>
              <h4 className="text-lg font-black text-palm-green mt-1 font-sans">Safe Passage Confirmed</h4>
              <p className="text-sm text-treasure-brown mt-1.5 leading-relaxed font-sans font-semibold">{verdict}</p>
            </div>
          </div>
        )}

        {status === 'warning' && (
          <div className="p-6 rounded-2xl glass-panel border-coral-orange bg-coral-orange/5 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-coral-orange/20 border-2 border-coral-orange text-coral-orange rounded-xl flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-coral-orange tracking-widest font-extrabold">AI VERDICT: STORM WARNING</span>
              <h4 className="text-lg font-black text-coral-orange mt-1 font-sans">Nautical Hazards Ahead</h4>
              <p className="text-sm text-treasure-brown mt-1.5 leading-relaxed font-sans font-semibold">{verdict}</p>
            </div>
          </div>
        )}

        {status === 'danger' && (
          <div className="p-6 rounded-2xl glass-panel border-sunset-red bg-sunset-red/5 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-sunset-red/20 border-2 border-sunset-red text-sunset-red rounded-xl flex items-center justify-center shrink-0">
              <ShieldX className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-sunset-red tracking-widest font-extrabold">AI VERDICT: GOLD DEFICIT</span>
              <h4 className="text-lg font-black text-sunset-red mt-1 font-sans">Chest Overdrawn Warning</h4>
              <p className="text-sm text-treasure-brown mt-1.5 leading-relaxed font-sans font-semibold">{verdict}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl glass-panel border-sandy-gold bg-white overflow-hidden flex flex-col justify-between shadow-md">
          <div className="p-5 border-b border-sandy-gold/25 bg-gradient-to-r from-sandy-gold/20 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Plane className="w-5 h-5 text-coral-orange" />
              <h4 className="font-extrabold text-treasure-brown font-sans text-sm tracking-wide">Flight Offer</h4>
            </div>
            <span className="text-xs px-3 py-1 bg-sandy-gold/20 text-treasure-brown border border-sandy-gold/45 rounded-full font-mono font-black shadow-sm">
              ${item.flight.price}
            </span>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-500 font-bold">AIRLINE</span>
                <p className="text-base font-extrabold text-[#5C4033] font-sans mt-0.5">{item.flight.airline}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-500 font-bold">DURATION</span>
                <p className="text-xs font-mono text-ocean-blue font-extrabold mt-0.5">{item.flight.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3 border-t border-b border-gray-100 justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-400 font-bold">DEPART</span>
                <p className="text-sm font-extrabold text-treasure-brown font-mono">{item.flight.origin}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-coral-orange animate-pulse shrink-0" />
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-400 font-bold">ARRIVE</span>
                <p className="text-sm font-extrabold text-treasure-brown font-mono">{item.flight.destination}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl glass-panel border-sandy-gold bg-white overflow-hidden flex flex-col justify-between shadow-md">
          <div className="p-5 border-b border-sandy-gold/25 bg-gradient-to-r from-sandy-gold/20 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Hotel className="w-5 h-5 text-coral-orange" />
              <h4 className="font-extrabold text-treasure-brown font-sans text-sm tracking-wide">Hotel Offer</h4>
            </div>
            <span className="text-xs px-3 py-1 bg-sandy-gold/20 text-treasure-brown border border-sandy-gold/45 rounded-full font-mono font-black shadow-sm">
              ${item.hotel.pricePerNight}/night
            </span>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-500 font-bold">PROPERTY</span>
                <p className="text-base font-extrabold text-[#5C4033] font-sans mt-0.5">{item.hotel.name}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-500 font-bold">RATING</span>
                <p className="text-xs font-mono text-coral-orange font-bold mt-0.5">{item.hotel.rating || 'N/A'}</p>
              </div>
            </div>

            <div className="py-3 border-t border-b border-gray-100">
              <span className="text-[10px] font-mono text-gray-400 font-bold block mb-1">AMENITIES</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {amenities.map((amenity) => (
                  <span key={amenity} className="text-[10px] px-2.5 py-1 bg-sandy-gold/15 border border-sandy-gold/30 text-treasure-brown rounded font-sans font-bold">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {(weatherAlert || calendarConflict) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {weatherAlert && (
            <div className="rounded-2xl glass-panel border-coral-orange p-5 bg-coral-orange/5 flex gap-4 shadow-md">
              <CloudLightning className="w-10 h-10 text-coral-orange shrink-0 animate-bounce" />
              <div>
                <h5 className="font-extrabold text-coral-orange font-sans">Severe Weather Alert</h5>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed font-sans font-semibold">{weatherAlert.description}</p>
                <span className="text-[10px] font-mono text-coral-orange/80 mt-2 block font-black">WIND: {weatherAlert.windSpeed}</span>
              </div>
            </div>
          )}

          {calendarConflict && (
            <div className="rounded-2xl glass-panel border-sunset-red p-5 bg-sunset-red/5 flex gap-4 shadow-md">
              <Calendar className="w-10 h-10 text-sunset-red shrink-0 animate-pulse" />
              <div>
                <h5 className="font-extrabold text-sunset-red font-sans">Google Calendar Conflict</h5>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed font-sans font-semibold">
                  Existing event "{calendarConflict.eventName}" overlaps the proposed trip date.
                </p>
                <span className="text-[10px] font-mono text-sunset-red/80 mt-2 block font-black">{calendarConflict.date}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl glass-panel border-sandy-gold p-5 bg-white flex flex-wrap justify-between items-center gap-4 shadow-md">
        <div className="flex gap-6">
          <div>
            <span className="text-[10px] font-mono text-gray-400 font-bold">TOTAL TRIP</span>
            <p className="text-xl font-black text-coral-orange font-mono mt-0.5">${item.totalCost}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 font-bold">TIMELINE</span>
            <p className="text-sm font-extrabold text-treasure-brown font-sans mt-0.5">{item.duration}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 font-bold">REMAINING GOLD</span>
            <p className="text-sm font-extrabold text-treasure-brown font-mono mt-0.5">${item.remainingBudget}</p>
          </div>
        </div>

        <button
          onClick={onReserve}
          className="px-6 py-3 bg-gradient-to-r from-sandy-gold to-coral-orange text-white hover:brightness-110 font-black rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 flex items-center gap-2"
        >
          <span>{isReserving ? 'Saving...' : 'Claim Passage'}</span>
          <Navigation className="w-4 h-4 rotate-45" />
        </button>
      </div>
    </div>
  );
}
