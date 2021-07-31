import * as React from "react";
import { createUseStyles } from "react-jss";

import { Modal, useModal } from "@/components/layout/Modal";
import { NewMemberModalContent } from "@/components/NewMemberModalContent";
import { Button } from "@/components/basic/Button";
import { pallette } from "@/cosmetic";

const useStyles = createUseStyles({
  button: {
    backgroundColor: pallette.mainLight,
    color: pallette.background,
  },
});

export const NewMemberButton: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();
  const modalControl = useModal();
  return (
    <>
      <Modal active={modalControl.active} onClickOutside={modalControl.close}>
        <NewMemberModalContent
          onCancel={modalControl.close}
          onSubmit={modalControl.close}
        />
      </Modal>
      <Button className={classes.button} onClick={modalControl.open}>
        {children}
      </Button>
    </>
  );
};
