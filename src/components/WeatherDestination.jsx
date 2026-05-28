import React from 'react';
import { CloudSun, Wind, Thermometer, Droplets, Calendar, ShieldAlert, CheckCircle, Database, AlertCircle } from 'lucide-react';

export default function WeatherDestination() {
  const weatherPorts = [
    { city: 'Nassau Haven', temp: '29°C', wind: '12 knots', humidity: '65%', forecast: 'Clear', condition: 'Gentle Sailing Breeze' },
    { city: 'Tortuga Port', temp: '26°C', wind: '38 knots', humidity: '95%', forecast: 'Storm', condition: 'Hurricane gale warnings!' },
    { city: 'Port Royal', temp: '30°C', wind: '8 knots', humidity: '70%', forecast: 'Clear', condition: 'Ideal flat seas' },
    { city: 'Havana Port', temp: '28°C', wind: '15 knots', humidity: '80%', forecast: 'Cloudy', condition: 'Tropical showers' }
  ];

  const calendarLedger = [
    { date: '2026-06-06', event: 'Grand Fleet Inspection', duration: 'Full Day', conflict: true, block: 'Blocked' },
    { date: '2026-06-13', event: 'Free Sailing Log', duration: 'Open Deck', conflict: false, block: 'Clear' },
    { date: '2026-06-20', event: 'Treasure Map Auction', duration: '14:00 - 17:00', conflict: false, block: 'Clear' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      
      {/* Page Header */}
      <div>
        <h3 className="text-xl font-bold text-white font-sans">Sailing Weather & Calendar Ledger</h3>
        <p className="text-xs text-gray-400 font-sans mt-0.5">Sync flight departure windows against storm forecasts and crew schedules.</p>
      </div>

      {/* Grid: Weather widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weatherPorts.map((port) => {
          const isStorm = port.forecast === 'Storm';
          return (
            <div 
              key={port.city} 
              className={`rounded-2xl glass-panel p-5 flex flex-col justify-between min-h-[160px] relative overflow-hidden group border ${isStorm ? 'border-sunset-red/30 bg-sunset-red/5' : 'border-[#F4C95D]/20 bg-[#0B3C5D]/30'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white font-sans text-sm">{port.city}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full mt-1.5 inline-block font-bold ${isStorm ? 'bg-sunset-red/20 text-[#E63946]' : 'bg-palm-green/20 text-palm-green'}`}>
                    {port.forecast} PORT
                  </span>
                </div>
                <CloudSun className={`w-8 h-8 ${isStorm ? 'text-sunset-red animate-bounce' : 'text-sandy-gold animate-pulse'}`} />
              </div>

              <div className="mt-4 space-y-2 font-mono text-[11px] text-gray-300">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-gray-400"><Thermometer className="w-3.5 h-3.5" /> Temp:</span>
                  <span className="font-bold">{port.temp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-gray-400"><Wind className="w-3.5 h-3.5" /> Sails Wind:</span>
                  <span className={`font-bold ${isStorm ? 'text-sunset-red animate-ping' : ''}`}>{port.wind}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-gray-400"><Droplets className="w-3.5 h-3.5" /> Humidity:</span>
                  <span className="font-bold">{port.humidity}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-white/5 pt-2 text-[10px] text-gray-400 font-sans italic">
                🌪️ {port.condition}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar and SQL Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar Events List */}
        <div className="lg:col-span-2 rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-opacity-40 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F4C95D]/10 pb-3">
            <Calendar className="w-5 h-5 text-sandy-gold" />
            <h4 className="font-bold text-white font-sans text-sm tracking-wide">Google Calendar Ledger Inspections</h4>
          </div>

          <div className="space-y-3 font-sans">
            {calendarLedger.map((cal) => (
              <div 
                key={cal.event} 
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${cal.conflict ? 'bg-sunset-red/10 border-sunset-red/30' : 'bg-[#0B3C5D]/20 border-white/5'}`}
              >
                <div className="flex gap-3 items-center">
                  {cal.conflict ? (
                    <ShieldAlert className="w-6 h-6 text-sunset-red shrink-0 animate-bounce" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-palm-green shrink-0" />
                  )}
                  <div>
                    <h5 className="font-bold text-white text-sm">{cal.event}</h5>
                    <span className="text-[10px] font-mono text-gray-400 block mt-0.5">{cal.date} ({cal.duration})</span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold border ${cal.conflict ? 'bg-sunset-red/20 text-[#E63946] border-[#E63946]/30' : 'bg-palm-green/20 text-palm-green border-palm-green/30'}`}>
                  {cal.block}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Coral schema learning note */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-opacity-40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-[#F4C95D]/10 pb-3 mb-4">
              <Database className="w-5 h-5 text-sandy-gold" />
              <h4 className="font-bold text-white font-sans text-sm tracking-wide">Coral Schema Learning</h4>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
              Coral automatically learns the structure of the calendar APIs. Below is the active learned fields representation for Google Calendar sync hooks:
            </p>

            <div className="p-3.5 rounded-lg bg-[#051329] border border-white/5 font-mono text-[10px] text-cyan-400 space-y-2">
              <div><span className="text-sandy-gold">event_date</span>: TIMESTAMP (learned)</div>
              <div><span className="text-sandy-gold">event_name</span>: STRING (learned)</div>
              <div><span className="text-sandy-gold">conflict_flag</span>: BOOLEAN (cached)</div>
              <div><span className="text-sandy-gold">event_owner</span>: STRING (learned)</div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-sandy-gold/5 border border-sandy-gold/15 flex gap-3 text-xs text-gray-400 font-sans">
            <AlertCircle className="w-5 h-5 text-sandy-gold shrink-0 animate-pulse" />
            <span>
              Coral query engine cached active calendar mappings to expedite travel scans under 2 seconds.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
