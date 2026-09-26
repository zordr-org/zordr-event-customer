import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface CheckoutBottomBarProps {
  total: number;
  actionLabel: string;
  onAction?: () => void;
  disabled?: boolean;
  checkoutLayout?: {
    totalLabel: string;
    detail: string;
    href: string;
  };
}

export function CheckoutBottomBar({
  total,
  actionLabel,
  onAction,
  disabled = false,
  checkoutLayout,
}: CheckoutBottomBarProps) {
  if (checkoutLayout) {
    return (
      <div className="fixed bottom-0 left-1/2 z-20 flex h-[76px] w-full max-w-[600px] -translate-x-1/2 items-center justify-between gap-3 bg-[#f5fcf9] px-4 shadow-[0_-4px_16px_rgba(0,0,0,.08)] sm:px-6">
        <div>
          <p className="text-[19px] font-bold text-[#111a39]">
            {checkoutLayout.totalLabel}
          </p>
          <p className="text-[10px] text-[#576680]">{checkoutLayout.detail}</p>
        </div>
        <Link
          href={checkoutLayout.href}
          className={`flex h-10 flex-1 items-center justify-center rounded-lg text-[13px] font-semibold text-white ${disabled ? "cursor-not-allowed bg-[#b9c1c9]" : "bg-[#0aae6b]"}`}
        >
          {actionLabel} <span className="ml-2 text-[17px]">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 z-10 border-t border-[var(--color-border)] bg-[var(--color-background)] p-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[var(--color-muted)]">Total</p>
          <p className="text-lg font-semibold">₹{(total / 100).toFixed(2)}</p>
        </div>

        <Button onClick={onAction} disabled={disabled}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
