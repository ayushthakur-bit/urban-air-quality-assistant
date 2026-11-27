import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onSend: (text: string) => void;
  isLoading: boolean;
}

/** Bottom chat submission bar with accessible input and send button. */
export const ChatInput: React.FC<ChatInputProps> = ({
  inputPrompt,
  setInputPrompt,
  onSend,
  isLoading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(inputPrompt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-surface)] flex gap-2"
    >
      <input
        type="text"
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        placeholder="Ask about safe ventilation timing, N95 masks, or DIY air filters..."
        aria-label="Message to AeroBot AI"
        disabled={isLoading}
        className="flex-1 px-4 py-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-placeholder)] focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all min-h-[44px]"
      />
      <button
        type="submit"
        disabled={!inputPrompt.trim() || isLoading}
        aria-label="Send Message"
        className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all min-h-[44px]"
      >
        <Send className="w-4 h-4" />
        <span className="hidden sm:inline">Send</span>
      </button>
    </form>
  );
};
