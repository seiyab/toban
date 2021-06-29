import { Temporal } from "proposal-temporal";

export function plainDateToDate(date: Temporal.PlainDate): Date {
  return new Date(
    date.toZonedDateTime({ timeZone: "UTC" }).toInstant().epochMilliseconds
  );
}
export function dateToPlainDate(date: Date): Temporal.PlainDate {
  return Temporal.PlainDate.from({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
}
