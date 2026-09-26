export type TicketStatus = "valid" | "checked_in" | "cancelled" | "void";

export type TicketBucket = "upcoming" | "past" | "cancelled";

export interface Ticket {
  id: string;
  orderId: string;
  eventName: string;
  eventBannerUrl: string;
  venue: string;
  startAt: string;
  endAt?: string;
  category: string[];
  ticketTypeName: string;
  quantity: number;
  totalPaid: number; // paise
  status: TicketStatus;
  bucket: TicketBucket;
  qrPayload?: string;
  individualTicketIds?: string[];
}
