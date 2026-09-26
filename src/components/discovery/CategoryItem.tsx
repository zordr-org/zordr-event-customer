import Link from "next/link";
import * as React from "react";
import {
  IconMusic,
  IconPalette,
  IconMonitor,
  IconTrophy,
  IconLightbulb,
  IconSmile,
  IconUtensils,
  IconBookOpen,
} from "@/components/ui/Icons";

interface CategoryItemProps {
  name: string;
  href?: string;
  icon?: string;
}

export function CategoryItem({ name, href = "#", icon }: CategoryItemProps) {
  let IconComponent = IconMusic;
  let bgClass = "bg-[var(--color-muted-background)]";
  let textClass = "text-[var(--color-foreground)]";

  const slug = name.toLowerCase();

  if (slug === "music") {
    IconComponent = IconMusic;
    bgClass = "bg-[var(--color-tag-music-bg)]";
    textClass = "text-[var(--color-tag-music)]";
  } else if (slug === "cultural") {
    IconComponent = IconPalette;
    bgClass = "bg-[var(--color-tag-cultural-bg)]";
    textClass = "text-[var(--color-tag-cultural)]";
  } else if (slug === "tech") {
    IconComponent = IconMonitor;
    bgClass = "bg-[var(--color-tag-tech-bg)]";
    textClass = "text-[var(--color-tag-tech)]";
  } else if (slug === "sports") {
    IconComponent = IconTrophy;
    bgClass = "bg-[var(--color-tag-sports-bg)]";
    textClass = "text-[var(--color-tag-sports)]";
  } else if (slug === "workshops") {
    IconComponent = IconLightbulb;
    bgClass = "bg-[var(--color-tag-workshops-bg)]";
    textClass = "text-[var(--color-tag-workshops)]";
  } else if (slug === "comedy") {
    IconComponent = IconSmile;
    bgClass = "bg-[var(--color-tag-comedy-bg)]";
    textClass = "text-[var(--color-tag-comedy)]";
  } else if (slug === "food") {
    IconComponent = IconUtensils;
    bgClass = "bg-[var(--color-tag-food-bg)]";
    textClass = "text-[var(--color-tag-food)]";
  } else if (slug === "literary") {
    IconComponent = IconBookOpen;
    bgClass = "bg-[var(--color-tag-literary-bg)]";
    textClass = "text-[var(--color-tag-literary)]";
  }

  return (
    <Link
      href={href}
      className={`
        group
        flex
        h-[58px]
        flex-col
        items-center
        justify-center
        gap-[3px]
        rounded-[9px]
        px-1
        ${bgClass}
        transition-transform
        duration-150
        hover:scale-[1.02]
      `}
    >
      <span className={textClass}>
        <IconComponent size={21} />
      </span>

      <span
        className={`
          text-[9px]
          font-semibold
          leading-[11px]
          ${textClass}
        `}
      >
        {name}
      </span>
    </Link>
  );
}
