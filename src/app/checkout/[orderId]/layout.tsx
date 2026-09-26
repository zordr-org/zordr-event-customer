import type { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-zinc-50">{children}</div>;
}