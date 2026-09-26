import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface PaymentFailureCardProps {
  orderId: string;
  onRetry: (orderId: string) => void;
  onChooseDifferentMethod: (orderId: string) => void;
  onContactSupport: () => void;
  refundMessage?: string;
}

const failureReasons = [
  "Insufficient balance",
  "Bank declined the transaction",
  "Network or connectivity issue",
  "Payment session expired",
];

export function PaymentFailureCard({
  orderId,
  onRetry,
  onChooseDifferentMethod,
  onContactSupport,
  refundMessage = "If your payment was debited but the order failed, the amount will be automatically refunded within 5–7 business days.",
}: PaymentFailureCardProps) {
  return (
    <Card variant="outlined" className="mx-auto max-w-lg p-6">
      <div className="text-center">
        <div
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl font-semibold text-red-600"
        >
          !
        </div>

        <h1 className="mt-4 text-xl font-semibold">Payment Failed</h1>

        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          We could not complete the payment for this order.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-semibold">Possible reasons</h2>

        <ul className="mt-3 space-y-2">
          {failureReasons.map((reason) => (
            <li
              key={reason}
              className="flex gap-3 text-sm text-[var(--color-muted)]"
            >
              <span aria-hidden="true">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-[var(--color-border)] p-4">
        <p className="text-sm leading-6 text-[var(--color-muted)]">
          {refundMessage}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          type="button"
          className="w-full"
          onClick={() => onRetry(orderId)}
        >
          Try Again
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => onChooseDifferentMethod(orderId)}
        >
          Choose Different Method
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onContactSupport}
        >
          Contact Support
        </Button>
      </div>
    </Card>
  );
}
