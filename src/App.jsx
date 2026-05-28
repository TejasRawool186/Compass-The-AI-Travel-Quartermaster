import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LandingHero from './components/LandingHero';
import AIChat from './components/AIChat';
import TreasureMap from './components/TreasureMap';
import Recommendations from './components/Recommendations';
import BudgetOverview from './components/BudgetOverview';
import WeatherDestination from './components/WeatherDestination';
import CaptainsLog from './components/CaptainsLog';
import { queryCoral } from './mockCoralEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [budgetState, setBudgetState] = useState({
    totalLimit: 500,
    spent: 460,
    remaining: 40
  });

  const [activeQueryInfo, setActiveQueryInfo] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [logEntries, setLogEntries] = useState([]);

  // Handles queries submitted from any input
  const handleSearch = (queryText) => {
    const data = queryCoral(queryText);
    
    // Update active query stats
    setActiveQueryInfo(data);
    
    // Add to chat history
    const userMsg = { sender: 'user', text: queryText, timestamp: data.timestamp };
    const botMsg = { sender: 'bot', text: data.verdict, timestamp: data.timestamp, hasResults: true };
    setChatHistory((prev) => [...prev, userMsg, botMsg]);

    // Append to Captain's journal log
    setLogEntries((prev) => [
      {
        timestamp: data.timestamp,
        destination: data.destination,
        verdict: data.verdict,
        sql: data.sql
      },
      ...prev
    ]);

    // Deduct budget if successful
    if (data.status === 'success') {
      const voyageCost = data.results[0].totalCost;
      setBudgetState((prev) => ({
        ...prev,
        remaining: prev.totalLimit - voyageCost
      }));
    }

    // Direct the Captain to the Results Screen tab
    setActiveTab('recommendations');
  };

  return (
    <div className="min-h-screen bg-[#051329] flex">
      {/* Navigation sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} budgetState={budgetState} />

      {/* Main Content Pane */}
      <main className="flex-1 lg:pl-72 pt-16 lg:pt-0 min-h-screen flex flex-col justify-between">
        <div className="flex-1 pb-10">
          
          {/* Header Dashboard Banner */}
          <header className="px-6 py-4 glass-panel border-[#F4C95D]/10 bg-opacity-20 flex justify-between items-center z-10 sticky top-0 hidden lg:flex">
            <div>
              <h2 className="text-lg font-bold text-white font-sans">Compass Deck</h2>
              <p className="text-[10px] text-ocean-blue font-mono tracking-wider">CORAL PERSONAL TRAVEL ASSISTANT</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-[9px] font-mono text-gray-400 block">SECTOR SPEED</span>
                <span className="text-xs text-palm-green font-bold font-mono">1.2s Cached query</span>
              </div>
              <div className="text-right border-l border-white/10 pl-6">
                <span className="text-[9px] font-mono text-gray-400 block">CREW CLEARANCE</span>
                <span className="text-xs text-sandy-gold font-bold font-mono">ALL SYSTEMS ACTIVE</span>
              </div>
            </div>
          </header>

          {/* Active View Router */}
          <div className="w-full">
            {activeTab === 'landing' && (
              <LandingHero onSearch={handleSearch} setActiveTab={setActiveTab} />
            )}
            
            {activeTab === 'chat' && (
              <AIChat 
                chatHistory={chatHistory} 
                onSend={handleSearch} 
                activeQueryInfo={activeQueryInfo} 
              />
            )}

            {activeTab === 'map' && (
              <TreasureMap onPortSelect={handleSearch} />
            )}

            {activeTab === 'recommendations' && (
              <Recommendations queryResult={activeQueryInfo} />
            )}

            {activeTab === 'budget' && (
              <BudgetOverview budgetState={budgetState} setBudgetState={setBudgetState} />
            )}

            {activeTab === 'weather' && (
              <WeatherDestination />
            )}

            {activeTab === 'log' && (
              <CaptainsLog logEntries={logEntries} />
            )}
          </div>

        </div>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-[#F4C95D]/5 text-center text-[10px] font-mono text-gray-500">
          <span>🏴‍☠️ COMPASS — CORAL PERSONAL TRAVEL QUARTERMASTER AGENT ENGINE 1.0.0 (HACKATHON BUILD)</span>
        </footer>
      </main>
    </div>
  );
}
