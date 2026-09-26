import type { UserProfile } from "@/types/user";
import { Card } from "@/components/ui/Card";

interface ProfileStatsProps {
  stats: UserProfile["stats"];
  compact?: boolean;
}

const statItems = [
  {
    key: "eventsAttended",
    label: "Events Attended",
  },
  {
    key: "eventsInterested",
    label: "Events Interested",
  },
  {
    key: "loyaltyPoints",
    label: "Loyalty Points",
  },
] as const;

export function ProfileStats({ stats, compact = false }: ProfileStatsProps) {
  if (compact) {
    return (
      <section className="mx-4 mt-3 grid grid-cols-3 rounded-[10px] border border-[#e1e6ec] p-3 sm:mx-6">
        {statItems.map((item) => (
          <div
            key={item.key}
            className={`text-center ${item.key === "eventsInterested" ? "border-x border-[#e1e6ec]" : ""}`}
          >
            <p className="text-[18px] font-bold text-[#17203b]">
              {stats[item.key]}
            </p>
            <p className="text-[10px] text-[#5d6a85]">{item.label}</p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-3 gap-3">
      {statItems.map((item) => (
        <Card key={item.key} variant="outlined" className="p-4 text-center">
          <p className="text-xl font-semibold">{stats[item.key]}</p>

          <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
            {item.label}
          </p>
        </Card>
      ))}
    </section>
  );
}
