import React from 'react';
import { AlertCircle, Calendar, CheckCircle, CloudSun, Database, Droplets, ShieldAlert, Thermometer, Wind } from 'lucide-react';

export default function WeatherDestination({
  weatherPorts = [],
  calendarLedger = [],
  providerStatus = null
}) {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-treasure-brown font-sans">Sailing Weather & Calendar Ledger</h3>
        <p className="text-xs text-gray-500 font-sans mt-0.5">Live weather and calendar data from the backend integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weatherPorts.length === 0 && (
          <div className="md:col-span-2 lg:col-span-4 rounded-2xl glass-panel p-6 bg-white text-sm text-gray-500">
            Weather results will appear here after the backend is configured.
          </div>
        )}

        {weatherPorts.map((port) => {
          const isStorm = ['storm', 'thunderstorm', 'rain'].includes((port.forecast || '').toLowerCase());
          return (
            <div
              key={port.city}
              className={`rounded-2xl glass-panel p-5 flex flex-col justify-between min-h-[160px] relative overflow-hidden group border ${isStorm ? 'border-sunset-red/30 bg-sunset-red/5' : 'border-[#F4C95D]/20 bg-white'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-treasure-brown font-sans text-sm">{port.city}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full mt-1.5 inline-block font-bold ${isStorm ? 'bg-sunset-red/20 text-[#E63946]' : 'bg-palm-green/20 text-palm-green'}`}>
                    {port.forecast}
                  </span>
                </div>
                <CloudSun className={`w-8 h-8 ${isStorm ? 'text-sunset-red' : 'text-sandy-gold'}`} />
              </div>

              <div className="mt-4 space-y-2 font-mono text-[11px] text-gray-600">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-gray-400"><Thermometer className="w-3.5 h-3.5" /> Temp:</span>
                  <span className="font-bold">{port.temp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-gray-400"><Wind className="w-3.5 h-3.5" /> Wind:</span>
                  <span className="font-bold">{port.windSpeed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-gray-400"><Droplets className="w-3.5 h-3.5" /> Humidity:</span>
                  <span className="font-bold">{port.humidity}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-black/5 pt-2 text-[10px] text-gray-500 font-sans italic">
                {port.condition}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-white space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F4C95D]/10 pb-3">
            <Calendar className="w-5 h-5 text-sandy-gold" />
            <h4 className="font-bold text-treasure-brown font-sans text-sm tracking-wide">Google Calendar Ledger Inspections</h4>
          </div>

          <div className="space-y-3 font-sans">
            {calendarLedger.length === 0 && (
              <div className="rounded-xl border border-dashed border-sandy-gold/30 p-4 text-sm text-gray-500">
                Calendar events will appear once `GOOGLE_CALENDAR_API_KEY` and `GOOGLE_CALENDAR_ID` are configured.
              </div>
            )}

            {calendarLedger.map((cal) => (
              <div
                key={`${cal.event}-${cal.date}`}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${cal.conflict ? 'bg-sunset-red/10 border-sunset-red/30' : 'bg-white border-sandy-gold/15'}`}
              >
                <div className="flex gap-3 items-center">
                  {cal.conflict ? (
                    <ShieldAlert className="w-6 h-6 text-sunset-red shrink-0" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-palm-green shrink-0" />
                  )}
                  <div>
                    <h5 className="font-bold text-treasure-brown text-sm">{cal.event}</h5>
                    <span className="text-[10px] font-mono text-gray-400 block mt-0.5">{cal.date}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold border ${cal.conflict ? 'bg-sunset-red/20 text-[#E63946] border-[#E63946]/30' : 'bg-palm-green/20 text-palm-green border-palm-green/30'}`}>
                  {cal.block}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-[#F4C95D]/10 pb-3 mb-4">
              <Database className="w-5 h-5 text-sandy-gold" />
              <h4 className="font-bold text-treasure-brown font-sans text-sm tracking-wide">Provider Status</h4>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Travelpayouts</span>
                <strong>{providerStatus?.travelpayouts ? 'Connected' : 'Missing key'}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>OpenWeather</span>
                <strong>{providerStatus?.openweather ? 'Connected' : 'Missing key'}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Google Calendar</span>
                <strong>{providerStatus?.googleCalendar ? 'Connected' : 'Missing key'}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-sandy-gold/5 border border-sandy-gold/15 flex gap-3 text-xs text-gray-500 font-sans">
            <AlertCircle className="w-5 h-5 text-sandy-gold shrink-0" />
            <span>
              This screen is no longer fed by local demo arrays. It reads directly from the backend integration layer.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
