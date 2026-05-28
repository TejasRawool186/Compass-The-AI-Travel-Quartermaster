import React from 'react';
import { Send, Terminal, Database, MessageSquare, Ship, Compass, ArrowRight, Coins } from 'lucide-react';
import parrotImg from '../assets/parrot.png';

export default function AIChat({ chatHistory, onSend, activeQueryInfo, presets = [], isSearching = false }) {
  const [inputText, setInputText] = React.useState('');
  const chatEndRef = React.useRef(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSend(inputText);
      setInputText('');
    }
  };

  return (
    <div className="h-[88vh] grid grid-cols-1 xl:grid-cols-3 gap-6 p-4 lg:p-6">
      
      {/* Left 2 Columns: Chat Thread */}
      <div className="xl:col-span-2 flex flex-col justify-between rounded-2xl glass-panel overflow-hidden bg-white/70">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-sandy-gold/20 flex items-center justify-between bg-gradient-to-r from-sandy-gold/20 to-ocean-blue/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-sandy-gold bg-white relative">
              <img src={parrotImg} alt="Barnaby Mascot" className="w-full h-full object-cover scale-110" />
            </div>
            <div>
              <h3 className="font-extrabold text-treasure-brown text-base">Barnaby, The AI Quartermaster</h3>
              <p className="text-xs text-palm-green font-bold font-mono flex items-center gap-1.5 mt-0.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-palm-green"></span>
                Active Voyage Ledger Hooked
              </p>
            </div>
          </div>
          <Compass className="w-6 h-6 text-treasure-brown animate-spin [animation-duration:20s]" />
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <MessageSquare className="w-12 h-12 text-coral-orange/40 mb-4 animate-bounce" />
              <h4 className="text-lg font-extrabold text-treasure-brown font-sans">State Yer Voyage, Captain!</h4>
              <p className="text-sm text-gray-600 mt-2 font-sans font-medium">
                Tell me where ye want to sail, yer total gold limit, or ask for weather charts. I'll scour the islands and return a full query ledger!
              </p>
              
              <div className="grid grid-cols-1 gap-2 w-full mt-6">
                {presets.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputText(item.text)}
                    className="text-left text-xs p-3 rounded-xl bg-sandy-gold/10 border border-sandy-gold/30 hover:border-coral-orange hover:bg-sandy-gold/20 text-treasure-brown transition-all font-mono font-bold"
                  >
                    ⚓ "{item.text}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            chatHistory.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={index} className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Bot Avatar (AI Image) */}
                  {!isUser && (
                    <div className="w-10 h-10 rounded-xl border-2 border-sandy-gold overflow-hidden bg-white shrink-0 shadow-md">
                      <img src={parrotImg} alt="Barnaby" className="w-full h-full object-cover scale-115" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] p-4 rounded-2xl shadow-lg border relative ${isUser ? 'bg-gradient-to-tr from-[#0B3C5D] to-[#12507A] border-ocean-blue/30 text-white rounded-tr-none' : 'glass-panel text-treasure-brown rounded-tl-none bg-white bg-opacity-95'}`}>
                    
                    {/* Speaker Label */}
                    <span className={`text-[9px] font-mono tracking-widest font-bold block mb-1.5 ${isUser ? 'text-sandy-gold/70' : 'text-coral-orange/80'}`}>
                      {isUser ? 'CAPTAIN' : 'QUARTERMASTER'}
                    </span>

                    <p className={`text-sm leading-relaxed font-sans font-semibold whitespace-pre-line ${isUser ? 'text-white' : 'text-gray-800'}`}>{msg.text}</p>
                    
                    {/* Simulated SQL Shortcut button inside bot responses */}
                    {msg.hasResults && (
                      <div className="mt-4 pt-3 border-t border-sandy-gold/20 flex flex-wrap gap-2">
                        <span className="text-[10px] px-3 py-1 bg-sandy-gold/20 text-treasure-brown border border-sandy-gold/30 rounded-full font-mono font-bold flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-coral-orange" /> Coral Joined Flights & Hotels
                        </span>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sandy-gold to-coral-orange border-2 border-white flex items-center justify-center text-xl shrink-0 font-bold text-white font-sans shadow-md">
                      ☠️
                    </div>
                  )}

                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-sandy-gold/20 bg-white flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Whisper yer commands, Captain..."
            className="flex-1 glass-input bg-opacity-90 py-3 text-sm font-semibold"
          />
          <button 
            type="submit" 
            className="px-6 bg-gradient-to-r from-sandy-gold to-coral-orange hover:from-coral-orange hover:to-sandy-gold text-white font-extrabold rounded-xl transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center"
          >
            {isSearching ? '...' : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>

      {/* Right Column: SQL & Coral Live Engine Preview */}
      <div className="flex flex-col gap-6">
        
        {/* Coral SQL Query Preview Panel */}
        <div className="rounded-2xl glass-panel overflow-hidden bg-white/70 flex-1 flex flex-col">
          <div className="px-5 py-4 border-b border-sandy-gold/20 bg-gradient-to-r from-sandy-gold/15 to-transparent flex items-center gap-2.5">
            <Database className="w-5 h-5 text-treasure-brown shrink-0" />
            <h4 className="font-extrabold text-treasure-brown font-sans text-sm tracking-wide">Coral SQL Query</h4>
          </div>

          <div className="p-5 font-mono text-xs text-white bg-[#051329] flex-1 overflow-auto max-h-[350px] lg:max-h-none border-b border-white/5 relative">
            <div className="absolute top-2 right-2 text-[10px] bg-sandy-gold/10 border border-sandy-gold/20 text-sandy-gold px-2 py-0.5 rounded font-mono">
              Live Console
            </div>
            
            {activeQueryInfo ? (
              <pre className="whitespace-pre-wrap leading-relaxed select-all selection:bg-sandy-gold/30">{activeQueryInfo.sql}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 max-w-[200px] mx-auto py-8">
                <Terminal className="w-8 h-8 text-gray-600 mb-2" />
                <span className="font-sans text-[11px] font-semibold text-gray-400">No queries executed yet. Search a voyage to run Coral SQL.</span>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-sandy-gold/10 flex flex-col gap-2.5 border-t border-sandy-gold/20">
            <span className="text-[9px] font-mono text-treasure-brown font-bold tracking-wider">SCHEMAS ONLINE:</span>
            <div className="flex flex-wrap gap-1">
              {['flights.search', 'hotels.search', 'weather.forecast', 'calendar.events', 'budget.allowance'].map((schema) => (
                <span key={schema} className="text-[9px] px-2 py-1 bg-white/80 border border-sandy-gold/45 text-treasure-brown rounded font-mono font-bold">{schema}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Coral MCP Tool execution log */}
        <div className="rounded-2xl glass-panel p-5 bg-white/70">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-treasure-brown" />
            <h4 className="font-extrabold text-treasure-brown text-sm font-sans">Active MCP Tool Ledger</h4>
          </div>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed font-sans font-semibold">
            Coral SQL communicates with live travel APIs through Model Context Protocol (MCP) server connectors.
          </p>

          <div className="space-y-3 font-mono text-[10px]">
            {[
              { tool: 'plan_trip', desc: 'Auto-join flights & hotels', active: activeQueryInfo ? true : false },
              { tool: 'check_weather', desc: 'Sync forecast with coordinates', active: activeQueryInfo ? true : false },
              { tool: 'verify_budget', desc: 'Validate chest gold caps', active: activeQueryInfo ? true : false },
              { tool: 'verify_calendar', desc: 'Check Google Calendar event blocks', active: activeQueryInfo ? true : false }
            ].map((t) => (
              <div key={t.tool} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-sandy-gold/30">
                <div>
                  <span className="text-treasure-brown font-bold">{t.tool}</span>
                  <p className="text-[9px] text-gray-500 mt-0.5">{t.desc}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${t.active ? 'bg-palm-green/20 text-palm-green border border-palm-green/30 animate-pulse' : 'bg-gray-150 text-gray-400 border border-gray-200'}`}>
                  {t.active ? 'EXECUTED' : 'STANDBY'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
