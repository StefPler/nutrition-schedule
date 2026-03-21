"use client";
import React, { useState } from "react";
import { Badge, Box, Button, Card, Dialog, Flex, ScrollArea, Strong, Text } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Circles } from "react-loader-spinner";
import { useGetSchedule } from "../hooks/useGetSchedule";
import { useDailyCheckins } from "../hooks/useDailyCheckins";
import { useMealPortions } from "../hooks/useMealPortions";
import { Days, DaysEnum, Meal } from "../types/period";
import { FoodEntry } from "../types/foods";
import { getAlternatives } from "../helpers/util";

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

const DAY_SHORT: Record<Days, string> = {
  Monday: "Δευ",
  Tuesday: "Τρι",
  Wednesday: "Τετ",
  Thursday: "Πεμ",
  Friday: "Παρ",
  Saturday: "Σαβ",
  Sunday: "Κυρ",
};

const MEAL_LABELS: Record<Meal, string> = {
  breakfast: "Πρωινό",
  snack1: "Πρόγευμα",
  lunch: "Μεσημεριανό",
  snack2: "Απογευματινό",
  dinner: "Βραδινό",
};

const MEAL_ORDER: Meal[] = ["breakfast", "snack1", "lunch", "snack2", "dinner"];

const NewlineText = ({ text }: { text: string }) => (
  <>
    {text.split("\n").map((str, i) => (
      <Box key={i} className="pt-0.5 text-slate-500 text-xs">
        • {str}
      </Box>
    ))}
  </>
);

const AlternativesDialog = ({ meal, food }: { meal: Meal; food: FoodEntry }) => {
  const alternatives = getAlternatives(meal, food.id, food.category);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap flex-shrink-0">
          Εναλλακτικές
        </button>
      </Dialog.Trigger>
      <Dialog.Content minWidth="340px" maxWidth="600px">
        <Dialog.Title className="text-center text-emerald-800">Εναλλακτικά γεύματα για {MEAL_LABELS[meal].toLowerCase()}</Dialog.Title>
        <Dialog.Description>
          <Text className="text-center text-sm text-slate-500 block">Γεύματα που μπορούν να αντικαταστήσουν το τρέχον μενού.</Text>
          <Badge size="2" variant="soft" className="mt-1">
            {food.category.split("_").join(" ")}
          </Badge>
        </Dialog.Description>
        <ScrollArea type="auto" style={{ maxHeight: 320 }} className="py-3">
          <Flex direction="column" gap="3">
            {alternatives.length === 0 ? (
              <Card className="bg-slate-50 border border-slate-200">
                <Text className="text-slate-500 text-sm text-center block py-2">
                  Δεν βρέθηκαν εναλλακτικά γεύματα για αυτήν την κατηγορία.
                </Text>
              </Card>
            ) : (
              alternatives.map((alt, i) => (
                <Card key={i} className="bg-emerald-50 border border-emerald-100">
                  <Strong className="text-emerald-700 text-sm">Επιλογή {i + 2}</Strong>
                  <NewlineText text={alt.description} />
                </Card>
              ))
            )}
          </Flex>
        </ScrollArea>
        <Dialog.Close className="w-full mt-2">
          <Button size="3" className="w-full">
            Ok!
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export const MobileWeeklySchedule = () => {
  const { data: weeklySchedule, isLoading } = useGetSchedule();
  const { checkedMeals, toggle: toggleMeal, todayDayName: todayDay } = useDailyCheckins();
  const [selectedDay, setSelectedDay] = useState<Days>(todayDay);
  const mealPortions = useMealPortions(selectedDay);

  const selectedIndex = DAYS_ORDER.indexOf(selectedDay);

  const goToPrev = () => {
    if (selectedIndex > 0) setSelectedDay(DAYS_ORDER[selectedIndex - 1]);
  };
  const goToNext = () => {
    if (selectedIndex < DAYS_ORDER.length - 1) setSelectedDay(DAYS_ORDER[selectedIndex + 1]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Circles height="40" width="40" color="#4fa94d" ariaLabel="circles-loading" visible />
        <Text className="font-semibold text-lg px-2">Τα γεύματα προετοιμάζονται</Text>
        <Circles height="40" width="40" color="#4fa94d" ariaLabel="circles-loading" visible />
      </div>
    );
  }

  if (!weeklySchedule?.byDay) return null;

  const dailyMeals = weeklySchedule.byDay[selectedDay];

  return (
    // Single unified card containing everything
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Day navigator – gradient header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-400 px-4 py-3">
        <button
          onClick={goToPrev}
          disabled={selectedIndex === 0}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 disabled:opacity-40 transition-colors"
          aria-label="Προηγούμενη μέρα">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <span className="font-bold text-lg text-white tracking-wide">{DAY_LABELS[selectedDay]}</span>
        <button
          onClick={goToNext}
          disabled={selectedIndex === DAYS_ORDER.length - 1}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 disabled:opacity-40 transition-colors"
          aria-label="Επόμενη μέρα">
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>

      {/* Day tabs */}
      <div className="flex border-b border-slate-100 px-1">
        {DAYS_ORDER.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={clsx(
              "flex-1 py-2.5 text-xs font-medium transition-colors",
              day === selectedDay
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : day === todayDay
                  ? "text-emerald-400 hover:text-emerald-600"
                  : "text-slate-400 hover:text-slate-600",
            )}>
            {DAY_SHORT[day]}
          </button>
        ))}
      </div>

      {/* Meal rows */}
      <div className="px-4">
        {MEAL_ORDER.map((meal, i) => {
          const food = dailyMeals?.[meal];
          if (!food) return null;
          const key = `${selectedDay}-${meal}`;
          const isChecked = checkedMeals.has(key);
          const isLast = i === MEAL_ORDER.length - 1;
          const isToday = selectedDay === todayDay;

          return (
            <div key={meal} className={clsx("flex items-center gap-3 py-3", !isLast && "border-b border-slate-100")}>
              {/* Checkbox – only shown for today */}
              {isToday && (
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleMeal(key)}
                  className="w-[18px] h-[18px] rounded border-2 border-slate-300 accent-emerald-600 flex-shrink-0 cursor-pointer"
                />
              )}

              {/* Meal info */}
              <div className={clsx("flex-1 min-w-0", isChecked && "opacity-50")}>
                <span className="text-emerald-600 font-bold text-xs uppercase tracking-wide block leading-tight">
                  {MEAL_LABELS[meal]}
                </span>
                <span
                  className={clsx(
                    "text-slate-700 font-medium text-sm block mt-0.5 leading-snug",
                    isChecked && "line-through",
                  )}>
                  {food.recipe?.name ?? food.description}
                </span>
                <span className="text-slate-400 text-xs block mt-0.5">
                  {mealPortions?.[meal]
                    ? `${mealPortions[meal].totalCalories} cal • ${Math.round(mealPortions[meal].totalProtein)}g P • ${Math.round(mealPortions[meal].totalCarbs)}g C • ${Math.round(mealPortions[meal].totalFat)}g F • ${Math.round(mealPortions[meal].totalFiber)}g Fiber`
                    : "—"}
                </span>
              </div>

              {/* Alternatives button */}
              <AlternativesDialog meal={meal} food={food} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
