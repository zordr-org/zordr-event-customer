"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface HeaderProps {
  showBack?: boolean;
}

export function Header({ showBack = false }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto flex h-[51px] w-full max-w-[480px] items-center justify-between px-4 md:h-14 md:max-w-7xl md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link
              href="/"
              aria-label="Go back"
              className="flex h-8 w-8 items-center justify-center text-lg text-[var(--color-foreground)]"
            >
              ←
            </Link>
          )}

          <Link
            href="/"
            aria-label="Zordr Home"
            className="flex flex-col leading-none"
          >
            <span className="text-[22px] font-extrabold leading-5 tracking-[-0.8px] text-[var(--color-dark)]">
              <span className="text-[var(--color-primary)]">Z</span>
              ordr
            </span>

            <span className="mt-0.5 text-[7px] font-medium leading-[8px] text-[var(--color-muted)]">
              Events. Experiences. Together.
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium ${
              isActive("/")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            Home
          </Link>

          <Link
            href="/events"
            className={`text-sm font-medium ${
              isActive("/events")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            Explore
          </Link>

          <Link
            href="/my-tickets"
            className={`text-sm font-medium ${
              isActive("/my-tickets")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            My Tickets
          </Link>

          <Link
            href="/profile"
            className={`text-sm font-medium ${
              isActive("/profile")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            Profile
          </Link>
        </nav>

        {/* Mobile menu */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-foreground)] md:hidden"
        >
          <span className="flex flex-col gap-[4px]">
            <span
              className={`h-[1.5px] w-[18px] bg-current transition-transform ${
                menuOpen ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />

            <span
              className={`h-[1.5px] w-[18px] bg-current transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-[1.5px] w-[18px] bg-current transition-transform ${
                menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[51px] z-30 bg-[#10183a]/20 md:hidden"
          />

          <nav className="absolute left-0 right-0 top-[51px] z-40 border-t border-[var(--color-border)] bg-white px-4 py-2 shadow-lg md:hidden">
            {[
              ["Home", "/"],
              ["Explore", "/events"],
              ["My Tickets", "/my-tickets"],
              ["Profile", "/profile"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block border-b border-[var(--color-border)] py-3 text-sm font-semibold last:border-0 ${
                  isActive(href)
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-foreground)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
