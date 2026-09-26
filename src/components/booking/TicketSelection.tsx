import type { TicketType } from "@/types/event";
import { TicketTypeCard } from "./TicketTypeCard";

interface TicketSelectionProps {
  tickets: TicketType[];
  quantities: Record<string, number>;
  onQuantityChange: (ticket: TicketType, amount: number) => void;
}

export function TicketSelection({
  tickets,
  quantities,
  onQuantityChange,
}: TicketSelectionProps) {
  return (
    <div className="mx-4 mt-4 space-y-2 sm:mx-6">
      {tickets.map((ticket, index) => (
        <TicketTypeCard
          key={ticket.id}
          ticket={ticket}
          quantity={quantities[ticket.id] ?? 0}
          index={index}
          onQuantityChange={(amount) => onQuantityChange(ticket, amount)}
        />
      ))}
    </div>
  );
}
