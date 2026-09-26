import type { EventDetail, EventSummary } from "@/types/event";

const concertGallery = [
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafb9?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1000&q=85",
];

export const mockEventDetails: EventDetail[] = [
  {
    id: "event-1",
    slug: "crescendo-fest-2026",
    name: "Crescendo Fest 2026",
    bannerUrl:
      "https://images.unsplash.com/photo-1540039155732-6762491a6549?auto=format&fit=crop&w=1200&q=90",
    category: ["Music", "Cultural", "College Event"],
    startAt: "2026-10-12T16:00:00+05:30",
    endAt: "2026-10-12T22:00:00+05:30",
    venue: {
      name: "Main Auditorium",
      address: "KITSW, Warangal, Telangana",
      lat: 18.005,
      lng: 79.552,
      mapUrl: "https://maps.google.com/?q=KITSW+Main+Auditorium",
    },
    organizer: {
      name: "KITSW Cultural Club",
      logoUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=160&q=85",
      verified: true,
    },
    description:
      "Crescendo Fest 2026 is the biggest cultural celebration of KITSW, bringing together music, art, talent, and unforgettable experiences. Get ready for a day full of electrifying performances, fun activities, food, and more!",
    gallery: concertGallery,
    attendingCount: 2400,
    registrationDeadline: "2026-10-12T15:00:00+05:30",
    ticketTypes: [
      {
        id: "crescendo-general",
        name: "General Pass",
        description: "Access to all main events",
        price: 49900,
        available: 420,
        quantity: 0,
        purchaseLimit: 10,
      },
      {
        id: "crescendo-vip",
        name: "VIP Pass",
        description: "Priority entry and exclusive lounge",
        price: 149900,
        available: 120,
        quantity: 0,
        purchaseLimit: 6,
        mostPopular: true,
        perks: ["Priority entry", "Exclusive lounge", "Goodie bag"],
      },
      {
        id: "crescendo-backstage",
        name: "Backstage Pass",
        description: "Meet & Greet and backstage access",
        price: 249900,
        available: 50,
        quantity: 0,
        purchaseLimit: 4,
        perks: ["Meet & Greet", "Backstage access"],
      },
      {
        id: "crescendo-group",
        name: "Group Pass (5+ people)",
        description: "Special group discount",
        price: 44900,
        originalPrice: 49900,
        available: 200,
        quantity: 0,
        purchaseLimit: 2,
      },
    ],
    faqs: [
      {
        question: "Can I transfer my ticket?",
        answer:
          "Tickets can be transferred to another attendee before registration closes.",
      },
      {
        question: "What should I bring to the event?",
        answer:
          "Bring your ticket QR code and a valid college or government ID.",
      },
    ],
    terms:
      "Tickets are non-refundable after purchase. Entry is subject to venue capacity and the event organiser's guidelines.",
  },
  {
    id: "event-2",
    slug: "technova-2026",
    name: "Technova 2026",
    bannerUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=90",
    category: ["Tech", "Hackathon", "Innovation"],
    startAt: "2026-11-05T09:00:00+05:30",
    endAt: "2026-11-06T18:00:00+05:30",
    venue: {
      name: "KITSW Innovation Hub",
      address: "KITSW Campus, Warangal, Telangana",
      lat: 18.005,
      lng: 79.552,
      mapUrl: "https://maps.google.com/?q=KITSW+Campus",
    },
    organizer: {
      name: "KITSW Tech Society",
      logoUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=160&q=85",
      verified: true,
    },
    description:
      "Technova 2026 is a two-day innovation festival for builders, designers, and problem solvers. Form a team, ship an idea, and learn from mentors across the technology community.",
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
    ],
    attendingCount: 850,
    registrationDeadline: "2026-11-04T23:59:00+05:30",
    ticketTypes: [
      {
        id: "technova-student",
        name: "Student Pass",
        description: "Hackathon entry and workshops",
        price: 29900,
        available: 300,
        quantity: 0,
        purchaseLimit: 5,
      },
      {
        id: "technova-pro",
        name: "Pro Pass",
        description: "Mentor rooms and priority workshops",
        price: 79900,
        available: 80,
        quantity: 0,
        purchaseLimit: 3,
        mostPopular: true,
      },
      {
        id: "technova-team",
        name: "Team Pass",
        description: "Entry for a team of four",
        price: 99900,
        available: 40,
        quantity: 0,
        purchaseLimit: 2,
        perks: ["Four entries", "Team workspace"],
      },
    ],
    faqs: [
      {
        question: "Do I need a team to join?",
        answer:
          "No. Individual participants can find teammates during the opening mixer.",
      },
    ],
    terms:
      "Hackathon submissions must be created during the event window and follow the published code of conduct.",
  },
  {
    id: "event-3",
    slug: "design-workshop",
    name: "Design Workshop",
    bannerUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=90",
    category: ["Workshops", "Design"],
    startAt: "2026-10-20T10:00:00+05:30",
    endAt: "2026-10-20T16:00:00+05:30",
    venue: {
      name: "KITSW Design Lab",
      address: "KITSW Campus, Warangal, Telangana",
      lat: 18.005,
      lng: 79.552,
      mapUrl: "https://maps.google.com/?q=KITSW+Design+Lab",
    },
    organizer: {
      name: "KITSW Design Circle",
      logoUrl:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=160&q=85",
      verified: true,
    },
    description:
      "A hands-on design workshop covering research, wireframing, visual systems, and presenting product ideas with clarity. Bring a laptop and leave with a polished case study starter.",
    gallery: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1000&q=85",
    ],
    attendingCount: 120,
    registrationDeadline: "2026-10-19T18:00:00+05:30",
    ticketTypes: [
      {
        id: "design-basic",
        name: "Workshop Seat",
        description: "Full-day workshop access",
        price: 19900,
        available: 60,
        quantity: 0,
        purchaseLimit: 2,
      },
      {
        id: "design-mentor",
        name: "Mentor Seat",
        description: "Workshop plus a portfolio review",
        price: 39900,
        available: 20,
        quantity: 0,
        purchaseLimit: 1,
        mostPopular: true,
      },
      {
        id: "design-kit",
        name: "Workshop Kit",
        description: "Seat, materials, and design resource pack",
        price: 49900,
        available: 25,
        quantity: 0,
        purchaseLimit: 1,
      },
    ],
    faqs: [
      {
        question: "Is this suitable for beginners?",
        answer:
          "Yes. The workshop starts with fundamentals and includes guided exercises.",
      },
    ],
    terms:
      "Seats are limited. Please carry your own laptop and arrive fifteen minutes before the workshop begins.",
  },
  {
    id: "event-4",
    slug: "dj-night",
    name: "DJ Night",
    bannerUrl:
      "https://images.unsplash.com/photo-1571266028243-cb40fce75737?auto=format&fit=crop&w=1200&q=90",
    category: ["Music", "Party"],
    startAt: "2026-10-26T21:00:00+05:30",
    endAt: "2026-10-27T00:30:00+05:30",
    venue: {
      name: "Student Activity Center",
      address: "KITSW Campus, Warangal, Telangana",
      lat: 18.005,
      lng: 79.552,
      mapUrl: "https://maps.google.com/?q=KITSW+Student+Activity+Center",
    },
    organizer: {
      name: "Zordr Live",
      logoUrl:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=160&q=85",
      verified: true,
    },
    description:
      "A high-energy campus night with live DJ sets, lights, food stalls, and a dance floor built for the whole student community.",
    gallery: [
      "https://images.unsplash.com/photo-1571266028243-cb40fce75737?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
    ],
    attendingCount: 640,
    registrationDeadline: "2026-10-26T20:00:00+05:30",
    ticketTypes: [
      {
        id: "dj-entry",
        name: "Entry Pass",
        description: "Dance floor and live DJ access",
        price: 39900,
        available: 500,
        quantity: 0,
        purchaseLimit: 5,
      },
      {
        id: "dj-fast-track",
        name: "Fast Track",
        description: "Priority entry and welcome drink",
        price: 69900,
        available: 100,
        quantity: 0,
        purchaseLimit: 3,
        mostPopular: true,
      },
      {
        id: "dj-lounge",
        name: "Lounge Pass",
        description: "Reserved lounge access for two",
        price: 149900,
        available: 30,
        quantity: 0,
        purchaseLimit: 1,
        perks: ["Reserved lounge", "Two entries"],
      },
    ],
    faqs: [
      {
        question: "Is there an age restriction?",
        answer:
          "This event is open to registered KITSW students aged 18 and above.",
      },
    ],
    terms:
      "Valid ID is required at entry. Outside food, drinks, and professional recording equipment are not permitted.",
  },
];

export const mockEvents: EventSummary[] = mockEventDetails.map((event) => ({
  id: event.id,
  slug: event.slug,
  name: event.name,
  bannerUrl: event.bannerUrl,
  category: event.category,
  startAt: event.startAt,
  endAt: event.endAt,
  venue: event.venue,
  priceFrom: Math.min(...event.ticketTypes.map((ticket) => ticket.price)),
}));
