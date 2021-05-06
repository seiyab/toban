import { Temporal } from "proposal-temporal";
import * as React from "react";
import { createUseStyles } from "react-jss";

type Props = {
  month: Temporal.PlainYearMonth;
  onClickLeft: () => void;
  onClickRight: () => void;
};

const useStyles = createUseStyles({
  wrap: {
    display: "flex",
  },
});

export const MonthSelector: React.VoidFunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      <button type="button" onClick={props.onClickLeft}>
        {"<"}
      </button>
      <span>
        {props.month.year}年{props.month.month}月
      </span>
      <button type="button" onClick={props.onClickRight}>
        {">"}
      </button>
    </div>
  );
};
