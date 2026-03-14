"use client";

import { DailyMeals } from "@/src/components/Recipe/DailyMeals";
import { Heading, Section, Text } from "@radix-ui/themes";

export default function Recipes() {
  return (
    <div>
      {/* Page heading */}
      <div className="text-center px-4 mb-6 mt-4">
        <Heading size="8" className="text-emerald-700 font-bold">
          Σημερινές Συνταγές
        </Heading>
        <Text size="3" className="text-slate-500 block mt-2 max-w-md mx-auto">
          Λεπτομερείς συνταγές για το πρωινό, μεσημεριανό και βραδινό σας με υλικά και οδηγίες βήμα-βήμα.
        </Text>
      </div>

      <DailyMeals />
    </div>
  );
}
