import type { EventSummary } from "@/types/event";

export type QuickFilter = "all" | "trending" | "upcoming" | "near" | "featured";

export type SortKey =
  | "recommended"
  | "date"
  | "price-asc"
  | "price-desc"
  | "popular";

export interface ExploreFilters {
  q: string;
  quick: QuickFilter;
  categories: string[];
  maxPrice?: number;
  sort: SortKey;
}

interface ExploreContext {
  now: number;
  coords?: {
    lat: number;
    lng: number;
  };
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function matchesSearch(event: EventSummary, query: string): boolean {
  if (!query) {
    return true;
  }

  const q = normalize(query);

  return (
    normalize(event.name).includes(q) ||
    normalize(event.organizerName ?? "").includes(q) ||
    normalize(event.venue.name).includes(q) ||
    event.category.some((category) => normalize(category).includes(q))
  );
}

function matchesCategories(event: EventSummary, categories: string[]): boolean {
  if (categories.length === 0) {
    return true;
  }

  const selected = categories.map(normalize);

  return event.category.some((category) =>
    selected.includes(normalize(category)),
  );
}

function matchesPrice(
  event: EventSummary,
  maxPrice: number | undefined,
): boolean {
  if (maxPrice === undefined) {
    return true;
  }

  return event.priceFrom <= maxPrice;
}

function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const earthRadiusKm = 6371;

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function matchesNear(
  event: EventSummary,
  coords: ExploreContext["coords"],
): boolean {
  if (!coords) {
    return false;
  }

  if (event.venue.lat === undefined || event.venue.lng === undefined) {
    return false;
  }

  return (
    getDistanceKm(coords.lat, coords.lng, event.venue.lat, event.venue.lng) <=
    25
  );
}

function applyQuickFilter(
  events: EventSummary[],
  quick: QuickFilter,
  context: ExploreContext,
): EventSummary[] {
  switch (quick) {
    case "upcoming":
      return events.filter(
        (event) => new Date(event.startAt).getTime() >= context.now,
      );

    case "trending":
      return [...events].sort(
        (a, b) => (b.attendingCount ?? 0) - (a.attendingCount ?? 0),
      );

    case "near":
      return events.filter((event) => matchesNear(event, context.coords));

    case "all":
    default:
      return events;
  }
}

function applySort(events: EventSummary[], sort: SortKey): EventSummary[] {
  switch (sort) {
    case "date":
      return [...events].sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
      );

    case "price-asc":
      return [...events].sort((a, b) => a.priceFrom - b.priceFrom);

    case "price-desc":
      return [...events].sort((a, b) => b.priceFrom - a.priceFrom);

    case "popular":
      return [...events].sort(
        (a, b) => (b.attendingCount ?? 0) - (a.attendingCount ?? 0),
      );

    case "recommended":
    default:
      return events;
  }
}

export function applyExploreFilters(
  events: EventSummary[],
  filters: ExploreFilters,
  context: ExploreContext,
): EventSummary[] {
  let result = events.filter((event) => {
    return (
      matchesSearch(event, filters.q) &&
      matchesCategories(event, filters.categories) &&
      matchesPrice(event, filters.maxPrice)
    );
  });

  result = applyQuickFilter(result, filters.quick, context);

  result = applySort(result, filters.sort);

  return result;
}
