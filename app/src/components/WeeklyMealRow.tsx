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
import clsx from "clsx";
import { ArrowLeftRight } from "lucide-react";
import { getAlternatives } from "../helpers/util";

const NewlineText = (text: string) => {
  const newText = text.split("\n").map((str, i) => (
    <Box className="pt-1" key={i}>
      - {str}
    </Box>
  ));

  return newText;
};

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
      return "breakfast"; // Default case if no match found
  }
};

export const WeeklyMealRow = ({
  meal,
  foods,
  currentDay,
  callback,
}: {
  meal: string;
  foods: FoodEntry[];
  currentDay: number;
  callback?: (meal: Meal, category: Category, index: number) => void;
}) => {
  const invokeIfFun = (meal: Meal, category: Category, index: number) => {
    if (typeof callback === "function") {
      callback(meal, category, index);
    }
  };
  return (
    <>
      <Table.Row className="border-slate-400">
        {/* <TableCell className="text-left font-bold text-slate-700 border-r-[1px] border-slate-400">
          {meal}
        </TableCell> */}
        {foods?.map((food, index) => (
          <Table.Cell
            className={clsx(
              "border-slate-400 content-start hover:bg-slate-200/50",
              index != 6 && "border-r-[1px]",
              meal != "Βραδινό" && "border-b-[1px]"
              // index === currentDay - 1 &&
              //   "border-l-2 border-r-2 border-slate-400"
            )}
            key={index}>
            <div className="flex place-content-between items-center font-semibold text-slate-600 border-b-[1px] border-slate-600 border-dashed pb-1">
              <Text className=""> {meal} </Text>
              <Dialog.Root>
                <Tooltip content="Πάτησε για εναλλακτικές">
                  <Dialog.Trigger>
                    <IconButton variant="soft">
                      <ArrowLeftRight width="16" height="16" />
                    </IconButton>
                  </Dialog.Trigger>
                </Tooltip>
                <Dialog.Content minWidth="360px" maxWidth="700px" className="bg-teal-100">
                  <Dialog.Title className="text-center">
                    Εναλλακτικά γεύματα για {meal.toLocaleLowerCase()}
                  </Dialog.Title>
                  <Dialog.Description className="flex flex-col">
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
                    <Flex direction={"column"} gap="3">
                      {getAlternatives(greekNameToMeal(meal), food.id, food.category).map((foodEntry, index) => (
                        <Card key={index} className="bg-yellow-100">
                          <Strong className="text-slate-600">Επιλογή {index + 2}</Strong>
                          <Text>{NewlineText(foodEntry.description)}</Text>
                        </Card>
                      ))}
                    </Flex>
                  </ScrollArea>
                  <Dialog.Close className="w-full">
                    <Button size="3">
                      <Text>Ok!</Text>
                    </Button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Root>

              {/* <span
                className="hover:cursor-pointer"
                onClick={() => {
                  invokeIfFun("lunch", food.category, index);
                }}>
                Reroll
              </span> */}
            </div>
            {NewlineText(food.description)}
          </Table.Cell>
        ))}
      </Table.Row>
    </>
  );
};
