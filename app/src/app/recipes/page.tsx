"use client";

import { DailyMeals } from "@/src/components/Recipe/DailyMeals";
import { Section } from "@radix-ui/themes";

export default function Recipes() {
  return (
    <div className="">
      <Section size="1" />
      <DailyMeals />
    </div>
  );
}
