"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { demoCredentials, loginMockUser } from "@/lib/mock-api";
import { IconShield, IconCalendar, IconUsers } from "@/components/ui/Icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();
  const isValid = email.includes("@") && password.length >= 6;
  const handleSubmit = () => {
    setSubmitted(true);
    if (isValid) {
      const user = loginMockUser(email, password);
      if (user) {
        window.sessionStorage.setItem("zordr-auth-user", user.email);
        router.push("/");
      } else {
        setAuthError(true);
      }
    }
  };

  return (
    <AuthLayout compact asMain={false}>
      <AuthHeader brand="login" />

      {/* Welcome + Illustration */}
      <div className="relative mt-8">
        <div className="max-w-[65%]">
          <h1 className="text-[28px] font-extrabold leading-[34px] text-[var(--color-foreground)]">
            Welcome Back!
          </h1>
          <p className="mt-2 text-[14px] leading-[20px] text-[var(--color-muted)]">
            Log in to discover amazing events, manage your tickets, and stay
            connected.
          </p>
          <p className="mt-2 text-[11px] text-[var(--color-muted)]">
            Demo: {demoCredentials.email} / {demoCredentials.password}
          </p>
        </div>
        {/* Ticket illustration placeholder - using decorative element */}
        <div className="absolute -top-2 right-0 flex h-[120px] w-[180px] items-center justify-center">
          <div className="relative">
            {/* Stylized tickets */}
            <div className="absolute -left-2 -top-2 h-[72px] w-[56px] rotate-[-15deg] rounded-lg bg-[#e8f5e9] opacity-80" />
            <div className="absolute left-4 top-0 h-[72px] w-[56px] rotate-[5deg] rounded-lg bg-[#e1d5f7] opacity-80">
              <div className="flex h-full items-center justify-center">
                <span className="text-[20px] text-[#7c3aed]">★</span>
              </div>
            </div>
            <div
              className="absolute left-1 top-8 text-[10px] font-bold italic leading-[12px] text-[var(--color-foreground)]"
              style={{ transform: "rotate(-20deg)" }}
            >
              <span className="text-[11px]">Good</span>
              <br />
              <span className="text-[11px]">Events</span>
              <br />
              <span className="text-[11px]">Brighter</span>
              <br />
              <span className="text-[12px] text-[var(--color-primary)]">
                People
              </span>
            </div>
            {/* Decorative check line */}
            <div className="absolute bottom-0 right-[-10px] h-[2px] w-10 rotate-[-30deg] bg-[var(--color-primary)]" />
          </div>
        </div>
      </div>

      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        checkout={{
          showPassword,
          onTogglePassword: () => setShowPassword(!showPassword),
          isValid,
          submitted,
          authError,
        }}
      />

      {/* Trust Highlights */}
      <div className="mt-6 rounded-xl bg-[var(--color-primary-light)] px-4 py-4">
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="text-[var(--color-primary)]">
              <IconShield size={22} />
            </div>
            <span className="text-[11px] font-semibold leading-[14px] text-[var(--color-foreground)]">
              Secure
              <br />& Safe
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="text-[var(--color-primary)]">
              <IconCalendar size={22} />
            </div>
            <span className="text-[11px] font-semibold leading-[14px] text-[var(--color-foreground)]">
              Your Events
              <br />
              in One Place
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="text-[var(--color-primary)]">
              <IconUsers size={22} />
            </div>
            <span className="text-[11px] font-semibold leading-[14px] text-[var(--color-foreground)]">
              A Bigger
              <br />
              Community
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 space-y-2 pb-4 text-center">
        <p className="text-[12px] text-[var(--color-muted)]">
          © 2026 Zordr. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-2 text-[12px] font-medium text-[var(--color-foreground)]">
          <Link href="#" className="hover:underline">
            Terms
          </Link>
          <span className="text-[var(--color-border)]">|</span>
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
          <span className="text-[var(--color-border)]">|</span>
          <Link href="#" className="hover:underline">
            Support
          </Link>
        </div>
      </footer>
    </AuthLayout>
  );
}
