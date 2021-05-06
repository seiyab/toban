import { Temporal } from "proposal-temporal";
import * as React from "react";

import { MonthSelector } from ".";

export const useMonthSelector = (
  initialMonth: Temporal.PlainYearMonth
): React.ComponentPropsWithoutRef<typeof MonthSelector> => {
  const [month, setMonth] = React.useState(initialMonth);
  return {
    month,
    onClickLeft: () => {
      setMonth((prev) => prev.subtract(Temporal.Duration.from({ months: 1 })));
    },
    onClickRight: () => {
      setMonth((prev) => prev.add(Temporal.Duration.from({ months: 1 })));
    },
  };
};
