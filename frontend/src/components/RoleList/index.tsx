import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { Role } from "@/fetch/openapi";
import { Emoji14 } from "@/components/Emoji";
import { EmojiKey } from "@/fetch/extern/github";
import { useRoles } from "@/fetch/hooks";

const useStyles = createUseStyles({
  roleList: {
    width: "200px",
  },
  roleItem: {
    "& + &": {
      marginTop: "3px",
    },
    "& button": {
      width: "100%",
    },
    marginLeft: "5px",
    marginRight: "5px",
  },
});

type RoleListProps = {
  className?: string;
};

export const RoleList: React.VoidFunctionComponent<RoleListProps> = ({
  className,
}) => {
  const classes = useStyles();
  const roles = useRoles();
  return (
    <div className={classNames(classes.roleList, className)}>
      <div>Roles</div>
      <div>
        <ul>
          {roles.data?.map((role) => (
            <RoleItem key={role.id} role={role} />
          ))}
        </ul>
      </div>
    </div>
  );
};

type RoleItemProps = {
  role: Role;
  className?: string;
};

export const RoleItem: React.VoidFunctionComponent<RoleItemProps> = ({
  role,
  className,
}) => {
  const classes = useStyles();
  return (
    <li className={classNames(classes.roleItem, className)}>
      <button>
        {role.emoji && <Emoji14 emoji={role.emoji as EmojiKey} />}
        <span>{role.name}</span>
      </button>
    </li>
  );
};
