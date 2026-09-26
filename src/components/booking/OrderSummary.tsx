import type { Order } from "@/types/order";
import type { EventDetail, TicketType } from "@/types/event";
import { Card } from "@/components/ui/Card";
import { PriceBreakdown } from "./PriceBreakdown";
import Link from "next/link";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { formatRupees } from "@/lib/mock-checkout";

interface CheckoutOrderSummary {
  event: EventDetail;
  selectedItems: { ticket: TicketType; quantity: number }[];
  orderId: string;
  pricing: {
    subtotal: number;
    convenienceFee: number;
    platformFee: number;
    gst: number;
    total: number;
  };
}

interface OrderSummaryProps {
  order?: Order;
  checkout?: CheckoutOrderSummary;
}

export function OrderSummary({ order, checkout }: OrderSummaryProps) {
  if (checkout) {
    const { event, selectedItems, orderId, pricing } = checkout;
    return (
      <section className="rounded-[10px] border border-[#e1e6ec] p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#131b3a]">
            Order Summary
          </h3>
          <Link
            href={`/checkout/${orderId}/tickets`}
            className="text-[10px] font-bold text-[#08a566]"
          >
            EDIT
          </Link>
        </div>
        <div className="mt-3 flex gap-2 border-b border-[#e6ebef] pb-3">
          <ResilientImage
            src={event.bannerUrl}
            alt={event.name}
            className="h-12 w-16 rounded-md object-cover"
          />
          <div>
            <p className="text-[12px] font-bold text-[#17203b]">{event.name}</p>
            <p className="text-[10px] text-[#65718a]">
              {new Date(event.startAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <p className="text-[10px] text-[#65718a]">{event.venue.name}</p>
          </div>
        </div>
        <div className="mt-3 space-y-2 text-[11px] text-[#4f5d78]">
          {selectedItems.map(({ ticket, quantity }) => (
            <div className="flex justify-between" key={ticket.id}>
              <span>
                {quantity} × {ticket.name}
              </span>
              <span>{formatRupees(ticket.price * quantity)}</span>
            </div>
          ))}
          <div className="mt-2 border-t border-[#e6ebef] pt-2 font-semibold">
            <div className="flex justify-between">
              <span>Ticket Amount</span>
              <span>{formatRupees(pricing.subtotal)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Convenience Fee</span>
              <span>{formatRupees(pricing.convenienceFee)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Platform Fee</span>
              <span>{formatRupees(pricing.platformFee)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>GST (18%)</span>
              <span>{formatRupees(pricing.gst)}</span>
            </div>
          </div>
          <div className="flex justify-between border-t border-[#e6ebef] pt-2 text-[16px] font-bold text-[#121a3b]">
            <span>Total Amount</span>
            <span>{formatRupees(pricing.total)}</span>
          </div>
        </div>
      </section>
    );
  }

  if (!order) return null;

  return (
    <Card variant="outlined" className="p-5">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="mt-4 space-y-4">
        {order.items.map((item) => (
          <div
            key={item.ticketTypeId}
            className="flex items-start justify-between gap-4"
          >
            <div>
              <p className="font-medium">{item.ticketTypeName}</p>

              <p className="text-sm text-[var(--color-muted)]">
                {item.quantity} × ₹{(item.unitPrice / 100).toFixed(2)}
              </p>
            </div>

            <p className="font-medium">
              ₹{((item.unitPrice * item.quantity) / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-[var(--color-border)] pt-5">
        <PriceBreakdown pricing={order.pricing} />
      </div>
    </Card>
  );
}
