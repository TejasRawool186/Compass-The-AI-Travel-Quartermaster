import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import LandingHero from './components/LandingHero';
import AIChat from './components/AIChat';
import TreasureMap from './components/TreasureMap';
import Recommendations from './components/Recommendations';
import BudgetOverview from './components/BudgetOverview';
import WeatherDestination from './components/WeatherDestination';
import CaptainsLog from './components/CaptainsLog';
import { getBudget, getCalendarSnapshot, getHealth, getPorts, getPresets, getWeatherSnapshot, planTrip, reserveTrip, updateBudget } from './services/api';
import { portFallbacks, presetFallbacks } from './constants/pirateData';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [budgetState, setBudgetState] = useState({
    totalLimit: 500,
    spent: 0,
    remaining: 500,
    reservations: []
  });
  const [activeQueryInfo, setActiveQueryInfo] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [logEntries, setLogEntries] = useState([]);
  const [presets, setPresets] = useState(presetFallbacks);
  const [ports, setPorts] = useState(portFallbacks);
  const [weatherItems, setWeatherItems] = useState([]);
  const [calendarItems, setCalendarItems] = useState([]);
  const [providerStatus, setProviderStatus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        const [budget, presetItems, portItems, weather, calendar, health] = await Promise.all([
          getBudget(),
          getPresets().catch(() => presetFallbacks),
          getPorts().catch(() => portFallbacks),
          getWeatherSnapshot().catch(() => []),
          getCalendarSnapshot().catch(() => []),
          getHealth().catch(() => null)
        ]);

        if (!isMounted) {
          return;
        }

        setBudgetState(budget);
        setPresets(presetItems.length ? presetItems : presetFallbacks);
        setPorts(portItems.length ? portItems : portFallbacks);
        setWeatherItems(weather);
        setCalendarItems(calendar);
        setProviderStatus(health?.providers || null);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setPageError(error.message);
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshBudget = async () => {
    const latestBudget = await getBudget();
    setBudgetState(latestBudget);
    return latestBudget;
  };

  const refreshOperationalData = async () => {
    const [weather, calendar] = await Promise.all([
      getWeatherSnapshot().catch(() => []),
      getCalendarSnapshot().catch(() => [])
    ]);
    setWeatherItems(weather);
    setCalendarItems(calendar);
  };

  const handleSearch = async (queryText) => {
    setIsSearching(true);
    setPageError('');
    try {
      const data = await planTrip(queryText, budgetState.totalLimit);
      setActiveQueryInfo(data);

      const userMsg = { sender: 'user', text: queryText, timestamp: data.timestamp };
      const botMsg = { sender: 'bot', text: data.verdict, timestamp: data.timestamp, hasResults: true };
      setChatHistory((prev) => [...prev, userMsg, botMsg]);

      setLogEntries((prev) => [
        {
          timestamp: data.timestamp,
          destination: data.destination,
          verdict: data.verdict,
          sql: data.sql
        },
        ...prev
      ]);

      if (data.budget) {
        setBudgetState((prev) => ({
          ...prev,
          ...data.budget
        }));
      }

      await refreshOperationalData();
      setActiveTab('recommendations');
    } catch (error) {
      setPageError(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBudgetUpdate = async (nextLimit) => {
    const updated = await updateBudget(nextLimit);
    setBudgetState(updated);
  };

  const handleReserveTrip = async () => {
    if (!activeQueryInfo?.results?.[0]) {
      return;
    }
    const reservation = {
      ...activeQueryInfo.results[0],
      reservedAt: new Date().toISOString()
    };
    await reserveTrip(reservation);
    await refreshBudget();
  };

  return (
    <div className="min-h-screen pirate-app-shell">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} budgetState={budgetState} />

      <main className="pirate-main-content">
        <div className="flex-1 pb-8">
          <header className="hidden lg:flex items-center justify-between px-8 pt-28 pb-4">
            <div>
              <p className="pirate-kicker">Caribbean route planner</p>
              <h2 className="text-2xl font-semibold text-[#4b275d]">Compass Treasure Deck</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="pirate-status-pill">
                <span className="text-[10px] uppercase tracking-[0.3em]">Sea state</span>
                <strong className="text-[#1b8b85]">
                  {providerStatus?.openweather ? 'Live weather' : 'Setup required'}
                </strong>
              </div>
              <div className="pirate-status-pill">
                <span className="text-[10px] uppercase tracking-[0.3em]">Budget hold</span>
                <strong className="text-[#d86f20]">${budgetState.remaining} left</strong>
              </div>
            </div>
          </header>

          {pageError && (
            <div className="mx-4 mb-4 rounded-2xl border border-[#f3a76d] bg-white/80 px-5 py-4 text-sm text-[#8d4b22] shadow-sm lg:mx-8">
              {pageError}
            </div>
          )}

          <div className="w-full">
            {activeTab === 'landing' && (
              <LandingHero
                onSearch={handleSearch}
                setActiveTab={setActiveTab}
                presets={presets}
                isSearching={isSearching}
              />
            )}

            {activeTab === 'chat' && (
              <AIChat
                chatHistory={chatHistory}
                onSend={handleSearch}
                activeQueryInfo={activeQueryInfo}
                presets={presets}
                isSearching={isSearching}
              />
            )}

            {activeTab === 'map' && (
              <TreasureMap
                ports={ports}
                onPortSelect={handleSearch}
                activeQueryInfo={activeQueryInfo}
                isSearching={isSearching}
              />
            )}

            {activeTab === 'recommendations' && (
              <Recommendations
                queryResult={activeQueryInfo}
                onReserve={handleReserveTrip}
                isReserving={false}
              />
            )}

            {activeTab === 'budget' && (
              <BudgetOverview budgetState={budgetState} onUpdateBudget={handleBudgetUpdate} />
            )}

            {activeTab === 'weather' && (
              <WeatherDestination
                weatherPorts={weatherItems}
                calendarLedger={calendarItems}
                providerStatus={providerStatus}
              />
            )}

            {activeTab === 'log' && (
              <CaptainsLog logEntries={logEntries} />
            )}
          </div>
        </div>

        <footer className="px-6 py-5 text-center text-[11px] tracking-[0.2em] uppercase text-[#744d3d]/70">
          Compass | Coral personal travel quartermaster
        </footer>
      </main>
    </div>
  );
}
