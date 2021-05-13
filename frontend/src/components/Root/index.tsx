import { Temporal } from "proposal-temporal";
import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Calendar } from "@/components/Calendar";
import { GlobalStyle } from "@/components/GlobalStyle";
import { MonthSelector } from "@/components/MonthSelector";
import { useMonthSelector } from "@/components/MonthSelector/hooks";

export const Root: React.FC = () => {
  const monthSelectorProps = useMonthSelector(
    Temporal.now.plainDateISO().toPlainYearMonth()
  );
  return (
    <main>
      <GlobalStyle>
        <Router>
          <Switch>
            <Route path="/roles/:roleID/calendar">
              <MonthSelector {...monthSelectorProps} />
              <Calendar month={monthSelectorProps.month} />
            </Route>
            <Route path="/">
              <div>welcome.</div>
            </Route>
          </Switch>
        </Router>
      </GlobalStyle>
    </main>
  );
};
