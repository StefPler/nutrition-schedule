"use client";
import { WeeklySchedule } from "@/src/components/WeeklySchedule";
import { Heading, Section, Text } from "@radix-ui/themes";
import { UserProfile } from "../components/UserProfile";
import { UserProfileFab } from "../components/UserProfileFab";
import { DailyProgress } from "../components/DailyProgress";

export default function Home() {
  const date = new Date();
  return (
    <>
      {/* Page heading – mobile only */}
      <div className="text-center px-4 mt-6 mb-1">
        <Heading className="text-center" size="6">
          <Text size="7" className="text-emerald-700 font-bold">
            {date.getHours() > 12 ? "✨ Καλήν σας εσπέρα ✨" : "🌸 Καλήν σας ημέρα 🌸"}
          </Text>
        </Heading>
        <Text size="2" className="text-slate-500 block mt-1">
          Το εξατομικευμένο πρόγραμμα διατροφής σας για την εβδομάδα. Πατήστε &ldquo;Εναλλακτικές&rdquo; για να
          εξερευνήσετε επιλογές για κάθε γεύμα.
        </Text>
      </div>

      {/* Visible only on desktop */}
      <div className="hidden md:block">
        <Section size="1" />
      </div>

      {/* UserProfile card – visible only on desktop */}
      <div className="hidden md:block">
        <UserProfile />
        <Section size="1" />
      </div>

      {/* Daily progress – mobile only, shown above the schedule */}
      <div className="md:hidden mx-4 my-3 bg-white rounded-2xl shadow-sm border border-slate-100 px-4 py-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Πρόοδος Σήμερα</p>
        <DailyProgress />
      </div>

      <WeeklySchedule />

      {/* FAB for mobile – opens Nutrition Profile dialog */}
      <UserProfileFab />
    </>
  );
}
