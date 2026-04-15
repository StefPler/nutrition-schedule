"use client";
import { Ingredient, ScaledIngredient } from "@/src/types/nutrition";
import { ingredientParts } from "@/src/helpers/util";
import {
  INGREDIENT_ICONS,
  MOCK_INGREDIENT_PRICE_LABEL,
} from "@/src/constants/recipePresentation";
import clsx from "clsx";

/**
 * Stacked ingredient rows:
 *   [optional icon] [name + amount] [price placeholder]
 *
 * Accepts the raw `ingredients` (for `macroKey` → icon lookup) plus an
 * optional array of matching `ScaledIngredient`s (for amount after scaling).
 * Pairs are matched by index — same order `useMealPortions` produces them.
 *
 * If scaled is omitted, raw amounts are shown. Missing icons collapse their
 * slot (no blank gap). Prices are a fixed placeholder.
 *
 * `compact` reduces padding/font for the mobile accordion body.
 */
export const IngredientsList = ({
  ingredients,
  scaled,
  compact = false,
}: {
  ingredients: Ingredient[];
  scaled?: ScaledIngredient[];
  compact?: boolean;
}) => {
  return (
    <ul className="space-y-1.5">
      {ingredients.map((raw, idx) => {
        const source: Ingredient | ScaledIngredient = scaled?.[idx] ?? raw;
        const { name, amount } = ingredientParts(source);
        const icon = INGREDIENT_ICONS[raw.macroKey];
        return (
          <li
            key={idx}
            className={clsx(
              "flex items-center rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
              compact ? "px-2.5 py-1.5" : "px-3 py-2.5",
            )}>
            {icon && (
              <span
                className={clsx(
                  "flex-shrink-0",
                  compact ? "w-[22px] text-base" : "w-[28px] text-xl",
                )}>
                {icon}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div
                className={clsx(
                  "font-semibold text-slate-900 truncate",
                  compact ? "text-[11px]" : "text-[12.5px]",
                )}>
                {name}
              </div>
              <div
                className={clsx(
                  "text-slate-400 mt-0.5",
                  compact ? "text-[10px]" : "text-[11px]",
                )}>
                {amount}
              </div>
            </div>
            <span
              className={clsx(
                "flex-shrink-0 font-semibold text-slate-500 tabular-nums",
                compact ? "text-[11px]" : "text-xs",
              )}>
              {MOCK_INGREDIENT_PRICE_LABEL}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
