import React from 'react';

interface SuggestedPromptsProps {
  suggestions?: string[];
  onSelectPrompt: (prompt: string) => void;
}

/** Clickable prompt pills for quick community air quality inquiries. */
export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ suggestions, onSelectPrompt }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {suggestions.map((item, idx) => (
        <button
          key={idx}
          onClick={() => onSelectPrompt(item)}
          className="text-xs px-3 py-1.5 rounded-xl bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 border border-[var(--color-border)] hover:border-[#3b82f6]/30 text-left transition-all"
        >
          {item}
        </button>
      ))}
    </div>
  );
};
