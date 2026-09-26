import type { Ticket } from "@/types/ticket";
import { Card } from "@/components/ui/Card";
import { TicketStatusBadge } from "./TicketStatusBadge";
import { TicketQRCode } from "./TicketQRCode";

interface TicketWalletCardProps {
  ticket: Ticket;
  onClick: () => void;
}

export function TicketWalletCard({ ticket, onClick }: TicketWalletCardProps) {
  return (
    <Card variant="outlined" className="overflow-hidden">
      <button type="button" onClick={onClick} className="w-full text-left">
        <div className="flex gap-4 p-4">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-[var(--color-muted)]">
            <img
              src={ticket.eventBannerUrl}
              alt={ticket.eventName}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold">{ticket.eventName}</h3>

                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {ticket.ticketTypeName}
                </p>
              </div>

              <TicketStatusBadge status={ticket.status} />
            </div>

            <p className="text-sm text-[var(--color-muted)]">{ticket.venue}</p>

            <time dateTime={ticket.startAt} className="block text-sm">
              {new Date(ticket.startAt).toLocaleString()}
            </time>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 text-sm">
              <p>
                {ticket.quantity} {ticket.quantity === 1 ? "ticket" : "tickets"}
              </p>

              <p className="text-[var(--color-muted)]">
                Order ID: {ticket.orderId}
              </p>

              <p className="font-medium">
                ₹{(ticket.totalPaid / 100).toFixed(2)}
              </p>
            </div>

            {ticket.qrPayload && (
              <div className="h-20 w-20 overflow-hidden">
                <TicketQRCode payload={ticket.qrPayload} size={64} />
              </div>
            )}
          </div>
        </div>
      </button>
    </Card>
  );
}
