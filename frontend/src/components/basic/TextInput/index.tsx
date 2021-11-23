import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { pallette } from "@/cosmetic";

type Props = Omit<JSX.IntrinsicElements["input"], "type">;

const useStyles = createUseStyles({
  whole: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottom: `1px solid ${pallette.mainDark}`,
  },
});

export const TextInput: React.VoidFunctionComponent<Props> = ({
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <input
      type="text"
      className={classNames(className, classes.whole)}
      {...props}
    />
  );
};
