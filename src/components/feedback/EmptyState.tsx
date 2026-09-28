"use client";

import { IconSearch } from "@/components/ui/Icons";

interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="rounded-lg bg-[#edfcf5] px-5 py-8 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm">
        <IconSearch size={19} />
      </div>

      <h2 className="mt-3 text-[15px] font-bold text-[#10183a]">
        No events found
      </h2>

      <p className="mt-1 text-[13px] text-[#5d6a85]">
        Try changing your search or filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-4 h-9 rounded-lg bg-[var(--color-primary)] px-4 text-[13px] font-semibold text-white"
      >
        Clear filters
      </button>
    </div>
  );
}
