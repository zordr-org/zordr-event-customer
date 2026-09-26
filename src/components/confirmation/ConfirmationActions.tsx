import Link from "next/link";
import { IconShare, IconTicket } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

interface ConfirmationActionsProps {
  onViewTickets?: () => void;
  onDownloadTicket: () => void;
  onShareEvent: () => void;
  disabled?: boolean;
  checkout?: boolean;
  viewHref?: string;
}

export function ConfirmationActions({
  onViewTickets,
  onDownloadTicket,
  onShareEvent,
  disabled = false,
  checkout = false,
  viewHref = "/my-tickets",
}: ConfirmationActionsProps) {
  if (checkout) {
    return (
      <div className="mx-4 mt-3 space-y-2 sm:mx-6">
        <Link
          href={viewHref}
          className="flex h-11 items-center justify-center rounded-lg bg-[#0aae6b] text-[13px] font-semibold text-white"
        >
          <IconTicket size={17} className="mr-2" />
          View My Tickets <span className="ml-2 text-[17px]">→</span>
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onDownloadTicket}
            className="h-10 rounded-lg border border-[#7c8aa3] text-[12px] font-semibold text-[#18213e]"
          >
            ⇩ &nbsp; Download Ticket
          </button>
          <button
            type="button"
            onClick={onShareEvent}
            className="flex h-10 items-center justify-center rounded-lg border border-[#7c8aa3] text-[12px] font-semibold text-[#18213e]"
          >
            <IconShare size={15} className="mr-2" />
            Share Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        className="w-full"
        onClick={onViewTickets}
        disabled={disabled}
      >
        View My Tickets
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onDownloadTicket}
          disabled={disabled}
        >
          Download Ticket
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onShareEvent}
          disabled={disabled}
        >
          Share Event
        </Button>
      </div>
    </div>
  );
}
