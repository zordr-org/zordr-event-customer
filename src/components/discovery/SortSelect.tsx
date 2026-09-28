"use client";

import type { SortKey } from "@/lib/utils/event-filters";

interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        aria-label="Sort events"
        className="h-9 appearance-none rounded-lg border border-[var(--color-border)] bg-white py-0 pl-3 pr-8 text-[12px] font-medium text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)]"
      >
        <option value="recommended">Sort: Recommended</option>
        <option value="date">Sort: Date</option>
        <option value="price-asc">Sort: Price: Low to High</option>
        <option value="price-desc">Sort: Price: High to Low</option>
        <option value="popular">Sort: Popular</option>
      </select>

      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[11px]">
        ▾
      </span>
    </div>
  );
}
