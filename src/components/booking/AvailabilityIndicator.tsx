interface AvailabilityIndicatorProps {
  available: number;
}

export function AvailabilityIndicator({
  available,
}: AvailabilityIndicatorProps) {
  if (available <= 0) {
    return (
      <p className="text-sm font-medium text-[var(--color-destructive)]">
        Sold out
      </p>
    );
  }

  if (available <= 10) {
    return (
      <p className="text-sm font-medium text-[var(--color-warning)]">
        Only {available} left
      </p>
    );
  }

  return (
    <p className="text-sm text-[var(--color-muted)]">
      {available} tickets available
    </p>
  );
}
