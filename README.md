# 🎟️ Zordr – Customer Frontend Web Application

> **Events. Experiences. Together.**  
> A high-performance, mobile-first event discovery, booking, and digital ticketing customer portal built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## 📖 Overview

**Zordr** is an end-to-end ticketing and event discovery platform designed to connect attendees with memorable live experiences—from music festivals and cultural events to tech conferences and workshops. 

The customer frontend application delivers a modern, fluid user experience featuring interactive event discovery, dynamic multi-tier checkout with custom attendee registration forms, instant QR code ticket generation, and comprehensive ticket wallet management.

---

## ✨ Key Features

### 🌟 1. Event Discovery & Exploration
- **Hero Carousel**: Highlight marquee events with rich banners, tags, and direct call-to-actions.
- **Categorized Browsing**: Filter across categories including *Music, Cultural, Tech, Sports, Workshops, Comedy, Food,* and *Literary*.
- **Curated Sections**: Dedicated feeds for *Featured Events*, *Upcoming Events*, and *Trending Near You*.
- **Community Highlights**: Community promo banners and social engagement modules.

### 📅 2. Immersive Event Details (`/events/[slug]`)
- **Event Overview & Media**: Rich photo galleries, start/end dates, location with venue maps.
- **Organizer Verification**: Verified organizer badges and contact profiles.
- **Dynamic Ticket Tiers**: Multi-tier pricing (General Admission, VIP, Early Bird) with live availability counters and perk lists.
- **Event FAQs & Terms**: Collapsible accordions for event rules, refund policies, and FAQs.

### 🛒 3. Multi-Step Checkout Funnel (`/checkout/[orderId]`)
- **Step 1: Ticket Selection** (`/tickets`): Quantity picker with purchase limits and real-time order subtotal calculation.
- **Step 2: Attendee Registration** (`/registration`): Dynamic form generator supporting custom organizer fields (text, email, select, checkboxes, file uploads).
- **Step 3: Secure Payment** (`/payment`): Payment method selection, timer countdown, order summary breakdown (taxes, fees, discounts), and error handling (`/payment-failed`).
- **Step 4: Booking Confirmation** (`/success`): Instant order receipt, pass export, and direct link to the ticket wallet.

### 🎟️ 4. Digital Ticket Wallet (`/my-tickets`)
- **Mobile-Ready Digital Passes**: Individual ticket views (`/my-tickets/[ticketId]`) with scannable QR codes and barcodes.
- **Ticket Lifecycle**: Status tracking for *Active*, *Used*, and *Cancelled* passes.
- **Event Actions**: Add to calendar, get map directions, and download/share PDF passes.

### 👤 5. User Account & Authentication
- **Authentication Routes** (`/login`, `/signup`): Secure user access, password management, and streamlined onboarding.
- **Profile Center** (`/profile`): Manage personal details, past booking history, saved payment methods, and notification preferences.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS |
| **Linting & Code Quality** | [ESLint 9](https://eslint.org/) (`eslint-config-next`) |

---

## 📁 Project Structure

```text
zordr_customer_fixed2/
├── public/                  # Static assets (images, icons, svgs)
├── src/
│   ├── app/                 # Next.js App Router routes & layouts
│   │   ├── (auth)/          # Authentication routes (login, signup)
│   │   ├── checkout/        # Multi-step checkout flow ([orderId])
│   │   │   └── [orderId]/   # tickets -> registration -> payment -> success
│   │   ├── events/          # Event details ([slug])
│   │   ├── my-tickets/      # Digital ticket wallet & pass views ([ticketId])
│   │   ├── payment-failed/  # Payment error & retry handling
│   │   ├── profile/         # User profile and order history
│   │   ├── globals.css      # Tailwind v4 & global theme styles
│   │   ├── layout.tsx       # Root application layout
│   │   └── page.tsx         # Home discovery portal
│   ├── components/          # Reusable UI & domain-specific components
│   │   ├── auth/            # Login, Signup, Auth forms
│   │   ├── booking/         # Ticket tier selectors, booking widgets
│   │   ├── checkout/        # Checkout progress bar, summary cards
│   │   ├── confirmation/    # Order success cards, receipt views
│   │   ├── discovery/       # Hero carousel, event cards, category grids
│   │   ├── event/           # Event header, gallery, FAQs, organizer details
│   │   ├── feedback/        # Alerts, modals, error states, toasts
│   │   ├── layout/          # Header, navigation, footer, section headers
│   │   ├── payment/         # Payment gateways, breakdown calculations
│   │   ├── profile/         # Profile form, booking history cards
│   │   ├── registration/    # Dynamic custom form field renderers
│   │   ├── tickets/         # Digital QR passes, barcode cards
│   │   └── ui/              # Buttons, inputs, badges, dialogs, cards
│   ├── lib/                 # Core utilities, API clients & mock data
│   │   ├── api/             # API request wrappers & service endpoints
│   │   ├── hooks/           # Custom React hooks
│   │   ├── mock-account.ts  # Mock profile and order data
│   │   ├── mock-api.ts      # Mock event data & backend simulator
│   │   ├── mock-checkout.ts # Mock checkout session utilities
│   │   ├── utils/           # Formatters (currency in paise, date/time, cn helper)
│   │   └── validation/      # Form & payload validation schemas
│   ├── stores/              # Client-side state management stores
│   ├── styles/              # Design tokens and shared styling definitions
│   └── types/               # TypeScript interfaces & domain models
│       ├── event.ts         # Event, Venue, TicketType interfaces
│       ├── order.ts         # Order & checkout transaction interfaces
│       ├── registrationField.ts # Dynamic registration schema types
│       ├── ticket.ts        # Digital ticket & pass definitions
│       └── user.ts          # User profile & account types
├── eslint.config.mjs        # ESLint flat configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and npm scripts
├── postcss.config.mjs       # PostCSS configuration for Tailwind v4
└── tsconfig.json            # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later recommended
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd zordr_customer_fixed2
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
To create an optimized production build:
```bash
npm run build
```

To run the production server locally:
```bash
npm run start
```

### 4. Code Quality & Linting
```bash
npm run lint
```

---

## 💡 Key Design & Development Conventions

1. **Currency Handling**: All prices are represented in **paise (smallest currency unit)** in data models to avoid floating-point inaccuracies and formatted to INR (`₹`) in the UI via helper utilities.
2. **Dynamic Registration**: Organizers can configure custom attendee fields (required/optional, validation regex, dropdown options) which are rendered dynamically during the registration step.
3. **Mobile-First Responsiveness**: All discovery feeds, checkout dialogs, and ticket passes are optimized for fluid mobile interactions and scaled gracefully for desktop displays.
4. **App Router Conventions**: Nested layouts, loading boundaries, and isolated dynamic routes (`[slug]`, `[orderId]`, `[ticketId]`) ensure clean separation of concerns.

---

## 📄 License

This project is proprietary and confidential. All rights reserved.
