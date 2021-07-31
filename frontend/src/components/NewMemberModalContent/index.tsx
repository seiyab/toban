import * as React from "react";
import { useTextInput } from "@/general/dom";
import { createUseStyles } from "react-jss";
import { useNewMember } from "@/fetch/hooks";

type Props = {
  onCancel: () => void;
  onSubmit: () => void;
};

const useStyles = createUseStyles({
  whole: {
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

export const NewMemberModalContent: React.VoidFunctionComponent<Props> = ({
  onCancel,
  onSubmit,
}) => {
  const classes = useStyles();
  const textInputControl = useTextInput();
  const mutation = useNewMember();

  const submit = () => {
    mutation.mutate({
      name: textInputControl.value,
    });
    textInputControl.setValue("");
    onSubmit();
  };

  return (
    <div className={classes.whole}>
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
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
