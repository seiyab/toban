import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GlobalStyle } from "@/components/GlobalStyle";
import { RoleCalendarPage } from "@/pages/RoleCalendarPage";
import { AssignTablePage } from "@/pages/AssignTablePage";
import { withQueryClient } from "@/fetch/provider/withQueryClient";

const PureRoot: React.FC = () => {
  return (
    <GlobalStyle>
      <Router>
        <Switch>
          <Route path="/roles/:roleID/calendar">
            <RoleCalendarPage />
          </Route>
          <Route path="/">
            <AssignTablePage />
          </Route>
        </Switch>
      </Router>
    </GlobalStyle>
  );
};

export const Root = withQueryClient()(PureRoot);
