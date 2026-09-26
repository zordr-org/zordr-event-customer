import type { EventDetail } from "@/types/event";

interface EventGalleryProps {
  event: EventDetail;
  expanded: boolean;
  onToggleExpanded: () => void;
  onPreview: (src: string, alt: string) => void;
}

export function EventGallery({
  event,
  expanded,
  onToggleExpanded,
  onPreview,
}: EventGalleryProps) {
  return (
    <section className="mt-2">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[14px] font-extrabold text-[#151d39]">
          Event Gallery
        </h2>
        {event.gallery.length > 5 && (
          <button
            type="button"
            onClick={onToggleExpanded}
            className="text-[10px] font-semibold text-[#1258c5]"
          >
            {expanded ? "Show Less ↑" : "View All →"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {event.gallery
          .slice(0, expanded ? event.gallery.length : 5)
          .map((image, index) => (
            <button
              type="button"
              aria-label={`Preview event gallery image ${index + 1}`}
              onClick={() =>
                onPreview(image, `${event.name} gallery image ${index + 1}`)
              }
              key={`${image}-${index}`}
              className="relative h-[53px] overflow-hidden rounded-[7px]"
            >
              <img
                src={image}
                alt={`Event gallery ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {index === 4 && event.gallery.length > 5 && !expanded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-[13px] font-bold text-white">
                  +{event.gallery.length - 4}
                </div>
              )}
            </button>
          ))}
      </div>
    </section>
  );
}
