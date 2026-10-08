"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mockEventDetails } from "@/app/home-data";
import { Header } from "@/components/layout/Header";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileMenuItem } from "@/components/profile/ProfileMenuItem";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { getMockUser, saveMockUser } from "@/lib/mock-api";
import { mockUser } from "@/lib/mock-account";
import {
  IconChevronRight,
  IconFileText,
  IconHeart,
  IconInfo,
  IconLock2,
  IconQuestionCircle,
  IconShield,
  IconUser,
} from "@/components/ui/Icons";

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [expandedSupport, setExpandedSupport] = useState<string | null>(null);
  useEffect(() => {
    const storedUser = getMockUser();
    const storedNotifications =
      window.localStorage.getItem("zordr-mock-notifications") !== "false";
    window.setTimeout(() => {
      setUser(storedUser);
      setNotifications(storedNotifications);
    }, 0);
  }, []);
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-6 shadow-sm">
      <Header showBack />
      <div className="px-4 pt-5 sm:px-6">
        <h1 className="text-[25px] font-extrabold text-[#10183a]">Profile</h1>
        <p className="mt-1 text-[15px] text-[#5d6a85]">
          Manage your account and preferences.
        </p>
      </div>
      <ProfileHeader
        user={user}
        compact
        editing={editing}
        onEdit={() => {
          if (editing) saveMockUser(user);
          setEditing((current) => !current);
        }}
      >
        <div className="mt-3 grid gap-2">
          <input
            value={user.name}
            onChange={(event) =>
              setUser((current) => ({ ...current, name: event.target.value }))
            }
            className="h-9 rounded-md border border-[#bfe8d4] bg-white px-3 text-sm outline-none"
          />
          <input
            value={user.email}
            readOnly
            aria-label="Email address cannot be changed"
            className="h-9 rounded-md border border-[#dfe5eb] bg-[#f5f7fa] px-3 text-sm text-[#65718a] outline-none"
          />
          <input
            value={user.phone}
            readOnly
            aria-label="Phone number cannot be changed"
            className="h-9 rounded-md border border-[#dfe5eb] bg-[#f5f7fa] px-3 text-sm text-[#65718a] outline-none"
          />
          <p className="text-[10px] text-[#65718a]">
            Email and phone are fixed to this mock account.
          </p>
        </div>
      </ProfileHeader>
      <ProfileStats stats={user.stats} compact />
      <ProfileEvents
        title="Liked Events"
        emptyText="Like an event to see it here."
        eventIds={user.likedEventIds ?? []}
      />
      <ProfileEvents
        title="Attended Events"
        emptyText="Your purchased event history will appear here."
        eventIds={user.attendedEventIds ?? []}
      />
      <ProfileSection title="Account" compact>
  <Link
    href="/profile/account/personal-information"
    className="flex min-h-[54px] w-full items-center gap-3 border-b border-[#edf0f2] text-left"
  >
    <span className="w-6 text-[#101d45]">
      <IconUser size={20} />
    </span>

    <span className="flex-1">
      <b className="block text-[13px] text-[#17203b]">
        Personal Information
      </b>
      <span className="text-[11px] text-[#65718a]">
        Name, email, phone, college details
      </span>
    </span>

    <IconChevronRight size={17} className="text-[#17203b]" />
  </Link>

  <Link
    href="/profile/account/change-password"
    className="flex min-h-[54px] w-full items-center gap-3 border-b border-[#edf0f2] text-left"
  >
    <span className="w-6 text-[#101d45]">
      <IconLock2 size={20} />
    </span>

    <span className="flex-1">
      <b className="block text-[13px] text-[#17203b]">
        Change Password
      </b>
      <span className="text-[11px] text-[#65718a]">
        Update your password
      </span>
    </span>

    <IconChevronRight size={17} className="text-[#17203b]" />
  </Link>

  <Link
    href="/profile/account/linked-accounts"
    className="flex min-h-[54px] w-full items-center gap-3 text-left"
  >
    <span className="w-6 text-[#101d45]">
      <span className="text-xl">↗</span>
    </span>

    <span className="flex-1">
      <b className="block text-[13px] text-[#17203b]">
        Linked Accounts
      </b>
      <span className="text-[11px] text-[#65718a]">
        Manage connected accounts
      </span>
    </span>

    <IconChevronRight size={17} className="text-[#17203b]" />
  </Link>
