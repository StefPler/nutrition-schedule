"use client";
import clsx from "clsx";

/**
 * Numbered instruction list. Renders nothing if `steps` is empty so the
 * parent can simplify its layout (e.g. collapse the 2-column grid to 1).
 *
 * `compact` shrinks the number bubble and font for the mobile accordion.
 */
export const ExecutionList = ({
  steps,
  compact = false,
}: {
  steps: string[];
  compact?: boolean;
}) => {
  if (steps.length === 0) return null;

  return (
    <ol className={clsx("space-y-0", compact ? "space-y-2" : "space-y-3")}>
      {steps.map((step, idx) => (
        <li key={idx} className="flex items-start gap-2.5">
          <span
            className={clsx(
              "flex flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 font-extrabold text-emerald-700 mt-0.5",
              compact ? "h-[18px] w-[18px] text-[9px]" : "h-[22px] w-[22px] text-[11px]",
            )}>
            {idx + 1}
          </span>
          <span
            className={clsx(
              "text-slate-700 leading-snug",
              compact ? "text-[11px]" : "text-[12.5px]",
            )}>
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
};
