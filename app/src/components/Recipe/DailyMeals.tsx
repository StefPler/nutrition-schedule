"use client";
import { useGetSchedule } from "@/src/hooks/useGetSchedule";
import { Days, DaysEnum } from "@/src/types/period";
import { Flex } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { RecipeCard } from "./RecipeCard";

export const DailyMeals = () => {
  const { data: schedule, isLoading } = useGetSchedule();
  const [day, setDay] = useState<Days>(DaysEnum[new Date().getDay()] as Days);
  const breakfast = useMemo(
    () => schedule?.byDay[day].breakfast.recipe,
    [schedule, day]
  );
  const lunch = useMemo(
    () => schedule?.byDay[day].lunch.recipe,
    [schedule, day]
  );
  const dinner = useMemo(
    () => schedule?.byDay[day].dinner.recipe,
    [schedule, day]
  );

  console.log("day", day);
  return (
    <Flex justify={{ xs: "center", sm: "center", lg: "between" }} wrap="wrap">
      <RecipeCard
        meal="Breakfast"
        name={breakfast?.name!}
        description={breakfast?.description!}
        badges={[breakfast?.category!]}
        ingredients={breakfast?.ingredients!}
        execution={breakfast?.instructions!}
      />
      <RecipeCard
        meal="Lunch"
        name={lunch?.name!}
        description={lunch?.description!}
        badges={[lunch?.category!]}
        ingredients={lunch?.ingredients!}
        execution={lunch?.instructions!}
      />
      <RecipeCard
        meal="Dinner"
        name={dinner?.name!}
        description={dinner?.description!}
        badges={[dinner?.category!]}
        ingredients={dinner?.ingredients!}
        execution={dinner?.instructions!}
      />
    </Flex>
  );
};
