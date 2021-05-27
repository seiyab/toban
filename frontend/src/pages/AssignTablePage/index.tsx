import * as React from "react";
import { createUseStyles } from "react-jss";

import { AssignTable } from "@/components/AssignTable";
import { RoleList } from "@/components/RoleList";
import { NewMemberButton } from "@/components/NewMemberButton";
import { EmojiSelector, useEmojiSelector } from "@/components/EmojiSelector";

const useStyles = createUseStyles({
  assignTablePage: {
    display: "flex",
  },
  roleList: {
    marginLeft: "30px",
  },
});

export const AssignTablePage: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const emojiSelectorControl = useEmojiSelector();
  return (
    <main className={classes.assignTablePage}>
      <AssignTable />
      <div>
        <NewMemberButton />
        <EmojiSelector
          value={emojiSelectorControl.value}
          onSelect={emojiSelectorControl.onSelect}
        />
        <RoleList className={classes.roleList} />
      </div>
    </main>
  );
};
