"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerMockUser } from "@/lib/mock-api";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));
  const valid =
    form.name &&
    form.email.includes("@") &&
    form.phone &&
    form.password.length >= 6 &&
    form.password === form.confirm;
  const submit = () => {
    setSubmitted(true);
    if (valid) {
      const user = registerMockUser(form);
      if (user) {
        window.sessionStorage.setItem("zordr-auth-user", user.email);
        router.push("/");
      } else {
        setDuplicateEmail(true);
      }
    }
  };
  return (
    <AuthLayout compact>
      <AuthHeader brand="signup" />
      <div className="mt-8">
        <h1 className="text-[28px] font-extrabold text-[#10183a]">
          Create Account
        </h1>
        <p className="mt-2 text-[14px] leading-5 text-[#5d6a85]">
          Join Zordr to discover events and keep every ticket in one place.
        </p>
      </div>
      <SignupForm
        name={form.name}
        email={form.email}
        password={form.password}
        onNameChange={(value) => update("name", value)}
        onEmailChange={(value) => update("email", value)}
        onPasswordChange={(value) => update("password", value)}
        onSubmit={submit}
        checkout={{
          phone: form.phone,
          confirm: form.confirm,
          showPassword,
          onPhoneChange: (value) => update("phone", value),
          onConfirmChange: (value) => update("confirm", value),
          onTogglePassword: () => setShowPassword((current) => !current),
          submitted,
          valid: Boolean(valid),
          duplicateEmail,
        }}
      />
    </AuthLayout>
  );
}
