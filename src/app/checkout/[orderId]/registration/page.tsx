"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { CheckoutEventBanner } from "@/components/checkout/CheckoutEventBanner";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { useCheckout } from "@/components/checkout/CheckoutProvider";
import { RegistrationNote } from "@/components/registration/RegistrationNote";
import { RegistrationSection } from "@/components/registration/RegistrationSection";
import { SelectedTicketBadge } from "@/components/registration/SelectedTicketBadge";
import {
  IconBuilding,
  IconCalendarDays,
  IconChevronDown,
  IconGitBranch,
  IconIdCard,
  IconInfo,
  IconMail,
  IconPhone,
  IconShirt,
  IconUser,
  IconUsers,
} from "@/components/ui/Icons";

export default function RegistrationPage() {
  const {
    registration: form,
    quantities,
    setRegistrationField: update,
    setFullRegistration,
    setGroupMembers,
    setRegistrationType,
    registrationType: savedRegType,
    groupMembers: savedMembers,
    event,
    orderId,
  } = useCheckout();

  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate ticket count and subtotal
  const selectedItems = event.ticketTypes
    .filter((ticket) => (quantities[ticket.id] ?? 0) > 0)
    .map((ticket) => ({ ticket, quantity: quantities[ticket.id] ?? 0 }));
  const selectedQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + item.ticket.price * item.quantity,
    0,
  );

  // Automatic default tab based on ticket count:
  // Exactly 1 ticket -> Individual; More than 1 ticket -> Group
  const defaultTab = selectedQuantity > 1 ? "group" : "individual";
  const [activeTab, setActiveTab] = useState<"individual" | "group">(
    savedRegType || defaultTab,
  );

  // Sync tab if user changes ticket count from tickets page
  useEffect(() => {
    setActiveTab(selectedQuantity > 1 ? "group" : "individual");
  }, [selectedQuantity]);

  // Group Members state definition
  interface GroupMember {
    name: string;
    email: string;
    phone: string;
    college: string;
    roll: string;
    branch: string;
    year: string;
    team: string;
    shirt: string;
    isLeader: boolean;
  }

  const emptyMember = {
    name: "",
    email: "",
    phone: "",
    college: form.college || "KITSW",
    roll: "",
    branch: form.branch || "CSE",
    year: form.year || "3rd Year",
    team: form.team || "",
    shirt: form.shirt || "",
  };

  const [members, setMembers] = useState<GroupMember[]>(() => {
    const count = Math.max(selectedQuantity, 1);
    if (savedMembers && savedMembers.length === count) {
      return savedMembers.map((m, idx) => ({
        ...m,
        isLeader: idx === 0,
      }));
    }
    const initial: GroupMember[] = [];
    for (let i = 0; i < count; i++) {
      initial.push({
        ...(i === 0 ? form : emptyMember),
        isLeader: i === 0, // Member 1 defaults as leader
      });
    }
    return initial;
  });

  // Keep members array size matched with selected ticket count
  useEffect(() => {
    setMembers((prev) => {
      const count = Math.max(selectedQuantity, 1);
      if (prev.length === count) return prev;
      const next: GroupMember[] = [];
      let hasLeader = false;
      for (let i = 0; i < count; i++) {
        if (prev[i]) {
          next.push(prev[i]);
          if (prev[i].isLeader) hasLeader = true;
        } else {
          next.push({
            ...emptyMember,
            isLeader: false,
          });
        }
      }
      if (!hasLeader && next.length > 0) {
        next[0].isLeader = true;
      }
      return next;
    });
  }, [selectedQuantity]);

  const updateMember = (
    index: number,
    field: keyof GroupMember,
    value: string,
  ) => {
    setMembers((prev) =>
      prev.map((m, idx) => (idx === index ? { ...m, [field]: value } : m)),
    );
  };

  const handleSelectLeader = (index: number) => {
    setMembers((prev) =>
      prev.map((m, idx) => ({
        ...m,
        isLeader: idx === index,
      })),
    );
  };

  // Validation
  const isMemberValid = (m: GroupMember) => {
    const required = [
      m.name.trim(),
      m.email.trim(),
      m.phone.trim(),
      m.college.trim(),
      m.roll.trim(),
      m.branch.trim(),
      m.year.trim(),
    ];
    return required.every(Boolean) && m.email.includes("@");
  };

  const isIndividualValid = [
    form.name.trim(),
    form.email.trim(),
    form.phone.trim(),
    form.college.trim(),
    form.roll.trim(),
    form.branch.trim(),
    form.year.trim(),
  ].every(Boolean) && form.email.includes("@");

  const hasLeader = members.some((m) => m.isLeader);
  const areAllMembersValid = members.length > 0 && members.every(isMemberValid);
  const isGroupValid = hasLeader && areAllMembersValid;

  const isValid = activeTab === "individual" ? isIndividualValid : isGroupValid;

  const handleContinue = (e: React.MouseEvent) => {
    if (!isValid) {
      e.preventDefault();
      setSubmitted(true);
      return;
    }

    if (activeTab === "group") {
      const leader = members.find((m) => m.isLeader) || members[0];
      setFullRegistration(leader);
      setGroupMembers(members);
      setRegistrationType("group");
    } else {
      setRegistrationType("individual");
    }
  };

  if (!mounted) {
    return (
      <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-[86px] shadow-sm">
        <Header showBack />
        <CheckoutEventBanner event={event} />
        <div className="px-4 py-3 sm:px-6">
          <CheckoutStepper currentStep="registration" />
        </div>
        <div className="px-4 sm:px-6">
          <div className="h-6 w-48 animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-50" />
        </div>
        <div className="mx-4 mt-4 space-y-4 sm:mx-6">
          <div className="h-16 animate-pulse rounded-xl bg-[#edfcf5]" />
          <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-64 animate-pulse rounded-xl bg-slate-50" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-[86px] shadow-sm">
      <Header showBack />
      <CheckoutEventBanner event={event} />
      <div className="px-4 py-3 sm:px-6">
        <CheckoutStepper currentStep="registration" />
      </div>
      <div className="px-4 sm:px-6">
        <h2 className="text-[22px] font-extrabold text-[#10183a]">
          Registration Details
        </h2>
        <p className="mt-1 text-[13px] text-[#5b6884]">
          Please fill in attendee details to complete the registration.
        </p>
      </div>

      <div className="mx-4 mt-4 space-y-4 sm:mx-6">
        {/* Ticket Summary Badge */}
        <SelectedTicketBadge
          quantity={selectedQuantity}
          ticketName={selectedItems
            .map(({ ticket, quantity }) => `${ticket.name} × ${quantity}`)
            .join(", ")}
          totalPrice={selectedTotal}
          editHref={`/checkout/${orderId}/tickets`}
        />

        {/* 1. Registration Type Switcher Tabs */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#63708a]">
            Choose Registration Type
          </label>
          <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-[#e2e7ee] bg-[#f1f4f8] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("individual")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                activeTab === "individual"
                  ? "bg-white text-[#0aae6b] shadow-xs"
                  : "text-[#63708a] hover:text-[#10183a]"
              }`}
            >
              <IconUser size={16} />
              <span>Individual</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("group")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                activeTab === "group"
                  ? "bg-white text-[#0aae6b] shadow-xs"
                  : "text-[#63708a] hover:text-[#10183a]"
              }`}
            >
              <IconUsers size={16} />
              <span>Group ({Math.max(selectedQuantity, 1)})</span>
            </button>
          </div>
        </div>

        {/* 2. Individual Registration View */}
        {activeTab === "individual" && (
          <div className="space-y-4">
            <RegistrationSection title="Your Details">
              <Field
                label="Full Name"
                required
                value={form.name}
                onChange={(value) => update("name", value)}
                placeholder="Enter your full name"
                icon={<IconUser size={15} />}
              />
              <Field
                label="Email ID"
                required
                value={form.email}
                onChange={(value) => update("email", value)}
                placeholder="you@example.com"
                type="email"
                icon={<IconMail size={15} />}
              />
              <Field
                label="Phone Number"
                required
                value={form.phone}
                onChange={(value) => update("phone", value)}
                placeholder="98765 43210"
                icon={<IconPhone size={15} />}
                className="sm:col-span-2"
              />
            </RegistrationSection>

            <RegistrationSection
              title="Additional Information"
              description="These details are required by the event organizer."
            >
              <SelectField
                label="College"
                required
                value={form.college}
                onChange={(value) => update("college", value)}
                icon={<IconBuilding size={15} />}
                options={["KITSW", "Other"]}
              />
              <Field
                label="Roll Number"
                required
                value={form.roll}
                onChange={(value) => update("roll", value)}
                placeholder="Enter your roll number"
                icon={<IconIdCard size={15} />}
              />
              <SelectField
                label="Branch"
                required
                value={form.branch}
                onChange={(value) => update("branch", value)}
                icon={<IconGitBranch size={15} />}
                options={["CSE", "ECE", "EEE"]}
              />
              <SelectField
                label="Year"
                required
                value={form.year}
                onChange={(value) => update("year", value)}
                icon={<IconCalendarDays size={15} />}
                options={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
              />
              <Field
                label="Team Name"
                value={form.team}
                onChange={(value) => update("team", value)}
                placeholder="Enter your team name"
                icon={<IconUsers size={15} />}
              />
              <SelectField
                label="T-shirt Size"
                value={form.shirt}
                onChange={(value) => update("shirt", value)}
                icon={<IconShirt size={15} />}
                options={["S", "M", "L", "XL"]}
              />
            </RegistrationSection>
          </div>
        )}

        {/* 3. Group Registration View */}
        {activeTab === "group" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-[#a7f3d0] bg-[#ecfdf5] p-3 text-[12px] text-[#065f46]">
              <div className="flex items-center justify-between font-bold text-[#047857]">
                <span>👥 Group Registration</span>
                <span className="rounded-full border border-[#a7f3d0] bg-white/80 px-2 py-0.5 text-[10px] font-bold">
                  {members.length} {members.length === 1 ? "Member" : "Members"}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[#047857]/90">
                Please fill in the details for each attendee. Select <b>one Group Leader</b> who will receive tickets and be responsible for venue entry.
              </p>
            </div>

            {members.map((member, index) => {
              const memberComplete = isMemberValid(member);
              return (
                <div
                  key={index}
                  className={`space-y-3 rounded-xl border p-4 transition-all ${
                    member.isLeader
                      ? "border-[#0aae6b] bg-[#fafffd] ring-1 ring-[#0aae6b]/20"
                      : "border-[#e1e6ec] bg-white"
                  }`}
                >
                  {/* Member Card Header */}
                  <div className="flex items-center justify-between border-b border-[#f1f4f8] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          member.isLeader
                            ? "bg-[#0aae6b] text-white"
                            : "bg-[#f1f4f8] text-[#63708a]"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-[13px] font-bold text-[#10183a]">
                        Member {index + 1}
                      </span>
                      {member.isLeader ? (
                        <span className="rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-2 py-0.5 text-[10px] font-bold text-[#0aae6b]">
                          ★ Group Leader
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#f8fafc] px-2 py-0.5 text-[10px] text-[#64748b]">
                          Regular Member
                        </span>
                      )}
                    </div>

                    {/* Radio Button to Select Leader */}
                    <label className="flex cursor-pointer select-none items-center gap-1.5 text-[11px] font-semibold text-[#63708a] hover:text-[#10183a]">
                      <input
                        type="radio"
                        name="group-leader"
                        checked={member.isLeader}
                        onChange={() => handleSelectLeader(index)}
                        className="h-3.5 w-3.5 cursor-pointer accent-[#0aae6b]"
                      />
                      <span className={member.isLeader ? "text-[#0aae6b]" : ""}>
                        {member.isLeader ? "Leader" : "Make Leader"}
                      </span>
                    </label>
                  </div>

                  {/* Form fields for Member */}
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      required
                      value={member.name}
                      onChange={(value) => updateMember(index, "name", value)}
                      placeholder="Enter full name"
                      icon={<IconUser size={15} />}
                      className="sm:col-span-2"
                    />
                    <Field
                      label="Email ID"
                      required
                      value={member.email}
                      onChange={(value) => updateMember(index, "email", value)}
                      placeholder="attendee@example.com"
                      type="email"
                      icon={<IconMail size={15} />}
                    />
                    <Field
                      label="Phone Number"
                      required
                      value={member.phone}
                      onChange={(value) => updateMember(index, "phone", value)}
                      placeholder="98765 43210"
                      icon={<IconPhone size={15} />}
                    />
                    <SelectField
                      label="College"
                      required
                      value={member.college}
                      onChange={(value) => updateMember(index, "college", value)}
                      icon={<IconBuilding size={15} />}
                      options={["KITSW", "Other"]}
                    />
                    <Field
                      label="Roll Number"
                      required
                      value={member.roll}
                      onChange={(value) => updateMember(index, "roll", value)}
                      placeholder="Roll Number"
                      icon={<IconIdCard size={15} />}
                    />
                    <SelectField
                      label="Branch"
                      required
                      value={member.branch}
                      onChange={(value) => updateMember(index, "branch", value)}
                      icon={<IconGitBranch size={15} />}
                      options={["CSE", "ECE", "EEE"]}
                    />
                    <SelectField
                      label="Year"
                      required
                      value={member.year}
                      onChange={(value) => updateMember(index, "year", value)}
                      icon={<IconCalendarDays size={15} />}
                      options={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
                    />
                    <Field
                      label="Team Name"
                      value={member.team}
                      onChange={(value) => updateMember(index, "team", value)}
                      placeholder="Team name"
                      icon={<IconUsers size={15} />}
                    />
                    <SelectField
                      label="T-shirt Size"
                      value={member.shirt}
                      onChange={(value) => updateMember(index, "shirt", value)}
                      icon={<IconShirt size={15} />}
                      options={["S", "M", "L", "XL"]}
                    />
                  </div>

                  {submitted && !memberComplete && (
                    <p className="text-[11px] font-semibold text-[#d33b4f]">
                      Please complete all required fields for Member {index + 1}.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Shared Note */}
        <RegistrationNote>
          <IconInfo size={17} className="shrink-0 text-[#2365c9]" />
          <span>
            <b className="text-[#10183a]">Important Note</b>
            <br />
            {activeTab === "group"
              ? "All digital passes and booking receipts will be registered under the designated Group Leader's email address."
              : "Please ensure all details are correct. These will be used for your event entry pass."}
          </span>
        </RegistrationNote>

        {/* Bottom Error Notification */}
        {submitted && !isValid && (
          <p className="rounded-lg bg-[#fff5f6] p-3 text-[12px] font-semibold text-[#d33b4f] border border-[#f0b8c0]">
            {activeTab === "group"
              ? "Please ensure all group members have completed required fields with valid emails."
              : "Please complete all required fields with a valid email address."}
          </p>
        )}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[600px] -translate-x-1/2 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,.08)] sm:px-6">
        <Link
          href={isValid ? `/checkout/${orderId}/payment` : "#"}
          onClick={handleContinue}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0aae6b] text-[13px] font-semibold text-white transition-colors hover:bg-[#099c5f]"
        >
          Continue to Payment <span className="ml-2 text-[17px]">→</span>
        </Link>
      </div>
    </main>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  className = "",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block space-y-1 ${className}`}>
      <span className="text-[11px] font-semibold text-[#1a2340]">
        {label} {required && <b className="text-[#db3e4d]">*</b>}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#63708a]">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-[#dfe5eb] pl-9 pr-3 text-[12px] outline-none focus:border-[#0aae6b] focus:ring-1 focus:ring-[#0aae6b]/20"
        />
      </span>
    </label>
  );
}

function SelectField({
  label,
  required,
  value,
  onChange,
  icon,
  options,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  options: string[];
}) {
  return (
    <label className="block space-y-1">
      <span className="text-[11px] font-semibold text-[#1a2340]">
        {label} {required && <b className="text-[#db3e4d]">*</b>}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#63708a]">
          {icon}
        </span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full appearance-none rounded-lg border border-[#dfe5eb] bg-white pl-9 pr-8 text-[12px] outline-none focus:border-[#0aae6b]"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <IconChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#63708a]"
        />
      </span>
    </label>
  );
}
