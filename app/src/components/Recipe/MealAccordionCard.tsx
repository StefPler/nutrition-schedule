"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Meal } from "@/src/types/period";
import { Recipe } from "@/src/types/foods";
import { MealPortion } from "@/src/types/nutrition";
import { MEAL_EMOJI, MEAL_LABELS, MEAL_SCHEDULE_TIMES } from "@/src/constants/recipePresentation";
import { MealEmojiBackdrop } from "./MealEmojiBackdrop";
import { MacroChipRow } from "./MacroChipRow";
import { IngredientsList } from "./IngredientsList";
import { ExecutionList } from "./ExecutionList";
import { WarningIndicator } from "./WarningIndicator";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

/**
 * One meal as a collapsible card. Always a white card; the active state is
 * signalled by a subtle cluster of cues — an emerald left-border accent, a
 * softly emerald-tinted elevation, and the large backdrop emoji settling in
 * from scale 1.15 → 1.0. The body reveals via a proper height animation
 * (see `.collapsible-content` in globals.css) rather than a pop-and-fade.
 *
 * The parent controls open/closed state so it can enforce "only one open at
 * a time" across the 5 cards.
 */
export const MealAccordionCard = ({
  meal,
  recipe,
  portion,
  open,
  onOpenChange,
}: {
  meal: Meal;
  recipe?: Recipe;
  portion?: MealPortion;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const emoji = MEAL_EMOJI[meal];
  const mealLabel = MEAL_LABELS[meal];
  const time = MEAL_SCHEDULE_TIMES[meal];
  const name = recipe?.name ?? "—";
  const warnings = portion?.warnings ?? [];

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={onOpenChange}
      className={clsx(
        "relative overflow-hidden rounded-[12px] bg-white",
        "border-l-[3px] transition-[border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none",
        open
          ? "border-emerald-500 shadow-[0_10px_28px_-12px_rgba(5,150,105,0.35),0_2px_6px_rgba(0,0,0,0.05)]"
          : "border-transparent shadow-[0_2px_6px_rgba(0,0,0,0.05)]",
      )}>
      <Collapsible.Trigger asChild>
        <button
          type="button"
          className="relative flex w-full items-center gap-2.5 overflow-hidden px-3.5 py-3 text-left">
          <MealEmojiBackdrop meal={meal} variant="mobile-accordion" active={open} />

          <span className="relative z-[1] text-2xl" aria-hidden="true">
            {emoji}
          </span>

          <div className="relative z-[1] min-w-0 flex-1">
            <div
              className={clsx(
                "text-[9px] font-bold uppercase tracking-[0.8px] transition-colors duration-300 ease-out motion-reduce:transition-none",
                open ? "text-emerald-600" : "text-slate-400",
              )}>
              {time} · {mealLabel}
            </div>
            <div className="mt-0.5 truncate text-[13px] font-bold text-slate-900">{name}</div>
          </div>

          <span
            className={clsx(
              "relative z-[1] flex-shrink-0 transition-[transform,color] duration-300 ease-out motion-reduce:transition-none",
              open ? "rotate-180 text-emerald-700" : "text-emerald-600",
            )}>
            <ChevronDown size={18} strokeWidth={2.5} />
          </span>

          {/* WarningIndicator is absolutely positioned inside this relative wrapper */}
          <WarningIndicator warnings={warnings} />
        </button>
      </Collapsible.Trigger>

      <Collapsible.Content className="collapsible-content">
        <div className="border-t border-slate-100 p-3.5">
          {!recipe && <p className="text-xs italic text-slate-400">Δεν υπάρχει συνταγή για αυτό το γεύμα</p>}

          {recipe && (
            <>
              {portion && (
                <div className="mb-3.5">
                  <MacroChipRow portion={portion} compact />
                </div>
              )}

              {recipe.ingredients.length > 0 && (
                <>
                  <h4 className="mb-1.5 mt-2.5 text-xs font-bold text-slate-900">Υλικά</h4>
                  <IngredientsList ingredients={recipe.ingredients} scaled={portion?.scaledIngredients} compact />
                </>
              )}

              {recipe.instructions.length > 0 && (
                <>
                  <h4 className="mb-1.5 mt-2.5 text-xs font-bold text-slate-900">Εκτέλεση</h4>
                  <ExecutionList steps={recipe.instructions} compact />
                </>
              )}
            </>
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
