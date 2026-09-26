import type { FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconEye, IconEyeOff, IconLock, IconMail } from "@/components/ui/Icons";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { AuthFooter } from "@/components/auth/AuthFooter";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  checkout?: {
    showPassword: boolean;
    onTogglePassword: () => void;
    isValid: boolean;
    submitted: boolean;
    authError: boolean;
  };
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  loading = false,
  checkout,
}: LoginFormProps) {
  if (checkout) {
    return (
      <form
        className="mt-8 flex-1 space-y-5"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="space-y-2">
          <label
            htmlFor="login-email"
            className="text-[14px] font-semibold text-[var(--color-foreground)]"
          >
            Email ID
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
              <IconMail size={18} />
            </div>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="h-[50px] w-full rounded-xl border border-[var(--color-border)] bg-white pl-11 pr-4 text-[14px] text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="login-password"
            className="text-[14px] font-semibold text-[var(--color-foreground)]"
          >
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
              <IconLock size={18} />
            </div>
            <input
              id="login-password"
              type={checkout.showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="h-[50px] w-full rounded-xl border border-[var(--color-border)] bg-white pl-11 pr-12 text-[14px] text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
            <button
              type="button"
              onClick={checkout.onTogglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
              aria-label={
                checkout.showPassword ? "Hide password" : "Show password"
              }
            >
              {checkout.showPassword ? (
                <IconEye size={18} />
              ) : (
                <IconEyeOff size={18} />
              )}
            </button>
          </div>
          <div className="text-right">
            <Link
              href="#"
              className="text-[13px] font-medium text-[var(--color-accent-blue)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <button
          type="submit"
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] text-[16px] font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
        >
          Log In <span className="text-[18px]">→</span>
        </button>
        {checkout.submitted && !checkout.isValid && (
          <p className="text-center text-[12px] font-medium text-[#d33b4f]">
            Enter a valid email and a password with at least 6 characters.
          </p>
        )}
        {checkout.authError && checkout.isValid && (
          <p className="text-center text-[12px] font-medium text-[#d33b4f]">
            Incorrect email or password. Use the demo credentials below or
            create a new account.
          </p>
        )}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="text-[13px] font-medium text-[var(--color-muted)]">
            OR
          </span>
          <div className="h-px flex-1 bg-[var(--color-border)]" />
        </div>
        <SocialLoginButtons compact />
        <AuthFooter prompt="login" />
      </form>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-5"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="login-email" className="text-sm font-medium">
            Email
          </label>

          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="login-password" className="text-sm font-medium">
            Password
          </label>

          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
