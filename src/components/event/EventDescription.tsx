interface EventDescriptionProps {
  description: string;
  expanded: boolean;
  onToggle: () => void;
}

export function EventDescription({
  description,
  expanded,
  onToggle,
}: EventDescriptionProps) {
  return (
    <section className="mt-3">
      <h2 className="text-[15px] font-extrabold text-[#151d39]">
        About the Event
      </h2>
      <p
        className={`mt-1 text-[12px] leading-[15px] text-[#59647e] ${expanded ? "" : "line-clamp-3"}`}
      >
        {description}
      </p>
      <button
        type="button"
        onClick={onToggle}
        className="text-[11px] font-semibold text-[#1258c5]"
      >
        {expanded ? "Show Less ↑" : "Read More ↓"}
      </button>
    </section>
  );
}
