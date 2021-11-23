import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { OutsideListener } from "@/components/OutsideListener";
import { EmojiKey, useGitHubEmojis } from "@/fetch/extern/github";
import { Emoji20 } from "@/components/Emoji";
import { useTextInput } from "@/components/basic/TextInput/hooks";

type Props = {
  className?: string;
  value: EmojiKey;
  onSelect: (target: EmojiKey) => void;
};

const useStyles = createUseStyles({
  whole: {
    position: "relative",
  },
  foreground: {
    zIndex: 1,
    position: "absolute",
    backgroundColor: "#fff",
    padding: "10px",
    boxShadow: "0 0 5px #888",
    borderRadius: "5px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridAutoRows: "auto",
    gap: "5px",
    maxHeight: "400px",
    overflow: "scroll",
    marginTop: "8px",
  },
});

type UseEmojiSelectorResult = Pick<Props, "value" | "onSelect">;

export function useEmojiSelector(
  initialValue: EmojiKey = "rocket" as EmojiKey
): UseEmojiSelectorResult {
  const [value, setValue] = React.useState(initialValue);
  const onSelect = React.useCallback(
    (target: EmojiKey) => setValue(target),
    []
  );
  return {
    value,
    onSelect,
  };
}

export const EmojiSelector: React.VoidFunctionComponent<Props> = ({
  className,
  value,
  onSelect,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const emojis = useGitHubEmojis();
  const textInputControl = useTextInput();
  const openEmojiList = () => {
    textInputControl.setValue("");
    setIsOpen(true);
  };
  const selectAndClose = (key: EmojiKey) => () => {
    onSelect(key);
    setIsOpen(false);
  };
  return (
    <div className={classNames(className, classes.whole)}>
      <div onClick={openEmojiList}>
        <Emoji20 emoji={value} />
      </div>
      {isOpen && (
        <div className={classes.foreground}>
          <OutsideListener onClick={() => setIsOpen(false)}>
            <div>
              <input
                type="text"
                value={textInputControl.value}
                onChange={textInputControl.handleChange}
              />
              <div className={classes.list}>
                {Object.keys(emojis.data ?? {})
                  .filter((key) => key.startsWith(textInputControl.value))
                  .slice(0, 50)
                  .map((key) => (
                    <Emoji20
                      key={key}
                      emoji={key as EmojiKey}
                      onClick={selectAndClose(key as EmojiKey)}
                    />
                  ))}
              </div>
            </div>
          </OutsideListener>
        </div>
      )}
    </div>
  );
};
