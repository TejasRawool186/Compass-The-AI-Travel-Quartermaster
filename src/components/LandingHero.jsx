import React from 'react';
import { Search, Ship, MapPin, Compass, ShieldAlert, ThermometerSun, AlertCircle } from 'lucide-react';
import { sampleQueries } from '../mockCoralEngine';

export default function LandingHero({ onSearch, setActiveTab }) {
  const [queryInput, setQueryInput] = React.useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (queryInput.trim() !== '') {
      onSearch(queryInput);
    }
  };

  const selectPresetQuery = (text) => {
    setQueryInput(text);
    onSearch(text);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between py-8 px-4 lg:px-8">
      
      {/* Background Animated Clouds/Waves layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-10 left-[10%] w-72 h-48 bg-[#4CC9F0]/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-[5%] w-96 h-60 bg-[#F4C95D]/5 rounded-full blur-3xl animate-float-slow [animation-delay:2s]"></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto w-full text-center mt-8 lg:mt-16 relative">
        
        {/* Decorative Floating Mascot Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel bg-[#0B3C5D]/30 border-ocean-blue/30 text-ocean-blue text-xs font-mono tracking-wider font-bold mb-6">
          <Ship className="w-4 h-4 animate-bounce" />
          <span>VESSEL BOUND FOR DISCOVERY</span>
        </div>

        <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-[#EAE1D5] leading-tight font-sans">
          Chart Yer Voyage With <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sandy-gold via-[#FF8C42] to-ocean-blue gold-glow">
            Coral Cross-Source SQL
          </span>
        </h2>
        
        <p className="text-base lg:text-lg text-gray-300 max-w-xl mx-auto mt-4 font-sans leading-relaxed">
          Ahoy! State yer destination, budget, or travel wishes. Let the AI Quartermaster scan flights, hotels, weather, and calendars in a single sweep!
        </p>

        {/* Cinematic "Where to, Captain?" Search Input */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sandy-gold/10 to-ocean-blue/10 rounded-2xl blur-lg"></div>
          <div className="relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl glass-panel border-sandy-gold/30 bg-[#0B3C5D]/40">
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
              <Search className="w-6 h-6 text-sandy-gold shrink-0 animate-pulse" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Where to, Captain? (e.g., plan a sunny Nassau trip under $400)"
                className="w-full bg-transparent border-none text-white focus:outline-none placeholder-gray-400 text-base font-sans"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sandy-gold to-[#FF8C42] hover:from-[#FF8C42] hover:to-sandy-gold text-[#5C4033] font-bold rounded-xl transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2 group shrink-0"
            >
              <span>Set Sail</span>
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        </form>

        {/* Suggestion anchors */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {sampleQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => selectPresetQuery(item.text)}
              className="text-xs px-4 py-2 rounded-full glass-panel hover:border-sandy-gold/60 text-gray-300 hover:text-sandy-gold transition-all duration-300 font-mono"
            >
              🏴‍☠️ "{item.text.slice(0, 48)}..."
            </button>
          ))}
        </div>
      </div>

      {/* Featured Destination Cards - Port shortcuts */}
      <div className="max-w-6xl mx-auto w-full mt-16 border-t border-[#F4C95D]/10 pt-10">
        <h3 className="text-xl font-bold tracking-wider text-sandy-gold gold-glow text-center mb-8 font-sans">
          🏴‍☠️ SELECT A PORT OF INSPIRATION
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Nassau */}
          <div className="relative group rounded-2xl overflow-hidden glass-panel border-[#F4C95D]/20 hover:border-[#F4C95D]/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-lg" onClick={() => selectPresetQuery("Plan a sunny Nassau trip under $400")}>
            <div className="absolute inset-0 bg-gradient-to-t from-deep-sea via-transparent to-transparent z-10"></div>
            {/* Visual Vector Silhouette/Landscape Mock */}
            <div className="h-44 bg-gradient-to-br from-ocean-blue/30 via-[#FF8C42]/20 to-[#0B3C5D] relative flex items-center justify-center overflow-hidden">
              <span className="text-6xl animate-bounce [animation-duration:5s] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">🏝️</span>
              <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-sandy-gold/10 rounded-full blur-xl"></div>
            </div>
            <div className="p-5 relative z-20">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-white font-sans">Nassau Haven</h4>
                  <p className="text-xs text-ocean-blue font-mono mt-0.5">THE BAHAMAS</p>
                </div>
                <span className="px-3 py-1 bg-palm-green/20 text-palm-green border border-palm-green/30 rounded-full text-xs font-mono font-bold">Clear Sailing</span>
              </div>
              <p className="text-sm text-gray-300 mt-3 font-sans">A paradise of white sands, calm winds, and rich rum cellars. Highly affordable flights!</p>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1"><ThermometerSun className="w-3.5 h-3.5 text-sandy-gold" /> 29°C</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-ocean-blue" /> Sunny Port</span>
              </div>
            </div>
          </div>

          {/* Card 2: Tortuga */}
          <div className="relative group rounded-2xl overflow-hidden glass-panel border-[#F4C95D]/20 hover:border-[#F4C95D]/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-lg" onClick={() => selectPresetQuery("Plan a voyage to Tortuga for rum and sailing")}>
            <div className="absolute inset-0 bg-gradient-to-t from-deep-sea via-transparent to-transparent z-10"></div>
            <div className="h-44 bg-gradient-to-br from-sunset-red/20 via-[#8B5E3C]/20 to-[#0B3C5D] relative flex items-center justify-center overflow-hidden">
              <span className="text-6xl animate-pulse filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">⛈️</span>
              <div className="absolute -left-10 -top-10 w-24 h-24 bg-sunset-red/10 rounded-full blur-xl"></div>
            </div>
            <div className="p-5 relative z-20">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-white font-sans">Tortuga Port</h4>
                  <p className="text-xs text-[#FF8C42] font-mono mt-0.5">HAITI COVE</p>
                </div>
                <span className="px-3 py-1 bg-coral-orange/20 text-coral-orange border border-coral-orange/30 rounded-full text-xs font-mono font-bold">Storm Ahead</span>
              </div>
              <p className="text-sm text-gray-300 mt-3 font-sans">Famous pirate cove. Caution: Severe hurricane activity and heavy gales forecast this week!</p>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 text-sunset-red animate-ping" /> 38 Knots</span>
                <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-coral-orange" /> Hurricane Warning</span>
              </div>
            </div>
          </div>

          {/* Card 3: Port Royal */}
          <div className="relative group rounded-2xl overflow-hidden glass-panel border-[#F4C95D]/20 hover:border-[#F4C95D]/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-lg" onClick={() => selectPresetQuery("Plan a luxury voyage to Port Royal")}>
            <div className="absolute inset-0 bg-gradient-to-t from-deep-sea via-transparent to-transparent z-10"></div>
            <div className="h-44 bg-gradient-to-br from-sandy-gold/20 via-deep-sea to-[#0B3C5D] relative flex items-center justify-center overflow-hidden">
              <span className="text-6xl animate-float-slow filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">🏰</span>
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-ocean-blue/10 rounded-full blur-xl"></div>
            </div>
            <div className="p-5 relative z-20">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-white font-sans">Port Royal</h4>
                  <p className="text-xs text-sandy-gold font-mono mt-0.5">JAMAICA ROYAL</p>
                </div>
                <span className="px-3 py-1 bg-sunset-red/20 text-sunset-red border border-sunset-red/30 rounded-full text-xs font-mono font-bold">Gold Deficit</span>
              </div>
              <p className="text-sm text-gray-300 mt-3 font-sans">The richest city in the West Indies. Luxury governor suites and premium charter vessels.</p>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1"><Ship className="w-3.5 h-3.5 text-sandy-gold" /> Governor Luxury</span>
                <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 text-sunset-red" /> Exceeds Budget</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
