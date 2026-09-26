import type { TicketStatus } from "@/types/ticket";
import { Badge } from "@/components/ui/Badge";

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

const statusConfig: Record<
  TicketStatus,
  {
    label: string;
    className: string;
  }
> = {
  valid: {
    label: "Valid",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  checked_in: {
    label: "Checked In",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  cancelled: {
    label: "Cancelled",
    className: "border-red-200 bg-red-50 text-red-700",
  },
  void: {
    label: "Void",
    className: "border-gray-200 bg-gray-50 text-gray-700",
  },
};

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const config = statusConfig[status];

  return <Badge className={config.className}>{config.label}</Badge>;
}
