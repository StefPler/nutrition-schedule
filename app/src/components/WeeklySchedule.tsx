"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
// import { useSchedule } from "@/src/hooks/useSchedule";
import { WeeklyMealRow } from "./WeeklyMealRow";
import { Circles } from "react-loader-spinner";
import { DaysEnum } from "../types/period";
import { useGetSchedule } from "../hooks/useGetSchedule";

export const WeeklySchedule = () => {
  const { data: weeklySchedule, isLoading } = useGetSchedule();
  // const { rerollMeal } = useSchedule();
  const [day, setDay] = useState(new Date().getDay());

  const highlightDay = (selection: DaysEnum) => {
    return selection === day ? "bg-slate-400 text-white rounded-md" : "";
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
        <Table className="border-2 rounded-xl border-black border-separate">
          <TableCaption>Γίνε η δική σου κινητήρια δύναμη.</TableCaption>

          <TableHeader className="">
            <TableRow className="">
              {/* <TableHead className="font-bold border-r-[1px] border-slate-400">Γεύματα</TableHead> */}
              <TableHead
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Monday)
                }>
                Δευτέρα
              </TableHead>
              <TableHead
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Tuesday)
                }>
                Τρίτη
              </TableHead>
              <TableHead
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Wednesday)
                }>
                Τετάρτη
              </TableHead>
              <TableHead
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Thursday)
                }>
                Πέμπτη
              </TableHead>
              <TableHead
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Friday)
                }>
                Παρασκευή
              </TableHead>
              <TableHead
                className={
                  "border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Saturday)
                }>
                Σάββατο
              </TableHead>
              <TableHead
                className={
                  "border-b-[1px] border-slate-400 text-center text-lg " +
                  highlightDay(DaysEnum.Sunday)
                }>
                Κυριακή
              </TableHead>
              {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
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
          </TableBody>
        </Table>
      </div>
    )
  );
};
