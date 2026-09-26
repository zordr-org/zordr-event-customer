import * as React from "react";
import { Header } from "./Header";

interface PageShellProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function PageShell({
  children,
  title,
  description,
  className = "",
}: PageShellProps) {
  return (
    <>
      <Header />
      <main
        className={`min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] ${className}`}
      >
        {(title || description) && (
          <header className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            {title && (
              <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                {description}
              </p>
            )}
          </header>
        )}

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
