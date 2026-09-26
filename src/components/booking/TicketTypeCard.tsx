import type { TicketType } from "@/types/event";
import { IconCrown, IconPercent, IconStar } from "@/components/ui/Icons";
import { formatRupees } from "@/lib/mock-checkout";

interface TicketTypeCardProps {
  ticket: TicketType;
  quantity: number;
  index: number;
  onQuantityChange: (amount: number) => void;
}

export function TicketTypeCard({
  ticket,
  quantity,
  index,
  onQuantityChange,
}: TicketTypeCardProps) {
  const icons = [IconPercent, IconCrown, IconStar, IconPercent];
  const Icon = icons[index % icons.length];

  return (
    <div
      className={`grid min-h-[72px] grid-cols-[auto_minmax(0,1fr)_auto] gap-2 rounded-[10px] border px-3 py-2 ${quantity ? "border-[#22b887] bg-[#fbfffd]" : "border-[#e1e6ec]"}`}
    >
      <span
        className={`row-span-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${index === 0 ? "bg-[#dff8ec] text-[#0fa66d]" : index === 1 ? "bg-[#fff2dd] text-[#efa900]" : index === 2 ? "bg-[#eee7ff] text-[#5f36d8]" : "bg-[#ffe8f0] text-[#ec4f87]"}`}
      >
        <Icon size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="break-words text-[14px] font-bold leading-4 text-[#131b3a]">
          {ticket.name}
        </p>
        <p className="break-words text-[11px] leading-4 text-[#65718b]">
          {ticket.description}
        </p>
        {ticket.perks?.[0] && (
          <p className="break-words text-[10px] text-[#65718b]">
            {ticket.perks[0]}
            {ticket.perks[1] ? ` • ${ticket.perks[1]}` : ""}
          </p>
        )}
      </div>
      <div className="row-span-2 w-[70px] shrink-0 sm:w-[77px]">
        <p className="text-[15px] font-bold text-[#141c3a]">
          {formatRupees(ticket.price)}
        </p>
        {ticket.originalPrice && (
          <span className="mr-1 text-[10px] text-[#6a7487] line-through">
            {formatRupees(ticket.originalPrice)}
          </span>
        )}
        <p className="text-[10px] font-medium text-[#13a86a]">
          Available: {ticket.available}
        </p>
      </div>
      <div className="col-start-2 row-start-2 flex h-8 w-fit items-center overflow-hidden rounded-lg border border-[#dfe5eb]">
        <button
          type="button"
          aria-label={`Remove ${ticket.name}`}
          onClick={() => onQuantityChange(-1)}
          className="h-full w-7 text-[18px] text-[#68748b] hover:bg-[#f1f5f3]"
        >
          −
        </button>
        <span className="w-7 text-center text-[13px] font-semibold">
          {quantity}
        </span>
        <button
          type="button"
          aria-label={`Add ${ticket.name}`}
          onClick={() => onQuantityChange(1)}
          className="h-full w-7 text-[18px] text-[#16203f] hover:bg-[#e8f9f1]"
        >
          +
        </button>
      </div>
    </div>
  );
}
