import { IconCheck } from "@/components/ui/Icons";

interface BookingConfirmationProps {
  orderId?: string;
  totalPaid?: number;
  paymentTimestamp?: string;
  confirmationMessage?: string;
  checkout?: {
    orderId: string;
    totalPaid: string;
    email: string;
    paymentTimestamp: string;
  };
}

export function BookingConfirmation({
  orderId,
  totalPaid,
  paymentTimestamp,
  confirmationMessage = "Your payment was successful.",
  checkout,
}: BookingConfirmationProps) {
  if (checkout) {
    return (
      <>
        <section className="px-4 pt-6 text-center sm:px-6">
          <div className="booking-success-mark relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#dff8ec] text-[#0aae6b]">
            <IconCheck
              className="booking-success-check"
              size={42}
              strokeWidth={3}
            />
            <span className="booking-confetti absolute -left-4 top-3 text-[#f4bb1e]">
              ◆
            </span>
            <span className="booking-confetti booking-confetti-delay absolute -right-4 bottom-3 text-[#0aae6b]">
              ◆
            </span>
          </div>
          <h1 className="mt-4 text-[25px] font-extrabold text-[#10183a]">
            Booking Confirmed!
          </h1>
          <p className="mt-1 text-[15px] leading-5 text-[#5d6a85]">
            Your tickets have been booked successfully.
            <br />
            Get ready for an amazing experience!
          </p>
        </section>
        <section className="mx-4 mt-5 flex rounded-[10px] bg-[#e9fbf3] px-4 py-4 sm:mx-6">
          <div className="flex-1 border-r border-[#bfe8d4]">
            <p className="text-[11px] text-[#53617e]">Order ID</p>
            <p className="mt-1 text-[20px] font-extrabold text-[#121b3c]">
              {checkout.orderId}
            </p>
            <p className="mt-3 text-[10px] text-[#65718a]">
              A confirmation has been sent to your email
            </p>
            <p className="text-[11px] font-semibold text-[#17203b]">
              {checkout.email}
            </p>
          </div>
          <div className="w-[120px] pl-4">
            <p className="text-[11px] text-[#53617e]">Total Paid</p>
            <p className="mt-1 text-[20px] font-extrabold text-[#121b3c]">
              {checkout.totalPaid}
            </p>
            <span className="mt-1 inline-flex rounded-md bg-[#cef5df] px-2 py-1 text-[10px] font-semibold text-[#0a9960]">
              ✓ Payment Successful
            </span>
            <p className="mt-2 text-[10px] text-[#65718a]">
              {checkout.paymentTimestamp}
            </p>
          </div>
        </section>
      </>
    );
  }

  if (orderId === undefined || totalPaid === undefined || !paymentTimestamp) {
    return null;
  }

  return (
    <section className="space-y-5 text-center">
      <div className="space-y-2">
        <div
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700"
        >
          ✓
        </div>

        <h1 className="text-2xl font-semibold">Booking Confirmed</h1>

        <p className="text-sm text-[var(--color-muted)]">
          {confirmationMessage}
        </p>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] p-4 text-left">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-[var(--color-muted)]">Order ID</span>

          <span className="font-medium">{orderId}</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-sm text-[var(--color-muted)]">Total Paid</span>

          <span className="font-semibold">₹{(totalPaid / 100).toFixed(2)}</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-sm text-[var(--color-muted)]">
            Payment Status
          </span>

          <span className="font-medium text-green-600">Successful</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-sm text-[var(--color-muted)]">Paid At</span>

          <time dateTime={paymentTimestamp}>
            {new Date(paymentTimestamp).toLocaleString()}
          </time>
        </div>
      </div>
    </section>
  );
}
