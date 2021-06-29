import * as React from "react";
import { createUseStyles } from "react-jss";

import { useTextInput } from "@/general/dom";
import { Modal, useModal } from "@/components/layout/Modal";
import { useNewMember } from "@/fetch/hooks";

const useStyles = createUseStyles({
  modalContent: {
    alignItems: "center",
    borderRadius: "15px",
    padding: "50px",
    backgroundColor: "#fff",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export const NewMemberButton: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const modalControl = useModal();
  const textInputControl = useTextInput();
  const mutation = useNewMember();
  const submit = () => {
    mutation.mutate({
      name: textInputControl.value,
    });
    modalControl.close();
    textInputControl.setValue("");
  };
  return (
    <>
      <Modal active={modalControl.active} onClickOutside={modalControl.close}>
        <div className={classes.modalContent}>
          <label>
            Name:
            <input
              type="text"
              value={textInputControl.value}
              onChange={textInputControl.handleChange}
            />
          </label>
          <div className={classes.buttons}>
            <button onClick={submit}>Submit</button>
            <button onClick={modalControl.close}>Cancel</button>
          </div>
        </div>
      </Modal>
      <button type="button" onClick={modalControl.open}>
        Add a New Member
      </button>
    </>
  );
};
