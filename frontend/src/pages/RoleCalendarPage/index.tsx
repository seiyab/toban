import { Temporal } from "proposal-temporal";
import * as React from "react";

import { Calendar } from "@/components/Calendar";
import { MonthSelector } from "@/components/MonthSelector";
import { useMonthSelector } from "@/components/MonthSelector/hooks";

export const RoleCalendarPage: React.VoidFunctionComponent = () => {
  const monthSelectorProps = useMonthSelector(
    Temporal.now.plainDateISO().toPlainYearMonth()
  );
  return (
    <main>
      <MonthSelector {...monthSelectorProps} />
      <Calendar month={monthSelectorProps.month} />
    </main>
  );
};
