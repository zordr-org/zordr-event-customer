import * as React from "react";
import { CategoryItem } from "./CategoryItem";

export interface EventCategory {
  name: string;
  href: string;
  icon?: string;
}

interface CategoryGridProps {
  categories: EventCategory[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {categories.slice(0, 8).map((category) => (
        <CategoryItem
          key={category.name}
          name={category.name}
          href={category.href}
          icon={category.icon}
        />
      ))}
    </div>
  );
}
