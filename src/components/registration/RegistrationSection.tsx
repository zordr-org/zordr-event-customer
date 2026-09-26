import type { ReactNode } from "react";

interface RegistrationSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function RegistrationSection({
  title,
  description,
  children,
}: RegistrationSectionProps) {
  return (
    <section className="rounded-[10px] border border-[#e1e6ec] p-3">
      <h3
        className={`${description ? "" : "mb-3 "}text-[16px] font-bold text-[#131b3a]`}
      >
        {title}
      </h3>
      {description && (
        <p className="mb-3 text-[11px] text-[#65718a]">{description}</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}
