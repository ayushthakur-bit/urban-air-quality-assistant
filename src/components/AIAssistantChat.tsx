import React, { useState, useRef, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import { ChatMessage, CityAirData } from '../types';
import { SmogAIService } from '../services/aiService';
import { ChatMessageList } from './chat/ChatMessageList';
import { ChatInput } from './chat/ChatInput';
import { createWelcomeMessage } from './chat/chatHelpers';

interface AIAssistantChatProps {
  city: CityAirData;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AeroBot GenAI Assistant modal dialog providing atmospheric physics explanations,
 * thermal inversion guidance, and tailored DIY mitigation tactics.
 */
export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ city, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([createWelcomeMessage(city)]);
    }
  }, [isOpen, city]);

  useEffect(() => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

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
      const aiResponse = await SmogAIService.askAeroBot(sanitized, city);
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
        content: '⚠️ I encountered an error communicating with the reasoning engine. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-advisor-title"
    >
      <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl max-w-2xl w-full h-[85vh] sm:h-[680px] flex flex-col overflow-hidden text-[var(--color-text-primary)]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--color-border)] flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="ai-advisor-title" className="font-bold text-base sm:text-lg text-[var(--color-text-primary)]">
                  AeroBot AI Smog Advisor
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                  GenAI Verified
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Synchronized with live atmospheric telemetry for {city.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-base)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close AI Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Feed */}
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          onSelectPrompt={handleSendMessage}
          messagesEndRef={messagesEndRef}
        />

        {/* Bottom Input */}
        <ChatInput
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          onSend={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
