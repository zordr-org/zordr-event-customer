import Link from "next/link";
import { IconArrowLeft } from "@/components/ui/Icons";

interface AuthHeaderProps {
  title?: string;
  description?: string;
  brand?: "login" | "signup";
}

export function AuthHeader({ title, description, brand }: AuthHeaderProps) {
  if (brand) {
    return (
      <div className="flex items-start justify-between">
        <Link
          href="/"
          aria-label="Go back"
          className={`flex h-10 w-10 items-center justify-center ${brand === "login" ? "text-[var(--color-foreground)]" : "text-[#17203b]"}`}
        >
          <IconArrowLeft size={22} />
        </Link>
        <div
          className={
            brand === "login" ? "flex flex-col items-center" : "text-center"
          }
        >
          {brand === "login" ? (
            <>
              <span className="text-[28px] font-extrabold tracking-[-1px] text-[var(--color-primary)]">
                Zordr
              </span>
              <span className="text-[10px] font-medium text-[var(--color-muted)]">
                Events. Experiences. Together.
              </span>
            </>
          ) : (
            <>
              <p className="text-[28px] font-extrabold tracking-[-1px] text-[#08a566]">
                Zordr
              </p>
              <p className="text-[10px] text-[#65718a]">
                Events. Experiences. Together.
              </p>
            </>
          )}
        </div>
        <div className="w-10" />
      </div>
    );
  }

  return (
    <header className="mb-8 space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

      {description && (
        <p className="text-sm text-[var(--color-muted)]">{description}</p>
      )}
    </header>
  );
}
