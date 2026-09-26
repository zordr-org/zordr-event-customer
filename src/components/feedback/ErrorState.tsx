import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface ErrorStateProps {
  title: string;
  message: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  searchActionLabel?: string;
  onSearchAction?: () => void;
}

export function ErrorState({
  title,
  message,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  searchActionLabel,
  onSearchAction,
}: ErrorStateProps) {
  return (
    <Card variant="outlined" className="mx-auto max-w-lg p-6 text-center">
      <div
        aria-hidden="true"
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-muted)]/10 text-xl font-semibold"
      >
        !
      </div>

      <div className="mt-5 space-y-2">
        <h1 className="text-xl font-semibold">{title}</h1>

        <p className="text-sm leading-6 text-[var(--color-muted)]">{message}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button type="button" onClick={onPrimaryAction}>
          {primaryActionLabel}
        </Button>

        {secondaryActionLabel && onSecondaryAction && (
          <Button type="button" variant="outline" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}

        {searchActionLabel && onSearchAction && (
          <Button type="button" variant="outline" onClick={onSearchAction}>
            {searchActionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}
