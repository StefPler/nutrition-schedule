"use client";
import React from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  ScrollArea,
  Strong,
  Table,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { Category, FoodEntry } from "@/src/types/foods";
import { DaysEnum, Meal } from "@/src/types/period";
import { MealPortion } from "@/src/types/nutrition";
import clsx from "clsx";
import { ArrowLeftRight } from "lucide-react";
import { getAlternatives } from "../helpers/util";

const NewlineText = (text: string) =>
  text.split("\n").map((str, i) => (
    <Box className="pt-1 text-slate-600 text-sm" key={i}>
      - {str}
    </Box>
  ));

const greekNameToMeal = (meal: string): Meal => {
  switch (meal) {
    case "Πρωινό":
      return "breakfast";
    case "Μεσημεριανό":
      return "lunch";
    case "Βραδινό":
      return "dinner";
    case "Πρόγευμα":
      return "snack1";
    case "Απογευματινό":
      return "snack2";
    default:
      return "breakfast";
  }
};

export const WeeklyMealRow = ({
  meal,
  foods,
  currentDay,
  rowIndex = 0,
  callback,
  checkedMeals,
  onToggle,
  mealPortions,
}: {
  meal: string;
  foods: FoodEntry[];
  currentDay: number;
  rowIndex?: number;
  callback?: (meal: Meal, category: Category, index: number) => void;
  checkedMeals: Set<string>;
  onToggle: (key: string) => void;
  mealPortions?: Record<Meal, MealPortion> | null;
}) => {
  const mealKey = greekNameToMeal(meal);
  const isLastRow = meal === "Βραδινό";

  // Is this column index the current day?
  // foods[0] = Monday (day=1), foods[6] = Sunday (day=0)
  const isCurrentDay = (index: number) => (index + 1) % 7 === currentDay % 7;

  return (
    <Table.Row>
      {foods?.map((food, index) => {
        const cellKey = `${DaysEnum[(index + 1) % 7]}-${mealKey}`;
        const isChecked = checkedMeals.has(cellKey);
        const isToday = isCurrentDay(index);
        return (
          <Table.Cell
            key={index}
            className={clsx(
              "content-start align-top",
              index !== 6 && "border-r border-slate-200",
              !isLastRow && "border-b border-slate-200",
              isCurrentDay(index)
                ? "bg-emerald-50 hover:bg-emerald-100/80"
                : rowIndex % 2 === 0
                  ? "bg-slate-50 hover:bg-slate-100/80"
                  : "bg-white hover:bg-slate-50/60",
            )}>
            <div className="flex flex-col gap-1.5 py-1">
              {/* Meal name + swap button (original style) */}
              <Dialog.Root>
                <div className="flex items-center justify-between font-semibold text-slate-600 border-b border-dashed border-slate-300 pb-1.5">
                  <span className="text-sm">{meal}</span>
                  <Tooltip content="Πάτησε για εναλλακτικές">
                    <Dialog.Trigger>
                      <IconButton variant="soft" size="1">
                        <ArrowLeftRight width="14" height="14" />
                      </IconButton>
                    </Dialog.Trigger>
                  </Tooltip>
                </div>

                <Dialog.Content minWidth="360px" maxWidth="700px" className="bg-teal-100">
                  <Dialog.Title className="text-center">
                    Εναλλακτικά γεύματα για {meal.toLocaleLowerCase()}
                  </Dialog.Title>
                  <Dialog.Description className="flex flex-col gap-2">
                    <Text className="text-center">
                      Γεύματα τα οποία μπορούν να αντικαταστήσουν το σημερινό μενού προσφέροντας αντίστοιχη διατροφική
                      αξία με το αρχικό πλάνο.
                    </Text>
                    <Flex direction="row" gap="2" justify="between">
                      <Badge size="3">{DaysEnum[(index + 1) % 7]}</Badge>
                      <Badge size="3">{food.category.split("_").join(" ")}</Badge>
                    </Flex>
                  </Dialog.Description>
                  <ScrollArea type="auto" className="py-4">
                    <Flex direction="column" gap="3">
                      {getAlternatives(greekNameToMeal(meal), food.id, food.category).map((foodEntry, i) => (
                        <Card key={i} className="bg-yellow-100">
                          <Strong className="text-slate-600">Επιλογή {i + 2}</Strong>
                          <Text>{NewlineText(foodEntry.description)}</Text>
                        </Card>
                      ))}
                    </Flex>
                  </ScrollArea>
                  <Dialog.Close className="w-full">
                    <Button size="3">Ok!</Button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Root>

              {/* Checkbox + food name */}
              <div className="flex items-start gap-2">
                {isToday && (
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(cellKey)}
                    className="mt-0.5 w-[15px] h-[15px] accent-emerald-600 flex-shrink-0 cursor-pointer"
                  />
                )}
                <span
                  className={clsx(
                    "text-slate-700 font-medium text-sm leading-snug",
                    isChecked && "line-through text-slate-400",
                  )}>
                  {food.description.split("\n")[0]}
                </span>
              </div>

              {/* Macro info */}
              <span className="text-slate-400 text-xs pl-5">
                {mealPortions?.[mealKey]
                  ? `${mealPortions[mealKey].totalCalories} cal • ${Math.round(mealPortions[mealKey].totalProtein)}g P`
                  : "—"}
              </span>
            </div>
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
};
