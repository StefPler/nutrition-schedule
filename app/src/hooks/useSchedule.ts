import React, { useEffect, useState } from "react";
import { Meal, WeeklySchedule, WeeklyScheduleRows } from "@/src/types/period";
import { createWeeklySchedule } from "@/src/services/MealService";
import axios from "axios";
import { Category } from "@/src/types/foods";
import { pickRandomFoodFromCategory, scheduleToRows } from "@/src/helpers/util";

export const useSchedule = () => {
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule | null>(
    null
  );
  const [weeklyScheduleRows, setWeeklyScheduleRows] =
    useState<WeeklyScheduleRows | null>(null);

  useEffect(() => {
    console.log("useSchedule run");
    getWeeklySchedule().then(({ scheduleByDay, scheduleByRow }) => {
      console.log("shecduleInRows", scheduleByRow);
      setWeeklyScheduleRows(scheduleByRow);
    });
  }, []);

  const rerollMeal = (meal: Meal, category: Category, index: number) => {
    console.log("we be rollin", meal, category, index);
    const newFood = pickRandomFoodFromCategory(meal, category);
    console.log("we be getting", newFood);
    setWeeklyScheduleRows((prev) => ({
      ...prev!,
      [meal]: prev![meal].map((food, fIndex) =>
        index === fIndex ? newFood : food
      ),
    }));
  };

  const calculateNextBoundary = () => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const numOfDaysToAdd = day === 0 ? 1 : 8 - day;
    console.log("numberOfDaysToAdd", numOfDaysToAdd);
    console.log("day", day);
    const nextBoundary = new Date(
      currentDate.valueOf() + numOfDaysToAdd * 24 * 60 * 60 * 1000
    );

    console.log("current date", currentDate);
    console.log("nextBoundary", nextBoundary);
    return nextBoundary;
  };

  const getWeeklySchedule = async () => {
    let scheduleByDay: WeeklySchedule | null = null;
    let scheduleByRow: WeeklyScheduleRows;
    // 1. check if schedule exists for the current running period
    // e.g: save in redis a hash for current active period ending in 26th of May

    // ------ Uncoment for local dev ------
    scheduleByDay = createWeeklySchedule();
    scheduleByRow = scheduleToRows(scheduleByDay);
    return { scheduleByDay, scheduleByRow };
    // ------------------------------------
    const now = new Date();
    const activePeriodRes = await axios.get("/api/active/period");
    const activePeriod = activePeriodRes.data.period;

    // 2. If no match is found in redis (first time creating or previous period ended)
    // we generate a new schedule
    // 2.a. We persist the new schedule in redis under a hash

    if (!activePeriod) {
      scheduleByDay = createWeeklySchedule();
      scheduleByRow = scheduleToRows(scheduleByDay);
      await axios.post("/api/active/schedule", { schedule: scheduleByRow });
      const newBoundary = calculateNextBoundary();
      await axios.post("/api/active/period", { date: newBoundary });
    } else {
      const activePeriodBoundary = new Date(activePeriod);
      if (now > activePeriodBoundary) {
        // create a new schedule
        scheduleByDay = createWeeklySchedule();
        scheduleByRow = scheduleToRows(scheduleByDay);
        // persist the new schedule
        await axios.post("/api/active/schedule", { schedule: scheduleByRow });
        // update the period boundary
        const newBoundary = calculateNextBoundary();
        await axios.post("/api/active/period", { date: newBoundary });
      } else {
        const scheduleByRowRes = await axios.get("/api/active/schedule");
        scheduleByRow = scheduleByRowRes.data.schedule;
      }
    }

    return { scheduleByDay, scheduleByRow };

    // 3. If a match was found in redis we fetch it and return that one instead
  };

  return { weeklySchedule, weeklyScheduleRows, rerollMeal };
};
