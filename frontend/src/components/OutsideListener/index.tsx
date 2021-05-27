import * as React from "react";

type Props = {
  onClick?: (event: MouseEvent) => void;
  children: React.ReactChild;
};

export const OutsideListener: React.FunctionComponent<Props> = ({
  onClick,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!onClick) return;
      if (ref.current === null) return;
      if (event.composedPath().includes(ref.current)) return;
      onClick(event);
    };
    window.document.addEventListener("click", listener);
    return () => window.document.removeEventListener("click", listener);
  }, [onClick]);
  return <div ref={ref}>{children}</div>;
};
