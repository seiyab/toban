import { Temporal } from "proposal-temporal";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { range } from "@/general/range";

import { WeekRow } from "../WeekRow";
import { DateCell } from "../DateCell";

type Props = {
  month: Temporal.PlainYearMonth;
};

const useStyles = createUseStyles({
  headTd: {
    textAlign: "center",
  },
});

export const Month: React.VoidFunctionComponent<Props> = ({ month }) => {
  const classes = useStyles();

  const first = month.toPlainDate({ day: 1 });
  const firstDayInView = first.subtract(
    Temporal.Duration.from({ days: first.dayOfWeek % 7 })
  );
  const weeks = range(6).map((w) =>
    range(7).map((d) =>
      firstDayInView.add({
        weeks: w,
        days: d,
      })
    )
  );
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td className={classes.headTd}>Sun</td>
            <td className={classes.headTd}>Mon</td>
            <td className={classes.headTd}>Tue</td>
            <td className={classes.headTd}>Wed</td>
            <td className={classes.headTd}>Thu</td>
            <td className={classes.headTd}>Fri</td>
            <td className={classes.headTd}>Sat</td>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <WeekRow>
              {week.map((date) => (
                <DateCell date={date} />
              ))}
            </WeekRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};
