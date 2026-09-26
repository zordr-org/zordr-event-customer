"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { IconInfo, IconShield } from "@/components/ui/Icons";

export default function PaymentFailedPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white shadow-sm">
      <Header />
      <section className="px-6 pt-10 text-center">
        <img
          src="/payment-failed-illustration.svg"
          alt="Payment failed"
          className="mx-auto h-[220px] w-full max-w-[350px] object-contain"
        />
        <h1 className="mt-3 text-[27px] font-extrabold text-[#10183a]">
          Payment Failed
        </h1>
        <p className="mx-auto mt-2 max-w-[350px] text-[15px] leading-5 text-[#5d6a85]">
          We couldn’t process your payment. Please try again or use a different
          payment method.
        </p>
      </section>
      <section className="mx-6 mt-5 rounded-lg bg-[#fff1f1] px-4 py-4 text-left">
        <p className="text-[14px] font-bold text-[#c73445]">
          <IconInfo size={18} className="mr-2 inline" />
          Possible reasons:
        </p>
        <ul className="mt-2 list-disc pl-7 text-[12px] leading-5 text-[#53617e]">
          <li>Insufficient balance</li>
          <li>Payment was declined by your bank</li>
          <li>Network issue</li>
          <li>Session expired</li>
        </ul>
      </section>
      <div className="mx-6 mt-5 grid gap-2">
        <Link
          href="/checkout/123/payment"
          className="flex h-11 items-center justify-center rounded-lg bg-[#0aae6b] text-[14px] font-semibold text-white"
        >
          ↻ &nbsp; Try Again
        </Link>
        <Link
          href="/checkout/123/payment"
          className="flex h-11 items-center justify-center rounded-lg border border-[#17213f] text-[14px] font-semibold text-[#17213f]"
        >
          ▣ &nbsp; Choose Different Method
        </Link>
      </div>
      <section className="mx-6 mt-5 rounded-lg bg-[#f5f8fc] px-4 py-4">
        <p className="text-[14px] font-bold text-[#17203b]">
          <IconShield size={19} className="mr-2 inline" />
          Need Help?
        </p>
        <p className="mt-1 text-[12px] leading-4 text-[#53617e]">
          If the amount was deducted, it will be refunded automatically within
          5–7 business days.
        </p>
        <button
          type="button"
          className="mt-2 text-[12px] font-bold text-[#0a9960]"
        >
          Contact Support →
        </button>
      </section>
    </main>
  );
}
