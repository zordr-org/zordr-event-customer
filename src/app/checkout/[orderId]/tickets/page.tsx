"use client";

import { Header } from "@/components/layout/Header";
import { CheckoutEventBanner } from "@/components/checkout/CheckoutEventBanner";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { CheckoutBottomBar } from "@/components/checkout/CheckoutBottomBar";
import { useCheckout } from "@/components/checkout/CheckoutProvider";
import { PriceBreakdown } from "@/components/booking/PriceBreakdown";
import { TicketSelection } from "@/components/booking/TicketSelection";
import { PaymentSecurityBanner } from "@/components/payment/PaymentSecurityBanner";
import { formatRupees } from "@/lib/mock-checkout";

export default function SelectTicketsPage() {
  const { event, quantities, setQuantity, orderId } = useCheckout();
  const checkoutTickets = event.ticketTypes;
  const ticketCount = Object.values(quantities).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  const subtotal = checkoutTickets.reduce(
    (sum, ticket) => sum + ticket.price * (quantities[ticket.id] ?? 0),
    0,
  );
  const discount = ticketCount >= 3 ? Math.round(subtotal * 0.1) : 0;
  const convenienceFee = ticketCount ? 4900 : 0;
  const platformFee = ticketCount ? 2500 : 0;
  const gst = Math.round(
    (subtotal - discount + convenienceFee + platformFee) * 0.18,
  );
  const total = subtotal - discount + convenienceFee + platformFee + gst;
  const changeQuantity = (id: string, amount: number, limit: number) =>
    setQuantity(
      id,
      Math.max(0, Math.min((quantities[id] ?? 0) + amount, limit)),
    );

  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-[105px] shadow-sm">
      <Header showBack />
      <CheckoutEventBanner event={event} />
      <div className="px-4 py-3 sm:px-6">
        <CheckoutStepper currentStep="tickets" />
      </div>
      <div className="px-4 sm:px-6">
        <h2 className="text-[22px] font-extrabold text-[#10183a]">
          Select Tickets
        </h2>
        <p className="mt-1 text-[13px] text-[#5b6884]">
          Choose the ticket type and quantity you want to purchase.
        </p>
      </div>
      <TicketSelection
        tickets={checkoutTickets}
        quantities={quantities}
        onQuantityChange={(ticket, amount) =>
          changeQuantity(
            ticket.id,
            amount,
            amount < 0
              ? (ticket.purchaseLimit ?? ticket.available)
              : Math.min(
                  ticket.purchaseLimit ?? ticket.available,
                  ticket.available,
                ),
          )
        }
      />
      <PriceBreakdown
        summary={{
          ticketCount,
          subtotal,
          discount,
          convenienceFee,
          platformFee,
          gst,
          total,
        }}
      />
      <PaymentSecurityBanner compact />
      <CheckoutBottomBar
        total={total}
        actionLabel="Continue to Registration"
        disabled={!ticketCount}
        checkoutLayout={{
          totalLabel: formatRupees(total),
          detail: `${ticketCount} tickets • Incl. all taxes`,
          href: ticketCount ? `/checkout/${orderId}/registration` : "#",
        }}
      />
    </main>
  );
}
