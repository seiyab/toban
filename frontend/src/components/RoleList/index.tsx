import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { Role } from "@/fetch/openapi";
import { Emoji14 } from "@/components/Emoji";
import { EmojiKey } from "@/fetch/extern/github";
import { useRoles } from "@/fetch/hooks";
import { useModal } from "../layout/Modal";
import { NewRoleModal } from "../NewRoleModal";

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
    cursor: "pointer",
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
  const newRoleControl = useModal();
  return (
    <div className={classNames(classes.roleList, className)}>
      <div>Roles</div>
      <div>
        <ul>
          {roles.data?.map((role) => (
            <RoleItem key={role.id} role={role} />
          ))}
          <li>
            <button onClick={newRoleControl.open}>+</button>
          </li>
        </ul>
      </div>
      <NewRoleModal
        active={newRoleControl.active}
        close={newRoleControl.close}
      />
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
      {role.emoji && <Emoji14 emoji={role.emoji as EmojiKey} />}
      <span>{role.name}</span>
    </li>
  );
};
