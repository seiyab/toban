import { Option } from "./option";
import { AnyKey } from "./types";

export class Dict<T, Key extends AnyKey> {
  private readonly data: { [k in Key]: T };

  private constructor(data: { [k in Key]: T }) {
    this.data = data;
  }

  public static fromArray<T, Key extends AnyKey>(
    arr: T[],
    key: (t: T) => Key
  ): Dict<T, Key> {
    const data = Object.fromEntries(arr.map((item) => [key(item), item]));
    return new Dict(data as { [k in Key]: T });
  }

  public get(key: Key): Option<T> {
    return Option.of(this.data[key]);
  }
}
