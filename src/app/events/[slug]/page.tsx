"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { CountdownTimer } from "@/components/event/CountdownTimer";
import { EventDescription } from "@/components/event/EventDescription";
import { EventGallery } from "@/components/event/EventGallery";
import { EventHero } from "@/components/event/EventHero";
import { EventMeta } from "@/components/event/EventMeta";
import { FAQSection } from "@/components/event/FAQSection";
import { TermsSection } from "@/components/event/TermsSection";
import { mockEventDetails } from "@/app/home-data";
import { createCheckout } from "@/lib/mock-api";
import {
  isEventLiked,
  isEventRegistered,
  toggleLikedEvent,
} from "@/lib/mock-api";
import type { EventDetail } from "@/types/event";
import {
  IconChevronRight,
  IconTicket,
  IconCrown,
  IconStar,
  IconPercent,
} from "@/components/ui/Icons";

type Ticket = EventDetail["ticketTypes"][number] & {
  icon: "percent" | "crown" | "star";
};

const ticketIcons: Ticket["icon"][] = ["percent", "crown", "star"];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

function getDay(date: string) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "long" }).format(
    new Date(date),
  );
}

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(deadline: string): Countdown {
  const remaining = Math.max(0, new Date(deadline).getTime() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function ImagePreview({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080b18]/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      <div
        className="relative max-h-full max-w-[min(92vw,760px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
        />
        <button
          type="button"
          aria-label="Close image preview"
          onClick={onClose}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-[#17203b] shadow-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function TicketIcon({ type }: { type: Ticket["icon"] }) {
  const Icon =
    type === "crown" ? IconCrown : type === "star" ? IconStar : IconPercent;
  const colors =
    type === "crown"
      ? "bg-[#fff5dc] text-[#efa900]"
      : type === "star"
        ? "bg-[#f1eaff] text-[#6034db]"
        : "bg-[#eaf1ff] text-[#3068db]";
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${colors}`}
    >
      <Icon size={15} />
    </span>
  );
}

function TicketRow({
  ticket,
  quantity,
  onChange,
}: {
  ticket: Ticket;
  quantity: number;
  onChange: (change: number) => void;
}) {
  return (
    <div className="flex min-h-[53px] items-center gap-2 rounded-[10px] border border-[#e4e8ed] px-2.5 py-1.5 shadow-[0_1px_2px_rgba(16,24,40,0.02)]">
      <TicketIcon type={ticket.icon} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-bold leading-[15px] text-[#18203c]">
          {ticket.name}
        </p>
        <p className="truncate text-[9px] leading-[13px] text-[#64708a]">
          {ticket.description}
        </p>
      </div>
      <div className="w-[57px] shrink-0">
        <p className="text-[12px] font-bold text-[#17203b]">
          ₹{(ticket.price / 100).toLocaleString("en-IN")}
        </p>
        <p className="text-[9px] font-medium text-[#13a568]">
          Available: {ticket.available}
        </p>
      </div>
      <div className="flex h-[27px] shrink-0 items-center overflow-hidden rounded-[7px] border border-[#e2e6eb] text-[12px] text-[#17203b]">
        <button
          type="button"
          aria-label={`Remove one ${ticket.name}`}
          onClick={() => onChange(-1)}
          className="h-full w-7 text-[#8791a2] hover:bg-[#f4f6f8]"
        >
          −
        </button>
        <span className="w-5 text-center font-medium">{quantity}</span>
        <button
          type="button"
          aria-label={`Add one ${ticket.name}`}
          onClick={() => onChange(1)}
          className="h-full w-7 hover:bg-[#f4f6f8]"
        >
          +
        </button>
      </div>
    </div>
  );
}

function UtilityRow({
  icon,
  onClick,
  children,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[31px] w-full items-center justify-between border-b border-[#edf0f2] px-3 text-left last:border-0"
    >
      <span className="flex items-center gap-2 text-[11px] font-semibold text-[#1d2641]">
        <span className="text-[#1b2b62]">{icon}</span>
        {children}
      </span>
      <IconChevronRight size={15} className="text-[#1b2b62]" />
    </button>
  );
}

export default function EventDetailsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-[78px] shadow-[0_0_24px_rgba(20,31,55,0.04)]">
      <Header />
      <EventDetails />
    </main>
  );
}

function EventDetails() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const event =
    mockEventDetails.find((candidate) => candidate.slug === slug) ??
    mockEventDetails[0];
  const tickets: Ticket[] = event.ticketTypes.map((ticket, index) => ({
    ...ticket,
    icon: ticketIcons[index % ticketIcons.length],
  }));
  const [quantities, setQuantities] = useState(() => tickets.map(() => 0));
  const [isLiked, setIsLiked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [expandedSection, setExpandedSection] = useState<
    "faq" | "terms" | null
  >(null);
  const [countdown, setCountdown] = useState<Countdown>(() =>
    getCountdown(event.registrationDeadline ?? event.startAt),
  );
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(
    null,
  );
  useEffect(() => {
    const likeTimer = window.setTimeout(() => {
      setIsLiked(isEventLiked(event.id));
      setIsRegistered(isEventRegistered(event.id));
    }, 0);
    const interval = window.setInterval(() => {
      setCountdown(getCountdown(event.registrationDeadline ?? event.startAt));
    }, 1000);
    return () => {
      window.clearTimeout(likeTimer);
      window.clearInterval(interval);
    };
  }, [event.id, event.registrationDeadline, event.startAt]);
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.name,
        text: event.description,
        url: window.location.href,
      });
      return;
    }
    await navigator.clipboard?.writeText(window.location.href);
  };
  const selectedCount = quantities.reduce(
    (total, quantity) => total + quantity,
    0,
  );
  const total = quantities.reduce(
    (sum, quantity, index) => sum + quantity * (tickets[index]?.price ?? 0),
    0,
  );

  const changeQuantity = (index: number, change: number) => {
    setQuantities((current) =>
      current.map((quantity, ticketIndex) =>
        ticketIndex === index
          ? Math.max(0, Math.min(quantity + change, tickets[index].available))
          : quantity,
      ),
    );
  };

  return (
    <>
      <EventHero
        event={event}
        dateLabel={formatDate(event.startAt)}
        timeRange={`${formatTime(event.startAt)} - ${event.endAt ? formatTime(event.endAt) : "Late"}`}
        isLiked={isLiked}
        onPreview={() => setPreview({ src: event.bannerUrl, alt: event.name })}
        onShare={() => void handleShare()}
        onToggleLike={() => {
          const updatedUser = toggleLikedEvent(event.id);
          setIsLiked(updatedUser.likedEventIds?.includes(event.id) ?? false);
        }}
      />

      <div className="px-4">
        <EventMeta
          event={event}
          isRegistered={isRegistered}
          dateLabel={formatDate(event.startAt)}
          weekdayLabel={getDay(event.startAt)}
          timeRange={`${formatTime(event.startAt)} - ${event.endAt ? formatTime(event.endAt) : "Late"}`}
          doorTime={formatTime(event.startAt)}
          onPreviewOrganizer={() =>
            setPreview({
              src: event.organizer.logoUrl ?? event.bannerUrl,
              alt: `${event.organizer.name} logo`,
            })
          }
        />

        <CountdownTimer {...countdown} />

        <EventDescription
          description={event.description}
          expanded={showFullDescription}
          onToggle={() => setShowFullDescription((current) => !current)}
        />

        <EventGallery
          event={event}
          expanded={showAllGallery}
          onToggleExpanded={() => setShowAllGallery((current) => !current)}
          onPreview={(src, alt) => setPreview({ src, alt })}
        />

        <section className="mt-2">
          <h2 className="mb-1 text-[14px] font-extrabold text-[#151d39]">
            Tickets
          </h2>
          <div className="space-y-1">
            {tickets.map((ticket, index) => (
              <TicketRow
                key={ticket.name}
                ticket={ticket}
                quantity={quantities[index]}
                onChange={(change) => changeQuantity(index, change)}
              />
            ))}
          </div>
        </section>
        <div className="mt-2 overflow-hidden rounded-[9px] border border-[#e5e9ee]">
          <UtilityRow
            onClick={() =>
              setExpandedSection((current) =>
                current === "faq" ? null : "faq",
              )
            }
            icon={
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1b2b62] text-[10px] text-white">
                ?
              </span>
            }
          >
            FAQs
          </UtilityRow>
          <FAQSection event={event} expanded={expandedSection === "faq"} />
          <UtilityRow
            onClick={() =>
              setExpandedSection((current) =>
                current === "terms" ? null : "terms",
              )
            }
            icon={<IconTicket size={15} />}
          >
            Terms &amp; Conditions
          </UtilityRow>
          <TermsSection event={event} expanded={expandedSection === "terms"} />
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-20 flex h-[64px] w-full max-w-[480px] -translate-x-1/2 items-center justify-between border-t border-[#e5e9ee] bg-white px-4 shadow-[0_-4px_16px_rgba(20,31,55,.09)]">
        <div>
          <p className="text-[16px] font-bold leading-5 text-[#18203b]">
            ₹{total.toLocaleString("en-IN")}
          </p>
          <p className="text-[9px] text-[#65718a]">
            {selectedCount} ticket{selectedCount === 1 ? "" : "s"} selected
          </p>
        </div>
        <Link
          href={isRegistered ? "/my-tickets" : "#"}
          onClick={(clickEvent) => {
            if (isRegistered) return;
            clickEvent.preventDefault();
            if (!selectedCount) return;
            const checkout = createCheckout(
              event.id,
              Object.fromEntries(
                tickets.map((ticket, index) => [ticket.id, quantities[index]]),
              ),
            );
            router.push(`/checkout/${checkout.orderId}/tickets`);
          }}
          className={`flex h-[34px] min-w-0 flex-1 items-center justify-center rounded-[7px] px-3 text-[12px] font-semibold text-white ${isRegistered ? "bg-[#2164b8]" : selectedCount ? "bg-[#08ad6a]" : "bg-[#0aae6b]"}`}
        >
          {isRegistered ? "View My Tickets" : "Continue"}{" "}
          <span className="ml-1 text-[16px]">→</span>
        </Link>
      </div>
      {preview && (
        <ImagePreview
          src={preview.src}
          alt={preview.alt}
          onClose={() => setPreview(null)}
        />
      )}
    </>
  );
}
