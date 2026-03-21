"use client";
import React, { useState } from "react";
import { Table, Text } from "@radix-ui/themes";
import { WeeklyMealRow } from "./WeeklyMealRow";
import { MobileWeeklySchedule } from "./MobileWeeklySchedule";
import { Circles } from "react-loader-spinner";
import { DaysEnum } from "../types/period";
import { useGetSchedule } from "../hooks/useGetSchedule";
import { useDailyCheckins } from "../hooks/useDailyCheckins";
import { useAllDayPortions } from "../hooks/useMealPortions";
import clsx from "clsx";

// Header cell shared styles
const headerCell = (isCurrentDay: boolean) =>
  clsx(
    "text-center text-sm font-bold text-white py-3 border-r border-white/20 last:border-r-0",
    isCurrentDay
      ? "bg-white/20" // subtle highlight on current day header
      : "bg-transparent",
  );

export const WeeklySchedule = () => {
  const { data: weeklySchedule, isLoading } = useGetSchedule();
  const [day] = useState(new Date().getDay());
  const { checkedMeals, toggle, todayDayName } = useDailyCheckins();
  const allDayPortions = useAllDayPortions();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Circles height="40" width="40" color="#4fa94d" ariaLabel="circles-loading" visible />
        <Text align="center" className="font-semibold text-lg px-2">
          Τα γεύματα προετοιμάζονται
        </Text>
        <Circles height="40" width="40" color="#4fa94d" ariaLabel="circles-loading" visible />
      </div>
    );

  if (!weeklySchedule) return null;

  return (
    <>
      {/* Mobile card view */}
      <div className="md:hidden mx-4 pb-4">
        <MobileWeeklySchedule />
      </div>

      {/* Desktop table */}
      {weeklySchedule.byRow && (
        <div className="hidden md:block pb-6">
          {/* White card wrapper */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
            <Table.Root layout="auto" variant="ghost" className="w-full">
              <Table.Header>
                {/* Gradient header row */}
                <Table.Row className="bg-gradient-to-r from-emerald-600 to-teal-400">
                  <Table.RowHeaderCell className={headerCell(day === DaysEnum.Monday)}>Δευτέρα</Table.RowHeaderCell>
                  <Table.RowHeaderCell className={headerCell(day === DaysEnum.Tuesday)}>Τρίτη</Table.RowHeaderCell>
                  <Table.RowHeaderCell className={headerCell(day === DaysEnum.Wednesday)}>Τετάρτη</Table.RowHeaderCell>
                  <Table.RowHeaderCell className={headerCell(day === DaysEnum.Thursday)}>Πέμπτη</Table.RowHeaderCell>
                  <Table.RowHeaderCell className={headerCell(day === DaysEnum.Friday)}>Παρασκευή</Table.RowHeaderCell>
                  <Table.RowHeaderCell className={headerCell(day === DaysEnum.Saturday)}>Σάββατο</Table.RowHeaderCell>
                  <Table.RowHeaderCell className={headerCell(day === DaysEnum.Sunday)}>Κυριακή</Table.RowHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <WeeklyMealRow
                  meal="Πρωινό"
                  foods={weeklySchedule.byRow.breakfast}
                  currentDay={day}
                  rowIndex={0}
                  checkedMeals={checkedMeals}
                  onToggle={toggle}
                  allDayPortions={allDayPortions}
                />
                <WeeklyMealRow
                  meal="Πρόγευμα"
                  foods={weeklySchedule.byRow.snack1}
                  currentDay={day}
                  rowIndex={1}
                  checkedMeals={checkedMeals}
                  onToggle={toggle}
                  allDayPortions={allDayPortions}
                />
                <WeeklyMealRow
                  meal="Μεσημεριανό"
                  foods={weeklySchedule.byRow.lunch}
                  currentDay={day}
                  rowIndex={2}
                  checkedMeals={checkedMeals}
                  onToggle={toggle}
                  allDayPortions={allDayPortions}
                />
                <WeeklyMealRow
                  meal="Απογευματινό"
                  foods={weeklySchedule.byRow.snack2}
                  currentDay={day}
                  rowIndex={3}
                  checkedMeals={checkedMeals}
                  onToggle={toggle}
                  allDayPortions={allDayPortions}
                />
                <WeeklyMealRow
                  meal="Βραδινό"
                  foods={weeklySchedule.byRow.dinner}
                  currentDay={day}
                  rowIndex={4}
                  checkedMeals={checkedMeals}
                  onToggle={toggle}
                  allDayPortions={allDayPortions}
                />
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      )}
    </>
  );
};
