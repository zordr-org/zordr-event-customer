"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { TicketCard } from "@/components/tickets/TicketCard";
import { TicketTabs } from "@/components/tickets/TicketTabs";
import { SupportCard } from "@/components/feedback/SupportCard";
import { mockTickets } from "@/lib/mock-account";
import { getMockTickets } from "@/lib/mock-api";

export default function MyTicketsPage() {
  const [bucket, setBucket] = useState<"upcoming" | "past" | "cancelled">(
    "upcoming",
  );
  const [allTickets, setAllTickets] = useState(mockTickets);
  useEffect(() => {
    const generated = getMockTickets();
    window.setTimeout(() => {
      setAllTickets([
        ...mockTickets.filter(
          (ticket) => !generated.some((item) => item.id === ticket.id),
        ),
        ...generated,
      ]);
    }, 0);
  }, []);
  const tickets = allTickets.filter((ticket) => ticket.bucket === bucket);
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-5 shadow-sm">
      <Header />
      <div className="px-4 pt-5 sm:px-6">
        <h1 className="text-[25px] font-extrabold text-[#10183a]">
          My Tickets
        </h1>
        <p className="mt-1 text-[15px] text-[#5d6a85]">
          Your events, all in one place.
        </p>
        <TicketTabs
          checkout
          activeTab={bucket}
          counts={{
            upcoming: allTickets.filter(
              (ticket) => ticket.bucket === "upcoming",
            ).length,
            past: allTickets.filter((ticket) => ticket.bucket === "past")
              .length,
            cancelled: allTickets.filter(
              (ticket) => ticket.bucket === "cancelled",
            ).length,
          }}
          onChange={setBucket}
        />
      </div>
      <div className="mt-3 space-y-3 px-4 sm:px-6">
        {tickets.length ? (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onCopyOrderId={(orderId) =>
                void navigator.clipboard?.writeText(orderId)
              }
            />
          ))
        ) : (
          <div className="rounded-lg bg-[#f5f8fc] p-6 text-center text-sm text-[#5d6a85]">
            No tickets in this section yet.
          </div>
        )}
      </div>
      <SupportCard ticketList />
    </main>
  );
}
