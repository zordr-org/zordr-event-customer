import { formatRupees } from "@/lib/mock-checkout";

interface TicketSummaryItem {
  ticketTypeName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
}

interface TicketSummaryProps {
  items: TicketSummaryItem[];
  checkout?: boolean;
}

export function TicketSummary({ items, checkout = false }: TicketSummaryProps) {
  if (checkout) {
    const item = items[0];
    if (!item) return null;

    return (
      <section className="mx-4 mt-3 rounded-[10px] border border-[#e1e6ec] p-3 sm:mx-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#17203b]">Your Tickets</h2>
          <span className="text-[11px] text-[#53617e]">2 Tickets</span>
        </div>
        <div className="mt-2 flex items-center justify-between rounded-lg bg-[#fbfcfd] px-3 py-3">
          <div>
            <p className="text-[13px] font-bold text-[#17203b]">
              {item.ticketTypeName}
            </p>
            <p className="text-[10px] text-[#65718a]">{item.description}</p>
          </div>
          <div className="flex items-center gap-6 text-right text-[11px] text-[#53617e]">
            <span>
              Qty: {item.quantity}
              <br />
              {formatRupees(item.unitPrice)} each
            </span>
            <b className="text-[17px] text-[#17203b]">
              {formatRupees(item.unitPrice * item.quantity)}
            </b>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Your Tickets</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.ticketTypeName}
            className="flex items-center justify-between gap-4 rounded-lg border border-[var(--color-border)] p-4"
          >
            <div>
              <p className="font-medium">{item.ticketTypeName}</p>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                {item.quantity} × ₹{(item.unitPrice / 100).toFixed(2)}
              </p>
            </div>

            <p className="font-semibold">
              ₹{((item.unitPrice * item.quantity) / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
