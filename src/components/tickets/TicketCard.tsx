import type { Ticket } from "@/types/ticket";
import { Card } from "@/components/ui/Card";
import { TicketStatusBadge } from "./TicketStatusBadge";
import Link from "next/link";
import { MockQrCode } from "@/components/tickets/MockQrCode";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { formatAccountDate, formatAccountTime } from "@/lib/mock-account";
import {
  IconCalendarDays,
  IconChevronRight,
  IconClock,
  IconMapPin,
} from "@/components/ui/Icons";

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
  onCopyOrderId?: (orderId: string) => void;
}

export function TicketCard({
  ticket,
  onClick,
  onCopyOrderId,
}: TicketCardProps) {
  if (onCopyOrderId) {
    return (
      <article className="overflow-hidden rounded-[10px] border border-[#e1e6ec] bg-white">
        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <ResilientImage
            src={ticket.eventBannerUrl}
            alt={ticket.eventName}
            className="h-[150px] w-full shrink-0 rounded-lg object-cover sm:h-[118px] sm:w-[148px]"
          />
          <div className="flex min-w-0 items-start gap-3">
            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-md bg-[#dff8ec] px-2 py-1 text-[10px] font-bold text-[#0a9d60]">
                {ticket.status === "checked_in" ? "Attended" : "Upcoming"}
              </span>
              <h2 className="mt-1 break-words text-[16px] font-bold text-[#111a3b]">
                {ticket.eventName}
              </h2>
              <p className="break-words text-[12px] text-[#5d6b85]">
                {ticket.category.join(" • ")}
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-1 text-[10px] text-[#33415f]">
                <IconCalendarDays size={13} />{" "}
                {formatAccountDate(ticket.startAt)}
                <IconClock size={13} className="ml-1" />{" "}
                {formatAccountTime(ticket.startAt)} -{" "}
                {formatAccountTime(ticket.endAt ?? ticket.startAt)}
              </p>
              <p className="mt-1 flex items-start gap-1 break-words text-[10px] text-[#33415f]">
                <IconMapPin size={13} className="mt-0.5 shrink-0" />{" "}
                {ticket.venue}
              </p>
            </div>
            <div className="flex w-[60px] shrink-0 flex-col items-center border-l border-[#edf0f2] pl-2 sm:w-[76px] sm:pl-3">
              <MockQrCode value={ticket.qrPayload ?? ticket.id} />
              <span className="mt-1 text-center text-[9px] text-[#65718a]">
                Tap to enlarge
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-3 border-t border-[#edf0f2] px-3 py-2 text-[10px] sm:grid-cols-[1.25fr_1fr_.8fr_20px] sm:items-center sm:gap-0">
          <div>
            <p className="text-[#56637e]">Your Tickets</p>
            <p className="text-[13px] font-semibold text-[#17203b]">
              {ticket.quantity} × {ticket.ticketTypeName}
            </p>
            <p className="truncate text-[#65718a]">Access to all main events</p>
          </div>
          <div className="border-l border-[#edf0f2] pl-3">
            <p className="text-[#56637e]">Order ID</p>
            <p className="text-[11px] text-[#17203b]">
              {ticket.orderId}{" "}
              <button
                type="button"
                aria-label="Copy order ID"
                onClick={() => onCopyOrderId(ticket.orderId)}
                className="font-bold"
              >
                ▣
              </button>
            </p>
          </div>
          <div className="border-l border-[#edf0f2] pl-3">
            <p className="text-[#56637e]">Total Paid</p>
            <p className="text-[15px] font-bold text-[#17203b]">
              ₹{(ticket.totalPaid / 100).toLocaleString("en-IN")}
            </p>
          </div>
          <Link
            href={`/my-tickets/${ticket.id}`}
            aria-label={`Open ${ticket.eventName}`}
            className="text-[#17203b]"
          >
            <IconChevronRight size={18} />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <Card
      variant="outlined"
      className={[
        "overflow-hidden",
        onClick ? "cursor-pointer transition hover:shadow-sm" : "",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        className="w-full text-left disabled:cursor-default"
      >
        <div className="aspect-[16/7] overflow-hidden bg-[var(--color-muted)]">
          <img
            src={ticket.eventBannerUrl}
            alt={ticket.eventName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold">{ticket.eventName}</h3>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                {ticket.ticketTypeName}
              </p>
            </div>

            <TicketStatusBadge status={ticket.status} />
          </div>

          <div className="space-y-1 text-sm">
            <p>{ticket.venue}</p>

            <time dateTime={ticket.startAt}>
              {new Date(ticket.startAt).toLocaleString()}
            </time>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-sm">
            <span>
              {ticket.quantity} {ticket.quantity === 1 ? "ticket" : "tickets"}
            </span>

            <span className="font-semibold">
              ₹{(ticket.totalPaid / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </button>
    </Card>
  );
}
