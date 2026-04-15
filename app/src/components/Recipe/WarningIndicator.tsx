"use client";
import { Popover } from "@radix-ui/themes";

/**
 * Small amber ⚠ bubble that opens a Popover listing the warnings strings.
 * Absolutely positioned — the parent must have `position: relative`.
 * Hidden entirely when there are no warnings.
 *
 * We use Popover (not HoverCard or Tooltip) so the interaction works
 * identically on desktop click and mobile tap.
 */
export const WarningIndicator = ({ warnings }: { warnings: string[] }) => {
  if (warnings.length === 0) return null;

  return (
    <div className="absolute right-4 top-3.5 z-[2]">
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            aria-label={`${warnings.length} προειδοποιήσεις`}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-amber-500 bg-amber-100 text-[13px] text-amber-700 transition hover:bg-amber-200">
            ❗
          </button>
        </Popover.Trigger>
        <Popover.Content size="1" maxWidth="280px">
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-amber-700">Προειδοποιήσεις</p>
            <ul className="space-y-1">
              {warnings.map((w, i) => (
                <li key={i} className="text-xs text-slate-700 leading-snug">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
