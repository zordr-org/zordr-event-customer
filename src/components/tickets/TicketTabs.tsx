"use client";

export type TicketTab = "upcoming" | "past" | "cancelled";

interface TicketTabsProps {
  activeTab: TicketTab;
  counts: {
    upcoming: number;
    past: number;
    cancelled: number;
  };
  onChange: (tab: TicketTab) => void;
  checkout?: boolean;
}

const tabs: {
  id: TicketTab;
  label: string;
}[] = [
  {
    id: "upcoming",
    label: "Upcoming",
  },
  {
    id: "past",
    label: "Past",
  },
  {
    id: "cancelled",
    label: "Cancelled",
  },
];

export function TicketTabs({
  activeTab,
  counts,
  onChange,
  checkout = false,
}: TicketTabsProps) {
  if (checkout) {
    return (
      <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-[10px] border border-[#e1e6ec] bg-[#fafbfc] text-[13px]">
        <button
          type="button"
          onClick={() => onChange("upcoming")}
          className={`h-10 ${activeTab === "upcoming" ? "bg-[#dff8ec] font-bold text-[#0a9d60]" : "text-[#56637e]"}`}
        >
          Upcoming ({counts.upcoming})
        </button>
        <button
          type="button"
          onClick={() => onChange("past")}
          className={`h-10 border-x border-[#e1e6ec] ${activeTab === "past" ? "bg-[#dff8ec] font-bold text-[#0a9d60]" : "text-[#56637e]"}`}
        >
          Past ({counts.past})
        </button>
        <button
          type="button"
          onClick={() => onChange("cancelled")}
          className={`h-10 ${activeTab === "cancelled" ? "bg-[#dff8ec] font-bold text-[#0a9d60]" : "text-[#56637e]"}`}
        >
          Cancelled ({counts.cancelled})
        </button>
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-label="My tickets"
      className="flex gap-2 overflow-x-auto border-b border-[var(--color-border)]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={[
              "flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            ].join(" ")}
          >
            <span>{tab.label}</span>

            <span
              className={[
                "min-w-5 rounded-full px-1.5 py-0.5 text-xs",
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-muted)]/10",
              ].join(" ")}
            >
              {counts[tab.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
