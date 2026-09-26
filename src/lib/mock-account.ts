import type { Ticket } from "@/types/ticket";
import type { UserProfile } from "@/types/user";

export const mockUser: UserProfile = {
  id: "user-arjun-sharma",
  name: "Venkat",
  email: "paritalavenkatramana@gmail.com",
  phone: "+91 98765 43210",
  college: "KITSW",
  branch: "CSE",
  year: "3rd Year",
  stats: { eventsAttended: 0, eventsInterested: 0, loyaltyPoints: 0 },
  likedEventIds: [],
  attendedEventIds: [],
};

export const mockTickets: Ticket[] = [];
/*
export const seededMockTickets: Ticket[] = [
  {
    id: "ticket-crescendo-1",
    orderId: "ZOR26690123",
    eventName: "Crescendo Fest 2026",
    eventBannerUrl:
      "https://images.unsplash.com/photo-1540039155732-6762491a6549?auto=format&fit=crop&w=800&q=85",
    venue: "Main Auditorium, KITSW",
    startAt: "2026-10-12T16:00:00+05:30",
    endAt: "2026-10-12T22:00:00+05:30",
    category: ["Music", "Culture", "Community"],
    ticketTypeName: "General Pass",
    quantity: 2,
    totalPaid: 126500,
    status: "valid",
    bucket: "upcoming",
    qrPayload: "ZOR26690123-CRESCENDO-GENERAL",
    individualTicketIds: ["ZOR-TK-26690123-1", "ZOR-TK-26690123-2"],
  },
  {
    id: "ticket-art-1",
    orderId: "ZOR26691234",
    eventName: "Art Expo 2026",
    eventBannerUrl:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=85",
    venue: "Design Block, KITSW",
    startAt: "2026-10-25T10:00:00+05:30",
    endAt: "2026-10-25T18:00:00+05:30",
    category: ["Art", "Design", "Innovation"],
    ticketTypeName: "Student Pass",
    quantity: 1,
    totalPaid: 19900,
    status: "valid",
    bucket: "upcoming",
    qrPayload: "ZOR26691234-ART-EXPO",
  },
  {
    id: "ticket-food-1",
    orderId: "ZOR26694567",
    eventName: "Food Carnival",
    eventBannerUrl:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85",
    venue: "Central Lawn, KITSW",
    startAt: "2026-11-02T12:00:00+05:30",
    endAt: "2026-11-02T22:00:00+05:30",
    category: ["Food", "Fun", "Friends"],
    ticketTypeName: "Food Pass",
    quantity: 1,
    totalPaid: 14900,
    status: "valid",
    bucket: "upcoming",
    qrPayload: "ZOR26694567-FOOD-CARNIVAL",
  },
  {
    id: "ticket-past-1",
    orderId: "ZOR26680111",
    eventName: "Freshers Welcome",
    eventBannerUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=85",
    venue: "Open Air Theatre, KITSW",
    startAt: "2026-08-20T18:00:00+05:30",
    endAt: "2026-08-20T22:00:00+05:30",
    category: ["Campus", "Music"],
    ticketTypeName: "Entry Pass",
    quantity: 1,
    totalPaid: 9900,
    status: "checked_in",
    bucket: "past",
    qrPayload: "ZOR26680111-FRESHERS",
  },
  {
    id: "ticket-past-2",
    orderId: "ZOR26670222",
    eventName: "Film Club Screening",
    eventBannerUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=85",
    venue: "Seminar Hall, KITSW",
    startAt: "2026-07-12T17:00:00+05:30",
    endAt: "2026-07-12T20:00:00+05:30",
    category: ["Film", "Community"],
    ticketTypeName: "Student Pass",
    quantity: 1,
    totalPaid: 9900,
    status: "checked_in",
    bucket: "past",
    qrPayload: "ZOR26670222-FILM",
  },
];
*/

export function formatAccountDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatAccountTime(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}
