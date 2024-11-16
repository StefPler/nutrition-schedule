"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSchedule } from "@/src/hooks/useSchedule";
import { WeeklyMealRow } from "./WeeklyMealRow";
import { Circles } from "react-loader-spinner";

export const WeeklySchedule = () => {
  const { weeklyScheduleRows, rerollMeal } = useSchedule();

  if (!weeklyScheduleRows)
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
    <div className="">
      <Table className="border-2 rounded-xl border-black border-separate">
        <TableCaption>Be your own driving force.</TableCaption>

        <TableHeader className="">
          <TableRow className="">
            {/* <TableHead className="font-bold border-r-[1px] border-slate-400">Γεύματα</TableHead> */}
            <TableHead className="border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg">
              Δευτέρα
            </TableHead>
            <TableHead className="border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg">
              Τρίτη
            </TableHead>
            <TableHead className="border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg">
              Τετάρτη
            </TableHead>
            <TableHead className="border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg">
              Πέμπτη
            </TableHead>
            <TableHead className="border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg">
              Παρασκευή
            </TableHead>
            <TableHead className="border-r-[1px] border-b-[1px] border-slate-400 text-center text-lg">
              Σάββατο
            </TableHead>
            <TableHead className="border-b-[1px] border-slate-400 text-center text-lg">
              Κυριακή
            </TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          <WeeklyMealRow meal="Πρωινό" foods={weeklyScheduleRows?.breakfast!} />
          <WeeklyMealRow meal="Πρόγευμα" foods={weeklyScheduleRows?.snack1!} />
          <WeeklyMealRow
            meal="Μεσημεριανό"
            foods={weeklyScheduleRows?.lunch!}
            callback={rerollMeal}
          />
          <WeeklyMealRow
            meal="Απογευματινό"
            foods={weeklyScheduleRows?.snack2!}
          />
          <WeeklyMealRow meal="Βραδινό" foods={weeklyScheduleRows?.dinner!} />
        </TableBody>
      </Table>
    </div>
  );
};
