"use client";

import Link from "next/link";
import { useState } from "react";
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
    event,
    orderId,
  } = useCheckout();
  const [submitted, setSubmitted] = useState(false);
  const required = [
    form.name,
    form.email,
    form.phone,
    form.college,
    form.roll,
    form.branch,
    form.year,
  ];
  const isValid = required.every(Boolean) && form.email.includes("@");
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
          Please fill in your details to complete the registration.
        </p>
      </div>
      <div className="mx-4 mt-4 space-y-3 sm:mx-6">
        <SelectedTicketBadge
          quantity={selectedQuantity}
          ticketName={selectedItems
            .map(({ ticket, quantity }) => `${ticket.name} × ${quantity}`)
            .join(", ")}
          totalPrice={selectedTotal}
          editHref={`/checkout/${orderId}/tickets`}
        />
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
        <RegistrationNote>
          <IconInfo size={17} className="shrink-0 text-[#2365c9]" />
          <span>
            <b className="text-[#17203b]">Note</b>
            <br />
            Please ensure all details are correct. These details will be used
            for your event registration.
          </span>
        </RegistrationNote>
        {submitted && !isValid && (
          <p className="text-[11px] font-semibold text-[#d33b4f]">
            Please complete all required fields with a valid email address.
          </p>
        )}
      </div>
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[600px] -translate-x-1/2 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,.08)] sm:px-6">
        <Link
          href={isValid ? `/checkout/${orderId}/payment` : "#"}
          onClick={(event) => {
            if (!isValid) {
              event.preventDefault();
              setSubmitted(true);
            }
          }}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0aae6b] text-[13px] font-semibold text-white"
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
