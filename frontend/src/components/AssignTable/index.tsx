import { Temporal } from "proposal-temporal";
import * as React from "react";

import { DivTable, DivRow, DivCell } from "@/components/general/table";
import { range } from "@/general/range";
import { useMembers } from "@/fetch/hooks";
import { dayOfWeekString } from "@/domain/dateTime";

export const AssignTable: React.FC = () => {
  const [startDate] = React.useState(Temporal.now.plainDateISO());
  const membersResp = useMembers();
  const days = range(14).map((i) =>
    startDate.add(Temporal.Duration.from({ days: i }))
  );
  if (!membersResp.isSuccess) {
    return null;
  }
  const members = membersResp.data;
  return (
    <DivTable>
      <DivRow>
        <DivCell>Date</DivCell>
        {members.map((member) => (
          <DivCell>{member.name}</DivCell>
        ))}
      </DivRow>
      {days.map((day) => (
        <DivRow>
          <DivCell>{`${day.month}/${day.day} ${
            dayOfWeekString[day.dayOfWeek]
          }`}</DivCell>
          {members.map(() => (
            <DivCell></DivCell>
          ))}
        </DivRow>
      ))}
    </DivTable>
  );
};
