import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { EmojiKey, useGitHubEmojis } from "@/fetch/extern/github";

type Props = {
  emoji: EmojiKey;
  className?: string;
};

const styles = {
  size14: {
    width: "14px",
    height: "14px",
  },
} as const;

const useStyles = createUseStyles(styles);

const create = (
  className: keyof typeof styles
): React.VoidFunctionComponent<Props> => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const classes = useStyles();
    const emojis = useGitHubEmojis();
    if (!emojis.isSuccess) return null;
    const d = emojis.data as Record<string, string>;
    const src = d[props.emoji];
    return (
      <>
        {src && (
          <img
            className={classNames(classes[className], props.className)}
            src={d[props.emoji]}
          />
        )}
      </>
    );
  };
};

export const Emoji14: React.VoidFunctionComponent<Props> = create("size14");
