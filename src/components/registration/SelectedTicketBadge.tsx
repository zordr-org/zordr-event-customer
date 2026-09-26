import * as React from "react";
import Link from "next/link";
import { formatRupees } from "@/lib/mock-checkout";

interface SelectedTicketBadgeProps {
  quantity: number;
  ticketName: string;
  totalPrice: number;
  editHref: string;
}

export function SelectedTicketBadge({
  quantity,
  ticketName,
  totalPrice,
  editHref,
}: SelectedTicketBadgeProps) {
  return (
    <div className="flex items-center justify-between rounded-[10px] bg-[#edfcf5] px-3 py-3">
      <div>
        <p className="text-[14px] font-bold text-[#17203b]">
          {quantity} Tickets Selected
        </p>
        <p className="text-[11px] text-[#5f6c85]">{ticketName}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-[15px] font-bold text-[#17203b]">
            {formatRupees(totalPrice)}
          </p>
          <p className="text-[10px] text-[#65718a]">Total (incl. taxes)</p>
        </div>
        <Link
          href={editHref}
          className="rounded-md bg-[#d0f5e3] px-3 py-2 text-[11px] font-bold text-[#0a9960]"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
