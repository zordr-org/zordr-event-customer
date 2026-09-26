import Link from "next/link";
import * as React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  actionLabel = "View All →",
  actionHref = "#",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-end justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <h2 className="text-[15px] font-bold leading-[18px] text-[var(--color-dark)]">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-[11px] leading-[15px] text-[var(--color-muted)]">
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="shrink-0 text-[11px] font-semibold leading-[14px] text-[var(--color-accent-blue)]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
