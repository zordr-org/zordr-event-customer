"use client";

import Link from "next/link";
import { useCheckout } from "@/components/checkout/CheckoutProvider";
import { Header } from "@/components/layout/Header";
import { CheckoutEventBanner } from "@/components/checkout/CheckoutEventBanner";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { OrderSummary } from "@/components/booking/OrderSummary";
import { PaymentInfoNotice } from "@/components/payment/PaymentInfoNotice";
import { PaymentMethodItem } from "@/components/payment/PaymentMethodItem";
import { PaymentMethodList } from "@/components/payment/PaymentMethodList";
import { PaymentSecurityBanner } from "@/components/payment/PaymentSecurityBanner";
import { formatRupees } from "@/lib/mock-checkout";
import { completePayment, getCheckoutItems, getPricing } from "@/lib/mock-api";
import { IconInfo, IconShield } from "@/components/ui/Icons";

const methods = [
  { id: "upi", label: "UPI", description: "Pay using any UPI app", icon: "◈" },
  {
    id: "cards",
    label: "Cards",
    description: "Credit / Debit / ATM cards",
    icon: "▣",
  },
  {
    id: "netbanking",
    label: "Net Banking",
    description: "All major banks supported",
    icon: "⌂",
  },
  {
    id: "wallets",
    label: "Wallets",
    description: "Paytm, PhonePe, Amazon Pay, etc.",
    icon: "▢",
  },
];

export default function PaymentPage() {
  const {
    quantities,
    registration,
    paymentMethod: selectedMethod,
    setPaymentMethod,
    markPaid,
    event,
    orderId,
  } = useCheckout();
  const pricing = getPricing(event, quantities);
  const selectedItems = getCheckoutItems(event, quantities);
  const canPay =
    [
      registration.name,
      registration.email,
      registration.phone,
      registration.college,
      registration.roll,
      registration.branch,
      registration.year,
    ].every(Boolean) && registration.email.includes("@");
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-[90px] shadow-sm">
      <Header showBack />
      <CheckoutEventBanner event={event} />
      <div className="px-4 py-3 sm:px-6">
        <CheckoutStepper currentStep="payment" />
      </div>
      <div className="px-4 sm:px-6">
        <h2 className="text-[22px] font-extrabold text-[#10183a]">Payment</h2>
        <p className="mt-1 text-[13px] text-[#5b6884]">
          Choose your preferred payment method to complete your booking.
        </p>
      </div>
      <div className="mx-4 mt-4 grid gap-3 sm:mx-6 sm:grid-cols-[1.15fr_.85fr]">
        <section className="rounded-[10px] border border-[#e1e6ec] p-3">
          <h3 className="mb-2 text-[16px] font-bold text-[#131b3a]">
            Payment Methods
          </h3>
          <PaymentMethodList checkout>
            {methods.map((method) => (
              <PaymentMethodItem
                key={method.id}
                id={method.id}
                label={method.label}
                description={method.description}
                selected={selectedMethod === method.id}
                onSelect={setPaymentMethod}
                icon={method.icon}
              />
            ))}
          </PaymentMethodList>
          <PaymentSecurityBanner paymentMethod />
        </section>
        <OrderSummary checkout={{ event, selectedItems, orderId, pricing }} />
      </div>
      <PaymentInfoNotice
        title="Important Information"
        message="Do not refresh or close this page during payment. You will be redirected to a secure Razorpay page."
        icon={<IconInfo size={18} className="shrink-0 text-[#2365c9]" />}
        checkout
      />
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[600px] -translate-x-1/2 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,.08)] sm:px-6">
        <Link
          href={
            canPay
              ? `/checkout/${orderId}/success`
              : `/checkout/${orderId}/registration`
          }
          onClick={() => {
            if (canPay) {
              completePayment({
                orderId,
                eventId: event.id,
                quantities,
                registration,
                paymentMethod: selectedMethod,
                paid: false,
              });
              markPaid();
            }
          }}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0aae6b] text-[14px] font-semibold text-white"
        >
          <IconShield size={16} className="mr-2" />
          Pay {formatRupees(pricing.total)} Securely{" "}
          <span className="ml-2 text-[17px]">→</span>
        </Link>
      </div>
    </main>
  );
}
