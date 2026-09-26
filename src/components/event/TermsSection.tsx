import type { EventDetail } from "@/types/event";

interface TermsSectionProps {
  event: EventDetail;
  expanded: boolean;
}

export function TermsSection({ event, expanded }: TermsSectionProps) {
  if (!expanded) {
    return null;
  }

  return (
    <p className="border-t border-[#edf0f2] bg-[#fafbfc] px-3 py-2 text-[10px] leading-[14px] text-[#65718a]">
      {event.terms}
    </p>
  );
}
