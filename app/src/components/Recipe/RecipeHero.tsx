"use client";
import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";
import { Meal } from "@/src/types/period";
import { Recipe } from "@/src/types/foods";
import { MealPortion } from "@/src/types/nutrition";
import { MEAL_EMOJI, MEAL_LABELS_SHORT, MEAL_ORDER, MEAL_SCHEDULE_TIMES } from "@/src/constants/recipePresentation";
import { MealEmojiBackdrop } from "./MealEmojiBackdrop";
import { MealMetaRow } from "./MealMetaRow";
import { WarningIndicator } from "./WarningIndicator";

/**
 * Desktop hero. Full-width gradient-green card with a segmented filmstrip
 * that navigates meals via a "worm" pill: the white indicator stretches
 * from its old segment toward the new one at mid-transition, then
 * contracts to fit. The clip-path overlay (active-colored text) animates
 * in lockstep so the emerald glyphs reveal and conceal in perfect sync.
 *
 * CSS transitions can't produce this — they don't know direction or the
 * combined bounding box. We drive it via WAAPI with an explicit midpoint
 * keyframe at `min(prev.left, next.left) → max(prev.right, next.right)`.
 * Per-keyframe easing (ease-in → ease-out) keeps velocity continuous
 * through the stretch peak so it feels fluid rather than mechanical.
 */

// Duration scales with travel distance so adjacent hops stay snappy and
// full-rail hops (breakfast → dinner) get time to breathe. Linear lerp
// between these two bounds based on center-to-center distance / rail.
const MIN_DURATION_MS = 360;
const MAX_DURATION_MS = 640;
// Per-segment easings chosen so velocity is high at the midpoint on both
// sides — the stretch "flies through" the peak instead of pausing on it.
const EASE_IN = "cubic-bezier(0.64, 0, 0.78, 0)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const SegmentContent = ({ meal, timeClassName }: { meal: Meal; timeClassName: string }) => (
  <>
    <span className="text-base leading-none">{MEAL_EMOJI[meal]}</span>
    <span className="flex items-baseline gap-1.5">
      <span>{MEAL_LABELS_SHORT[meal]}</span>
      <span className={clsx("text-[9px] font-semibold tracking-[0.4px]", timeClassName)}>
        {MEAL_SCHEDULE_TIMES[meal]}
      </span>
    </span>
  </>
);

