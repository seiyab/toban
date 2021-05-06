import { Temporal } from "proposal-temporal";
import * as React from "react";

import { Month } from "./Month";

type Props = {
  month: Temporal.PlainYearMonth;
};

export const Calendar: React.VoidFunctionComponent<Props> = ({ month }) => {
  return <Month month={month} />;
};
