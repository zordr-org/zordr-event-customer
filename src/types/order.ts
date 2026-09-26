export interface OrderItem {
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
  unitPrice: number; // paise
}

export type OrderStatus =
  | "draft"
  | "awaiting_payment"
  | "paid"
  | "cancelled"
  | "failed";

export interface PriceBreakdownData {
  subtotal: number;
  convenienceFee: number;
  platformFee: number;
  gst: number;
  total: number;
}

export interface Order {
  id: string;
  eventId: string;
  status: OrderStatus;
  items: OrderItem[];
  pricing: PriceBreakdownData;
  registrationComplete: boolean;
  createdAt: string;
}
