import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GlobalStyle } from "@/components/GlobalStyle";
import { RoleCalendarPage } from "@/pages/RoleCalendarPage";
import { AssignTablePage } from "@/pages/AssignTablePage";

const queryClient = new QueryClient();

export const Root: React.FC = () => {
  return (
    <GlobalStyle>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </GlobalStyle>
  );
};
