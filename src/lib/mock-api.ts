import { mockEventDetails } from "@/app/home-data";
import { mockUser } from "@/lib/mock-account";
import type { EventDetail } from "@/types/event";
import type { Order, OrderItem, PriceBreakdownData } from "@/types/order";
import type { Ticket } from "@/types/ticket";
import type { UserProfile } from "@/types/user";

export interface MockRegistration {
  name: string;
  email: string;
  phone: string;
  college: string;
  roll: string;
  branch: string;
  year: string;
  team: string;
  shirt: string;
}

export interface MockCheckout {
  orderId: string;
  eventId: string;
  quantities: Record<string, number>;
  registration: MockRegistration;
  paymentMethod: string;
  paid: boolean;
}

export interface MockAuthUser {
  id: string;
  email: string;
  password: string;
  profile: UserProfile;
}

const checkoutKey = "zordr-mock-checkouts";
const orderKey = "zordr-mock-orders";
const ticketKey = "zordr-mock-tickets-v2";
const userKey = "zordr-mock-user";
const authUsersKey = "zordr-mock-auth-users-v1";
const registrationKey = "zordr-mock-last-registration-v1";

const emptyRegistration: MockRegistration = {
  name: "",
  email: "",
  phone: "",
  college: "",
  roll: "",
  branch: "",
  year: "",
  team: "",
  shirt: "",
};

export const demoCredentials = {
  email: mockUser.email,
  password: "Zordr@123",
};

const demoAuthUser: MockAuthUser = {
  id: mockUser.id,
  email: demoCredentials.email,
  password: demoCredentials.password,
  profile: { ...mockUser, email: demoCredentials.email },
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getMockUser(): UserProfile {
  const user = read(userKey, mockUser);
  return {
    ...user,
    likedEventIds: user.likedEventIds ?? [],
    attendedEventIds: user.attendedEventIds ?? [],
  };
}

export function saveMockUser(user: UserProfile) {
  write(userKey, user);
  return user;
}

export function toggleLikedEvent(eventId: string) {
  const user = getMockUser();
  const likedEventIds = user.likedEventIds ?? [];
  const liked = likedEventIds.includes(eventId);
  const nextUser = {
    ...user,
    likedEventIds: liked
      ? likedEventIds.filter((id) => id !== eventId)
      : [...likedEventIds, eventId],
    stats: {
      ...user.stats,
      eventsInterested: liked
        ? Math.max(0, user.stats.eventsInterested - 1)
        : user.stats.eventsInterested + 1,
    },
  };
  saveMockUser(nextUser);
  return nextUser;
}

export function isEventLiked(eventId: string) {
  return getMockUser().likedEventIds?.includes(eventId) ?? false;
}

function getAuthUsers() {
  return read<MockAuthUser[]>(authUsersKey, [demoAuthUser]);
}

export function loginMockUser(email: string, password: string) {
  const user = getAuthUsers().find(
    (candidate) =>
      candidate.email.toLowerCase() === email.trim().toLowerCase() &&
      candidate.password === password,
  );
  if (!user) return null;
  saveMockUser(user.profile);
  return user.profile;
}
export type ChangePasswordResult =
  | "success"
  | "current-password-invalid"
  | "weak-password"
  | "user-not-found";

export function changeMockPassword(
  currentPassword: string,
  newPassword: string,
): ChangePasswordResult {
  const user = getMockUser();
  const users = getAuthUsers();

  const userIndex = users.findIndex(
    (candidate) =>
      candidate.email.trim().toLowerCase() === user.email.trim().toLowerCase(),
  );

  if (userIndex === -1) {
    return "user-not-found";
  }

  if (users[userIndex].password !== currentPassword) {
    return "current-password-invalid";
  }

  const strongPassword =
    newPassword.length >= 8 &&
    /[A-Z]/.test(newPassword) &&
    /[a-z]/.test(newPassword) &&
    /\d/.test(newPassword) &&
    /[^A-Za-z0-9]/.test(newPassword);

  if (!strongPassword) {
    return "weak-password";
  }

  const updatedUsers = [...users];

  updatedUsers[userIndex] = {
    ...updatedUsers[userIndex],
    password: newPassword,
  };

  write(authUsersKey, updatedUsers);

  return "success";
}

export function registerMockUser(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const users = getAuthUsers();
  if (
    users.some(
      (user) => user.email.toLowerCase() === input.email.trim().toLowerCase(),
    )
  ) {
    return null;
  }
  const profile: UserProfile = {
    id: `user-${Date.now().toString(36)}`,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    stats: { eventsAttended: 0, eventsInterested: 0, loyaltyPoints: 0 },
  };
  write(authUsersKey, [
    ...users,
    { id: profile.id, email: profile.email, password: input.password, profile },
  ]);
  saveMockUser(profile);
  return profile;
}

export function getLastRegistration(): MockRegistration {
  return read(registrationKey, { ...emptyRegistration });
}

export function saveLastRegistration(registration: MockRegistration) {
  write(registrationKey, registration);
}

export function getEvent(eventId: string): EventDetail {
  return (
    mockEventDetails.find((event) => event.id === eventId) ??
    mockEventDetails[0]
  );
}

export function getCheckout(orderId: string): MockCheckout | null {
  return read<Record<string, MockCheckout>>(checkoutKey, {})[orderId] ?? null;
}

export function createCheckout(
  eventId: string,
  quantities: Record<string, number>,
) {
  const orderId = `ZOR-${Date.now().toString(36).toUpperCase()}`;
  const checkout: MockCheckout = {
    orderId,
    eventId,
    quantities,
    registration: getLastRegistration(),
    paymentMethod: "upi",
    paid: false,
  };
  const checkouts = read<Record<string, MockCheckout>>(checkoutKey, {});
  checkouts[orderId] = checkout;
  write(checkoutKey, checkouts);
  return checkout;
}

export function saveCheckout(checkout: MockCheckout) {
  const checkouts = read<Record<string, MockCheckout>>(checkoutKey, {});
  checkouts[checkout.orderId] = checkout;
  write(checkoutKey, checkouts);
  return checkout;
}

export function getCheckoutItems(
  event: EventDetail,
  quantities: Record<string, number>,
) {
  return event.ticketTypes
    .filter((ticket) => (quantities[ticket.id] ?? 0) > 0)
    .map((ticket) => ({ ticket, quantity: quantities[ticket.id] ?? 0 }));
}

export function getPricing(
  event: EventDetail,
  quantities: Record<string, number>,
): PriceBreakdownData {
  const subtotal = getCheckoutItems(event, quantities).reduce(
    (total, item) => total + item.ticket.price * item.quantity,
    0,
  );
  const discount =
    Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0) >= 3
      ? Math.round(subtotal * 0.1)
      : 0;
  const convenienceFee = subtotal ? 4900 : 0;
  const platformFee = subtotal ? 2500 : 0;
  const taxable = subtotal - discount + convenienceFee + platformFee;
  const gst = Math.round(taxable * 0.18);
  return {
    subtotal: subtotal - discount,
    convenienceFee,
    platformFee,
    gst,
    total: taxable + gst,
  };
}

