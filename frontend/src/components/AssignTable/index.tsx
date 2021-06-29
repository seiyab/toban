import { Temporal } from "proposal-temporal";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { Option } from "@/general/option";
import { pipe } from "@/general/pipe";
import { DivTable, DivRow, DivCell } from "@/components/layout/table";
import { Emoji14 } from "@/components/Emoji";
import { range } from "@/general/range";
import { useAssignments, useMembers, useRoles } from "@/fetch/hooks";
import { dayOfWeekString } from "@/domain/dateTime";
import { EmojiKey } from "@/fetch/extern/github";
import { AsyncResult } from "@/general/reactQuery";
import { Dict } from "@/general/dict";
import { Assignment, AssignmentIndex } from "@/domain/assignment";

const useStyles = createUseStyles({
  row: {
    height: "30px",
  },
  headCell: {
    minWidth: "50px",
  },
  assignments: {
    display: "flex",
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
  const joined = AsyncResult.join({
    members: membersResp,
    roles: rolesResp,
    assignments: assignmentsResp,
  });
  if (!joined.isSuccess) {
    return null;
  }
  const { members, roles } = joined.data;
  const rolesDict = Dict.fromArray(roles, (r) => r.id);
  const assignmentIndex = AssignmentIndex.fromArray(joined.data.assignments);
  return (
    <DivTable>
      <DivRow className={classes.row}>
        <DivCell>Date</DivCell>
        {members.map((member) => (
          <DivCell key={member.id} className={classes.headCell}>
            {member.name}
          </DivCell>
        ))}
      </DivRow>
      {days.map((day) => (
        <DivRow key={day.toString()} className={classes.row}>
          <DivCell>{`${day.month}/${day.day} ${
            dayOfWeekString[day.dayOfWeek]
          }`}</DivCell>
          {members.map((member) => (
            <DivCell key={member.id}>
              <div className={classes.assignments}>
                {pipe(assignmentIndex.get(member.id, day))
                  .and((assignments: Assignment[]) =>
                    assignments.map((a) =>
                      pipe(a)
                        .and((a) => rolesDict.get(a.roleId))
                        .and(
                          Option.map((role) => {
                            const emoji = role.emoji;
                            console.log(role);
                            if (emoji)
                              return (
                                <Emoji14 key={a.id} emoji={emoji as EmojiKey} />
                              );
                            return <span key={a.id}>{role.name[0] ?? ""}</span>;
                          })
                        )
                        .and(Option.unwrap)
                        .end()
                    )
                  )
                  .end()}
              </div>
            </DivCell>
          ))}
        </DivRow>
      ))}
    </DivTable>
  );
};