</ProfileSection>
      <ProfileSection title="Preferences" compact>
        <ProfileMenuItem
          compact
          icon={<IconInfo size={20} />}
          label="Notifications"
          description="Event updates, offers and reminders"
          trailing={
            <button
              onClick={() =>
                setNotifications((current) => {
                  const next = !current;
                  window.localStorage.setItem(
                    "zordr-mock-notifications",
                    String(next),
                  );
                  return next;
                })
              }
              aria-label="Toggle notifications"
              className={`h-5 w-9 rounded-full p-0.5 ${notifications ? "bg-[#0aae6b]" : "bg-[#cbd3de]"}`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-white transition-transform ${notifications ? "translate-x-4" : "translate-x-0"}`}
              />
            </button>
          }
        />
        <Link
          href="/profile/preferences/interests"
          className="flex min-h-[54px] w-full items-center gap-3 border-b border-[#edf0f2] text-left"
        >
          <span className="w-6 text-[#101d45]">
            <IconHeart size={20} />
          </span>

          <span className="flex-1">
            <b className="block text-[13px] text-[#17203b]">
              Interests
            </b>
            <span className="text-[11px] text-[#65718a]">
              Events you're interested in
            </span>
          </span>

          <IconChevronRight size={17} className="text-[#17203b]" />
        </Link>
        <Link
          href="/profile/preferences/language"
          className="flex min-h-[54px] w-full items-center gap-3 text-left"
        >
          <span className="w-6 text-[#101d45]">
            <span className="text-xl">◎</span>
          </span>

          <span className="flex-1">
            <b className="block text-[13px] text-[#17203b]">
              Language
            </b>
            <span className="text-[11px] text-[#65718a]">
              App language and communication
            </span>
          </span>
          <IconChevronRight size={17} className="text-[#17203b]" />
        </Link>
      </ProfileSection>
      <ProfileSection title="Support" compact>
  <button
    type="button"
    onClick={() =>
      setExpandedSupport((current) =>
        current === "help" ? null : "help",
      )
    }
    className="w-full border-b border-[#edf0f2] text-left"
  >
    <div className="flex min-h-[48px] w-full items-center gap-3">
      <span className="w-6 text-[#101d45]">
        <IconQuestionCircle size={20} />
      </span>

      <span className="flex-1">
        <b className="block text-[13px] text-[#17203b]">
          Help & Support
        </b>
        <span className="text-[11px] text-[#65718a]">
          Get help or contact us
        </span>
      </span>

      <IconChevronRight
        size={17}
        className={`text-[#17203b] transition-transform ${
          expandedSupport === "help" ? "rotate-90" : ""
        }`}
      />
    </div>

    {expandedSupport === "help" && (
      <p className="ml-9 mr-2 mt-1 rounded-md bg-[#f7fafc] px-3 py-2 text-[11px] leading-4 text-[#65718a]">
        Need help with bookings, tickets, payments, or your account?
        Contact ZORDR support for assistance.
      </p>
    )}
  </button>

  <button
    type="button"
    onClick={() =>
      setExpandedSupport((current) =>
        current === "terms" ? null : "terms",
      )
    }
    className="w-full border-b border-[#edf0f2] text-left"
  >
    <div className="flex min-h-[48px] w-full items-center gap-3">
      <span className="w-6 text-[#101d45]">
        <IconFileText size={20} />
      </span>

      <span className="flex-1">
        <b className="block text-[13px] text-[#17203b]">
          Terms & Conditions
        </b>
        <span className="text-[11px] text-[#65718a]">
          Read our terms and policies
        </span>
      </span>

      <IconChevronRight
        size={17}
        className={`text-[#17203b] transition-transform ${
          expandedSupport === "terms" ? "rotate-90" : ""
        }`}
      />
    </div>

    {expandedSupport === "terms" && (
      <p className="ml-9 mr-2 mt-1 rounded-md bg-[#f7fafc] px-3 py-2 text-[11px] leading-4 text-[#65718a]">
        These terms explain the rules for using ZORDR, event bookings,
        tickets, and payments.
      </p>
    )}
  </button>

  <button
    type="button"
    onClick={() =>
      setExpandedSupport((current) =>
        current === "privacy" ? null : "privacy",
      )
    }
    className="w-full text-left"
  >
    <div className="flex min-h-[48px] w-full items-center gap-3">
      <span className="w-6 text-[#101d45]">
        <IconShield size={20} />
      </span>

      <span className="flex-1">
        <b className="block text-[13px] text-[#17203b]">
          Privacy Policy
        </b>
        <span className="text-[11px] text-[#65718a]">
          Learn how we protect your data
        </span>
      </span>

      <IconChevronRight
        size={17}
        className={`text-[#17203b] transition-transform ${
          expandedSupport === "privacy" ? "rotate-90" : ""
        }`}
      />
    </div>

    {expandedSupport === "privacy" && (
      <p className="ml-9 mr-2 mt-1 rounded-md bg-[#f7fafc] px-3 py-2 text-[11px] leading-4 text-[#65718a]">
        Your personal information is used to provide bookings, account
        services, and event updates.
      </p>
    )}
  </button>
</ProfileSection>
      <div className="mx-4 mt-4 sm:mx-6">
        <button
          type="button"
          className="h-11 w-full rounded-lg border border-[#f0b8c0] bg-white text-[13px] font-semibold text-[#c53549]"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}

function ProfileEvents({
  title,
  emptyText,
  eventIds,
}: {
  title: string;
  emptyText: string;
  eventIds: string[];
}) {
  const events = eventIds
    .map((id) => mockEventDetails.find((event) => event.id === id))
    .filter((event): event is (typeof mockEventDetails)[number] =>
      Boolean(event),
    );
  return (
    <section className="mx-4 mt-3 rounded-[10px] border border-[#e1e6ec] p-3 sm:mx-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#17203b]">{title}</h2>
        <span className="text-[11px] text-[#65718a]">{events.length}</span>
      </div>
      {events.length ? (
        <div className="mt-2 space-y-2">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="flex items-center gap-3 rounded-lg bg-[#f7fafc] p-2"
            >
              <img
                src={event.bannerUrl}
                alt={event.name}
                className="h-12 w-16 rounded-md object-cover"
              />
              <span className="min-w-0">
                <b className="block truncate text-[12px] text-[#17203b]">
                  {event.name}
                </b>
                <span className="text-[10px] text-[#65718a]">
                  {event.category.join(" • ")}
                </span>
              </span>
              <IconChevronRight
                size={16}
                className="ml-auto shrink-0 text-[#17203b]"
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-2 rounded-lg bg-[#f7fafc] px-3 py-3 text-[11px] text-[#65718a]">
          {emptyText}
        </p>
      )}
    </section>
  );
}
