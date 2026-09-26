import type { UserProfile } from "@/types/user";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ProfileHeaderProps {
  user: UserProfile;
  onEdit: () => void;
  compact?: boolean;
  editing?: boolean;
  children?: ReactNode;
}

export function ProfileHeader({
  user,
  onEdit,
  compact = false,
  editing = false,
  children,
}: ProfileHeaderProps) {
  if (compact) {
    return (
      <section className="mx-4 mt-3 rounded-[10px] bg-[#e9fbf3] p-4 sm:mx-6">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d5f6e6] text-[22px] font-bold text-[#0aa367]">
            {user.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[18px] font-bold text-[#17203b]">
              {user.name}
            </h2>
            <p className="truncate text-[13px] text-[#52617e]">{user.email}</p>
            <p className="text-[12px] text-[#52617e]">
              {user.college} • {user.branch} • {user.year}
            </p>
          </div>
          <button
            onClick={onEdit}
            className="rounded-md bg-[#d0f5e3] px-3 py-2 text-[11px] font-bold text-[#0a9960]"
          >
            {editing ? "Done" : "Edit Profile"}
          </button>
        </div>
        {editing && children}
      </section>
    );
  }

  return (
    <Card variant="outlined" className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold">{user.name}</h1>

          <p className="mt-1 truncate text-sm text-[var(--color-muted)]">
            {user.email}
          </p>

          <div className="mt-3 space-y-1 text-sm text-[var(--color-muted)]">
            {user.college && <p>{user.college}</p>}

            {(user.branch || user.year) && (
              <p>{[user.branch, user.year].filter(Boolean).join(" • ")}</p>
            )}
          </div>
        </div>

        <Button type="button" variant="outline" onClick={onEdit}>
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}
