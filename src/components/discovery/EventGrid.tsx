import type { EventSummary } from "@/types/event";
import { EventCard } from "./EventCard";

interface EventGridProps {
  events: EventSummary[];
  likedIds?: string[];
  onToggleLike?: (eventId: string) => void;
}

export function EventGrid({
  events,
  likedIds = [],
  onToggleLike,
}: EventGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          liked={likedIds.includes(event.id)}
          onToggleLike={onToggleLike}
        />
      ))}
    </div>
  );
}
