import type { EventDetail } from "@/types/event";
import { ResilientImage } from "@/components/ui/ResilientImage";
import {
  IconBuilding,
  IconCalendarDays,
  IconClock,
  IconMapPin,
} from "@/components/ui/Icons";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export function CheckoutEventBanner({ event }: { event: EventDetail }) {
  return (
    <section className="px-4 pb-2 pt-2 sm:px-6 sm:pb-4">
      <div className="relative h-[151px] overflow-hidden rounded-[10px] bg-[#07091d] text-white shadow-sm sm:h-[177px]">
        <ResilientImage
          src={event.bannerUrl}
          alt={event.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,8,28,.92),rgba(20,8,61,.6),rgba(4,7,28,.88))]" />
        <div className="relative z-10 h-full px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-[8px] font-semibold tracking-[.08em] sm:text-[9px]">
            {event.organizer.name.toUpperCase()} PRESENTS
          </p>
          <h1 className="mt-1 max-w-[270px] break-words pr-12 text-[24px] font-black italic leading-[25px] tracking-[-1px] sm:text-[29px] sm:leading-[30px]">
            {event.name}
          </h1>
          <p className="mt-1 text-[9px] text-white/90 sm:text-[10px]">
            {event.category.join(" • ")}
          </p>
          <div className="mt-3 flex max-w-[390px] flex-wrap items-center gap-x-2 gap-y-1 text-[8px] font-medium leading-3 sm:text-[9px]">
            <span className="flex items-center gap-1">
              <IconCalendarDays size={11} /> {formatDate(event.startAt)}
            </span>
            <span className="flex items-center gap-1">
              <IconClock size={11} /> {formatTime(event.startAt)} -{" "}
              {event.endAt ? formatTime(event.endAt) : "Late"}
            </span>
            <span className="flex items-center gap-1">
              <IconMapPin size={11} /> {event.venue.name}
            </span>
          </div>
          <p className="absolute bottom-5 right-4 max-w-[68px] rotate-[-10deg] text-right text-[15px] font-bold italic leading-4 drop-shadow-[0_1px_3px_rgba(0,0,0,.9)] sm:text-[17px] sm:leading-5">
            Bigger
            <br />
            Louder
            <br />
            <span className="text-[#ff3c9b]">Together</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function CheckoutVenueLine({ event }: { event: EventDetail }) {
  return (
    <p className="flex items-center gap-1 text-[10px] text-[#52617c]">
      <IconBuilding size={13} /> {event.venue.name},{" "}
      {event.venue.address.split(",")[0]}
    </p>
  );
}
