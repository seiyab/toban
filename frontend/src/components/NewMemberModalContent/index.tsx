import * as React from "react";
import { useTextInput } from "@/components/basic/TextInput/hooks";
import { createUseStyles } from "react-jss";
import { useNewMember } from "@/fetch/hooks";
import { pallette } from "@/cosmetic";
import { Button } from "@/components/basic/Button";

type Props = {
  onCancel: () => void;
  onSubmit: () => void;
};

const useStyles = createUseStyles({
  whole: {
    alignItems: "center",
    borderRadius: "15px",
    borderColor: pallette.mainLight,
    borderWidth: "2px",
    borderStyle: "solid",
    padding: "50px",
    backgroundColor: pallette.background,
    color: pallette.character,
  },
  header: {
    width: "100%",
    textAlign: "center",
  },
  form: {
    marginTop: "10px",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  submit: {
    backgroundColor: pallette.mainDark,
    color: pallette.background,
  },
  cancel: {
    backgroundColor: "transparent",
    borderColor: pallette.mainDark,
    borderWidth: "2px",
    borderStyle: "solid",
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
      <div className={classes.header}>Add a member</div>
      <form className={classes.form}>
        <label>
          Name:
          <input
            type="text"
            value={textInputControl.value}
            onChange={textInputControl.handleChange}
          />
        </label>
      </form>
      <div className={classes.buttons}>
        <Button onClick={submit} className={classes.submit}>
          Submit
        </Button>
        <Button onClick={onCancel} className={classes.cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
