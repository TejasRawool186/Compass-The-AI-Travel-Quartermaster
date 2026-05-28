import React from 'react';
import { Compass, Anchor, Map, MessageSquare, Coins, CloudSun, BookOpen, Skull, Menu, X } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, budgetState }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'landing', label: 'Port of Call', icon: Anchor },
    { id: 'chat', label: 'AI Quartermaster', icon: MessageSquare },
    { id: 'map', label: 'Treasure Map', icon: Map },
    { id: 'budget', label: 'Treasure Chest', icon: Coins },
    { id: 'weather', label: 'Sailing Weather', icon: CloudSun },
    { id: 'log', label: "Captain's Log", icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden w-full flex items-center justify-between px-6 py-4 glass-panel bg-opacity-95 fixed top-0 left-0 z-50">
        <div className="flex items-center gap-3">
          <Compass className="w-8 h-8 text-sandy-gold animate-spin [animation-duration:15s]" />
          <span className="font-bold tracking-wider text-sandy-gold font-sans gold-glow">COMPASS</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-sandy-gold focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-full w-72 glass-panel z-40 flex flex-col justify-between py-6 px-4 transition-all duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:block'}`}>
        
        {/* Logo and Branding */}
        <div className="mt-14 lg:mt-0 flex flex-col items-center text-center border-b border-[#F4C95D]/10 pb-6">
          <div className="relative group cursor-pointer mb-3">
            <div className="absolute inset-0 bg-sandy-gold/20 rounded-full blur-xl group-hover:bg-sandy-gold/30 transition-all duration-300"></div>
            <Compass className="w-16 h-16 text-sandy-gold relative group-hover:scale-105 transition-transform duration-500 animate-compass-spin [animation-duration:40s]" />
            <Skull className="w-5 h-5 text-sandy-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h1 className="text-xl font-bold tracking-widest text-sandy-gold gold-glow font-sans">COMPASS</h1>
          <p className="text-xs text-ocean-blue tracking-wider font-mono mt-1">THE AI QUARTERMASTER</p>
        </div>

        {/* Mascot Quartermaster Barnaby */}
        <div className="my-6 p-4 rounded-xl glass-panel bg-deep-sea/25 border-ocean-blue/10 flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-sandy-gold/5 rounded-full blur-xl"></div>
          
          {/* Stylized Avatar Placeholder for Barnaby */}
          <div className="w-14 h-14 bg-gradient-to-tr from-sandy-gold via-coral-orange to-ocean-blue rounded-xl flex items-center justify-center p-0.5 shadow-lg relative shrink-0">
            <div className="w-full h-full bg-[#051329] rounded-[10px] flex items-center justify-center overflow-hidden relative">
              <span className="text-2xl" role="img" aria-label="parrot">🦜</span>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-palm-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-palm-green"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono px-2 py-0.5 bg-sandy-gold/15 text-sandy-gold rounded-full border border-sandy-gold/25 font-bold">Crew</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">Barnaby</h4>
            <p className="text-xs text-gray-400">Quartermaster AI</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium tracking-wide ${isActive ? 'bg-gradient-to-r from-sandy-gold/15 to-transparent text-sandy-gold border-l-2 border-sandy-gold font-bold shadow-inner' : 'text-gray-400 hover:text-[#EAE1D5] hover:bg-[#0B3C5D]/20 hover:border-l-2 hover:border-[#F4C95D]/40'}`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-sandy-gold' : 'group-hover:scale-105'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Ledger Gold / Coin status */}
        <div className="border-t border-[#F4C95D]/10 pt-4 px-2">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>TREASURE CHEST</span>
            <span className="text-sandy-gold font-bold">${budgetState.remaining} doubloons</span>
          </div>
          <div className="w-full bg-[#051329] h-2 rounded-full overflow-hidden mt-2 border border-[#F4C95D]/10">
            <div 
              className="bg-gradient-to-r from-coral-orange via-sandy-gold to-palm-green h-full rounded-full transition-all duration-500" 
              style={{ width: `${(budgetState.remaining / budgetState.totalLimit) * 100}%` }}
            ></div>
          </div>
        </div>
      </aside>
    </>
  );
}
