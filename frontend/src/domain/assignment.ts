import { Temporal } from "proposal-temporal";
import { eachDate } from "./dateTime";

export type Assignment = {
  id: number;
  roleId: number;
  startAt: Temporal.PlainDate;
  endAt: Temporal.PlainDate;
  memberId: number;
};

export class AssignmentIndex {
  private readonly data: { [id in number]: { [date in string]: Assignment[] } };

  private constructor(
    data: { [id in number]: { [date in string]: Assignment[] } }
  ) {
    this.data = data;
  }

  public static fromArray(assignments: Assignment[]): AssignmentIndex {
    const data: { [id in number]: { [date in string]: Assignment[] } } = {};
    assignments.forEach((assignment) => {
      let memberAssignments = data[assignment.memberId];
      if (!memberAssignments) {
        memberAssignments = {};
        data[assignment.memberId] = memberAssignments;
      }
      eachDate(assignment.startAt, assignment.endAt).forEach((date) => {
        let dateAssignments = memberAssignments[date.toString()];
        if (!dateAssignments) {
          dateAssignments = [];
          memberAssignments[date.toString()] = dateAssignments;
        }
        dateAssignments.push(assignment);
      });
    });
    return new AssignmentIndex(data);
  }

  public get(memberID: number, date: Temporal.PlainDate): Assignment[] {
    return this.data[memberID]?.[date.toString()] ?? [];
  }
}
