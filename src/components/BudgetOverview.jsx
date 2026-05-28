import React from 'react';
import { ArrowUpRight, Coins, Database, Plus, ShieldAlert, TrendingUp } from 'lucide-react';

export default function BudgetOverview({ budgetState, onUpdateBudget }) {
  const [newAllowanceLimit, setNewAllowanceLimit] = React.useState('');
  const reservations = budgetState.reservations || [];

  const handleUpdateLimit = async (event) => {
    event.preventDefault();
    if (!newAllowanceLimit || Number.isNaN(Number(newAllowanceLimit))) {
      return;
    }

    await onUpdateBudget(Number(newAllowanceLimit));
    setNewAllowanceLimit('');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-treasure-brown font-sans">Treasure Chest Budget</h3>
        <p className="text-xs text-gray-500 font-sans mt-0.5 font-semibold">Live budget state persisted by the backend budget store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl glass-panel p-6 flex items-center justify-between bg-white relative overflow-hidden group shadow-md">
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Allowance Limit</span>
            <span className="text-xl font-black text-treasure-brown font-mono mt-1 block">${budgetState.totalLimit}</span>
            <span className="text-xs text-gray-500 font-sans mt-1.5 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-palm-green" /> Active trip cap
            </span>
          </div>
          <Coins className="w-10 h-10 text-sandy-gold shrink-0 opacity-80" />
        </div>

        <div className="rounded-2xl glass-panel p-6 flex items-center justify-between bg-white relative overflow-hidden group shadow-md">
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Spent Doubloons</span>
            <span className="text-xl font-black text-[#5C4033] font-mono mt-1 block">${budgetState.spent}</span>
            <span className="text-xs text-gray-500 font-sans mt-1.5 flex items-center gap-1 font-semibold">
              <Plus className="w-3.5 h-3.5 text-ocean-blue" /> {reservations.length} reservations saved
            </span>
          </div>
          <Coins className="w-10 h-10 text-coral-orange shrink-0 opacity-80" />
        </div>

        <div className="rounded-2xl glass-panel p-6 flex items-center justify-between bg-white relative overflow-hidden group shadow-md">
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Remaining Gold</span>
            <span className="text-xl font-black text-coral-orange font-mono mt-1 block">${budgetState.remaining}</span>
            <span className="text-xs text-palm-green font-sans mt-1.5 flex items-center gap-1 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> Calculated live
            </span>
          </div>
          <Coins className="w-10 h-10 text-palm-green shrink-0 opacity-80" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl glass-panel p-6 bg-white flex flex-col justify-between shadow-md">
          <div>
            <h4 className="font-extrabold text-treasure-brown font-sans text-sm tracking-wide border-b border-sandy-gold/25 pb-3 mb-4">
              Provision Ledger Adjuster
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4 font-semibold">
              Update the travel allowance used by the real planner endpoint.
            </p>

            <form onSubmit={handleUpdateLimit} className="space-y-4">
              <input
                type="text"
                value={newAllowanceLimit}
                onChange={(event) => setNewAllowanceLimit(event.target.value)}
                placeholder="Enter new cap (e.g. 800)"
                className="w-full glass-input"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-sandy-gold to-coral-orange hover:brightness-110 text-white font-extrabold rounded-xl shadow transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Update Travel Allowance</span>
              </button>
            </form>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-sandy-gold/15 border border-sandy-gold/30 flex gap-3 text-xs text-gray-600 font-sans font-semibold">
            <ShieldAlert className="w-5 h-5 text-coral-orange shrink-0" />
            <span>
              New searches use this limit immediately when the backend computes trip verdicts.
            </span>
          </div>
        </div>

        <div className="rounded-2xl glass-panel p-6 bg-white shadow-md">
          <div className="flex items-center gap-2 border-b border-sandy-gold/25 pb-3 mb-4">
            <Database className="w-5 h-5 text-treasure-brown" />
            <h4 className="font-extrabold text-treasure-brown font-sans text-sm tracking-wide">
              Reserved Voyages
            </h4>
          </div>

          {reservations.length === 0 ? (
            <p className="text-sm text-gray-500">No trips reserved yet. Reserve a result from the recommendations screen to persist it here.</p>
          ) : (
            <div className="space-y-3">
              {reservations.map((trip, index) => (
                <div key={`${trip.destination}-${index}`} className="rounded-xl border border-sandy-gold/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-treasure-brown">{trip.destination}</h5>
                      <p className="text-xs text-gray-500">{trip.flight?.origin} to {trip.flight?.destination}</p>
                    </div>
                    <strong className="text-coral-orange">${trip.totalCost}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
