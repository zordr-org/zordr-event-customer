"use client";

import { IconSearch, IconX } from "@/components/ui/Icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <IconSearch
        size={19}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search events or organizers…"
        aria-label="Search events or organizers"
        className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white pl-10 pr-10 text-[14px] text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
      />

      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-black/5"
        >
          <IconX size={16} />
        </button>
      )}
    </div>
  );
}
