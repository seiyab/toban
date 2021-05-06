import { Temporal } from "proposal-temporal";
import * as React from "react";
import { createUseStyles } from "react-jss";

type Props = {
  date: Temporal.PlainDate;
};

const useStyles = createUseStyles({
  dateCell: {
    width: "100px",
    height: "120px",
    verticalAlign: "top",
  },
});

export const DateCell: React.VoidFunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return <td className={classes.dateCell}>{props.date.day}</td>;
};
