import { Button } from "@/components/ui/Button";
import { IconApple, IconGoogle } from "@/components/ui/Icons";

interface SocialLoginButtonsProps {
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export function SocialLoginButtons({
  onGoogleClick,
  onAppleClick,
  disabled = false,
  compact = false,
}: SocialLoginButtonsProps) {
  if (compact) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          className="flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-white text-[14px] font-medium text-[var(--color-foreground)] transition-colors hover:bg-gray-50"
        >
          <IconGoogle size={20} />
          Continue with Google
        </button>
        <button
          type="button"
          className="flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-white text-[14px] font-medium text-[var(--color-foreground)] transition-colors hover:bg-gray-50"
        >
          <IconApple size={20} />
          Continue with Apple
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onGoogleClick}
        disabled={disabled}
      >
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onAppleClick}
        disabled={disabled}
      >
        Continue with Apple
      </Button>
    </div>
  );
}
