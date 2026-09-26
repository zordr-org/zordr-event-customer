import type { PriceBreakdownData } from "@/types/order";
import { formatRupees } from "@/lib/mock-checkout";

interface PriceBreakdownProps {
  pricing?: PriceBreakdownData;
  summary?: {
    ticketCount: number;
    subtotal: number;
    discount: number;
    convenienceFee: number;
    platformFee: number;
    gst: number;
    total: number;
  };
}

function formatPrice(amount: number) {
  return `₹${(amount / 100).toFixed(2)}`;
}

export function PriceBreakdown({ pricing, summary }: PriceBreakdownProps) {
  if (summary) {
    return (
      <section className="mx-4 mt-3 rounded-[10px] bg-[#f5f8fc] p-3 sm:mx-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#141c3a]">
            Payment Summary
          </h3>
          <span className="text-[11px] text-[#5e6b86]">
            {summary.ticketCount} tickets selected
          </span>
        </div>
        <div className="mt-2 space-y-1 text-[12px] text-[#28334e]">
          <div className="flex justify-between">
            <span>Ticket Amount</span>
            <span>{formatRupees(summary.subtotal)}</span>
          </div>
          {summary.discount > 0 && (
            <div className="flex justify-between text-[#0ba268]">
              <span>Group discount</span>
              <span>-{formatRupees(summary.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Convenience Fee</span>
            <span>{formatRupees(summary.convenienceFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span>{formatRupees(summary.platformFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>{formatRupees(summary.gst)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-[#dbe2ea] pt-2 text-[16px] font-bold text-[#111a39]">
            <span>Total Amount</span>
            <span>{formatRupees(summary.total)}</span>
          </div>
        </div>
      </section>
    );
  }

  if (!pricing) return null;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-muted)]">Subtotal</span>
        <span>{formatPrice(pricing.subtotal)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-muted)]">Convenience Fee</span>
        <span>{formatPrice(pricing.convenienceFee)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-muted)]">Platform Fee</span>
        <span>{formatPrice(pricing.platformFee)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-muted)]">GST</span>
        <span>{formatPrice(pricing.gst)}</span>
      </div>

      <div className="border-t border-[var(--color-border)] pt-3">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(pricing.total)}</span>
        </div>
      </div>
    </div>
  );
}
