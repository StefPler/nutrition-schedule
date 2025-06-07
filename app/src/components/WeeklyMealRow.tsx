"use client";
import React from "react";
import { Table } from "@radix-ui/themes";
import { Category, FoodEntry } from "@/src/types/foods";
import { Meal } from "@/src/types/period";
import clsx from "clsx";

const NewlineText = (text: string) => {
  const newText = text.split("\n").map((str, i) => (
    <p className="pt-1" key={i}>
      - {str}
    </p>
  ));

  return newText;
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
              "border-slate-400 content-start hover:bg-slate-200",
              index != 6 && "border-r-[1px]",
              meal != "Βραδινό" && "border-b-[1px]",
              index === currentDay - 1 &&
                "border-l-2 border-r-2 border-slate-400"
            )}
            key={index}>
            <p className="flex place-content-between font-semibold text-slate-600 border-b-[1px] border-slate-600 border-dashed pb-1">
              <span> {meal} </span>
              {/* <span
                className="hover:cursor-pointer"
                onClick={() => {
                  invokeIfFun("lunch", food.category, index);
                }}>
                Reroll
              </span> */}
            </p>
            {NewlineText(food.description)}
          </Table.Cell>
        ))}
      </Table.Row>
    </>
  );
};
