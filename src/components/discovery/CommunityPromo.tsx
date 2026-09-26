"use client";

import Link from "next/link";
import * as React from "react";

interface CommunityPromoProps {
  title?: string;
  description?: string;
  href?: string;
  actionLabel?: string;
  imageUrl?: string;
}

export function CommunityPromo({
  title = "Better Events. Stronger Communities.",
  description = "Discover. Participate. Be a part of something bigger.",
  href = "/events",
  actionLabel = "Explore Events →",
  imageUrl,
}: CommunityPromoProps) {
  const [imageFailed, setImageFailed] = React.useState(false);

  return (
    <section className="overflow-hidden rounded-[9px] bg-[var(--color-primary-light)]">
      <div className="flex h-[64px] items-center gap-2 p-2">
        {/* Illustration */}
        <div
          className="
            relative
            flex
            h-12
            w-[106px]
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-md
            bg-[linear-gradient(135deg,#facc15,#22c55e)]
          "
        >
          {!imageFailed && imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="text-[10px] font-bold leading-3 text-white">
              Better Events
            </span>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 text-left">
          <h2 className="text-[12px] font-bold leading-[13px] text-[var(--color-foreground)]">
            {title.split(". ").map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i !== arr.length - 1 ? "." : ""}
                {i !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <p className="mt-1 truncate text-[9px] font-medium leading-[10px] text-[var(--color-muted)]">
            {description}
          </p>
        </div>

        {/* Action */}
        <div className="shrink-0">
          <Link
            href={href}
            className="
              inline-flex
              h-8
              items-center
              justify-center
              rounded-md
              bg-[var(--color-primary)]
              px-3
              text-[10px]
              font-semibold
              text-white
              transition-colors
              hover:bg-[var(--color-primary-hover)]
            "
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
