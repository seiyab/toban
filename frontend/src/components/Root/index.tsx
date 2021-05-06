import { Temporal } from "proposal-temporal";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { Calendar } from "@/components/Calendar";
import { MonthSelector } from "@/components/MonthSelector";
import { useMonthSelector } from "@/components/MonthSelector/hooks";

const useStyles = createUseStyles({
  root: {
    fontFamily: "'Noto Sans JP', sans-serif",
  },
});

export const Root: React.FC = () => {
  const classes = useStyles();
  const monthSelectorProps = useMonthSelector(
    Temporal.now.plainDateISO().toPlainYearMonth()
  );
  return (
    <main className={classes.root}>
      <MonthSelector {...monthSelectorProps} />
      <Calendar month={monthSelectorProps.month} />
    </main>
  );
};
