"use client";
import { useEffect, useState } from "react";
import { Meal, Days } from "@/src/types/period";
import { Recipe } from "@/src/types/foods";
import { MealPortion } from "@/src/types/nutrition";
import { Skeleton } from "@radix-ui/themes";
import clsx from "clsx";
import { RecipeHero } from "./RecipeHero";
import { MacroChipRow } from "./MacroChipRow";
import { IngredientsList } from "./IngredientsList";
import { ExecutionList } from "./ExecutionList";
import type { MealSlot } from "./RecipesPage";

/**
 * Desktop shell: a single full-width column with the hero at top (which
 * carries its own meal filmstrip for navigation), the active meal's macro
 * chips below, and a 2-column ingredients/execution grid at the bottom.
 * Owns `selectedMeal` state. Resets to breakfast whenever `selectedDay`
 * changes so switching days lands on a predictable hero.
 */
export const RecipesDesktopView = ({
  selectedDay,
  meals,
  portions,
  isLoading,
}: {
  selectedDay: Days;
  meals: MealSlot[];
  portions?: Record<Meal, MealPortion>;
  isLoading: boolean;
}) => {
  const [selectedMeal, setSelectedMeal] = useState<Meal>("breakfast");

  useEffect(() => {
    setSelectedMeal("breakfast");
  }, [selectedDay]);

  const selectedRecipe: Recipe | undefined = meals.find((m) => m.meal === selectedMeal)?.recipe;
  const selectedPortion = portions?.[selectedMeal];

  if (isLoading) {
    return (
      <div className="hidden md:block space-y-5">
        <Skeleton className="rounded-[18px] h-[320px]" />
        <div className="flex gap-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="rounded-full h-8 w-[86px]" />
          ))}
        </div>
        <div className="grid grid-cols-[1fr_1.25fr] gap-8">
          <Skeleton className="rounded-xl h-[280px]" />
          <Skeleton className="rounded-xl h-[280px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block space-y-5">
      <RecipeHero meal={selectedMeal} recipe={selectedRecipe} portion={selectedPortion} onSelectMeal={setSelectedMeal} />

      {selectedPortion && <MacroChipRow portion={selectedPortion} />}

      {selectedRecipe && (
        <div
          className={clsx(
            "grid gap-8 pt-1",
            selectedRecipe.instructions.length > 0 ? "grid-cols-[1fr_1.25fr]" : "grid-cols-1",
          )}>
          <div>
            <h3 className="mb-3 text-sm font-bold text-slate-900">Υλικά</h3>
            <IngredientsList ingredients={selectedRecipe.ingredients} scaled={selectedPortion?.scaledIngredients} />
          </div>
          {selectedRecipe.instructions.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-bold text-slate-900">Εκτέλεση</h3>
              <ExecutionList steps={selectedRecipe.instructions} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
