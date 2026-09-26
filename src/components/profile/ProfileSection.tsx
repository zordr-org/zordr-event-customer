import type { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
  compact?: boolean;
}

export function ProfileSection({
  title,
  children,
  compact = false,
}: ProfileSectionProps) {
  if (compact) {
    return (
      <section className="mx-4 mt-3 rounded-[10px] border border-[#e1e6ec] px-3 sm:mx-6">
        <h2 className="pt-3 text-[16px] font-bold text-[#17203b]">{title}</h2>
        {children}
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">{title}</h2>

      <div className="overflow-hidden rounded-lg border border-[var(--color-border)]">
        {children}
      </div>
    </section>
  );
}
