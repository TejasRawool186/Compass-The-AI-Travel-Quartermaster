import React from 'react';
import { Coins, Database, Plus, ShieldAlert, FileSpreadsheet, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function BudgetOverview({ budgetState, setBudgetState }) {
  const [newAllowanceLimit, setNewAllowanceLimit] = React.useState('');

  const spendCategories = [
    { name: 'Vessel Charters (Flights)', spent: 150, color: '#4CC9F0' },
    { name: 'Tavern Lodging (Hotels)', spent: 240, color: '#F4C95D' },
    { name: 'Rum & Provisions (Food)', spent: 50, color: '#FF8C42' },
    { name: 'Port Duties (Taxes)', spent: 20, color: '#8B5E3C' }
  ];

  const totalSpent = spendCategories.reduce((sum, item) => sum + item.spent, 0);

  const handleUpdateLimit = (e) => {
    e.preventDefault();
    if (newAllowanceLimit && !isNaN(newAllowanceLimit)) {
      setBudgetState({
        ...budgetState,
        totalLimit: parseFloat(newAllowanceLimit),
        remaining: parseFloat(newAllowanceLimit) - totalSpent
      });
      setNewAllowanceLimit('');
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      
      {/* Page Header */}
      <div>
        <h3 className="text-xl font-bold text-treasure-brown font-sans">Treasure Chest Budget</h3>
        <p className="text-xs text-gray-500 font-sans mt-0.5 font-semibold">Track yer gold coins and sailing allowances through Coral's budget.allowance tables.</p>
      </div>

      {/* Top 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Gold Limit */}
        <div className="rounded-2xl glass-panel p-6 flex items-center justify-between bg-white relative overflow-hidden group shadow-md">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-sandy-gold/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300"></div>
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Allowance Limit</span>
            <span className="text-xl font-black text-treasure-brown font-mono mt-1 block">${budgetState.totalLimit} gold doubloons</span>
            <span className="text-xs text-gray-500 font-sans mt-1.5 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-palm-green" /> Season Allocation Cap
            </span>
          </div>
          <Coins className="w-10 h-10 text-sandy-gold shrink-0 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
        </div>

        {/* Card 2: Total Spent */}
        <div className="rounded-2xl glass-panel p-6 flex items-center justify-between bg-white relative overflow-hidden group shadow-md">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-coral-orange/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300"></div>
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Spent Doubloons</span>
            <span className="text-xl font-black text-[#5C4033] font-mono mt-1 block">${totalSpent} spent</span>
            <span className="text-xs text-gray-500 font-sans mt-1.5 flex items-center gap-1 font-semibold">
              <Plus className="w-3.5 h-3.5 text-ocean-blue" /> 4 Transactions Recorded
            </span>
          </div>
          <Coins className="w-10 h-10 text-coral-orange shrink-0 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
        </div>

        {/* Card 3: Remaining Chest Gold */}
        <div className="rounded-2xl glass-panel p-6 flex items-center justify-between bg-white relative overflow-hidden group shadow-md">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-palm-green/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300"></div>
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Remaining Gold</span>
            <span className="text-xl font-black text-coral-orange font-mono mt-1 block">${budgetState.remaining} gold</span>
            <span className="text-xs text-palm-green font-sans mt-1.5 flex items-center gap-1 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> Clear of Debt Squalls
            </span>
          </div>
          <Coins className="w-10 h-10 text-palm-green shrink-0 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
        </div>

      </div>

      {/* Categories & SQL Ledger Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Spend distribution list */}
        <div className="rounded-2xl glass-panel p-6 bg-white shadow-md">
          <h4 className="font-extrabold text-treasure-brown font-sans text-sm tracking-wide border-b border-sandy-gold/25 pb-3 mb-4">
            Gold Distribution By Sector
          </h4>
          
          <div className="space-y-4">
            {spendCategories.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-sans font-bold">
                  <span className="text-gray-700 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    {cat.name}
                  </span>
                  <span className="font-mono text-treasure-brown">${cat.spent} ({(cat.spent / totalSpent * 100).toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-[#E2F6FC] h-2.5 rounded-full overflow-hidden border border-sandy-gold/20">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      backgroundColor: cat.color,
                      width: `${(cat.spent / totalSpent) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change allowance configuration form */}
        <div className="rounded-2xl glass-panel p-6 bg-white flex flex-col justify-between shadow-md">
          <div>
            <h4 className="font-extrabold text-treasure-brown font-sans text-sm tracking-wide border-b border-sandy-gold/25 pb-3 mb-4">
              Provision Ledger Adjuster
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4 font-semibold">
              Allocate a new spending cap to the travel ledger block. Coral SQL uses this allowance constraint dynamically when evaluating "Clear Sailing" queries.
            </p>

            <form onSubmit={handleUpdateLimit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={newAllowanceLimit}
                  onChange={(e) => setNewAllowanceLimit(e.target.value)}
                  placeholder="Enter new cap (e.g. 800)"
                  className="w-full glass-input"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-sandy-gold to-coral-orange hover:brightness-110 text-white font-extrabold rounded-xl shadow transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Update Travel Allowance</span>
              </button>
            </form>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-sandy-gold/15 border border-sandy-gold/30 flex gap-3 text-xs text-gray-600 font-sans font-semibold">
            <ShieldAlert className="w-5 h-5 text-coral-orange shrink-0 animate-bounce" />
            <span>
              If voyage flight & lodging exceeds this allocation, Barnaby will signal a **Gold Deficit** verdict, preventing booking clearance.
            </span>
          </div>
        </div>

      </div>

      {/* SQL Table schema reference */}
      <div className="rounded-2xl glass-panel p-6 bg-white shadow-md">
        <div className="flex items-center gap-2 border-b border-sandy-gold/25 pb-3 mb-4">
          <Database className="w-5 h-5 text-treasure-brown" />
          <h4 className="font-extrabold text-treasure-brown font-sans text-sm tracking-wide">
            Coral Table inspect: budget.allowance
          </h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-gray-600">
            <thead>
              <tr className="border-b border-sandy-gold/20 text-coral-orange font-black">
                <th className="pb-2">CATEGORY</th>
                <th className="pb-2">TOTAL_LIMIT</th>
                <th className="pb-2">SPENT_AMOUNT</th>
                <th className="pb-2">REMAINING_LEDGER</th>
                <th className="pb-2">VAULT_LOCK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 py-2">
                <td className="py-2.5 text-treasure-brown font-extrabold">travel</td>
                <td className="py-2.5 font-bold">${budgetState.totalLimit}</td>
                <td className="py-2.5 font-bold">${totalSpent}</td>
                <td className="py-2.5 text-palm-green font-black">${budgetState.remaining}</td>
                <td className="py-2.5 text-ocean-blue font-bold">SECURE_GOLD_VAULT_01</td>
              </tr>
              <tr className="border-b border-gray-100 py-2 text-gray-400 font-semibold">
                <td className="py-2.5">provisions</td>
                <td className="py-2.5">$300</td>
                <td className="py-2.5">$180</td>
                <td className="py-2.5">$120</td>
                <td className="py-2.5">SECURE_FOOD_BOX_02</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
