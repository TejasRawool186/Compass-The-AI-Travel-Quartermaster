import React from 'react';
import { BookOpen, Skull, Terminal, Anchor, ShieldAlert, Award } from 'lucide-react';

export default function CaptainsLog({ logEntries }) {
  const achievements = [
    { title: 'The Gold Accumulator', desc: 'Sailed 3 consecutive voyages under allowance budget limits.', unlocked: true },
    { title: 'Storm Survivor', desc: 'Detected severe gales in Tortuga and successfully routed around squalls.', unlocked: true },
    { title: 'Grand Navigator', desc: 'Ran a Coral SQL query joining five separate live data schemas.', unlocked: false }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      
      {/* Page Header */}
      <div>
        <h3 className="text-xl font-bold text-white font-sans">Captain's Log</h3>
        <p className="text-xs text-gray-400 font-sans mt-0.5">A chronological chronicle of yer travel scans, voyages set, and crew accomplishments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Chronological Log Timeline (Spans 2 columns) */}
        <div className="lg:col-span-2 rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-opacity-40 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#F4C95D]/10 pb-3">
            <BookOpen className="w-5 h-5 text-sandy-gold" />
            <h4 className="font-bold text-white font-sans text-sm tracking-wide">Journal of Active Voyage Scans</h4>
          </div>

          {logEntries.length === 0 ? (
            <div className="text-center py-16 text-gray-500 font-sans">
              <Skull className="w-8 h-8 text-gray-600 mx-auto mb-2 animate-pulse" />
              <p>Log is empty. Set sail or run travel queries to populate the journal.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-sandy-gold/25 pl-6 ml-4 space-y-6 font-sans">
              {logEntries.map((entry, index) => (
                <div key={index} className="relative">
                  {/* Dotted indicator icon */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-sandy-gold border-2 border-[#051329] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#051329]"></span>
                  </div>
                  
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-400/20">{entry.timestamp}</span>
                  <h5 className="font-bold text-white text-sm mt-2">{entry.destination} Voyage Evaluated</h5>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{entry.verdict}</p>
                  
                  {/* Mini SQL display segment */}
                  <div className="mt-3 p-3 rounded-lg bg-[#051329] border border-white/5 font-mono text-[10px] text-sandy-gold overflow-x-auto">
                    {entry.sql}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Achievements & Ribbons */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-opacity-40 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F4C95D]/10 pb-3">
            <Award className="w-5 h-5 text-sandy-gold" />
            <h4 className="font-bold text-white font-sans text-sm tracking-wide">Crew Achievements</h4>
          </div>

          <div className="space-y-4 font-sans">
            {achievements.map((ach) => (
              <div 
                key={ach.title} 
                className={`p-4 rounded-xl border flex gap-3.5 items-start ${ach.unlocked ? 'bg-[#0B3C5D]/25 border-sandy-gold/20' : 'bg-gray-900/40 border-white/5 opacity-55'}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${ach.unlocked ? 'bg-sandy-gold/15 text-sandy-gold' : 'bg-gray-800 text-gray-500'}`}>
                  <Skull className="w-5 h-5" />
                </div>

                <div>
                  <h5 className={`font-bold text-sm ${ach.unlocked ? 'text-white' : 'text-gray-500'}`}>{ach.title}</h5>
                  <p className="text-[11px] text-gray-400 mt-1 leading-normal">{ach.desc}</p>
                  <span className={`text-[9px] font-mono font-bold mt-2 inline-block px-2 py-0.5 rounded-full ${ach.unlocked ? 'bg-palm-green/20 text-palm-green border border-palm-green/20' : 'bg-gray-800 text-gray-600 border border-gray-700'}`}>
                    {ach.unlocked ? 'COMPLETED' : 'LOCKED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
