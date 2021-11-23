import { Temporal } from "proposal-temporal";
import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";
import * as UQR from "@seiyab/fp-ts-react-query/lib/UseQueryResult";
import { pipe, flow } from "fp-ts/lib/function";
import * as A from "fp-ts/lib/Array";

import { Option } from "@/general/option";
import { DivTable, DivRow, DivCell } from "@/components/layout/table";
import { Emoji14 } from "@/components/Emoji";
import { range } from "@/general/range";
import { useAssignments, useMembers, useRoles } from "@/fetch/hooks";
import { dayOfWeekString } from "@/domain/dateTime";
import { EmojiKey } from "@/fetch/extern/github";
import { Dict } from "@/general/dict";
import { AssignmentIndex } from "@/domain/assignment";
import { pallette } from "@/cosmetic";
import { NewMemberButton } from "../NewMemberButton";

const useStyles = createUseStyles({
  table: {
    borderSpacing: "2px",
  },
  row: {
    height: "30px",
  },
  headCell: {
    backgroundColor: pallette.mainDark,
    color: pallette.background,
    minWidth: "50px",
    padding: "0 7px",
  },
  plus: {
    backgroundColor: pallette.mainDark,
    color: pallette.background,
    padding: "0 7px",
  },
  cell: {},
  assignments: {
    display: "flex",
  },
  newMemberButton: {
    backgroundColor: undefined,
  },
});

export const AssignTable: React.FC = () => {
  const classes = useStyles();
  const [startDate] = React.useState(Temporal.now.plainDateISO());
  const days = range(14).map((i) =>
    startDate.add(Temporal.Duration.from({ days: i }))
  );
  const membersResp = useMembers();
  const rolesResp = useRoles();
  const assignmentsResp = useAssignments(days[0], days[days.length - 1]);
  const joined = pipe(
    UQR.Do,
    UQR.bind("members", () => membersResp),
    UQR.bind("roles", () => rolesResp),
    UQR.bind("assignments", () => assignmentsResp)
  );
  if (!joined.isSuccess) {
    return null;
  }
  const { members, roles } = joined.data;
  const rolesDict = Dict.fromArray(roles, (r) => r.id);
  const assignmentIndex = AssignmentIndex.fromArray(joined.data.assignments);
  return (
    <>
      <DivTable className={classes.table}>
        <DivRow className={classes.row}>
          <DivCell className={classNames(classes.headCell, classes.cell)}>
            Date
          </DivCell>
          {members.map((member) => (
            <DivCell
              key={member.id}
              className={classNames(classes.headCell, classes.cell)}
            >
              {member.name}
            </DivCell>
          ))}
          <DivCell className={classes.plus}>
            <NewMemberButton>+</NewMemberButton>
          </DivCell>
          <DivCell className={classes.headCell}>Planned</DivCell>
        </DivRow>
        {days.map((day) => (
          <DivRow key={day.toString()} className={classes.row}>
            <DivCell className={classes.cell}>{`${day.month}/${day.day} ${
              dayOfWeekString[day.dayOfWeek]
            }`}</DivCell>
            {members.map((member) => (
              <DivCell key={member.id} className={classes.cell}>
                <div className={classes.assignments}>
                  {pipe(
                    assignmentIndex.get(member.id, day),
                    A.map(
                      flow(
                        (a) => rolesDict.get(a.roleId),
                        Option.map((role) => {
                          const emoji = role.emoji;
                          if (emoji)
                            return (
                              <Emoji14
                                key={role.id}
                                emoji={emoji as EmojiKey}
                              />
                            );
                          return (
                            <span key={role.id}>{role.name[0] ?? ""}</span>
                          );
                        }),
                        Option.unwrap
                      )
                    )
                  )}
                </div>
              </DivCell>
            ))}
            <DivCell className={classes.cell}>-</DivCell>
            <DivCell className={classes.cell}>-</DivCell>
          </DivRow>
        ))}
      </DivTable>
    </>
  );
};
