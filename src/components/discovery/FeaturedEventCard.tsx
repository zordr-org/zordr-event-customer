"use client";

import Link from "next/link";
import * as React from "react";
import type { EventSummary } from "@/types/event";
import { IconCalendar, IconMapPin } from "@/components/ui/Icons";
import { EventImage } from "@/components/ui/EventImage";

interface FeaturedEventCardProps {
  event: EventSummary;
}

export function FeaturedEventCard({ event }: FeaturedEventCardProps) {
  const date = new Date(event.startAt);

  const formattedDate = date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

  const getCategoryColorClass = (category: string) => {
    const slug = category.toLowerCase();

    switch (slug) {
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

      default:
        return "bg-[#F0F9FF] text-[#0284C7]";
    }
  };

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Event Image */}
      <EventImage
        src={event.bannerUrl}
        alt=""
        fallbackTitle={event.name}
        className="aspect-[2.35/1] w-full rounded-t-[10px] bg-[linear-gradient(135deg,#18053d,#0b6c75_55%,#04202a)]"
        imageClassName="transition-transform duration-300 group-hover:scale-[1.02]"
        fallbackClassName="bg-[linear-gradient(135deg,#18053d,#0b6c75_55%,#04202a)]"
      />

      {/* Event Information */}
      <div className="flex flex-col p-2">
        <h3 className="line-clamp-1 text-[13px] font-bold leading-4 text-[var(--color-foreground)]">
          {event.name}
        </h3>

        {/* Categories */}
        <div className="mt-1 flex flex-wrap gap-1.5">
          {event.category.slice(0, 3).map((category) => (
            <span
              key={category}
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold leading-3 ${getCategoryColorClass(
                category,
              )}`}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Date & Venue */}
        <div className="mt-1.5 space-y-1">
          <p className="flex items-center gap-1.5 text-[11px] leading-4 text-[var(--color-muted)]">
            <IconCalendar size={13} className="shrink-0" />
            {formattedDate}, {formattedTime}
          </p>

          <p className="flex items-center gap-1.5 truncate text-[11px] leading-4 text-[var(--color-muted)]">
            <IconMapPin size={13} className="shrink-0" />
            {event.venue.name}, {event.venue.address}
          </p>
        </div>

        {/* Price & CTA */}
        <div className="mt-2">
          <p className="text-[14px] font-bold leading-4 text-[var(--color-foreground)]">
            From ₹{(event.priceFrom / 100).toLocaleString("en-IN")}
          </p>

          <span className="mt-2 flex h-7 items-center justify-center rounded-md bg-[var(--color-primary)] px-2 text-[11px] font-semibold text-white transition-colors group-hover:bg-[var(--color-primary-hover)]">
            Register Now →
          </span>
        </div>
      </div>
    </Link>
  );
}
