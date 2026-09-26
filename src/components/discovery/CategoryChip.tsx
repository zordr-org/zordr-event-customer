"use client";

import * as React from "react";

interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryChip({
  label,
  active = false,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
          : "bg-[var(--color-muted-background)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]"
      }`}
    >
      {label}
    </button>
  );
}
