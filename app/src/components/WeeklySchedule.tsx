"use client";
import React, { useState } from "react";
import { Table } from "@radix-ui/themes";
// import { useSchedule } from "@/src/hooks/useSchedule";
import { WeeklyMealRow } from "./WeeklyMealRow";
import { Circles } from "react-loader-spinner";
import { DaysEnum } from "../types/period";
import { useGetSchedule } from "../hooks/useGetSchedule";
import clsx from "clsx";

export const WeeklySchedule = () => {
  const { data: weeklySchedule, isLoading } = useGetSchedule();
  // const { rerollMeal } = useSchedule();
  const [day, setDay] = useState(new Date().getDay());

  const highlightDay = (selection: DaysEnum) => {
    return selection === day ? "bg-slate-200 rounded-md" : "";
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Circles
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className="font-semibold text-lg px-2">
          {" "}
          Τα γεύματα προετοιμάζονται{" "}
        </p>{" "}
        <Circles
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );

  return (
    weeklySchedule?.byRow && (
      <div className="">
        <Table.Root className="border-2 rounded-xl border-slate-500 border-separate bg-transparent">
          <Table.Header className="">
            <Table.Row className="">
              {/* <TableHead className="font-bold border-r-[1px] border-slate-400">Γεύματα</TableHead> */}
              <Table.RowHeaderCell
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Monday)
                }>
                Δευτέρα
              </Table.RowHeaderCell>
              <Table.RowHeaderCell
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Tuesday)
                }>
                Τρίτη
              </Table.RowHeaderCell>
              <Table.RowHeaderCell
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Wednesday)
                }>
                Τετάρτη
              </Table.RowHeaderCell>
              <Table.RowHeaderCell
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Thursday)
                }>
                Πέμπτη
              </Table.RowHeaderCell>
              <Table.RowHeaderCell
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Friday)
                }>
                Παρασκευή
              </Table.RowHeaderCell>
              <Table.RowHeaderCell
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Saturday)
                }>
                Σάββατο
              </Table.RowHeaderCell>
              <Table.RowHeaderCell
                className={
                  "border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Sunday)
                }>
                Κυριακή
              </Table.RowHeaderCell>
              {/* <TableHead className="text-right">Amount</TableHead> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <WeeklyMealRow
              meal="Πρωινό"
              foods={weeklySchedule.byRow.breakfast}
            />
            <WeeklyMealRow
              meal="Πρόγευμα"
              foods={weeklySchedule.byRow.snack1}
            />
            <WeeklyMealRow
              meal="Μεσημεριανό"
              foods={weeklySchedule.byRow.lunch}
              // callback={rerollMeal}
            />
            <WeeklyMealRow
              meal="Απογευματινό"
              foods={weeklySchedule.byRow.snack2}
            />
            <WeeklyMealRow meal="Βραδινό" foods={weeklySchedule.byRow.dinner} />
          </Table.Body>
        </Table.Root>
      </div>
    )
  );
};
