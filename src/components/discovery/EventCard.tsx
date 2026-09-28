"use client";

import Link from "next/link";
import type { EventSummary } from "@/types/event";
import {
  IconCalendar,
  IconChevronRight,
  IconHeart,
  IconMapPin,
} from "@/components/ui/Icons";
import { EventImage } from "@/components/ui/EventImage";
import { formatEventDateTime, formatPrice } from "@/lib/utils/format";

interface EventCardProps {
  event: EventSummary;
  liked?: boolean;
  onToggleLike?: (eventId: string) => void;
}

export function EventCard({
  event,
  liked = false,
  onToggleLike,
}: EventCardProps) {
  const categories = Array.from(new Set(event.category))
    .slice(0, 3)
    .join(" · ");

  return (
    <article className="group relative overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/events/${event.slug}`} className="block">
        <EventImage
          src={event.bannerUrl}
          alt=""
          fallbackTitle={event.name}
          className="aspect-[2.35/1] w-full"
          imageClassName="transition-transform duration-300 group-hover:scale-[1.02]"
          fallbackClassName="bg-[linear-gradient(135deg,#18053d,#0b6c75_55%,#04202a)]"
        />

        <div className="p-2">
          <h3 className="line-clamp-1 text-[13px] font-bold leading-4 text-[var(--color-foreground)]">
            {event.name}
          </h3>

          <p className="mt-1 line-clamp-1 w-fit max-w-full rounded-md bg-[var(--color-primary-light)] px-1.5 py-0.5 text-[10px] font-medium leading-3 text-[var(--color-foreground)]">
            {categories}
          </p>

          <div className="mt-1.5 space-y-1">
            <p className="flex items-center gap-1.5 text-[11px] leading-4 text-[var(--color-muted)]">
              <IconCalendar size={13} className="shrink-0" />

              <span className="truncate">
                {formatEventDateTime(event.startAt)}
              </span>
            </p>

            <p className="flex items-center gap-1.5 text-[11px] leading-4 text-[var(--color-muted)]">
              <IconMapPin size={13} className="shrink-0" />

              <span className="truncate">{event.venue.name}</span>
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-[14px] font-semibold leading-4 text-[var(--color-foreground)]">
              From {formatPrice(event.priceFrom)}
            </p>

            <IconChevronRight
              size={16}
              className="shrink-0 text-[var(--color-foreground)]"
            />
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Remove from saved" : "Save event"}
        onClick={(eventClick) => {
          eventClick.preventDefault();
          eventClick.stopPropagation();
          onToggleLike?.(event.id);
        }}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm"
      >
        <IconHeart
          size={14}
          className={liked ? "fill-[#ef476f] text-[#ef476f]" : undefined}
        />
      </button>
    </article>
  );
}