export function completePayment(checkout: MockCheckout): {
  order: Order;
  tickets: Ticket[];
} {
  const event = getEvent(checkout.eventId);
  const items: OrderItem[] = getCheckoutItems(event, checkout.quantities).map(
    ({ ticket, quantity }) => ({
      ticketTypeId: ticket.id,
      ticketTypeName: ticket.name,
      quantity,
      unitPrice: ticket.price,
    }),
  );
  const pricing = getPricing(event, checkout.quantities);
  const order: Order = {
    id: checkout.orderId,
    eventId: event.id,
    status: "paid",
    items,
    pricing,
    registrationComplete: true,
    createdAt: new Date().toISOString(),
  };
  const tickets = items.map((item) => {
    const ticketId = `${checkout.orderId}-${item.ticketTypeId}`;
    return {
      id: ticketId,
      orderId: order.id,
      eventName: event.name,
      eventBannerUrl: event.bannerUrl,
      venue: `${event.venue.name}, ${event.venue.address}`,
      startAt: event.startAt,
      endAt: event.endAt,
      category: event.category,
      ticketTypeName: item.ticketTypeName,
      quantity: item.quantity,
      totalPaid: item.unitPrice * item.quantity,
      status: "valid",
      bucket: "upcoming",
      qrPayload: `${order.id}-${item.ticketTypeId}`,
      individualTicketIds: Array.from(
        { length: item.quantity },
        (_, index) => `${ticketId}-${index + 1}`,
      ),
    } satisfies Ticket;
  });
  const orders = read<Order[]>(orderKey, []);
  const ticketsInStorage = read<Ticket[]>(ticketKey, []);
  write(orderKey, [...orders.filter((item) => item.id !== order.id), order]);
  write(ticketKey, [
    ...ticketsInStorage.filter((item) => item.orderId !== order.id),
    ...tickets,
  ]);
  saveCheckout({ ...checkout, paid: true });
  saveLastRegistration(checkout.registration);
  const user = getMockUser();
  const attendedEventIds = user.attendedEventIds ?? [];
  if (!attendedEventIds.includes(event.id)) {
    saveMockUser({
      ...user,
      attendedEventIds: [...attendedEventIds, event.id],
      stats: {
        ...user.stats,
        eventsAttended: attendedEventIds.length + 1,
        loyaltyPoints: user.stats.loyaltyPoints + 50,
      },
    });
  }
  return { order, tickets };
}

export function getMockOrders() {
  return read<Order[]>(orderKey, []);
}

export function isEventRegistered(eventId: string) {
  return getMockOrders().some(
    (order) => order.eventId === eventId && order.status === "paid",
  );
}

export function getMockTickets() {
  return read<Ticket[]>(ticketKey, []);
}
