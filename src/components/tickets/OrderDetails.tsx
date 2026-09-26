interface OrderDetailsProps {
  orderId: string;
  bookingDate: string;
  totalPaid: number;
  paymentMethod: string;
  checkout?: boolean;
}

export function OrderDetails({
  orderId,
  bookingDate,
  totalPaid,
  paymentMethod,
  checkout = false,
}: OrderDetailsProps) {
  if (checkout) {
    return (
      <section className="mx-4 mt-3 rounded-[10px] bg-[#f5f8fc] p-3 text-[12px] sm:mx-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#17203b]">
            Order Details
          </h2>
          <span className="rounded-md bg-[#dff8ec] px-2 py-1 text-[10px] font-semibold text-[#0a9d60]">
            Payment Successful
          </span>
        </div>
        <div className="mt-2 space-y-2 text-[#52617e]">
          <p className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <span>Order ID</span>{" "}
            <b className="break-all text-[#17203b]">{orderId}</b>
          </p>
          <p className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <span>Booking Date</span>{" "}
            <b className="text-[#17203b]">{bookingDate}</b>
          </p>
          <p className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <span>Total Paid</span>{" "}
            <b className="text-[#17203b]">
              ₹{(totalPaid / 100).toLocaleString("en-IN")}
            </b>
          </p>
          <p className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <span>Payment Method</span>{" "}
            <b className="text-[#17203b]">{paymentMethod}</b>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Order Details</h2>

      <div className="rounded-lg border border-[var(--color-border)] p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-[var(--color-muted)]">Order ID</p>
            <p className="mt-1 font-medium break-all">{orderId}</p>
          </div>

          <div>
            <p className="text-xs text-[var(--color-muted)]">Booking Date</p>
            <time dateTime={bookingDate} className="mt-1 block font-medium">
              {new Date(bookingDate).toLocaleString()}
            </time>
          </div>

          <div>
            <p className="text-xs text-[var(--color-muted)]">Total Paid</p>
            <p className="mt-1 font-semibold">
              ₹{(totalPaid / 100).toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--color-muted)]">Payment Method</p>
            <p className="mt-1 font-medium">{paymentMethod}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
