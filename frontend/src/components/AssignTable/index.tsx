import { Temporal } from "proposal-temporal";
import * as React from "react";

import { DivTable, DivRow, DivCell } from "@/components/layout/table";
import { Emoji14 } from "@/components/Emoji";
import { range } from "@/general/range";
import { useMembers } from "@/fetch/hooks";
import { dayOfWeekString } from "@/domain/dateTime";
import { EmojiKey } from "@/fetch/extern/github";

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
          <DivCell key={member.id}>{member.name}</DivCell>
        ))}
      </DivRow>
      {days.map((day) => (
        <DivRow key={day.toString()}>
          <DivCell>{`${day.month}/${day.day} ${
            dayOfWeekString[day.dayOfWeek]
          }`}</DivCell>
          {members.map((member) => (
            <DivCell key={member.id}>
              <Emoji14 emoji={"+1" as EmojiKey} />
            </DivCell>
          ))}
        </DivRow>
      ))}
    </DivTable>
  );
};
