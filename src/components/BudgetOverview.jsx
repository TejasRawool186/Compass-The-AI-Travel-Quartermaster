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
        <h3 className="text-xl font-bold text-white font-sans">Treasure Budget</h3>
        <p className="text-xs text-gray-400 font-sans mt-0.5">Track yer gold coins and sailing allowances through Coral's budget.allowance tables.</p>
      </div>

      {/* Top 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Gold Limit */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 flex items-center justify-between bg-[#0B3C5D]/30 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-sandy-gold/5 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300"></div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Treasure Allowance Limit</span>
            <span className="text-2xl font-bold text-white font-mono mt-1 block">${budgetState.totalLimit} gold doubloons</span>
            <span className="text-xs text-gray-500 font-sans mt-1.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-palm-green" /> Season Allocation Cap
            </span>
          </div>
          <Coins className="w-10 h-10 text-sandy-gold shrink-0 opacity-70 group-hover:rotate-12 transition-transform duration-300" />
        </div>

        {/* Card 2: Total Spent */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 flex items-center justify-between bg-[#0B3C5D]/30 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-coral-orange/5 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300"></div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Sailed Out Doubloons</span>
            <span className="text-2xl font-bold text-white font-mono mt-1 block">${totalSpent} spent</span>
            <span className="text-xs text-gray-500 font-sans mt-1.5 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5 text-ocean-blue" /> 4 Transactions Recorded
            </span>
          </div>
          <Coins className="w-10 h-10 text-coral-orange shrink-0 opacity-70 group-hover:rotate-12 transition-transform duration-300" />
        </div>

        {/* Card 3: Remaining Chest Gold */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 flex items-center justify-between bg-[#0B3C5D]/30 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-palm-green/5 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300"></div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Chest Balance (Remaining)</span>
            <span className="text-2xl font-bold text-sandy-gold font-mono mt-1 block">${budgetState.remaining} doubloons</span>
            <span className="text-xs text-palm-green font-sans mt-1.5 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> Clear of Debt Squalls
            </span>
          </div>
          <Coins className="w-10 h-10 text-palm-green shrink-0 opacity-70 group-hover:rotate-12 transition-transform duration-300" />
        </div>

      </div>

      {/* Categories & SQL Ledger Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Spend distribution list */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-opacity-40">
          <h4 className="font-bold text-white font-sans text-sm tracking-wide border-b border-[#F4C95D]/10 pb-3 mb-4">
            Gold Distribution By Sector
          </h4>
          
          <div className="space-y-4">
            {spendCategories.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="text-gray-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    {cat.name}
                  </span>
                  <span className="font-bold font-mono text-[#EAE1D5]">${cat.spent} doubloons ({(cat.spent / totalSpent * 100).toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-[#051329] h-2 rounded-full overflow-hidden border border-white/5">
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
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-opacity-40 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-white font-sans text-sm tracking-wide border-b border-[#F4C95D]/10 pb-3 mb-4">
              Provision Ledger Adjuster
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
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
                className="w-full py-3 bg-gradient-to-r from-sandy-gold to-[#FF8C42] hover:brightness-110 text-[#5C4033] font-bold rounded-xl shadow transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Update Travel Allowance</span>
              </button>
            </form>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#051329] border border-white/5 flex gap-3 text-xs text-gray-400 font-sans">
            <ShieldAlert className="w-5 h-5 text-sandy-gold shrink-0" />
            <span>
              If voyage flight & lodging exceeds this allocation, Barnaby will signal a **Gold Deficit** verdict, preventing booking clearance.
            </span>
          </div>
        </div>

      </div>

      {/* SQL Table schema reference */}
      <div className="rounded-2xl glass-panel border-[#F4C95D]/20 p-6 bg-opacity-40">
        <div className="flex items-center gap-2 border-b border-[#F4C95D]/10 pb-3 mb-4">
          <Database className="w-5 h-5 text-sandy-gold" />
          <h4 className="font-bold text-white font-sans text-sm tracking-wide">
            Coral Table inspect: budget.allowance
          </h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-gray-300">
            <thead>
              <tr className="border-b border-white/10 text-sandy-gold">
                <th className="pb-2">CATEGORY</th>
                <th className="pb-2">TOTAL_LIMIT</th>
                <th className="pb-2">SPENT_AMOUNT</th>
                <th className="pb-2">REMAINING_LEDGER</th>
                <th className="pb-2">VAULT_LOCK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 py-2">
                <td className="py-2.5 text-white">travel</td>
                <td className="py-2.5">${budgetState.totalLimit}</td>
                <td className="py-2.5">${totalSpent}</td>
                <td className="py-2.5 text-palm-green font-bold">${budgetState.remaining}</td>
                <td className="py-2.5 text-ocean-blue">SECURE_GOLD_VAULT_01</td>
              </tr>
              <tr className="border-b border-white/5 py-2 text-gray-500">
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
