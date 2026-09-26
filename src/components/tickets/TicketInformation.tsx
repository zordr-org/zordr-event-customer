import type { Ticket } from "@/types/ticket";
import { TicketStatusBadge } from "./TicketStatusBadge";

interface TicketInformationProps {
  ticket: Ticket;
  checkout?: boolean;
}

export function TicketInformation({
  ticket,
  checkout = false,
}: TicketInformationProps) {
  if (checkout) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-y-3 border-t border-dashed border-[#cad3df] pt-3 text-[10px] sm:grid-cols-[1fr_1fr_1.2fr] sm:gap-y-0">
        <div>
          <p className="text-[#65718a]">TICKET TYPE</p>
          <p className="mt-1 text-[13px] font-bold text-[#17203b]">
            {ticket.ticketTypeName}
          </p>
          <p className="text-[#65718a]">Access to all main events</p>
        </div>
        <div className="border-l border-[#edf0f2] pl-3">
          <p className="text-[#65718a]">QUANTITY</p>
          <p className="mt-1 text-[18px] font-bold text-[#17203b]">
            {ticket.quantity}
          </p>
        </div>
        <div className="border-l border-[#edf0f2] pl-3">
          <p className="text-[#65718a]">TICKET ID</p>
          {ticket.individualTicketIds?.map((id) => (
            <p
              key={id}
              className="mt-1 break-all text-[10px] font-medium text-[#17203b]"
            >
              {id}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Ticket Information</h2>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="grid gap-4 rounded-lg border border-[var(--color-border)] p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-[var(--color-muted)]">Ticket Type</p>
          <p className="mt-1 font-medium">{ticket.ticketTypeName}</p>
        </div>

        <div>
          <p className="text-xs text-[var(--color-muted)]">Quantity</p>
          <p className="mt-1 font-medium">{ticket.quantity}</p>
        </div>
      </div>

      {ticket.individualTicketIds && ticket.individualTicketIds.length > 0 && (
        <div className="rounded-lg border border-[var(--color-border)] p-4">
          <h3 className="text-sm font-semibold">Ticket IDs</h3>

          <div className="mt-3 space-y-2">
            {ticket.individualTicketIds.map((ticketId) => (
              <div
                key={ticketId}
                className="rounded-md bg-[var(--color-muted)]/5 px-3 py-2 font-mono text-sm"
              >
                {ticketId}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
