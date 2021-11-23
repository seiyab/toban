import * as React from "react";
import { expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react-hooks/dom";

import { BASE_PATH } from "@/fetch/openapi";
import { client } from "@/fetch/client";
import { useGitHubEmojis } from "@/fetch/extern/github";
import { waitFor } from "@testing-library/react";
import { withQueryClient } from "@/fetch/provider/withQueryClient";

it("msw internal", async () => {
  const d = await (await fetch(BASE_PATH + "/test")).json();
  expect(d["hello"]).toBe("msw");
});

it("msw external", async () => {
  const d = await (await fetch("https://api.github.com/emojis")).json();
  expect(Object.keys(d)).toContain("+1");
});

it("msw + openapi internal", async () => {
  const r = await client.getRoles();
  expect(r[0]).toEqual({
    emoji: "+1",
    id: 0,
    name: "role-0",
  });
});

it("msw + react query external", async () => {
  const wrapper = withQueryClient<Record<string, unknown>>()(({ children }) => (
    <>{children}</>
  ));
  const { result } = renderHook(() => useGitHubEmojis(), { wrapper });
  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(Object.keys(result.current.data!)).toContain("+1");
  });
});
