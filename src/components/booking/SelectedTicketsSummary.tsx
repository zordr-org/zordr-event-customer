import type { TicketType } from "@/types/event";
import { Card } from "@/components/ui/Card";

interface SelectedTicketsSummaryProps {
  tickets: TicketType[];
  quantities: Record<string, number>;
}

export function SelectedTicketsSummary({
  tickets,
  quantities,
}: SelectedTicketsSummaryProps) {
  const selectedTickets = tickets.filter(
    (ticket) => (quantities[ticket.id] ?? 0) > 0,
  );

  const subtotal = selectedTickets.reduce((total, ticket) => {
    const quantity = quantities[ticket.id] ?? 0;
    return total + ticket.price * quantity;
  }, 0);

  if (selectedTickets.length === 0) {
    return null;
  }

  return (
    <Card variant="outlined" className="p-4">
      <h2 className="text-lg font-semibold">Selected Tickets</h2>

      <div className="mt-4 space-y-3">
        {selectedTickets.map((ticket) => {
          const quantity = quantities[ticket.id] ?? 0;

          return (
            <div
              key={ticket.id}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div>
                <p className="font-medium">{ticket.name}</p>
                <p className="text-[var(--color-muted)]">
                  {quantity} × ₹{(ticket.price / 100).toFixed(2)}
                </p>
              </div>

              <p className="font-medium">
                ₹{((ticket.price * quantity) / 100).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t border-[var(--color-border)] pt-4">
        <div className="flex items-center justify-between font-semibold">
          <span>Ticket Subtotal</span>
          <span>₹{(subtotal / 100).toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
}
