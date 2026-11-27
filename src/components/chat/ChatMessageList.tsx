import React from 'react';
import { Bot, User, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../../types';
import { SuggestedPrompts } from './SuggestedPrompts';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSelectPrompt: (prompt: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

/** Render list of conversational bubbles with impact metrics and prompt suggestions. */
export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  onSelectPrompt,
  messagesEndRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.role === 'assistant' && (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
          )}

          <div
            className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
              msg.role === 'user'
                ? 'bg-[#3b82f6] text-white'
                : 'bg-[var(--color-bg-base)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
            }`}
          >
            <div className="whitespace-pre-line prose dark:prose-invert max-w-none text-sm">{msg.content}</div>

            {msg.impactData && (
              <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-wrap gap-2 text-xs">
                {msg.impactData.exposureSavedPct && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {msg.impactData.exposureSavedPct}% Exposure Avoided
                  </span>
                )}
                {msg.impactData.pm25Avoided && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold border border-blue-500/20">
                    Avoids {msg.impactData.pm25Avoided} µg/m³ PM2.5
                  </span>
                )}
              </div>
            )}

            <SuggestedPrompts suggestions={msg.suggestions} onSelectPrompt={onSelectPrompt} />
          </div>

          {msg.role === 'user' && (
            <div className="w-8 h-8 rounded-xl bg-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
            <Bot className="w-4 h-4" />
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AeroBot is formulating atmospheric health guidance...</span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
