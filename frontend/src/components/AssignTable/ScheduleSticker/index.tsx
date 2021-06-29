import * as React from "react";
import { createUseStyles } from "react-jss";

type Props = {
  length: number;
};

const useStyles = createUseStyles({
  assignmentSticker: ({ length }: { length: number }) => ({
    backgroundColor: "#05f",
    height: `${length * 30}px`,
    zIndex: 10,
  }),
});

export const ScheduleSticker: React.FunctionComponent<Props> = ({
  length,
  children,
}) => {
  const classes = useStyles({ length });
  return <div className={classes.assignmentSticker}>{children}</div>;
};
