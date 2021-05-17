import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";

const styles = {
  table: {
    display: "table",
  },
  tableRow: {
    display: "table-row",
  },
  tableCell: {
    display: "table-cell",
  },
} as const;

const useStyles = createUseStyles(styles);

type DivProps = React.HTMLAttributes<HTMLDivElement>;

function create(className: keyof typeof styles): React.FC<DivProps> {
  return ({ children, ...props }) => {
    const classes = useStyles();
    const cn = classNames(classes[className], props["className"]);
    return (
      <div className={cn} {...props}>
        {children}
      </div>
    );
  };
}

export const DivTable: React.FC<DivProps> = create("table");
export const DivRow: React.FC<DivProps> = create("tableRow");
export const DivCell: React.FC<DivProps> = create("tableCell");
