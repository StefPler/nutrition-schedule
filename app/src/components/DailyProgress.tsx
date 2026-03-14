"use client";
import React from "react";
import { useStorage } from "../hooks/useStorage";
import { useDailyCheckins } from "../hooks/useDailyCheckins";
import { UserProfile as UserProfileT } from "../types/userProfile";
import { macroCalculator } from "../services/CalculatorService";
import { Meal } from "../types/period";

const MEAL_MACROS: Record<Meal, { cal: number; protein: number; carbs: number; fat: number }> = {
  breakfast: { cal: 350, protein: 12, carbs: 55, fat: 8 },
  snack1: { cal: 200, protein: 6, carbs: 20, fat: 12 },
  lunch: { cal: 450, protein: 35, carbs: 30, fat: 18 },
  snack2: { cal: 180, protein: 5, carbs: 15, fat: 12 },
  dinner: { cal: 520, protein: 38, carbs: 40, fat: 22 },
};

const MEAL_KEYS: Meal[] = ["breakfast", "snack1", "lunch", "snack2", "dinner"];

const ProgressBar = ({
  label,
  consumed,
  goal,
  color,
}: {
  label: string;
  consumed: number;
  goal: number;
  color: string;
}) => {
  const pct = goal > 0 ? Math.round((consumed / goal) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-500 text-xs w-16 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-slate-400 text-xs w-10 text-right flex-shrink-0">{pct}%</span>
    </div>
  );
};

export const DailyProgress = () => {
  const {
    getItem: { data: userProfile, isLoading },
  } = useStorage<UserProfileT>("userProfile");
  const { checkedMeals, todayDayName } = useDailyCheckins();

  if (isLoading) return null;

  if (!userProfile) {
    return <p className="text-slate-400 text-xs mt-2">Συμπληρώστε το προφίλ σας για να δείτε την πρόοδό σας</p>;
  }

  const macros = macroCalculator(userProfile);

  const consumed = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  for (const meal of MEAL_KEYS) {
    const key = `${todayDayName}-${meal}`;
    if (checkedMeals.has(key)) {
      consumed.cal += MEAL_MACROS[meal].cal;
      consumed.protein += MEAL_MACROS[meal].protein;
      consumed.carbs += MEAL_MACROS[meal].carbs;
      consumed.fat += MEAL_MACROS[meal].fat;
    }
  }

  return (
    <div className="mt-3 flex flex-col gap-1.5">
      <ProgressBar label="Θερμίδες" consumed={consumed.cal} goal={macros.dailyCalories} color="bg-emerald-500" />
      <ProgressBar label="Πρωτεΐνη" consumed={consumed.protein} goal={macros.protein} color="bg-blue-400" />
      <ProgressBar label="Υδατάνθρ." consumed={consumed.carbs} goal={macros.carbs} color="bg-purple-400" />
      <ProgressBar label="Λιπαρά" consumed={consumed.fat} goal={macros.fat} color="bg-orange-400" />
    </div>
  );
};
