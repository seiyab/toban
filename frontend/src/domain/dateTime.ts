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

export function eachDate(
  from: Temporal.PlainDate,
  to: Temporal.PlainDate
): Temporal.PlainDate[] {
  const result = [];
  const le = (a: Temporal.PlainDate, b: Temporal.PlainDate) =>
    Temporal.PlainDate.compare(a, b) <= 0;
  for (let d = from; le(d, to); d = d.add({ days: 1 })) {
    result.push(d);
  }
  return result;
}