export const RecipeHero = ({
  meal,
  recipe,
  portion,
  onSelectMeal,
}: {
  meal: Meal;
  recipe?: Recipe;
  portion?: MealPortion;
  onSelectMeal: (m: Meal) => void;
}) => {
  const warnings = portion?.warnings ?? [];

  const tablistRef = useRef<HTMLDivElement>(null);
  const puckRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [puck, setPuck] = useState<{ x: number; w: number; railW: number } | null>(null);

  useLayoutEffect(() => {
    const rail = tablistRef.current;
    if (!rail) return;
    const measure = () => {
      const active = rail.querySelector<HTMLButtonElement>('[aria-selected="true"]');
      if (!active) return;
      const r = rail.getBoundingClientRect();
      const b = active.getBoundingClientRect();
      setPuck((prev) => {
        const next = { x: b.left - r.left, w: b.width, railW: r.width };
        if (prev && prev.x === next.x && prev.w === next.w && prev.railW === next.railW) {
          return prev;
        }
        return next;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    return () => ro.disconnect();
  }, [meal]);

  // Worm transition: driven by meal changes only (resize updates snap).
  const prevRef = useRef<{ x: number; w: number; meal: Meal } | null>(null);
  const puckAnimRef = useRef<Animation | null>(null);
  const overlayAnimRef = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    if (!puck) return;
    const prev = prevRef.current;

    // First ever frame — seed prevRef, nothing to animate.
    if (!prev) {
      prevRef.current = { x: puck.x, w: puck.w, meal };
      return;
    }

    // Meal unchanged — resize or no-op. Snap stored position, no worm.
    if (prev.meal === meal) {
      if (prev.x !== puck.x || prev.w !== puck.w) {
        prevRef.current = { x: puck.x, w: puck.w, meal };
      }
      return;
    }

    // Meal changed but the puck state hasn't been re-measured yet
    // (first of a two-pass layout effect: setPuck inside an earlier
    // layout effect hasn't flushed yet). Bail without touching prevRef
    // so the next pass still sees the true origin position.
    if (prev.x === puck.x && prev.w === puck.w) return;

    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    prevRef.current = { x: puck.x, w: puck.w, meal };

    if (reduce) return;

    const minLeft = Math.min(prev.x, puck.x);
    const maxRight = Math.max(prev.x + prev.w, puck.x + puck.w);
    const stretchW = maxRight - minLeft;

    // Scale duration by center-to-center travel. Normalized against 75%
    // of the rail width so a ~3/4 rail hop already hits the slow bound.
    const prevCenter = prev.x + prev.w / 2;
    const nextCenter = puck.x + puck.w / 2;
    const travel = Math.abs(nextCenter - prevCenter);
    const t = Math.min(travel / (puck.railW * 0.75), 1);
    const duration = Math.round(MIN_DURATION_MS + (MAX_DURATION_MS - MIN_DURATION_MS) * t);

    puckAnimRef.current?.cancel();
    overlayAnimRef.current?.cancel();

    puckAnimRef.current =
      puckRef.current?.animate(
        [
          {
            transform: `translateX(${prev.x}px)`,
            width: `${prev.w}px`,
            easing: EASE_IN,
          },
          {
            transform: `translateX(${minLeft}px)`,
            width: `${stretchW}px`,
            offset: 0.5,
            easing: EASE_OUT,
          },
          {
            transform: `translateX(${puck.x}px)`,
            width: `${puck.w}px`,
          },
        ],
        { duration },
      ) ?? null;

    const pct = (left: number, w: number) => ({
      l: (left / puck.railW) * 100,
      r: ((puck.railW - left - w) / puck.railW) * 100,
    });
    const a = pct(prev.x, prev.w);
    const b = pct(minLeft, stretchW);
    const c = pct(puck.x, puck.w);

    overlayAnimRef.current =
      overlayRef.current?.animate(
        [
          { clipPath: `inset(0% ${a.r}% 0% ${a.l}%)`, easing: EASE_IN },
          {
            clipPath: `inset(0% ${b.r}% 0% ${b.l}%)`,
            offset: 0.5,
            easing: EASE_OUT,
          },
          { clipPath: `inset(0% ${c.r}% 0% ${c.l}%)` },
        ],
        { duration },
      ) ?? null;
  }, [puck, meal]);

  const clipLeft = puck ? (puck.x / puck.railW) * 100 : 0;
  const clipRight = puck ? ((puck.railW - puck.x - puck.w) / puck.railW) * 100 : 100;

  return (
    <div className="relative flex min-h-[320px] flex-col overflow-hidden rounded-[18px] bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#065f46] px-8 py-7 text-white">
      <MealEmojiBackdrop meal={meal} variant="desktop-hero" />
      {recipe && <WarningIndicator warnings={warnings} />}

      {/* Segmented filmstrip rail with worm puck */}
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Γεύματα ημέρας"
        className="relative z-[1] mb-8 inline-flex w-max gap-0.5 rounded-full bg-white/[0.06] p-1 ring-1 ring-inset ring-white/[0.12]">
        {/* Puck: the stretching white indicator */}
        {puck && (
          <div
            ref={puckRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 left-0 top-1 rounded-full bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.35)] will-change-transform"
            style={{
              transform: `translateX(${puck.x}px)`,
              width: puck.w,
            }}
          />
        )}

        {/* Base layer: buttons with inactive-colored text */}
        {MEAL_ORDER.map((m) => {
          const active = m === meal;
          return (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectMeal(m)}
              className={clsx(
                "relative z-[1] inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.8px]",
                "text-white/65 transition-colors duration-200 motion-reduce:transition-none",
                !active && "hover:bg-white/[0.05] hover:text-white",
              )}>
              <SegmentContent meal={m} timeClassName="text-white/45" />
            </button>
          );
        })}

        {/* Overlay: active-colored text clipped to the puck region */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] flex gap-0.5 p-1"
          style={{
            clipPath: `inset(0% ${clipRight}% 0% ${clipLeft}%)`,
          }}>
          {MEAL_ORDER.map((m) => (
            <span
              key={m}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.8px] text-emerald-900">
              <SegmentContent meal={m} timeClassName="text-emerald-700" />
            </span>
          ))}
        </div>
      </div>

      {/* Content block: title + description + bottom-pinned meta */}
      <div
        key={meal}
        className="relative z-[1] flex flex-1 flex-col animate-in fade-in slide-in-from-top-1 duration-200 motion-reduce:animate-none">
        <h2 className="text-[38px] font-extrabold leading-[1.08] tracking-[-0.01em]">{recipe?.name ?? "—"}</h2>

        <p className="mt-2.5 max-w-[52ch] text-[14px] leading-snug text-white/85">
          {recipe?.description ?? "Δεν υπάρχει συνταγή για αυτό το γεύμα"}
        </p>

        {recipe && (
          <div className="mt-auto pt-6">
            <MealMetaRow category={recipe.category} />
          </div>
        )}
      </div>
    </div>
  );
};
