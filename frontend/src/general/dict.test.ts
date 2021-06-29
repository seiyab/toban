import { expect, it } from "@jest/globals";

import { Option } from "@/general/option";

import { Dict } from "./dict";

it("Dict", () => {
  const fixture = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 3, name: "orange" },
    { id: 4, name: "grape" },
  ];
  const d = Dict.fromArray(fixture, ({ id }) => id);
  expect(d.get(1)).toEqual(Option.of(fixture[0]));
  expect(d.get(3)).toEqual(Option.of(fixture[2]));
  expect(d.get(100)).toEqual(Option.of(null));
});
