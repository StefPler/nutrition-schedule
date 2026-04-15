"use client";
import { Category } from "@/src/types/foods";
import { DEFAULT_PREP_TIME_MIN, RECIPE_CATEGORY_LABELS } from "@/src/constants/recipePresentation";

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/95">
    {children}
  </span>
);

/**
 * Three small pills under the hero title:
 *  - prep time (fixed default — no real data yet)
 *  - time-of-day for the selected meal slot
 *  - recipe category (Greek label)
 *
 * Any missing input hides its pill — the row never shows `undefined`.
 */
export const MealMetaRow = ({
  timeOfDay,
  category,
  prepTimeMin = DEFAULT_PREP_TIME_MIN,
}: {
  timeOfDay?: string;
  category?: Category;
  prepTimeMin?: number;
}) => {
  const categoryLabel = category ? RECIPE_CATEGORY_LABELS[category] : undefined;

  return (
    <div className="relative z-[1] flex flex-wrap gap-3">
      {prepTimeMin != null && <Chip>⏱️ {prepTimeMin} min</Chip>}
      {timeOfDay && <Chip>🕐 {timeOfDay}</Chip>}
      {categoryLabel && <Chip>🏷️ {categoryLabel}</Chip>}
    </div>
  );
};
