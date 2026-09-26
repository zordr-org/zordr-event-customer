import type { EventSummary } from "@/types/event";
import { FeaturedEventCard } from "@/components/discovery/FeaturedEventCard";
import Link from "next/link";
import { ResilientImage } from "@/components/ui/ResilientImage";

interface RecommendedEventsProps {
  events?: EventSummary[];
  checkout?: boolean;
}

export function RecommendedEvents({
  events = [],
  checkout = false,
}: RecommendedEventsProps) {
  if (checkout) {
    return (
      <section className="mx-4 mt-5 sm:mx-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#17203b]">
            You Might Also Like
          </h2>
          <Link href="/" className="text-[11px] font-semibold text-[#1460c6]">
            View All →
          </Link>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["DJ Night", "Art & Design", "Food Carnival"].map((name, index) => (
            <Link
              href={index === 0 ? "/events/dj-night" : "/"}
              key={name}
              className="overflow-hidden rounded-lg border border-[#e1e6ec]"
            >
              <ResilientImage
                src={
                  [
                    "https://images.unsplash.com/photo-1571266028243-cb40fce75737?auto=format&fit=crop&w=300&q=85",
                    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=300&q=85",
                    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=300&q=85",
                  ][index]
                }
                alt={name}
                className="h-20 w-full object-cover"
              />
              <p className="truncate px-2 pt-1 text-[11px] font-bold text-[#17203b]">
                {name}
              </p>
              <p className="px-2 pb-2 text-[10px] text-[#65718a]">
                Oct {20 + index * 5}, 2026
              </p>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">You Might Also Like</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <FeaturedEventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
