import type { ReactNode } from "react";

interface PaymentMethodListProps {
  children: ReactNode;
  checkout?: boolean;
}

export function PaymentMethodList({
  children,
  checkout = false,
}: PaymentMethodListProps) {
  if (checkout) {
    return <div className="space-y-2">{children}</div>;
  }

  return (
    <div className="space-y-3" role="radiogroup" aria-label="Payment methods">
      {children}
    </div>
  );
}
