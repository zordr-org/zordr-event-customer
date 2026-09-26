"use client";

import { useState } from "react";

const fallbackSrc = "/event-fallback.svg";

export function ResilientImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState(src);
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setImageSrc(fallbackSrc)}
    />
  );
}
