"use client";

import Link from "next/link";
import * as React from "react";
import type { EventSummary } from "@/types/event";
import { EventImage } from "@/components/ui/EventImage";

interface HeroCarouselProps {
  events: EventSummary[];
}

const AUTO_SLIDE_MS = 4500;

export function HeroCarousel({ events }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const activeEvent = events[activeIndex];

  /*
   * Preload the active hero image before rendering <img>.
   * This prevents the browser's broken-image icon from appearing.
   */

  /*
   * Automatic carousel rotation.
   */
  React.useEffect(() => {
    if (events.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === events.length - 1 ? 0 : current + 1,
      );
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [events.length]);

  if (!activeEvent) return null;

  return (
    <section className="relative w-full overflow-hidden rounded-[11px] bg-[#080014]">
      <div className="relative aspect-[1.8/1] w-full sm:aspect-[2.85/1]">
        {/* Background Image / Fallback */}
        <EventImage
          src={activeEvent.bannerUrl}
          alt=""
          fallbackTitle={activeEvent.name}
          className="absolute inset-0 h-full w-full"
          imageClassName="object-cover object-top"
          fallbackClassName="bg-[radial-gradient(circle_at_65%_30%,#8b2be2_0%,#24104d_38%,#050509_78%)]"
        />

        {/* Dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        {/* Event Information */}
        <div className="absolute inset-0 p-3.5">
          {/* Top event information */}
          <div className="max-w-[72%]">
            <p className="text-[8px] font-bold uppercase tracking-wide text-white/90">
              KITSW CULTURAL CLUB PRESENTS
            </p>

            <h1 className="mt-0.5 text-[20px] font-black italic leading-[21px] tracking-tight text-white sm:text-[24px] sm:leading-[25px]">
              {activeEvent.name}
            </h1>

            <p className="mt-0.5 text-[11px] font-medium text-white/90">
              {activeEvent.category.join(" • ")}
            </p>
          </div>

          {/* Bottom event information */}
          <div className="absolute bottom-2.5 left-3.5 right-3.5">
            <div className="flex items-center gap-3">
              <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-[9px] font-medium text-white/90">
                <span>◫</span>

                {new Date(activeEvent.startAt).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

            <div className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-[9px] font-medium text-white/90">
              <span>⌖</span>
              <span className="truncate">{activeEvent.venue.name}</span>
            </div>
          </div>

          <Link
            href={`/events/${activeEvent.slug}`}
            className="mt-1.5 inline-flex h-7 items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-[11px] font-semibold text-white"
            >
            Get Tickets →
          </Link>
        </div>
      </div>

        {/* Right-side decorative text */}
        <div className="absolute right-3 top-[18%] w-[20%] -rotate-[15deg] text-center sm:right-5 sm:top-1/2 sm:w-[18%] sm:-translate-y-1/2">
          <span
            className="font-['Brush_Script_MT',cursive] text-[18px] leading-[19px] text-white"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,.5)",
            }}
          >
            Bigger
            <br />
            Louder
            <br />
            Together
          </span>
        </div>

        {/* Carousel Indicators */}
        {events.length > 1 && (
          <div className="absolute bottom-3 right-4 flex items-center gap-2">
            {events.map((event, index) => (
              <span
                key={event.id}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-3.5 bg-[var(--color-primary)]"
                    : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
