import { expect, it } from "@jest/globals";
import { Temporal } from "proposal-temporal";

import { AssignmentIndex } from "./assignment";

it("AssignmentIndex", () => {
  const assignments = [
    {
      id: 0,
      roleId: 100,
      memberId: 500,
      startAt: Temporal.PlainDate.from("2021-06-02"),
      endAt: Temporal.PlainDate.from("2021-06-06"),
    },
    {
      id: 1,
      roleId: 101,
      memberId: 500,
      startAt: Temporal.PlainDate.from("2021-06-05"),
      endAt: Temporal.PlainDate.from("2021-06-09"),
    },
    {
      id: 2,
      roleId: 100,
      memberId: 501,
      startAt: Temporal.PlainDate.from("2021-06-02"),
      endAt: Temporal.PlainDate.from("2021-06-09"),
    },
  ];
  const ai = AssignmentIndex.fromArray(assignments);

  expect(ai.get(500, Temporal.PlainDate.from("2021-06-02"))).toEqual([
    assignments[0],
  ]);

  expect(ai.get(500, Temporal.PlainDate.from("2021-06-05"))).toEqual([
    assignments[0],
    assignments[1],
  ]);
});
