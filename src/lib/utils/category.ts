export const EVENT_CATEGORIES = [
  "Music",
  "Cultural",
  "Tech",
  "Sports",
  "Workshops",
  "Comedy",
  "Food",
  "Literary",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export function getCategoryColorClass(category: string): string {
  switch (category.toLowerCase()) {
    case "music":
      return "bg-[var(--color-tag-music-bg)] text-[var(--color-tag-music)]";

    case "cultural":
      return "bg-[var(--color-tag-cultural-bg)] text-[var(--color-tag-cultural)]";

    case "tech":
      return "bg-[var(--color-tag-tech-bg)] text-[var(--color-tag-tech)]";

    case "sports":
      return "bg-[var(--color-tag-sports-bg)] text-[var(--color-tag-sports)]";

    case "workshops":
      return "bg-[var(--color-tag-workshops-bg)] text-[var(--color-tag-workshops)]";

    case "comedy":
      return "bg-[var(--color-tag-comedy-bg)] text-[var(--color-tag-comedy)]";

    case "food":
      return "bg-[var(--color-tag-food-bg)] text-[var(--color-tag-food)]";

    case "literary":
      return "bg-[var(--color-tag-literary-bg)] text-[var(--color-tag-literary)]";

    default:
      return "bg-[#F0F9FF] text-[#0284C7]";
  }
}
