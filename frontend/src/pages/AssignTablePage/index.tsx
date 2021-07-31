import * as React from "react";
import { createUseStyles } from "react-jss";

import { AssignTable } from "@/components/AssignTable";
import { RoleList } from "@/components/RoleList";

const useStyles = createUseStyles({
  assignTablePage: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    display: "flex",
  },
  roleList: {
    marginLeft: "30px",
  },
});

export const AssignTablePage: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  return (
    <main className={classes.assignTablePage}>
      <div className={classes.content}>
        <AssignTable />
        <div>
          <RoleList className={classes.roleList} />
        </div>
      </div>
    </main>
  );
};
