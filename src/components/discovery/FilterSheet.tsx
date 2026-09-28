"use client";

import { useEffect, useMemo, useState } from "react";
import { IconX } from "@/components/ui/Icons";
import { EVENT_CATEGORIES } from "@/lib/utils/category";

interface FilterSheetProps {
  open: boolean;
  selectedCategories: string[];
  maxPrice?: number;
  resultCount: number;
  onApply: (filters: { categories: string[]; maxPrice?: number }) => void;
  onClose: () => void;
}

const PRICE_OPTIONS = [
  { label: "Any price", value: undefined },
  { label: "≤ ₹200", value: 20000 },
  { label: "≤ ₹500", value: 50000 },
  { label: "≤ ₹1000", value: 100000 },
];

export function FilterSheet({
  open,
  selectedCategories,
  maxPrice,
  resultCount,
  onApply,
  onClose,
}: FilterSheetProps) {
  const [categories, setCategories] = useState<string[]>(selectedCategories);

  const [price, setPrice] = useState<number | undefined>(maxPrice);

  useEffect(() => {
    if (!open) {
      return;
    }

    setCategories(selectedCategories);
    setPrice(maxPrice);
  }, [open, selectedCategories, maxPrice]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const filterCount = useMemo(() => {
    return categories.length + (price !== undefined ? 1 : 0);
  }, [categories, price]);

  if (!open) {
    return null;
  }

  const toggleCategory = (category: string) => {
    setCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const reset = () => {
    setCategories([]);
    setPrice(undefined);
  };

  const apply = () => {
    onApply({
      categories,
      maxPrice: price,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#10183a]/40"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-sheet-title"
        className="absolute inset-x-0 bottom-0 mx-auto max-w-[600px] rounded-t-2xl bg-white px-4 pb-5 pt-4 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              id="filter-sheet-title"
              className="text-[18px] font-bold text-[#10183a]"
            >
              Filters
            </h2>

            {filterCount > 0 && (
              <p className="mt-0.5 text-[12px] text-[#5d6a85]">
                {filterCount} filter
                {filterCount === 1 ? "" : "s"} selected
              </p>
            )}
          </div>

          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5"
          >
            <IconX size={19} />
          </button>
        </div>

        <div className="mt-5">
          <h3 className="text-[14px] font-semibold text-[#10183a]">
            Categories
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {EVENT_CATEGORIES.map((category) => {
              const selected = categories.includes(category);

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleCategory(category)}
                  className={[
                    "h-9 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                    selected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-[var(--color-border)] bg-white text-[#10183a]",
                  ].join(" ")}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-[14px] font-semibold text-[#10183a]">
            Maximum price
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {PRICE_OPTIONS.map((option) => {
              const selected = price === option.value;

              return (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setPrice(option.value)}
                  className={[
                    "h-10 rounded-lg border text-[13px] font-medium",
                    selected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                      : "border-[var(--color-border)] bg-white text-[#10183a]",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="h-11 flex-1 rounded-lg border border-[var(--color-border)] text-[13px] font-semibold text-[#10183a]"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={apply}
            className="h-11 flex-[2] rounded-lg bg-[#0aae6b] text-[13px] font-semibold text-white"
          >
            Show {resultCount} {resultCount === 1 ? "event" : "events"}
          </button>
        </div>
      </section>
    </div>
  );
}
