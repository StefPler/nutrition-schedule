"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Days, DaysEnum } from "../types/period";

const STORAGE_KEY = "daily-checkins";
const QUERY_KEY = [STORAGE_KEY];

const getTodayDate = () => new Date().toISOString().split("T")[0];
const getTodayDayName = (): Days => DaysEnum[new Date().getDay()] as Days;

const readCheckins = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored) as { date: string; meals: string[] };
    if (parsed.date === getTodayDate()) return new Set(parsed.meals);
  }
  return new Set();
};

export const useDailyCheckins = () => {
  const queryClient = useQueryClient();
  const todayDayName = getTodayDayName();

  const { data: checkedMeals = new Set<string>() } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: readCheckins,
  });

  const { mutate: toggle } = useMutation({
    mutationFn: async (key: string) => {
      const next = new Set(checkedMeals);
      next.has(key) ? next.delete(key) : next.add(key);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: getTodayDate(), meals: Array.from(next) }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return { checkedMeals, toggle, todayDayName };
};
