"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { EventGrid } from "@/components/discovery/EventGrid";
import { ExploreSkeleton } from "@/components/discovery/ExploreSkeleton";
import { FilterChips } from "@/components/discovery/FilterChips";
import { FilterSheet } from "@/components/discovery/FilterSheet";
import { SearchBar } from "@/components/discovery/SearchBar";
import { SortSelect } from "@/components/discovery/SortSelect";
import { EmptyState } from "@/components/feedback/EmptyState";

import { mockEvents } from "@/app/home-data";

import {
  applyExploreFilters,
  type QuickFilter,
} from "@/lib/utils/event-filters";

import { useExploreParams } from "@/lib/hooks/useExploreParams";

import { getMockUser, toggleLikedEvent } from "@/lib/mock-api";

interface Coordinates {
  lat: number;
  lng: number;
}

export function ExploreScreen() {
  const { filters, updateParams } = useExploreParams();

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const [searchValue, setSearchValue] = useState(filters.q);

  const [coordinates, setCoordinates] = useState<Coordinates>();

  const [locationNotice, setLocationNotice] = useState("");

  const [likedIds, setLikedIds] = useState<string[]>([]);

  const [mounted, setMounted] = useState(false);

  const locationRequested = useRef(false);

  /*
   * --------------------------------------------------
   * Initial browser-only state
   * --------------------------------------------------
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const user = getMockUser();

      setLikedIds(user.likedEventIds ?? []);

      setMounted(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /*
   * --------------------------------------------------
   * Sync search input with URL
   * --------------------------------------------------
   */
  useEffect(() => {
    setSearchValue(filters.q);
  }, [filters.q]);

  /*
   * --------------------------------------------------
   * Search debounce
   * --------------------------------------------------
   */
  useEffect(() => {
    if (searchValue === filters.q) {
      return;
    }

    const timer = window.setTimeout(() => {
      updateParams({
        q: searchValue,
      });
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchValue, filters.q, updateParams]);

  /*
   * --------------------------------------------------
   * Location request
   * --------------------------------------------------
   */
  const requestLocation = useCallback(() => {
    if (locationRequested.current) {
      return;
    }

    locationRequested.current = true;

    if (!navigator.geolocation) {
      setCoordinates(undefined);

      setLocationNotice("Location unavailable, showing all events.");

      updateParams({
        filter: "all",
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setLocationNotice("");

        updateParams({
          filter: "near",
        });
      },
      () => {
        setCoordinates(undefined);

        setLocationNotice("Location unavailable, showing all events.");

        updateParams({
          filter: "all",
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, [updateParams]);

  /*
   * --------------------------------------------------
   * If the page is opened directly with:
   *
   * /events?filter=near
   *
   * request location automatically.
   * --------------------------------------------------
   */
  useEffect(() => {
    if (mounted && filters.quick === "near" && !coordinates) {
      requestLocation();
    }
  }, [mounted, filters.quick, coordinates, requestLocation]);

  /*
   * --------------------------------------------------
   * Quick filter handler
   * --------------------------------------------------
   */
  const handleFilterChange = (filter: QuickFilter) => {
    if (filter === "near") {
      if (coordinates) {
        setLocationNotice("");

        updateParams({
          filter: "near",
        });

        return;
      }

      locationRequested.current = false;
      requestLocation();

      return;
    }

    setLocationNotice("");

    updateParams({
      filter,
    });
  };

  /*
   * --------------------------------------------------
   * Like / unlike
   * --------------------------------------------------
   */
  const handleToggleLike = (eventId: string) => {
    toggleLikedEvent(eventId);

    /*
     * Read the updated user rather than assuming
     * anything about toggleLikedEvent's return value.
     *
     * This keeps us compatible with the existing
     * mock-api implementation.
     */
    const updatedUser = getMockUser();

    setLikedIds(updatedUser.likedEventIds ?? []);
  };

  /*
   * --------------------------------------------------
   * Filter pipeline
   * --------------------------------------------------
   */
  const events = useMemo(() => {
    return applyExploreFilters(mockEvents, filters, {
      now: Date.now(),
      coords: coordinates,
    });
  }, [filters, coordinates]);

  /*
   * --------------------------------------------------
   * Filter count
   * --------------------------------------------------
   */
  const filterCount =
    filters.categories.length + (filters.maxPrice !== undefined ? 1 : 0);

  /*
   * --------------------------------------------------
   * Page title
   * --------------------------------------------------
   */
  const pageTitle =
    filters.quick === "featured"
      ? "Featured Events"
      : filters.quick === "trending"
        ? "Trending Events"
        : filters.quick === "upcoming"
          ? "Upcoming Events"
          : filters.quick === "near"
            ? "Events Near You"
            : filters.categories.length === 1
              ? `${filters.categories[0]} Events`
              : "All Events";

  /*
   * --------------------------------------------------
   * Clear filters
   * --------------------------------------------------
   */
  const clearFilters = () => {
    setSearchValue("");
    setLocationNotice("");
    setCoordinates(undefined);

    locationRequested.current = false;

    updateParams({
      q: "",
      filter: "all",
      category: [],
      sort: "recommended",
      maxPrice: undefined,
    });
  };

  /*
   * --------------------------------------------------
   * Skeleton while browser state settles
   * --------------------------------------------------
   */
  if (!mounted) {
    return <ExploreSkeleton />;
  }

  return (
    <>
      <div className="mt-5">
        <SearchBar value={searchValue} onChange={setSearchValue} />
      </div>

      <div className="mt-4">
        <FilterChips
          activeFilter={filters.quick === "featured" ? "all" : filters.quick}
          onFilterChange={handleFilterChange}
          onOpenFilters={() => setFilterSheetOpen(true)}
          filterCount={filterCount}
        />
      </div>

      {locationNotice && (
        <div
          role="status"
          className="mt-3 rounded-lg bg-[#edfcf5] px-3 py-2 text-[12px] font-medium text-[#087f5b]"
        >
          {locationNotice}
        </div>
      )}

      <div className="mt-6 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[16px] font-bold text-[var(--color-foreground)]">
            {pageTitle}
          </h2>

          <p className="text-[12px] text-[var(--color-muted)]">
            {events.length} {events.length === 1 ? "event" : "events"} found
          </p>
        </div>

        <SortSelect
          value={filters.sort}
          onChange={(sort) => updateParams({ sort })}
        />
      </div>

      <div className="mt-3">
        {events.length > 0 ? (
          <EventGrid
            events={events}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
          />
        ) : (
          <EmptyState onClear={clearFilters} />
        )}
      </div>

      <FilterSheet
        open={filterSheetOpen}
        selectedCategories={filters.categories}
        maxPrice={filters.maxPrice}
        resultCount={events.length}
        onApply={({ categories, maxPrice }) => {
          updateParams({
            category: categories,
            maxPrice,
          });
        }}
        onClose={() => setFilterSheetOpen(false)}
      />
    </>
  );
}
