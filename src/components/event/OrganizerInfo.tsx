import type { EventDetail } from "@/types/event";

interface EventMetaProps {
  event: EventDetail;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function EventMeta({ event }: EventMetaProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg border border-[var(--color-border)] p-4">
        <p className="text-xs text-[var(--color-muted)]">Date</p>

        <p className="mt-1 text-sm font-medium">{formatDate(event.startAt)}</p>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] p-4">
        <p className="text-xs text-[var(--color-muted)]">Time</p>

        <p className="mt-1 text-sm font-medium">{formatTime(event.startAt)}</p>
      </div>

      {event.attendingCount !== undefined && (
        <div className="rounded-lg border border-[var(--color-border)] p-4">
          <p className="text-xs text-[var(--color-muted)]">Attending</p>

          <p className="mt-1 text-sm font-medium">
            {event.attendingCount.toLocaleString("en-IN")}
          </p>
        </div>
      )}
    </section>
  );
}
