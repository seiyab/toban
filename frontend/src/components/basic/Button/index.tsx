import * as React from "react";
import classNames from "classnames";
import { createUseStyles } from "react-jss";

type Props = Omit<JSX.IntrinsicElements["button"], "type">;

const useStyles = createUseStyles({
  button: {
    backgroundColor: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    borderRadius: "5px",
    padding: "2px 7px",
  },
});

export const Button: React.FunctionComponent<Props> = ({
  children,
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <button
      type="button"
      className={classNames(className, classes.button)}
      {...props}
    >
      {children}
    </button>
  );
};
