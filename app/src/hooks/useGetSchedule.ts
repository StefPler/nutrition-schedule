import { useQuery } from "@tanstack/react-query";
import { scheduleToRows } from "@/src/helpers/util";
import axios from "axios";
import { WeeklySchedule, WeeklyScheduleRows } from "../types/period";
import { createWeeklySchedule } from "../services/MealService";

export function useGetSchedule() {
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
    let byDay: WeeklySchedule;
    let byRow: WeeklyScheduleRows;
    // 1. check if schedule exists for the current running period
    // e.g: save in redis a hash for current active period ending in 26th of May

    // ------ Uncoment for local dev ------
    byDay = createWeeklySchedule();
    byRow = scheduleToRows(byDay);
    return { byDay, byRow };
    // ------------------------------------
    const now = new Date();
    const activePeriodRes = await axios.get("/api/active/period");
    const activePeriod = activePeriodRes.data.period;

    // 2. If no match is found in redis (first time creating or previous period ended)
    // we generate a new schedule
    // 2.a. We persist the new schedule in redis under a hash

    if (!activePeriod) {
      byDay = createWeeklySchedule();
      byRow = scheduleToRows(byDay);
      await axios.post("/api/active/schedule", { schedule: byRow });
      const newBoundary = calculateNextBoundary();
      await axios.post("/api/active/period", { date: newBoundary });
    } else {
      const activePeriodBoundary = new Date(activePeriod);
      if (now > activePeriodBoundary) {
        // create a new schedule
        byDay = createWeeklySchedule();
        byRow = scheduleToRows(byDay);
        // persist the new schedule
        await axios.post("/api/active/schedule", { schedule: byRow });
        // update the period boundary
        const newBoundary = calculateNextBoundary();
        await axios.post("/api/active/period", { date: newBoundary });
      } else {
        const byRowRes = await axios.get("/api/active/schedule");
        byRow = byRowRes.data.schedule;
      }
    }

    return { byDay, byRow };

    // 3. If a match was found in redis we fetch it and return that one instead
  };

  return useQuery({
    queryKey: ["getSchedule"],
    staleTime: 2 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      const schedule = await getWeeklySchedule();
      return schedule;
    },
  });
}
