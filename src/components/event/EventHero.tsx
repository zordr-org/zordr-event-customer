import type { EventDetail } from "@/types/event";
import {
  IconCalendar,
  IconClock,
  IconHeart,
  IconMapPin,
  IconShare,
} from "@/components/ui/Icons";

interface EventHeroProps {
  event: EventDetail;
  dateLabel: string;
  timeRange: string;
  isLiked: boolean;
  onPreview: () => void;
  onShare: () => void;
  onToggleLike: () => void;
}

export function EventHero({
  event,
  dateLabel,
  timeRange,
  isLiked,
  onPreview,
  onShare,
  onToggleLike,
}: EventHeroProps) {
  return (
    <div className="px-0 pt-2 sm:px-0">
      <div
        className="relative mx-0 h-[169px] cursor-zoom-in overflow-hidden sm:mx-0 sm:rounded-[11px]"
        role="button"
        tabIndex={0}
        aria-label={`Preview ${event.name} image`}
        onClick={onPreview}
        onKeyDown={(keyboardEvent) => {
          if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
            onPreview();
          }
        }}
      >
        <img
          src={event.bannerUrl}
          alt={event.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,8,29,.94),rgba(33,10,82,.72),rgba(5,7,31,.9))]" />
        <div className="absolute inset-0 px-4 py-4 text-white">
          <p className="text-[9px] font-semibold tracking-[.08em]">
            {event.organizer.name.toUpperCase()} PRESENTS
          </p>
          <h1 className="mt-2 max-w-[220px] break-words pr-6 text-[29px] font-black italic leading-[29px] tracking-[-1.2px]">
            {event.name}
          </h1>
          <p className="mt-1 text-[10px] text-white/90">
            Music. Culture. Community.
          </p>
          <div className="mt-2 flex max-w-[330px] flex-wrap items-center gap-x-1.5 gap-y-1 text-[8px] font-medium leading-3 text-white/90">
            <IconCalendar size={12} /> {dateLabel}{" "}
            <span className="text-white/40">|</span>
            <IconClock size={12} /> {timeRange}{" "}
            <span className="text-white/40">|</span>
            <IconMapPin size={12} /> {event.venue.name}
          </div>
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            aria-label="Share event"
            onClick={(clickEvent) => {
              clickEvent.stopPropagation();
              onShare();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#17203b]"
          >
            <IconShare size={14} />
          </button>
          <button
            type="button"
            aria-label={isLiked ? "Remove event from saved" : "Save event"}
            onClick={(clickEvent) => {
              clickEvent.stopPropagation();
              onToggleLike();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#17203b]"
          >
            <IconHeart
              size={14}
              className={isLiked ? "fill-[#ef476f] text-[#ef476f]" : undefined}
            />
          </button>
        </div>
        <p className="absolute bottom-5 right-4 max-w-[76px] rotate-[-12deg] text-right text-[17px] font-bold italic leading-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.85)]">
          Bigger
          <br />
          Louder
          <br />
          <span className="text-[#ff3c9b]">Together</span>
        </p>
      </div>
    </div>
  );
}
