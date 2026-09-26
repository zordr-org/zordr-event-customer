"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { MockQrCode } from "@/components/tickets/MockQrCode";
import { TicketInformation } from "@/components/tickets/TicketInformation";
import { OrderDetails } from "@/components/tickets/OrderDetails";
import { EntryInstructions } from "@/components/tickets/EntryInstructions";
import { ResilientImage } from "@/components/ui/ResilientImage";
import {
  formatAccountDate,
  formatAccountTime,
  mockTickets,
} from "@/lib/mock-account";
import { getMockTickets } from "@/lib/mock-api";
import {
  IconCalendarDays,
  IconMapPin,
  IconShare,
  IconClock,
} from "@/components/ui/Icons";

export default function TicketDetailsPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [tickets, setTickets] = useState(mockTickets);
  useEffect(() => {
    const generated = getMockTickets();
    window.setTimeout(() => {
      setTickets([
        ...mockTickets.filter(
          (ticket) => !generated.some((item) => item.id === ticket.id),
        ),
        ...generated,
      ]);
    }, 0);
  }, []);
  const ticket = tickets.find((item) => item.id === ticketId) ?? mockTickets[0];
  const [qrOpen, setQrOpen] = useState(false);
  const share = async () =>
    ticket && navigator.share
      ? navigator.share({ title: ticket.eventName, url: window.location.href })
      : ticket && navigator.clipboard?.writeText(window.location.href);
  if (!ticket) {
    return (
      <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-5 shadow-sm">
        <Header showBack />
        <section className="px-4 py-12 text-center sm:px-6">
          <h1 className="text-[22px] font-extrabold text-[#10183a]">
            Ticket not found
          </h1>
          <p className="mt-2 text-[13px] text-[#5d6a85]">
            This ticket may have been removed or has not finished loading.
          </p>
        </section>
      </main>
    );
  }
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-5 shadow-sm">
      <Header showBack />
      <div className="px-4 pt-4 sm:px-6">
        <h1 className="text-[22px] font-extrabold text-[#10183a]">
          Ticket Details
        </h1>
        <p className="text-[14px] text-[#5d6a85]">
          Show this ticket at the venue for entry.
        </p>
      </div>
      <section className="mx-4 mt-3 overflow-hidden rounded-[10px] border border-[#e1e6ec] sm:mx-6">
        <ResilientImage
          src={ticket.eventBannerUrl}
          alt={ticket.eventName}
          className="h-[132px] w-full object-cover"
        />
        <div className="p-3">
          <div className="flex flex-wrap items-start gap-2">
            <div className="min-w-0 flex-1">
              <h2 className="break-words text-[20px] font-extrabold leading-6 text-[#111a3b]">
                {ticket.eventName}
              </h2>
              <p className="break-words text-[13px] text-[#52617e]">
                {ticket.category.join(" • ")}
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-[#dff8ec] px-2 py-1 text-[10px] font-bold text-[#0a9d60]">
              ✓ Valid Ticket
            </span>
          </div>
          <div className="mt-3 space-y-2 text-[12px] text-[#17203b]">
            <p className="flex items-center gap-2">
              <IconCalendarDays size={17} /> {formatAccountDate(ticket.startAt)}
            </p>
            <p className="flex items-center gap-2">
              <IconClock size={17} /> {formatAccountTime(ticket.startAt)} -{" "}
              {formatAccountTime(ticket.endAt ?? ticket.startAt)}
            </p>
            <p className="flex items-center gap-2">
              <IconMapPin size={17} /> {ticket.venue}
            </p>
          </div>
          <TicketInformation ticket={ticket} checkout />
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="mt-3 flex w-full flex-col items-center rounded-lg bg-[#f5f8fc] py-3"
          >
            <MockQrCode value={ticket.qrPayload ?? ticket.id} large />
            <span className="mt-1 text-[10px] text-[#53617e]">
              Scan this QR code at the venue
            </span>
          </button>
        </div>
      </section>
      <div className="mx-4 mt-2 grid grid-cols-2 gap-2 sm:mx-6">
        <button
          type="button"
          onClick={() => window.print()}
          className="h-10 rounded-lg border border-[#697791] text-[12px] font-semibold text-[#17203b]"
        >
          ⇩ &nbsp; Download Ticket
        </button>
        <button
          type="button"
          onClick={() => void share()}
          className="flex h-10 items-center justify-center rounded-lg border border-[#697791] text-[12px] font-semibold text-[#17203b]"
        >
          <IconShare size={15} className="mr-2" />
          Share Ticket
        </button>
      </div>
      <OrderDetails
        orderId={ticket.orderId}
        bookingDate="Oct 10, 2026, 10:24 AM"
        totalPaid={ticket.totalPaid}
        paymentMethod="UPI (Razorpay)"
        checkout
      />
      <EntryInstructions checkout />
      {qrOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b1d]/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="rounded-xl bg-white p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <MockQrCode value={ticket.qrPayload ?? ticket.id} large />
            <p className="mt-2 text-center text-xs text-[#53617e]">
              Tap outside to close
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
