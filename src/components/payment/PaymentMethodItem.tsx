import type { ReactNode } from "react";

interface PaymentMethodItemProps {
  id: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
  icon?: ReactNode;
}

export function PaymentMethodItem({
  id,
  label,
  description,
  selected,
  onSelect,
  disabled = false,
  icon,
}: PaymentMethodItemProps) {
  if (icon !== undefined) {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={() => onSelect(id)}
        className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left ${selected ? "border-[#22b887] bg-[#f2fff9]" : "border-[#e1e6ec]"}`}
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-md text-[15px] ${selected ? "bg-[#d8f7e9] text-[#0aa367]" : "bg-[#f0f4f8] text-[#1b2a56]"}`}
        >
          {icon}
        </span>
        <span className="flex-1">
          <b className="block text-[13px] text-[#17203b]">{label}</b>
          <span className="text-[10px] text-[#64718a]">{description}</span>
        </span>
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full border ${selected ? "border-[#0aae6b]" : "border-[#c8d0db]"}`}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-[#0aae6b]" />}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(id)}
      className={[
        "w-full rounded-lg border p-4 text-left transition",
        selected
          ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20"
          : "border-[var(--color-border)]",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-[var(--color-foreground)]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={[
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
            selected
              ? "border-[var(--color-primary)]"
              : "border-[var(--color-border)]",
          ].join(" ")}
        >
          {selected && (
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
          )}
        </span>

        <div>
          <p className="font-medium">{label}</p>

          {description && (
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
