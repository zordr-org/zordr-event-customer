"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/components/checkout/CheckoutProvider";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { formatRupees } from "@/lib/mock-checkout";
import { getCheckoutItems, getPricing } from "@/lib/mock-api";
import { Header } from "@/components/layout/Header";
import { BookingConfirmation } from "@/components/confirmation/BookingConfirmation";
import { ConfirmationActions } from "@/components/confirmation/ConfirmationActions";
import { RecommendedEvents } from "@/components/confirmation/RecommendedEvents";
import { TicketSummary } from "@/components/confirmation/TicketSummary";
import { IconCalendarDays, IconMapPin } from "@/components/ui/Icons";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { quantities, paid, event, orderId, registration } = useCheckout();
  const pricing = getPricing(event, quantities);
  const selectedItems = getCheckoutItems(event, quantities);
  const primaryItem = selectedItems[0] ?? {
    ticket: event.ticketTypes[0],
    quantity: 0,
  };
  useEffect(() => {
    if (!paid) router.replace(`/checkout/${orderId}/payment`);
  }, [paid, orderId, router]);
  const handleShare = async () => {
    if (navigator.share)
      await navigator.share({
        title: event.name,
        url: window.location.href,
      });
    else await navigator.clipboard?.writeText(window.location.href);
  };
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-6 shadow-sm">
      <Header />
      <BookingConfirmation
        checkout={{
          orderId,
          totalPaid: formatRupees(pricing.total),
          email: registration.email,
          paymentTimestamp: "Oct 12, 2026, 10:24 AM",
        }}
      />
      <section className="mx-4 mt-3 rounded-[10px] border border-[#e1e6ec] p-3 sm:mx-6">
        <div className="flex gap-3">
          <ResilientImage
            src={event.bannerUrl}
            alt={event.name}
            className="h-20 w-28 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-[15px] font-bold text-[#17203b]">
              {event.name}
            </h2>
            <p className="mt-1 text-[11px] text-[#5e6b85]">
              {event.category.join(" • ")}
            </p>
            <p className="mt-2 flex items-center gap-1 text-[10px] text-[#4f5d78]">
              <IconCalendarDays size={13} /> Oct 12, 2026{" "}
              <span className="mx-1">•</span> 4:00 PM - 10:00 PM
            </p>
            <p className="mt-1 flex items-center gap-1 text-[10px] text-[#4f5d78]">
              <IconMapPin size={13} /> {event.venue.name}, {event.venue.address}
            </p>
          </div>
        </div>
      </section>
      <TicketSummary
        checkout
        items={[
          {
            ticketTypeName: primaryItem.ticket.name,
            description: primaryItem.ticket.description,
            quantity: primaryItem.quantity,
            unitPrice: primaryItem.ticket.price,
          },
        ]}
      />
      <ConfirmationActions
        checkout
        onDownloadTicket={() => window.print()}
        onShareEvent={() => void handleShare()}
      />
      <div className="mx-4 mt-3 rounded-lg bg-[#eef5ff] px-3 py-3 text-[10px] text-[#536481] sm:mx-6">
        <b className="text-[#17203b]">ⓘ &nbsp; Important Information</b>
        <ul className="mt-1 list-disc pl-4">
          <li>Carry a valid photo ID for entry.</li>
          <li>Your ticket QR code will be scanned at the venue.</li>
        </ul>
      </div>
      <RecommendedEvents checkout />
    </main>
  );
}
