import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 animate-pulse" aria-hidden="true">
      {/* Live AQI Card Skeleton */}
      <div className="clean-card p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="w-56 h-36 rounded-2xl bg-[var(--color-border)]/60" />
          <div className="flex-1 w-full space-y-3">
            <div className="h-6 w-32 rounded-full bg-[var(--color-border)]/60" />
            <div className="h-8 w-48 rounded-xl bg-[var(--color-border)]/60" />
            <div className="h-4 w-40 rounded-lg bg-[var(--color-border)]/60" />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="h-16 rounded-xl bg-[var(--color-border)]/60" />
              <div className="h-16 rounded-xl bg-[var(--color-border)]/60" />
              <div className="h-16 rounded-xl bg-[var(--color-border)]/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
