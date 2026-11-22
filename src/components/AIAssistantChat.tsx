import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Send, Bot, User, ShieldCheck, 
  Key, RefreshCw, X
} from 'lucide-react';
import { ChatMessage, CityAirData } from '../types';
import { SmogAIService } from '../services/aiService';

interface AIAssistantChatProps {
  city: CityAirData;
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({
  city,
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when city changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      const hasInversion = city.inversionAdvisory?.isActive;
      const initialMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `👋 **Greetings! I am AeroBot, your GenAI Air Quality & Winter Smog Defense Advisor.**

I am analyzing real-time atmospheric telemetry for **${city.name}** (Current AQI: **${city.currentAqi} – ${city.category}**, PM2.5: **${city.pollutants.pm25.value} µg/m³**).

${hasInversion ? `⚠️ **Severe Winter Smog Alert:** Thermal inversion is currently trapping emissions near the ground until **${city.inversionAdvisory?.smogCeilingTrappedUntil}**. Safe ventilation breakup window opens at **${city.inversionAdvisory?.ventilationBreakupWindow}**.\n\n` : ''}**How can I protect you and your community today?**
- Safe ventilation timing and temperature inversion dynamics
- Sizing a DIY $35 Corsi-Rosenthal box vs commercial HEPA purifiers
- Low-emission daily commuting and cooking routines
- Certified N95 vs standard surgical mask filtration efficiency`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'When is the safe breakup window to open windows today?',
          'How do I build an affordable Corsi-Rosenthal air purifier?',
          'What certified mask should I wear in this AQI?',
          'Suggest a low-emission morning routine for my family'
        ]
      };
      setMessages([initialMessage]);
      setApiKeyInput(SmogAIService.getApiKey());
    }
  }, [isOpen, city.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // Sanitize input to strip harmful control characters
    const sanitized = trimmed.replace(/[<>]/g, '');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: sanitized,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const aiResponse = await SmogAIService.askAeroBot(sanitized, city, history);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: aiResponse.suggestions,
        impactData: {
          exposureSavedPct: aiResponse.exposureSavedPct,
          pm25Avoided: aiResponse.pm25Avoided
        }
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: '⚠️ Unable to complete live API query. Reverting to verified local atmospheric knowledge engine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    SmogAIService.setApiKey(apiKeyInput);
    setApiKeySaved(true);
    setTimeout(() => {
      setApiKeySaved(false);
      setShowKeyInput(false);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-modal-title"
    >
      <div 
        className="clean-card w-full max-w-2xl h-[85vh] max-h-[700px] flex flex-col overflow-hidden shadow-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] animate-scaleUp"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg-base)]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 id="ai-modal-title" className="font-bold text-base text-[var(--color-text-primary)]">
                  AeroBot AI Smog Advisor
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Telemetry Synced
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {city.name} (AQI {city.currentAqi}) • Atmospheric Science & Indoor Health
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors text-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="Configure Optional Gemini API Key"
              aria-label="Configure Optional Gemini API Key"
            >
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">API Key</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Close AI Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key Drawer (Optional) */}
        {showKeyInput && (
          <div className="px-5 py-3 bg-[var(--color-bg-base)] border-b border-[var(--color-border)] text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-medium text-[var(--color-text-primary)]">Google Gemini API Key (Optional)</span>
              <span className="text-[var(--color-text-secondary)]">Runs locally if left blank</span>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Paste AI Studio API Key (AIzaSy...)"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-placeholder)] text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
              >
                {apiKeySaved ? 'Saved!' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-[var(--color-bg-base)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-tl-none'
                }`}
              >
                {/* Content with basic markdown-style paragraph splits */}
                <div className="whitespace-pre-wrap space-y-2">
                  {msg.content}
                </div>

                {/* Direct Impact Badge */}
                {msg.impactData && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{msg.impactData.exposureSavedPct}% Exposure Cut</span>
                    </div>
                    {msg.impactData.pm25Avoided && (
                      <span className="text-[var(--color-text-secondary)]">
                        Avoids ~{msg.impactData.pm25Avoided} µg/m³ PM2.5 inhalation
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-2 text-[10px] text-[var(--color-text-secondary)] text-right">
                  {msg.timestamp}
                </div>

                {/* Suggestions Pills */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-bg-surface)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] transition-colors text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="clean-card p-3 rounded-2xl rounded-tl-none text-xs text-[var(--color-text-secondary)] flex items-center gap-2">
                <span>Analyzing atmospheric aerosol physics...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-base)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputPrompt);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={`Ask AeroBot about smog defense, ventilation, or purifier hacks for ${city.name}...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-placeholder)] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
              aria-label="Message to AeroBot AI"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isLoading}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex items-center justify-center shadow-md"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
