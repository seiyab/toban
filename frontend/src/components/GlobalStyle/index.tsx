import * as React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  global: {
    fontFamily: "'Noto Sans JP', sans-serif",
    "& *": {
      margin: 0,
      padding: 0,
    },
    "& ul": {
      listStyleType: "none",
    },
  },
});

export const GlobalStyle: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.global}>{children}</div>;
};
