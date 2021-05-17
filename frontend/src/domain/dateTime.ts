import { Temporal } from "proposal-temporal";

export function startOfWeek(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.add(
    Temporal.Duration.from({
      days: -(date.dayOfWeek % 7),
    })
  );
}

export const dayOfWeekString = [
  "Sun.",
  "Mon.",
  "Tue.",
  "Wed.",
  "Thu.",
  "Fri.",
  "Sat.",
  "Sun.",
] as const;
