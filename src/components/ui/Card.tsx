import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined";
}

export function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  const variants = {
    default:
      "rounded-lg bg-[var(--color-background)] shadow-[var(--shadow-card)]",
    outlined:
      "rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]",
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
