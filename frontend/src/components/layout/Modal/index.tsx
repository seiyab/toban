import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";

type Props = {
  active: boolean;
  onClickOutside: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};

const useStyles = createUseStyles({
  cover: {
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
  },
});

export const Modal: React.FunctionComponent<Props> = ({
  active,
  onClickOutside,
  className,
  children,
}) => {
  const classes = useStyles();
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const onClickCover: JSX.IntrinsicElements["div"]["onClick"] = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target != coverRef.current) return;
    onClickOutside(event);
  };
  if (!active) return null;
  return (
    <div className={classes.cover} onClick={onClickCover} ref={coverRef}>
      <div className={classNames(className)}>{children}</div>
    </div>
  );
};

type UseModalResult = {
  active: boolean;
  close: () => void;
  open: () => void;
};

export function useModal(initialActive?: boolean): UseModalResult {
  const [active, setActive] = React.useState(initialActive ?? false);
  const effects = React.useMemo(
    () => ({
      close: () => setActive(false),
      open: () => setActive(true),
    }),
    []
  );
  return {
    active,
    ...effects,
  };
}
