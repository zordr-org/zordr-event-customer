import { mockEventDetails } from "@/app/home-data";
import type { EventDetail, TicketType } from "@/types/event";

export const checkoutEvent: EventDetail = mockEventDetails[0];

export const checkoutTickets = checkoutEvent.ticketTypes.map(
  (ticket, index) => ({
    ...ticket,
    defaultQuantity: index === 0 ? 2 : 0,
  }),
);

export function getCheckoutItems(quantities: Record<string, number>) {
  return checkoutTickets
    .filter((ticket) => (quantities[ticket.id] ?? 0) > 0)
    .map((ticket) => ({
      ticket,
      quantity: quantities[ticket.id] ?? 0,
    }));
}

export function getCheckoutPricing(quantities: Record<string, number>) {
  const subtotal = getCheckoutItems(quantities).reduce(
    (total, item) => total + item.ticket.price * item.quantity,
    0,
  );
  const convenienceFee = subtotal > 0 ? 4900 : 0;
  const platformFee = subtotal > 0 ? 2500 : 0;
  const gst = Math.round((subtotal + convenienceFee + platformFee) * 0.18);
  return {
    subtotal,
    convenienceFee,
    platformFee,
    gst,
    total: subtotal + convenienceFee + platformFee + gst,
  };
}

export function formatRupees(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export function getDefaultQuantities() {
  return Object.fromEntries(
    checkoutTickets.map((ticket) => [ticket.id, ticket.defaultQuantity]),
  );
}

export function getTicketName(ticket: TicketType) {
  return ticket.name;
}
