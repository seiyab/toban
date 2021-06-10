import * as React from "react";
import { createUseStyles } from "react-jss";

import { Modal } from "@/components/layout/Modal";
import { EmojiSelector, useEmojiSelector } from "@/components/EmojiSelector";
import { useNewRole } from "@/fetch/hooks";
import { useTextInput } from "@/general/dom";

type Props = {
  active: boolean;
  close: () => void;
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
  close,
}) => {
  const classes = useStyles();
  const textInputControl = useTextInput();
  const emojiSelectorControl = useEmojiSelector();
  const mutation = useNewRole();
  const handleSubmit = () => {
    mutation.mutate({
      name: textInputControl.value,
      emoji: emojiSelectorControl.value,
    });
    close();
  };
  return (
    <Modal
      active={active}
      onClickOutside={close}
      className={classes.modalContent}
    >
      <div className={classes.form}>
        <EmojiSelector
          value={emojiSelectorControl.value}
          onSelect={emojiSelectorControl.onSelect}
        />
        <input
          placeholder="Name of role"
          value={textInputControl.value}
          onChange={textInputControl.handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </Modal>
  );
};
