import React from 'react';
import { Anchor, BookOpen, CloudSun, Coins, Compass, Map, Menu, MessageSquare, X } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, budgetState }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'landing', label: 'Home', icon: Anchor },
    { id: 'chat', label: 'Captain AI', icon: MessageSquare },
    { id: 'map', label: 'Gallery', icon: Map },
    { id: 'recommendations', label: 'Event', icon: Compass },
    { id: 'weather', label: 'News', icon: CloudSun },
    { id: 'log', label: 'About', icon: BookOpen },
    { id: 'budget', label: 'Treasure', icon: Coins }
  ];

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className="pirate-mobile-nav">
          <button
            onClick={() => handleSelect('landing')}
            className="flex items-center gap-3 text-left"
          >
            <span className="pirate-logo-coin">
              <Anchor className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#7b5271]">Your logo</p>
              <h1 className="text-lg font-semibold text-[#4b275d]">Compass</h1>
            </div>
          </button>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-full border border-white/70 bg-white/80 p-3 text-[#4b275d]"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 px-8 pt-5">
        <div className="pirate-topbar">
          <button
            onClick={() => handleSelect('landing')}
            className="flex items-center gap-3 text-left"
          >
            <span className="pirate-logo-coin">
              <Anchor className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#7b5271]">Your logo</p>
              <h1 className="text-xl font-semibold text-[#4b275d]">Compass</h1>
            </div>
          </button>

          <div className="flex items-center gap-2 xl:gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`pirate-nav-link ${isActive ? 'pirate-nav-link-active' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pirate-budget-chip">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7b5271]">Treasure</span>
            <strong>${budgetState.remaining}</strong>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#3f2154]/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="pirate-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.35em] text-[#7b5271]">Navigation</p>
              <h2 className="mt-2 text-2xl text-[#4b275d]">Pirate Treasure</h2>
            </div>

            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left ${isActive ? 'bg-[#4b275d] text-white' : 'bg-white/75 text-[#4b275d]'}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em]">
                      {isActive ? 'Live' : 'Go'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
