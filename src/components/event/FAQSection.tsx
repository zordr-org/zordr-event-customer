import type { EventDetail } from "@/types/event";

interface FAQSectionProps {
  event: EventDetail;
  expanded: boolean;
}

export function FAQSection({ event, expanded }: FAQSectionProps) {
  if (!expanded) {
    return null;
  }

  return (
    <div className="space-y-2 border-b border-[#edf0f2] bg-[#fafbfc] px-3 py-2">
      {event.faqs?.map((faq) => (
        <div key={faq.question}>
          <p className="text-[10px] font-bold text-[#1d2641]">{faq.question}</p>
          <p className="mt-0.5 text-[10px] leading-[14px] text-[#65718a]">
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
