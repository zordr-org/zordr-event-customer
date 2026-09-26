import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconInfo } from "@/components/ui/Icons";

interface SupportCardProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  ticketList?: boolean;
}

export function SupportCard({
  title = "Need Help?",
  description = "Contact Zordr Support if you have an issue with your booking, ticket, payment, or account.",
  actionLabel = "Contact Support",
  onAction,
  ticketList = false,
}: SupportCardProps) {
  if (ticketList) {
    return (
      <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg bg-[#eef5ff] px-3 py-3 text-[10px] text-[#536481] sm:mx-6">
        <IconInfo size={18} className="text-[#1e66ce]" />
        <span>
          <b className="text-[#17203b]">Need Help?</b>
          <br />
          Facing an issue with your tickets? We are here to help.
        </span>
        <button
          type="button"
          className="ml-auto rounded-md border border-[#61718d] px-2 py-2 text-[10px] font-semibold text-[#17203b]"
        >
          Contact Support →
        </button>
      </div>
    );
  }

  return (
    <Card
      variant="outlined"
      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <h2 className="font-semibold">{title}</h2>

        <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
          {description}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onAction}
        className="shrink-0"
      >
        {actionLabel}
      </Button>
    </Card>
  );
}
