import React from 'react';
import { Compass, Anchor, Map, MessageSquare, Coins, CloudSun, BookOpen, Skull, Menu, X } from 'lucide-react';
import parrotImg from '../assets/parrot.png';

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
      <div className="lg:hidden w-full flex items-center justify-between px-6 py-4 glass-panel fixed top-0 left-0 z-50">
        <div className="flex items-center gap-3">
          <Compass className="w-8 h-8 text-treasure-brown animate-spin [animation-duration:15s]" />
          <span className="font-bold tracking-wider text-treasure-brown font-sans gold-glow">COMPASS</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-treasure-brown focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-full w-72 glass-panel z-40 flex flex-col justify-between py-6 px-4 transition-all duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:block'}`}>
        
        {/* Logo and Branding */}
        <div className="mt-14 lg:mt-0 flex flex-col items-center text-center border-b border-sandy-gold/20 pb-6">
          <div className="relative group cursor-pointer mb-3">
            <div className="absolute inset-0 bg-sandy-gold/20 rounded-full blur-xl group-hover:bg-sandy-gold/30 transition-all duration-300"></div>
            <Compass className="w-16 h-16 text-treasure-brown relative group-hover:scale-105 transition-transform duration-500 animate-compass-spin [animation-duration:40s]" />
            <Skull className="w-5 h-5 text-coral-orange absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h1 className="text-xl font-bold tracking-widest text-treasure-brown gold-glow font-sans">COMPASS</h1>
          <p className="text-[10px] text-ocean-blue font-bold tracking-wider font-mono mt-1">THE AI QUARTERMASTER</p>
        </div>

        {/* Mascot Quartermaster Barnaby with AI image */}
        <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-sandy-gold/10 to-ocean-blue/10 border border-sandy-gold/30 flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-sandy-gold/10 rounded-full blur-xl"></div>
          
          {/* AI Generated Cartoon Avatar */}
          <div className="w-14 h-14 bg-gradient-to-tr from-sandy-gold via-coral-orange to-ocean-blue rounded-xl flex items-center justify-center p-0.5 shadow-md relative shrink-0">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden relative">
              <img src={parrotImg} alt="Barnaby AI" className="w-full h-full object-cover transform scale-110" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-palm-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-palm-green"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono px-2 py-0.5 bg-palm-green/20 text-palm-green border border-palm-green/30 rounded-full font-bold">Crew AI</span>
            </div>
            <h4 className="text-sm font-bold text-treasure-brown mt-0.5">Barnaby</h4>
            <p className="text-xs text-gray-500 font-medium">Quartermaster AI</p>
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
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold tracking-wide ${isActive ? 'bg-gradient-to-r from-sandy-gold/20 to-transparent text-treasure-brown border-l-4 border-sandy-gold font-extrabold shadow-inner' : 'text-gray-500 hover:text-treasure-brown hover:bg-sandy-gold/10 hover:border-l-4 hover:border-sandy-gold/30'}`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-coral-orange' : 'group-hover:scale-105'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Ledger Gold / Coin status */}
        <div className="border-t border-sandy-gold/20 pt-4 px-2">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 font-bold">
            <span>TREASURE VAULT</span>
            <span className="text-coral-orange font-bold">${budgetState.remaining} gold</span>
          </div>
          <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden mt-2 border border-sandy-gold/30">
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
