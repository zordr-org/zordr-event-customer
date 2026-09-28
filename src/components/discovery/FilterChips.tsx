"use client";

import { IconSlidersHorizontal } from "@/components/ui/Icons";
import type { QuickFilter } from "@/lib/utils/event-filters";

interface FilterChipsProps {
  activeFilter: QuickFilter;
  onFilterChange: (filter: QuickFilter) => void;
  onOpenFilters: () => void;
  filterCount?: number;
}

const chips: {
  label: string;
  value: QuickFilter;
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Trending",
    value: "trending",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
  {
    label: "Near Me",
    value: "near",
  },
];

export function FilterChips({
  activeFilter,
  onFilterChange,
  onOpenFilters,
  filterCount = 0,
}: FilterChipsProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-2">
        {chips.map((chip) => {
          const active = activeFilter === chip.value;

          return (
            <button
              key={chip.value}
              type="button"
              aria-pressed={active}
              onClick={() => onFilterChange(chip.value)}
              className={[
                "flex h-9 items-center whitespace-nowrap rounded-full border px-4 text-[13px] font-medium transition-colors",
                active
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-foreground)]",
              ].join(" ")}
            >
              {chip.label}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onOpenFilters}
          className="flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-white px-4 text-[13px] font-medium text-[var(--color-foreground)]"
        >
          <IconSlidersHorizontal size={15} />

          <span>Filters</span>

          {filterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-bold text-white">
              {filterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
