"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type {
  ExploreFilters,
  QuickFilter,
  SortKey,
} from "@/lib/utils/event-filters";

const VALID_QUICK_FILTERS: QuickFilter[] = [
  "all",
  "trending",
  "upcoming",
  "near",
  "featured",
];

const VALID_SORTS: SortKey[] = [
  "recommended",
  "date",
  "price-asc",
  "price-desc",
  "popular",
];

interface UpdateParams {
  q?: string;
  filter?: QuickFilter;
  category?: string[];
  sort?: SortKey;
  maxPrice?: number | undefined;
}

export function useExploreParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filters = useMemo<ExploreFilters>(() => {
    const q = searchParams.get("q") ?? "";

    const filterValue = searchParams.get("filter") ?? "all";

    const quick: QuickFilter = VALID_QUICK_FILTERS.includes(
      filterValue as QuickFilter,
    )
      ? (filterValue as QuickFilter)
      : "all";

    const categoryValue = searchParams.get("category") ?? "";

    const categories = categoryValue
      .split(",")
      .map((category) => category.trim())
      .filter(Boolean);

    const sortValue = searchParams.get("sort") ?? "recommended";

    const sort: SortKey = VALID_SORTS.includes(sortValue as SortKey)
      ? (sortValue as SortKey)
      : "recommended";

    const maxPriceValue = searchParams.get("maxPrice");

    const parsedMaxPrice = maxPriceValue ? Number(maxPriceValue) : undefined;

    const maxPrice =
      parsedMaxPrice !== undefined &&
      Number.isFinite(parsedMaxPrice) &&
      parsedMaxPrice >= 0
        ? parsedMaxPrice
        : undefined;

    return {
      q,
      quick,
      categories,
      maxPrice,
      sort,
    };
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: UpdateParams) => {
      const params = new URLSearchParams(searchParams.toString());

      /*
       * Search
       */
      if (updates.q !== undefined) {
        const value = updates.q.trim();

        if (value) {
          params.set("q", value);
        } else {
          params.delete("q");
        }
      }

      /*
       * Quick filter
       */
      if (updates.filter !== undefined) {
        if (updates.filter === "all") {
          params.delete("filter");
        } else {
          params.set("filter", updates.filter);
        }
      }

      /*
       * Categories
       */
      if (updates.category !== undefined) {
        if (updates.category.length > 0) {
          params.set("category", updates.category.join(","));
        } else {
          params.delete("category");
        }
      }

      /*
       * Sort
       */
      if (updates.sort !== undefined) {
        if (updates.sort === "recommended") {
          params.delete("sort");
        } else {
          params.set("sort", updates.sort);
        }
      }

      /*
       * Maximum price
       */
      if (updates.maxPrice !== undefined) {
        params.set("maxPrice", String(updates.maxPrice));
      }

      /*
       * If maxPrice is intentionally reset,
       * ExploreScreen passes undefined.
       */
      if (
        Object.prototype.hasOwnProperty.call(updates, "maxPrice") &&
        updates.maxPrice === undefined
      ) {
        params.delete("maxPrice");
      }

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return {
    filters,
    updateParams,
  };
}
