interface CheckoutHeaderProps {
  title?: string;
}

export function CheckoutHeader({ title = "Checkout" }: CheckoutHeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="mx-auto flex min-h-14 max-w-3xl items-center px-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
    </header>
  );
}
