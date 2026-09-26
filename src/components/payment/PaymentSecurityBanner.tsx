import { IconShield } from "@/components/ui/Icons";

interface PaymentSecurityBannerProps {
  message?: string;
  compact?: boolean;
  paymentMethod?: boolean;
}

export function PaymentSecurityBanner({
  message = "Your payment is processed securely.",
  compact = false,
  paymentMethod = false,
}: PaymentSecurityBannerProps) {
  if (paymentMethod) {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#e9fbf3] px-3 py-2 text-[10px] text-[#178a63]">
        <IconShield size={18} />
        <span>
          <b>100% Secure Payments</b>
          <br />
          Your payment is processed securely by Razorpay.
        </span>
        <b className="ml-auto">Razorpay</b>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="mx-4 mt-2 flex items-center gap-2 rounded-lg bg-[#e9fbf3] px-3 py-2 text-[10px] text-[#178a63] sm:mx-6">
        <IconShield size={18} />
        <span>
          <b>Secure Payment</b>
          <br />
          Your payment is secured by Razorpay
        </span>
        <b className="ml-auto">100% Secure</b>
      </div>
    );
  }

  return (
    <div
      role="status"
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/10 p-4"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="mt-0.5 text-sm font-semibold">
          🔒
        </span>

        <p className="text-sm text-[var(--color-muted)]">{message}</p>
      </div>
    </div>
  );
}
