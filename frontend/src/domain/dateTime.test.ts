import { describe, expect, it } from "@jest/globals";
import { Temporal } from "proposal-temporal";

import { startOfWeek } from "./dateTime";

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
