"use client";
import { MealPortion } from "@/src/types/nutrition";
import clsx from "clsx";

type MacroKey = "calories" | "protein" | "carbs" | "fat" | "fiber";

const MACRO_ORDER: MacroKey[] = ["calories", "protein", "carbs", "fat", "fiber"];

const MACRO_META: Record<MacroKey, { icon: string; suffix: string; full: string; classes: string }> = {
  calories: {
    icon: "🔥",
    suffix: "cal",
    full: "cal",
    classes: "bg-red-50 text-red-600 border-red-200",
  },
  protein: {
    icon: "🥩",
    suffix: "g",
    full: "g protein",
    classes: "bg-pink-50 text-pink-600 border-pink-200",
  },
  carbs: {
    icon: "🌾",
    suffix: "g",
    full: "g carbs",
    classes: "bg-amber-50 text-amber-600 border-amber-200",
  },
  fat: {
    icon: "💧",
    suffix: "g",
    full: "g fat",
    classes: "bg-blue-50 text-blue-600 border-blue-200",
  },
  fiber: {
    icon: "🌿",
    suffix: "g",
    full: "g fiber",
    classes: "bg-green-50 text-green-600 border-green-200",
  },
};

const macroValue = (portion: MealPortion, key: MacroKey): number => {
  switch (key) {
    case "calories": return Math.round(portion.totalCalories);
    case "protein":  return Math.round(portion.totalProtein);
    case "carbs":    return Math.round(portion.totalCarbs);
    case "fat":      return Math.round(portion.totalFat);
    case "fiber":    return Math.round(portion.totalFiber);
  }
};

/**
 * 5 color-coded macro pills. `compact` drops the descriptive word ("protein",
 * "carbs", …) and shrinks padding/font so the row fits in the mobile accordion.
 */
export const MacroChipRow = ({
  portion,
  compact = false,
}: {
  portion: MealPortion;
  compact?: boolean;
}) => {
  return (
    <div className={clsx("flex flex-wrap", compact ? "gap-1.5" : "gap-2.5")}>
      {MACRO_ORDER.map((key) => {
        const meta = MACRO_META[key];
        const value = macroValue(portion, key);
        return (
          <span
            key={key}
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-full font-semibold border",
              meta.classes,
              compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
            )}>
            <span>{meta.icon}</span>
            <span>
              {value}
              {compact ? meta.suffix : meta.full}
            </span>
          </span>
        );
      })}
    </div>
  );
};
