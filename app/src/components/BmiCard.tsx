"use client";
import React, { useMemo } from "react";
import { calcBMI } from "../services/CalculatorService";
import { UserProfile } from "../types/userProfile";

interface BmiCardProps {
  userProfile: UserProfile;
}

const BMI_CATEGORIES = [
  { label: "Λιποβαρής", max: 18.5, color: "#6ee7b7", pastel: "#d1fae5", textColor: "#065f46" },
  { label: "Φυσιολογικό", max: 25, color: "#10b981", pastel: "#a7f3d0", textColor: "#065f46" },
  { label: "Υπέρβαρος", max: 30, color: "#fbbf24", pastel: "#fde68a", textColor: "#78350f" },
  { label: "Παχυσαρκία Ι", max: 35, color: "#fb923c", pastel: "#fed7aa", textColor: "#7c2d12" },
  { label: "Παχυσαρκία ΙΙ", max: 40, color: "#f87171", pastel: "#fecaca", textColor: "#7f1d1d" },
  { label: "Παχυσαρκία ΙΙΙ", max: 50, color: "#ef4444", pastel: "#fca5a5", textColor: "#7f1d1d" },
] as const;

function bmiToPercent(bmi: number): number {
  const clamped = Math.max(15, Math.min(45, bmi));
  return ((clamped - 15) / (45 - 15)) * 100;
}

function getCategory(bmi: number) {
  for (const cat of BMI_CATEGORIES) {
    if (bmi < cat.max) return cat;
  }
  return BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
}

export const BmiCard: React.FC<BmiCardProps> = ({ userProfile }) => {
  const bmi = useMemo(
    () => calcBMI(userProfile.weight, userProfile.height),
    [userProfile.weight, userProfile.height]
  );

  const category = getCategory(bmi);
  const markerPercent = bmiToPercent(bmi);
  const ticks = [18.5, 25, 30, 35, 40];

  return (
    <div className="pt-3 pb-1">
      {/* Header: BMI value + category badge */}
      <div className="flex items-baseline gap-2 mb-2.5">
        <span className="text-lg font-bold text-slate-600 tabular-nums tracking-tight">
          {bmi.toFixed(1)}
        </span>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          BMI
        </span>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full ml-auto"
          style={{
            background: `${category.color}20`,
            color: category.textColor,
          }}
        >
          {category.label}
        </span>
      </div>

      {/* Gauge container — bar + marker + ticks */}
      <div className="relative">
        {/* Pastel gauge bar */}
        <div
          className="relative h-2 rounded-full overflow-hidden"
          style={{
            background: `linear-gradient(to right,
              ${BMI_CATEGORIES[0].pastel} 0%,
              ${BMI_CATEGORIES[1].pastel} ${bmiToPercent(18.5)}%,
              ${BMI_CATEGORIES[1].pastel} ${bmiToPercent(25)}%,
              ${BMI_CATEGORIES[2].pastel} ${bmiToPercent(25)}%,
              ${BMI_CATEGORIES[2].pastel} ${bmiToPercent(30)}%,
              ${BMI_CATEGORIES[3].pastel} ${bmiToPercent(30)}%,
              ${BMI_CATEGORIES[3].pastel} ${bmiToPercent(35)}%,
              ${BMI_CATEGORIES[4].pastel} ${bmiToPercent(35)}%,
              ${BMI_CATEGORIES[5].pastel} ${bmiToPercent(40)}%,
              ${BMI_CATEGORIES[5].pastel} 100%
            )`,
          }}
        />

        {/* Marker — vertical line + dot, anchored to gauge */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${markerPercent}%`,
            transform: "translateX(-50%)",
            top: "-3px",
          }}
        >
          <div
            className="rounded-full shadow-md ring-2 ring-white"
            style={{
              width: "14px",
              height: "14px",
              background: category.color,
            }}
          />
        </div>

        {/* Tick labels */}
        <div className="relative h-4 mt-1.5">
          {ticks.map((val) => (
            <span
              key={val}
              className="absolute text-[9px] tabular-nums text-slate-300 font-medium"
              style={{
                left: `${bmiToPercent(val)}%`,
                transform: "translateX(-50%)",
              }}
            >
              {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
