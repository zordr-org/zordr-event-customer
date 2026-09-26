"use client";

import Link from "next/link";
import * as React from "react";
import type { EventSummary } from "@/types/event";
import { IconChevronRight } from "@/components/ui/Icons";
import { EventImage } from "@/components/ui/EventImage";

interface CompactEventRowProps {
  event: EventSummary;
}

export function CompactEventRow({ event }: CompactEventRowProps) {
  const formattedDate = new Date(event.startAt).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/events/${event.slug}`}
      className="
        group
        flex
        h-[64px]
        w-full
        items-center
        gap-2
        rounded-[9px]
        border
        border-[var(--color-border)]
        bg-white
        p-1.5
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >
      {/* Thumbnail */}
      <div
        className="
          relative
          h-[52px]
          w-[70px]
          shrink-0
          overflow-hidden
          rounded-[6px]
          bg-[linear-gradient(135deg,#172554,#0891b2)]
        "
      >
        <EventImage
          src={event.bannerUrl}
          alt=""
          fallbackTitle={event.name}
          className="h-[52px] w-[70px] shrink-0 rounded-[6px] bg-[linear-gradient(135deg,#172554,#0891b2)]"
          imageClassName="transition-transform duration-200 group-hover:scale-[1.03]"
          fallbackClassName="bg-[linear-gradient(135deg,#172554,#0891b2)]"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 py-1">
        <h3
          className="
            line-clamp-1
            text-[12px]
            font-bold
            leading-4
            text-[var(--color-foreground)]
          "
        >
          {event.name}
        </h3>

        <div className="mt-0 flex min-w-0 items-center gap-1">
          <p className="shrink-0 text-[10px] text-[var(--color-muted)]">
            {formattedDate}
          </p>

          <span className="shrink-0 text-[var(--color-muted)]">•</span>

          <p className="min-w-0 truncate text-[10px] text-[var(--color-muted)]">
            {event.venue.name}
          </p>
        </div>

        <p className="mt-0 text-[11px] font-bold leading-4 text-[var(--color-foreground)]">
          <span className="font-medium text-[var(--color-muted)]">From</span> ₹
          {(event.priceFrom / 100).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Chevron */}
      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          text-[var(--color-muted)]
          transition-colors
          group-hover:text-[var(--color-primary)]
        "
      >
        <IconChevronRight size={17} />
      </div>
    </Link>
  );
}
