interface TicketQRCodeProps {
  payload: string;
  size?: number;
}

export function TicketQRCode({ payload, size = 220 }: TicketQRCodeProps) {
  return (
    <div
      className="flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-white p-4"
      aria-label="Ticket QR code"
    >
      <div
        className="flex items-center justify-center bg-black text-center text-xs text-white"
        style={{
          width: size,
          height: size,
        }}
      >
        QR
      </div>
    </div>
  );
}
