"use client";
import { Days } from "@/src/types/period";
import clsx from "clsx";

const DAYS_ORDER: Days[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SHORT_DAY_LABELS: Record<Days, string> = {
  Monday: "Δευ",
  Tuesday: "Τρι",
  Wednesday: "Τετ",
  Thursday: "Πεμ",
  Friday: "Παρ",
  Saturday: "Σαβ",
  Sunday: "Κυρ",
};

/**
 * Computes the date-of-month for each `Days` value using the Monday of the
 * current calendar week as the period start. Pure function so it can be
 * memoized.
 */
const computeDates = (): Record<Days, number> => {
  const today = new Date();
  // 0 = Sunday, 1 = Monday, …
  const jsDay = today.getDay();
  // Distance back to Monday: Mon = 0, Sun = 6
  const distanceToMonday = (jsDay + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - distanceToMonday);

  const out = {} as Record<Days, number>;
  DAYS_ORDER.forEach((day, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    out[day] = d.getDate();
  });
  return out;
};

/**
 * Day pill row.
 *  - Desktop (md+): single centered flex-wrap row of 7 pills.
 *  - Mobile (<md): two explicit rows — 4 pills on top, 3 pills below.
 */
export const DaySelector = ({ selectedDay, onSelectDay }: { selectedDay: Days; onSelectDay: (day: Days) => void }) => {
  const dates = computeDates();

  const pill = (day: Days) => (
    <button
      key={day}
      type="button"
      onClick={() => onSelectDay(day)}
      className={clsx(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition whitespace-nowrap min-w-[52px] text-center",
        day === selectedDay
          ? "bg-emerald-600 text-white border-emerald-600"
          : "bg-white/70 text-slate-600 border-slate-300 hover:border-emerald-400 hover:text-emerald-700",
      )}>
      {SHORT_DAY_LABELS[day]} {dates[day]}
    </button>
  );

  return (
    <>
      {/* Desktop: single row */}
      <div className="hidden md:flex flex-wrap justify-center gap-2 mb-5">{DAYS_ORDER.map(pill)}</div>

      {/* Mobile: 4 + 3 rows */}
      <div className="flex md:hidden flex-col gap-1.5 mb-4">
        <div className="flex justify-center gap-1.5">{DAYS_ORDER.slice(0, 4).map(pill)}</div>
        <div className="flex justify-center gap-1.5">{DAYS_ORDER.slice(4).map(pill)}</div>
      </div>
    </>
  );
};
