import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EmojiKey } from "@/fetch/extern/github";

import { EmojiSelector as PureEmojiSelector } from ".";
import { withQueryClient } from "@/fetch/provider/withQueryClient";

const EmojiSelector = withQueryClient<
  React.ComponentProps<typeof PureEmojiSelector>
>()(PureEmojiSelector);

describe("EmojiSelector", () => {
  it("open", async () => {
    render(<EmojiSelector value={"+1" as EmojiKey} onSelect={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByAltText("+1")).toBeInTheDocument();
    });

    expect(screen.queryByAltText("-1")).not.toBeInTheDocument();

    fireEvent.click(screen.getByAltText("+1"));

    await waitFor(() => {
      expect(screen.getByAltText("-1")).toBeInTheDocument();
    });
  });
});
