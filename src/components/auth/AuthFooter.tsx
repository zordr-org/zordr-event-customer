import Link from "next/link";

interface AuthFooterProps {
  message?: string;
  linkLabel?: string;
  href?: string;
  prompt?: "login" | "signup";
}

export function AuthFooter({
  message = "",
  linkLabel = "",
  href = "#",
  prompt,
}: AuthFooterProps) {
  if (prompt === "login") {
    return (
      <p className="text-center text-[14px] text-[var(--color-foreground)]">
        New to Zordr?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[var(--color-primary)] hover:underline"
        >
          Create an account
        </Link>
        <span className="ml-1 text-[var(--color-primary)]">→</span>
      </p>
    );
  }

  if (prompt === "signup") {
    return (
      <p className="text-center text-[14px] text-[#17203b]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#0aae6b]">
          Log In →
        </Link>
      </p>
    );
  }

  return (
    <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
      {message}{" "}
      <Link
        href={href}
        className="font-medium text-[var(--color-foreground)] underline-offset-4 hover:underline"
      >
        {linkLabel}
      </Link>
    </p>
  );
}
