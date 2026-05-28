import React from 'react';
import { Send, Terminal, Database, MessageSquare, Ship, Compass, ArrowRight, Coins } from 'lucide-react';
import { sampleQueries } from '../mockCoralEngine';

export default function AIChat({ chatHistory, onSend, activeQueryInfo }) {
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
      <div className="xl:col-span-2 flex flex-col justify-between rounded-2xl glass-panel border-[#F4C95D]/20 overflow-hidden bg-opacity-40">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-[#F4C95D]/10 flex items-center justify-between bg-[#0B3C5D]/30">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦜</span>
            <div>
              <h3 className="font-bold text-white">Barnaby, The AI Quartermaster</h3>
              <p className="text-xs text-palm-green font-mono flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-palm-green animate-ping"></span>
                Sailing Coordinates Locked & Ready
              </p>
            </div>
          </div>
          <Compass className="w-6 h-6 text-sandy-gold animate-spin [animation-duration:20s]" />
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <MessageSquare className="w-12 h-12 text-[#F4C95D]/30 mb-4 animate-bounce" />
              <h4 className="text-lg font-bold text-sandy-gold font-sans">State Yer Voyage, Captain!</h4>
              <p className="text-sm text-gray-400 mt-2 font-sans">
                Tell me where ye want to sail, yer total gold limit, or ask for weather charts. I'll scour the islands and return a full query ledger!
              </p>
              
              <div className="grid grid-cols-1 gap-2 w-full mt-6">
                {sampleQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputText(item.text)}
                    className="text-left text-xs p-3 rounded-xl bg-[#0B3C5D]/20 border border-[#F4C95D]/10 hover:border-sandy-gold/30 hover:bg-[#0B3C5D]/40 text-gray-300 transition-all font-mono"
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
                  
                  {/* Avatar */}
                  {!isUser && (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sandy-gold to-[#FF8C42] flex items-center justify-center text-xl shrink-0 shadow-md">
                      🦜
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] p-4 rounded-2xl shadow-lg border relative ${isUser ? 'bg-[#0B3C5D]/80 border-ocean-blue/30 text-white rounded-tr-none' : 'glass-panel border-[#F4C95D]/30 text-[#EAE1D5] rounded-tl-none bg-opacity-70'}`}>
                    
                    {/* Speaker Label */}
                    <span className="text-[10px] font-mono tracking-widest text-[#F4C95D]/60 block mb-1">
                      {isUser ? 'CAPTAIN' : 'QUARTERMASTER'}
                    </span>

                    <p className="text-sm leading-relaxed font-sans whitespace-pre-line">{msg.text}</p>
                    
                    {/* Simulated SQL Shortcut button inside bot responses */}
                    {msg.hasResults && (
                      <div className="mt-4 pt-3 border-t border-[#F4C95D]/10 flex flex-wrap gap-2">
                        <span className="text-xs px-3 py-1 bg-sandy-gold/15 text-sandy-gold border border-sandy-gold/20 rounded-full font-mono font-bold flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5" /> Coral Joined Flights & Hotels
                        </span>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-10 h-10 rounded-xl bg-[#0B3C5D] border border-ocean-blue/30 flex items-center justify-center text-xl shrink-0 font-bold text-sandy-gold font-sans shadow-md">
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
        <form onSubmit={handleSubmit} className="p-4 border-t border-[#F4C95D]/10 bg-[#0B3C5D]/30 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Whisper yer commands, Captain..."
            className="flex-1 glass-input bg-opacity-80 py-3 text-sm"
          />
          <button 
            type="submit" 
            className="px-6 bg-gradient-to-r from-sandy-gold to-[#FF8C42] hover:from-[#FF8C42] hover:to-sandy-gold text-[#5C4033] font-bold rounded-xl transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Right Column: SQL & Coral Live Engine Preview */}
      <div className="flex flex-col gap-6">
        
        {/* Coral SQL Query Preview Panel */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 overflow-hidden bg-opacity-50 flex-1 flex flex-col">
          <div className="px-5 py-4 border-b border-[#F4C95D]/10 bg-[#0B3C5D]/40 flex items-center gap-2.5">
            <Database className="w-5 h-5 text-sandy-gold shrink-0" />
            <h4 className="font-bold text-white font-sans text-sm tracking-wide">Coral SQL Cross-Source JOIN</h4>
          </div>

          <div className="p-5 font-mono text-xs text-cyan-400 bg-[#051329]/80 flex-1 overflow-auto max-h-[350px] lg:max-h-none border-b border-white/5 relative">
            <div className="absolute top-2 right-2 text-[10px] bg-sandy-gold/10 border border-sandy-gold/20 text-sandy-gold px-2 py-0.5 rounded font-mono">
              Live Inspector
            </div>
            
            {activeQueryInfo ? (
              <pre className="whitespace-pre-wrap leading-relaxed select-all selection:bg-sandy-gold/30">{activeQueryInfo.sql}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 max-w-[200px] mx-auto py-8">
                <Terminal className="w-8 h-8 text-gray-600 mb-2" />
                <span>No queries executed. Whisper a travel request to trigger the Coral cross-source engines.</span>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-[#0B3C5D]/20 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">ACTIVE SCHEMAS DETECTED:</span>
            <div className="flex flex-wrap gap-1.5">
              {['flights.search', 'hotels.search', 'weather.forecast', 'calendar.events', 'budget.allowance'].map((schema) => (
                <span key={schema} className="text-[10px] px-2 py-1 bg-[#051329] border border-ocean-blue/30 text-ocean-blue rounded font-mono">{schema}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Coral MCP Tool execution log */}
        <div className="rounded-2xl glass-panel border-[#F4C95D]/20 bg-opacity-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-sandy-gold" />
            <h4 className="font-bold text-white text-sm font-sans">Active MCP Tool Ledger</h4>
          </div>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed font-sans">
            Coral SQL communicates with live travel APIs through Model Context Protocol (MCP) server connectors.
          </p>

          <div className="space-y-3 font-mono text-[11px]">
            {[
              { tool: 'plan_trip', desc: 'Auto-join flights & hotels', active: activeQueryInfo ? true : false },
              { tool: 'check_weather', desc: 'Sync forecast with coordinates', active: activeQueryInfo ? true : false },
              { tool: 'verify_budget', desc: 'Validate chest gold caps', active: activeQueryInfo ? true : false },
              { tool: 'verify_calendar', desc: 'Check Google Calendar event blocks', active: activeQueryInfo ? true : false }
            ].map((t) => (
              <div key={t.tool} className="flex items-center justify-between p-2.5 rounded-lg bg-[#051329] border border-white/5">
                <div>
                  <span className="text-sandy-gold font-bold">{t.tool}</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">{t.desc}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${t.active ? 'bg-palm-green/20 text-palm-green border border-palm-green/30 animate-pulse' : 'bg-gray-800 text-gray-500 border border-gray-700'}`}>
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
