"use client";
import { useGetSchedule } from "@/src/hooks/useGetSchedule";
import { Days, DaysEnum } from "@/src/types/period";
import { useMemo, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import clsx from "clsx";

const DAYS_ORDER: Days[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DAY_LABELS: Record<Days, string> = {
  Monday: "Δευτέρα",
  Tuesday: "Τρίτη",
  Wednesday: "Τετάρτη",
  Thursday: "Πέμπτη",
  Friday: "Παρασκευή",
  Saturday: "Σάββατο",
  Sunday: "Κυριακή",
};

// Mock macro values per meal type (placeholder until real per-recipe data is available)
const MOCK_MACROS = {
  breakfast: { calories: 450, protein: 12, carbs: 65, fat: 16 },
  lunch: { calories: 620, protein: 35, carbs: 55, fat: 22 },
  dinner: { calories: 520, protein: 38, carbs: 40, fat: 20 },
};

export const DailyMeals = () => {
  const { data: schedule, isLoading } = useGetSchedule();
  const [day, setDay] = useState<Days>(DaysEnum[new Date().getDay()] as Days);

  const breakfast = useMemo(() => schedule?.byDay[day].breakfast.recipe, [schedule, day]);
  const lunch = useMemo(() => schedule?.byDay[day].lunch.recipe, [schedule, day]);
  const dinner = useMemo(() => schedule?.byDay[day].dinner.recipe, [schedule, day]);

  return (
    <div className="w-full max-w-3xl mx-auto px-3 pb-6">
      {/* Day selector tabs
          – horizontal scroll on mobile, wrapping row on desktop */}
      <div className="overflow-x-auto md:overflow-x-visible mb-6">
        <div className="flex gap-2 min-w-max md:min-w-0 md:flex-wrap md:justify-center pb-1 px-1">
          {DAYS_ORDER.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap",
                d === day
                  ? "bg-gradient-to-r from-emerald-600 to-teal-400 text-white shadow-md"
                  : "bg-white/70 text-slate-600 border-slate-300 hover:border-emerald-400 hover:text-emerald-700",
              )}>
              {DAY_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      {/* Cards stacked vertically on both mobile and desktop */}
      <div className="flex flex-col gap-5">
        <RecipeCard
          isLoading={isLoading}
          meal="Πρωινό"
          name={breakfast?.name ?? ""}
          description={breakfast?.description ?? ""}
          ingredients={breakfast?.ingredients ?? []}
          execution={breakfast?.instructions ?? []}
          macros={MOCK_MACROS.breakfast}
        />
        <RecipeCard
          isLoading={isLoading}
          meal="Μεσημεριανό"
          name={lunch?.name ?? ""}
          description={lunch?.description ?? ""}
          ingredients={lunch?.ingredients ?? []}
          execution={lunch?.instructions ?? []}
          macros={MOCK_MACROS.lunch}
        />
        <RecipeCard
          isLoading={isLoading}
          meal="Βραδινό"
          name={dinner?.name ?? ""}
          description={dinner?.description ?? ""}
          ingredients={dinner?.ingredients ?? []}
          execution={dinner?.instructions ?? []}
          macros={MOCK_MACROS.dinner}
        />
      </div>
    </div>
  );
};
