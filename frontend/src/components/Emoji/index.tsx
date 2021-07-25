import classNames from "classnames";
import * as React from "react";
import { createUseStyles } from "react-jss";

import { EmojiKey, useGitHubEmojis } from "@/fetch/extern/github";

type Props = {
  emoji: EmojiKey;
} & Omit<JSX.IntrinsicElements["img"], "src">;

const styles = {
  size14: {
    width: "14px",
    height: "14px",
  },
  size20: {
    width: "20px",
    height: "20px",
  },
} as const;

const useStyles = createUseStyles(styles);

const create = (
  styleKey: keyof typeof styles
): React.VoidFunctionComponent<Props> => {
  // eslint-disable-next-line react/display-name
  return ({ className, ...props }) => {
    const classes = useStyles();
    const emojis = useGitHubEmojis();
    if (!emojis.isSuccess) return null;
    const d = emojis.data as Record<string, string>;
    const src = d[props.emoji];
    return (
      <>
        {src && (
          <img
            className={classNames(classes[styleKey], className)}
            src={d[props.emoji]}
            alt={props.emoji}
            {...props}
          />
        )}
      </>
    );
  };
};

export const Emoji14: React.VoidFunctionComponent<Props> = create("size14");
export const Emoji20: React.VoidFunctionComponent<Props> = create("size20");
