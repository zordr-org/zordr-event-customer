import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  compact?: boolean;
  asMain?: boolean;
}

export function AuthLayout({
  children,
  compact = false,
  asMain = true,
}: AuthLayoutProps) {
  if (compact) {
    const content = (
      <div className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col px-6 py-6">
        {children}
      </div>
    );
    return asMain ? (
      <main className="min-h-screen bg-white">{content}</main>
    ) : (
      <div className="min-h-screen bg-white">{content}</div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-8">
        {children}
      </div>
    </main>
  );
}
