import type { ReactNode } from "react";

interface PaymentInfoNoticeProps {
  title: string;
  message: string;
  icon?: ReactNode;
  checkout?: boolean;
}

export function PaymentInfoNotice({
  title,
  message,
  icon,
  checkout = false,
}: PaymentInfoNoticeProps) {
  if (checkout) {
    return (
      <div className="mx-4 mt-3 flex gap-2 rounded-lg bg-[#eef5ff] px-3 py-3 text-[10px] text-[#536481] sm:mx-6">
        {icon}
        <span>
          <b className="text-[#17203b]">{title}</b>
          <br />
          {message}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--color-border)] p-4">
      <p className="font-medium">{title}</p>

      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
        {message}
      </p>
    </div>
  );
}
