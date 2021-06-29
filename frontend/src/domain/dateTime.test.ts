import { describe, expect, it } from "@jest/globals";
import { Temporal } from "proposal-temporal";

import { eachDate, startOfWeek } from "./dateTime";

describe("startOfWeek", () => {
  it.each([
    ["2021-05-02"],
    ["2021-05-03"],
    ["2021-05-04"],
    ["2021-05-05"],
    ["2021-05-06"],
    ["2021-05-07"],
    ["2021-05-08"],
  ])("%s", (dateStr) => {
    const result = startOfWeek(Temporal.PlainDate.from(dateStr));
    expect(result.toString()).toBe("2021-05-02");
  });
});

it("eachDate", () => {
  const actual = eachDate(
    Temporal.PlainDate.from("2021-05-25"),
    Temporal.PlainDate.from("2021-06-03")
  );

  const expected = [
    "2021-05-25",
    "2021-05-26",
    "2021-05-27",
    "2021-05-28",
    "2021-05-29",
    "2021-05-30",
    "2021-05-31",
    "2021-06-01",
    "2021-06-02",
    "2021-06-03",
  ];

  expect(actual.map((a) => a.toString())).toEqual(expected);
});
