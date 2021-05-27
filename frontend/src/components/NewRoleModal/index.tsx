import * as React from "react";
import { createUseStyles } from "react-jss";

import { Modal } from "@/components/layout/Modal";
import { EmojiSelector, useEmojiSelector } from "@/components/EmojiSelector";

type Props = {
  active: boolean;
  onClickOutside: () => void;
};

const useStyles = createUseStyles({
  modalContent: {
    backgroundColor: "#fff",
    boxShadow: "0 0 5px #888",
    padding: "30px",
    borderRadius: "5px",
  },
  form: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    "& input": {
      fontSize: "20px",
    },
    "& button": {
      fontSize: "20px",
    },
  },
});

export const NewRoleModal: React.VoidFunctionComponent<Props> = ({
  active,
  onClickOutside,
}) => {
  const classes = useStyles();
  const emojiSelectorControl = useEmojiSelector();
  return (
    <Modal
      active={active}
      onClickOutside={onClickOutside}
      className={classes.modalContent}
    >
      <div className={classes.form}>
        <EmojiSelector
          value={emojiSelectorControl.value}
          onSelect={emojiSelectorControl.onSelect}
        />
        <input placeholder="Name of role" />
        <button type="button">submit</button>
      </div>
    </Modal>
  );
};
