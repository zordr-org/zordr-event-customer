import type { ReactNode } from "react";
import { CheckoutProvider } from "@/components/checkout/CheckoutProvider";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
