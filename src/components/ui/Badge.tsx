import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
}

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--color-muted-background)] text-[var(--color-foreground)]",
    success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    destructive:
      "bg-[var(--color-destructive)]/10 text-[var(--color-destructive)]",
    outline:
      "border border-[var(--color-border)] text-[var(--color-foreground)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
