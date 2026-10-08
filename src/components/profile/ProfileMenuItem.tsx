import type { ReactNode } from "react";
import { IconChevronRight } from "@/components/ui/Icons";

interface ProfileMenuItemProps {
  label: string;
  description?: string;
  onClick?: () => void;
  destructive?: boolean;
  compact?: boolean;
  icon?: ReactNode;
  trailing?: ReactNode;
}

export function ProfileMenuItem({
  label,
  description,
  onClick,
  destructive = false,
  compact = false,
  icon,
  trailing,
}: ProfileMenuItemProps) {
  if (compact) { 
    return (
    <div className="flex min-h-[54px] w-full items-center gap-3 border-b border-[#edf0f2] text-left last:border-0">
      <span className="w-6 text-[#101d45]">{icon}</span>
      <span className="flex-1">
        <b className="block text-[13px] text-[#17203b]">{label}</b>
        <span className="text-[11px] text-[#65718a]">{description}</span>
      </span>
      {trailing ?? <IconChevronRight size={17} className="text-[#17203b]" />}
    </div>
    );

  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center justify-between gap-4 border-b border-[var(--color-border)] px-4 py-4 text-left transition-colors last:border-b-0",
        "hover:bg-[var(--color-muted)]/5",
        destructive ? "text-red-600" : "text-[var(--color-foreground)]",
      ].join(" ")}
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium">{label}</span>

        {description && (
          <span className="mt-1 block text-xs text-[var(--color-muted)]">
            {description}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className="shrink-0 text-lg text-[var(--color-muted)]"
      >
        ›
      </span>
    </button>
  );
}
