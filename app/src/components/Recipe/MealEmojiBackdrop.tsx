"use client";
import { Meal } from "@/src/types/period";
import { MEAL_EMOJI } from "@/src/constants/recipePresentation";
import clsx from "clsx";

/**
 * Large low-opacity emoji that sits behind the title of a hero card or an
 * open accordion header. Absolutely positioned — the parent must have
 * `position: relative` and `overflow: hidden`.
 *
 * Variants:
 *  - "desktop-hero"     320px, upright, on dark green gradient
 *  - "mobile-accordion" 140px, slight tilt, on a white card — revealed only
 *                       when the card is active
 *
 * For the mobile-accordion variant, the component is always mounted and
 * animates in/out via `active`: on entry it settles from scale 1.15 → 1.0,
 * on exit it drifts back out. Always-mounted (instead of conditional render)
 * prevents the one-frame flash when the accordion opens or closes.
 */
export const MealEmojiBackdrop = ({
  meal,
  variant,
  active = true,
}: {
  meal: Meal;
  variant: "desktop-hero" | "mobile-accordion";
  active?: boolean;
}) => {
  const emoji = MEAL_EMOJI[meal];

  if (variant === "desktop-hero") {
    return (
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none select-none absolute leading-none",
          "right-[-60px] top-[-40px] text-[440px] opacity-[0.5]",
          "[filter:drop-shadow(0_12px_36px_rgba(0,0,0,0.4))_saturate(1.45)_contrast(1.1)]",
        )}>
        {emoji}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none select-none absolute leading-none",
        "right-[-6px] top-[-14px] text-[140px] rotate-[-6deg] origin-top-right",
        "[filter:saturate(1.4)_contrast(1.05)]",
        "transition-[opacity,transform] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:transition-none",
        active ? "opacity-[0.22] scale-90" : "opacity-0 scale-[1]",
      )}>
      {emoji}
    </div>
  );
};
