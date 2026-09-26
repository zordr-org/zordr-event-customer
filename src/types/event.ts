export interface Venue {
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  mapUrl?: string;
}

export interface TicketType {
  id: string;
  name: string;
  description?: string;
  price: number; // paise
  originalPrice?: number;
  available: number;
  quantity: number;
  purchaseLimit?: number;
  mostPopular?: boolean;
  perks?: string[];
}

export interface EventSummary {
  id: string;
  slug: string;
  name: string;
  bannerUrl: string;
  category: string[];
  startAt: string;
  endAt?: string;
  venue: Venue;
  priceFrom: number;
}

export interface EventDetail extends Omit<EventSummary, "priceFrom"> {
  organizer: {
    name: string;
    logoUrl?: string;
    verified: boolean;
  };

  description: string;
  gallery: string[];
  attendingCount?: number;
  registrationDeadline?: string;
  ticketTypes: TicketType[];

  faqs?: {
    question: string;
    answer: string;
  }[];

  terms?: string;
}
