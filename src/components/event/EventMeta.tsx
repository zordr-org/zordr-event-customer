import type { EventDetail } from "@/types/event";
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconVerified,
} from "@/components/ui/Icons";

interface EventMetaProps {
  event: EventDetail;
  isRegistered: boolean;
  dateLabel: string;
  weekdayLabel: string;
  timeRange: string;
  doorTime: string;
  onPreviewOrganizer: () => void;
}

function InfoCell({
  icon,
  label,
  value,
  subvalue,
  action,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subvalue: string;
  action?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 gap-2 border-r border-[#edf0f2] px-3 first:pl-0 last:border-0 last:pr-0">
      <span className="mt-0.5 shrink-0 text-[#15234b]">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-[#596276]">{label}</p>
        <p className="truncate text-[11px] font-semibold leading-[15px] text-[#17203b]">
          {value}
        </p>
        {action ? (
          <p className="truncate text-[10px] font-semibold text-[#1654bd]">
            {action}
          </p>
        ) : (
          <p className="text-[10px] leading-[14px] text-[#65718a]">
            {subvalue}
          </p>
        )}
      </div>
    </div>
  );
}

export function EventMeta({
  event,
  isRegistered,
  dateLabel,
  weekdayLabel,
  timeRange,
  doorTime,
  onPreviewOrganizer,
}: EventMetaProps) {
  return (
    <>
      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-[19px] font-extrabold tracking-[-.4px] text-[#151d39]">
          {event.name}
        </h2>
        <div className="flex shrink-0 flex-wrap justify-end gap-1">
          <span className="flex items-center gap-1 rounded-md bg-[#e9fbf2] px-2 py-1 text-[9px] font-semibold text-[#0a9d60]">
            <IconVerified size={11} /> Verified
          </span>
          {isRegistered && (
            <span className="flex items-center gap-1 rounded-md bg-[#e1efff] px-2 py-1 text-[9px] font-semibold text-[#2164b8]">
              ✓ Registered
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Preview ${event.organizer.name} logo`}
            onClick={onPreviewOrganizer}
            className="h-8 w-8 overflow-hidden rounded-full bg-[#18234b]"
          >
            {event.organizer.logoUrl ? (
              <img
                src={event.organizer.logoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-[15px] font-black italic text-[#f3b900]">
                Z
              </span>
            )}
          </button>
          <div>
            <p className="text-[9px] text-[#69738b]">Organized by</p>
            <p className="text-[11px] font-semibold text-[#18203d]">
              {event.organizer.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#1f2945]">
          <span className="flex -space-x-1.5">
            {["#df8f6a", "#415a77", "#e0bd75", "#3d7892"].map((color) => (
              <span
                key={color}
                className="h-6 w-6 rounded-full border-2 border-white"
                style={{ backgroundColor: color }}
              />
            ))}
          </span>
          +{((event.attendingCount ?? 0) / 1000).toFixed(1)}K attending
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        {event.category.map((tag, index) => (
          <span
            key={tag}
            className={`rounded-md px-3 py-1 text-[10px] font-medium ${index === 0 ? "bg-[#f6ebff] text-[#7d2fd3]" : index === 1 ? "bg-[#edf4ff] text-[#3365c8]" : "bg-[#edf4ff] text-[#3365c8]"}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3 flex rounded-[9px] border border-[#e5e9ee] px-3 py-3">
        <InfoCell
          icon={<IconCalendar size={18} />}
          label="Date"
          value={dateLabel}
          subvalue={weekdayLabel}
        />
        <InfoCell
          icon={<IconClock size={18} />}
          label="Time"
          value={timeRange}
          subvalue={`Doors open at ${doorTime}`}
        />
        <InfoCell
          icon={<IconMapPin size={18} />}
          label="Venue"
          value={event.venue.name}
          subvalue={event.venue.address}
          action={event.venue.mapUrl ? "View on Map →" : undefined}
        />
      </div>
    </>
  );
}
