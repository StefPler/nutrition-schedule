"use client";
import { Box, Card, Inset, Skeleton, Text } from "@radix-ui/themes";
import { Clock } from "lucide-react";
import { Ingredient, MealPortion } from "@/src/types/nutrition";
import { ingredientLabel } from "@/src/helpers/util";

type MacroData = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

const MACRO_ICONS: Record<keyof MacroData, string> = {
  calories: "🔥 ",
  protein: "🥩 ",
  carbs: "🌾 ",
  fat: "💧 ",
  fiber: "🌿 ",
};

const MACRO_LABELS: Record<keyof MacroData, string> = {
  calories: " cal",
  protein: "g protein",
  carbs: "g carbs",
  fat: "g fat",
  fiber: "g fiber",
};

export const RecipeCard = ({
  isLoading,
  meal,
  name,
  description: _description,
  ingredients,
  execution,
  preparationTime = 20,
  mealPortion,
}: {
  isLoading: boolean;
  meal: string;
  name: string;
  description: string;
  badges?: string[];
  ingredients: Ingredient[];
  execution: string[];
  preparationTime?: number;
  mealPortion?: MealPortion;
}) => {
  const macros: MacroData | undefined = mealPortion
    ? {
        calories: mealPortion.totalCalories,
        protein: Math.round(mealPortion.totalProtein),
        carbs: Math.round(mealPortion.totalCarbs),
        fat: Math.round(mealPortion.totalFat),
        fiber: Math.round(mealPortion.totalFiber),
      }
    : undefined;

  return (
    <Box className="w-full">
      <Card size="2" className="shadow-md overflow-hidden">
        {/* Gradient header */}
        <Inset clip="padding-box" side="top" pb="current">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-400 px-5 py-4 flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80 block">{meal}</span>
              <Skeleton className="rounded-xl" loading={isLoading}>
                <p className="font-bold text-xl text-white mt-0.5 leading-snug">{name || "..."}</p>
              </Skeleton>
            </div>
            <div className="flex items-center self-center gap-1.5 text-white/90 text-sm flex-shrink-0 mt-1">
              <Clock size={14} />
              <span>{preparationTime} min</span>
            </div>
          </div>
        </Inset>

        {/* Card body */}
        <div className="px-5 pt-4 pb-5">
          {/* Missing recipe message */}
          {!isLoading && !name && (
            <Text size="3" className="text-slate-400 italic block mb-3">
              Δεν βρέθηκε συνταγή για το {meal.toLocaleLowerCase()}
            </Text>
          )}

          {/* Macro badges */}
          {macros && (
            <div className="flex flex-wrap gap-2 mb-4">
              {(Object.keys(macros) as (keyof MacroData)[]).map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {MACRO_ICONS[key]}
                  {macros[key]}
                  {MACRO_LABELS[key]}
                </span>
              ))}
            </div>
          )}

          {/* Warnings */}
          {mealPortion && mealPortion.warnings.length > 0 && (
            <div className="mb-4 space-y-1">
              {mealPortion.warnings.map((w, i) => (
                <p key={i} className="text-amber-600 text-xs bg-amber-50 px-3 py-1.5 rounded-lg">
                  ⚠️ {w}
                </p>
              ))}
            </div>
          )}

          {/* Ingredients + Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div>
              <Skeleton loading={isLoading} height="18px" width="80px" className="mb-2 rounded-xl">
                <p className="font-bold text-slate-700 text-sm mb-2">Υλικά</p>
              </Skeleton>
              <Skeleton loading={isLoading} height="120px" className="rounded-xl">
                <ol className="space-y-1">
                  {ingredients?.map((ing, idx) => {
                    const ingredient = mealPortion?.scaledIngredients[idx] ?? ing;
                    return (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0 font-bold text-base leading-none">
                          •
                        </span>
                        <span className="text-slate-600 text-sm">{ingredientLabel(ingredient)}</span>
                      </li>
                    );
                  })}
                </ol>
              </Skeleton>
            </div>

            {/* Instructions */}
            <div>
              <Skeleton loading={isLoading} height="18px" width="80px" className="mb-2 rounded-xl">
                <p className="font-bold text-slate-700 text-sm mb-2">Εκτέλεση</p>
              </Skeleton>
              <Skeleton loading={isLoading} height="120px" className="rounded-xl">
                <ol className="space-y-2">
                  {execution?.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-600 text-sm leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </Skeleton>
            </div>
          </div>
        </div>
      </Card>
    </Box>
  );
};
