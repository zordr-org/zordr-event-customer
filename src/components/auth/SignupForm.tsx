import type { FormEvent, ReactNode } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthFooter } from "@/components/auth/AuthFooter";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconPhone,
  IconUser,
} from "@/components/ui/Icons";

interface SignupFormProps {
  name: string;
  email: string;
  password: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  checkout?: {
    phone: string;
    confirm: string;
    showPassword: boolean;
    onPhoneChange: (value: string) => void;
    onConfirmChange: (value: string) => void;
    onTogglePassword: () => void;
    submitted: boolean;
    valid: boolean;
    duplicateEmail: boolean;
  };
}

export function SignupForm({
  name,
  email,
  password,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  loading = false,
  checkout,
}: SignupFormProps) {
  if (checkout) {
    return (
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit();
        }}
        className="mt-7 space-y-4"
      >
        <AuthField
          label="Full Name"
          value={name}
          onChange={onNameChange}
          placeholder="Enter your full name"
          icon={<IconUser size={18} />}
        />
        <AuthField
          label="Email ID"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="you@example.com"
          icon={<IconMail size={18} />}
        />
        <AuthField
          label="Phone Number"
          value={checkout.phone}
          onChange={checkout.onPhoneChange}
          placeholder="98765 43210"
          icon={<IconPhone size={18} />}
        />
        <AuthField
          label="Password"
          type={checkout.showPassword ? "text" : "password"}
          value={password}
          onChange={onPasswordChange}
          placeholder="Create a password"
          icon={<IconLock size={18} />}
          trailing={
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={checkout.onTogglePassword}
            >
              {checkout.showPassword ? (
                <IconEye size={17} />
              ) : (
                <IconEyeOff size={17} />
              )}
            </button>
          }
        />
        <AuthField
          label="Confirm Password"
          type={checkout.showPassword ? "text" : "password"}
          value={checkout.confirm}
          onChange={checkout.onConfirmChange}
          placeholder="Re-enter your password"
          icon={<IconLock size={18} />}
        />
        {checkout.submitted && !checkout.valid && (
          <p className="text-[12px] font-medium text-[#d33b4f]">
            Complete all fields. Passwords must match and contain at least 6
            characters.
          </p>
        )}
        {checkout.duplicateEmail && checkout.valid && (
          <p className="text-[12px] font-medium text-[#d33b4f]">
            An account with this email already exists. Please log in.
          </p>
        )}
        <button
          type="submit"
          className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#0aae6b] text-[16px] font-semibold text-white"
        >
          Create Account <span className="ml-2 text-[18px]">→</span>
        </button>
        <AuthFooter prompt="signup" />
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
          <label htmlFor="signup-name" className="text-sm font-medium">
            Name
          </label>

          <Input
            id="signup-name"
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-email" className="text-sm font-medium">
            Email
          </label>

          <Input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-password" className="text-sm font-medium">
            Password
          </label>

          <Input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}

function AuthField({
  label,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  trailing,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: ReactNode;
  type?: string;
  trailing?: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[14px] font-semibold text-[#17203b]">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#65718a]">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-[50px] w-full rounded-xl border border-[#dfe5eb] bg-white pl-11 pr-12 text-[14px] outline-none focus:border-[#0aae6b] focus:ring-2 focus:ring-[#0aae6b]/20"
        />
        {trailing && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#65718a]">
            {trailing}
          </span>
        )}
      </span>
    </label>
  );
}
