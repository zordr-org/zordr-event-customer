"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { changeMockPassword } from "@/lib/mock-api";
import { IconEye, IconEyeOff } from "@/components/ui/Icons";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requirements = useMemo(
    () => ({
      minLength: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword),
    }),
    [newPassword],
  );

  const passwordValid =
    requirements.minLength &&
    requirements.uppercase &&
    requirements.lowercase &&
    requirements.number &&
    requirements.special;

  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  const canSubmit =
    currentPassword.length > 0 && passwordValid && passwordsMatch;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!passwordValid) {
      setMessage("Please meet all password requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    const result = changeMockPassword(currentPassword, newPassword);

    if (result === "current-password-invalid") {
      setMessage("Current password is incorrect.");
      return;
    }

    if (result === "user-not-found") {
      setMessage("Unable to find the current account.");
      return;
    }

    if (result === "weak-password") {
      setMessage("Please choose a stronger password.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setMessage("Password changed successfully.");
  };

  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-8 shadow-sm">
      <Header showBack />

      <div className="px-4 pt-5 sm:px-6">
        <h1 className="text-[25px] font-extrabold text-[#10183a]">
          Change Password
        </h1>

        <p className="mt-1 text-[14px] text-[#5d6a85]">
          Update your account password securely.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-5 rounded-[10px] border border-[#e1e6ec] p-4"
        >
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label
                htmlFor="current-password"
                className="text-[11px] font-semibold text-[#53617a]"
              >
                Current Password
              </label>

              <div className="relative mt-1">
                <input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(event.target.value)
                  }
                  autoComplete="current-password"
                  className="h-10 w-full rounded-md border border-[#dfe5eb] bg-white px-3 pr-10 text-[13px] text-[#17203b] outline-none focus:border-[#0aae6b]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65718a] transition-colors hover:text-[#17203b]"
                  aria-label={
                    showCurrentPassword ? "Hide password" : "Show password"
                  }
                >
                  {showCurrentPassword ? (
                    <IconEye size={18} />
                  ) : (
                    <IconEyeOff size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="new-password"
                className="text-[11px] font-semibold text-[#53617a]"
              >
                New Password
              </label>

              <div className="relative mt-1">
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                  className="h-10 w-full rounded-md border border-[#dfe5eb] bg-white px-3 pr-10 text-[13px] text-[#17203b] outline-none focus:border-[#0aae6b]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65718a] transition-colors hover:text-[#17203b]"
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                >
                  {showNewPassword ? (
                    <IconEye size={18} />
                  ) : (
                    <IconEyeOff size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="text-[11px] font-semibold text-[#53617a]"
              >
                Confirm New Password
              </label>

              <div className="relative mt-1">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  autoComplete="new-password"
                  className="h-10 w-full rounded-md border border-[#dfe5eb] bg-white px-3 pr-10 text-[13px] text-[#17203b] outline-none focus:border-[#0aae6b]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65718a] transition-colors hover:text-[#17203b]"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <IconEye size={18} />
                  ) : (
                    <IconEyeOff size={18} />
                  )}
                </button>
              </div>

              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="mt-1 text-[10px] text-[#c53549]">
                  Passwords do not match.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-[#f7fafc] p-3">
            <p className="text-[11px] font-semibold text-[#17203b]">
              Password must contain:
            </p>

            <div className="mt-2 space-y-1 text-[10px]">
              <PasswordRule
                valid={requirements.minLength}
                text="At least 8 characters"
              />

              <PasswordRule
                valid={requirements.uppercase}
                text="At least one uppercase letter"
              />

              <PasswordRule
                valid={requirements.lowercase}
                text="At least one lowercase letter"
              />

              <PasswordRule
                valid={requirements.number}
                text="At least one number"
              />

              <PasswordRule
                valid={requirements.special}
                text="At least one special character"
              />
            </div>
          </div>

          {message && (
            <p
              className={`mt-3 text-center text-[11px] font-medium ${
                message.includes("successfully")
                  ? "text-[#0a9960]"
                  : "text-[#c53549]"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-5 h-10 w-full rounded-md bg-[#0aae6b] text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Change Password
          </button>
        </form>
      </div>
    </main>
  );
}

function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <p className={valid ? "text-[#0a9960]" : "text-[#65718a]"}>
      {valid ? "✓" : "○"} {text}
    </p>
  );
}