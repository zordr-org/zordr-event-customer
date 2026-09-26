import type { EventDetail } from "@/types/event";

interface VenueInfoProps {
  event: EventDetail;
}

export function VenueInfo({ event }: VenueInfoProps) {
  const { venue } = event;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Venue</h2>

      <div className="rounded-lg border border-[var(--color-border)] p-4">
        <h3 className="font-medium">{venue.name}</h3>

        <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
          {venue.address}
        </p>

        {venue.mapUrl && (
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            View on Map
          </a>
        )}
      </div>
    </section>
  );
}
