"use client";

import * as React from "react";

interface EventImageProps {
  src?: string | null;
  alt?: string;
  fallbackTitle: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
}

export function EventImage({
  src,
  alt = "",
  fallbackTitle,
  className = "",
  imageClassName = "",
  fallbackClassName = "",
}: EventImageProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageFailed, setImageFailed] = React.useState(false);

  React.useEffect(() => {
    if (!src) {
      setImageLoaded(false);
      setImageFailed(true);
      return;
    }

    let cancelled = false;

    setImageLoaded(false);
    setImageFailed(false);

    const image = new Image();

    image.onload = () => {
      if (!cancelled) {
        setImageLoaded(true);
      }
    };

    image.onerror = () => {
      if (!cancelled) {
        setImageFailed(true);
      }
    };

    image.src = src;

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {imageLoaded && !imageFailed ? (
        <img
          src={src ?? ""}
          alt={alt}
          aria-hidden={alt === ""}
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#18053d,#0b6c75_55%,#04202a)] p-3 text-center ${fallbackClassName}`}
        >
          <span className="text-[15px] font-black italic leading-tight text-white">
            {fallbackTitle}
          </span>
        </div>
      )}
    </div>
  );
}
