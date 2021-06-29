export type Some<T> = Readonly<{
  type: "some";
  value: T;
}>;

export const some = <T>(value: T): Some<T> => ({
  type: "some",
  value,
});

export type None = Readonly<{
  type: "none";
  none: never;
}>;

export const none: None = {
  type: "none",
} as None;

export type Option<T> = Some<T> | None;

function unwrap<T>(option: Option<T>): T | null {
  if (option.type === "some") return option.value;
  return null;
}

const map = <T, U>(f: (t: T) => U) => (option: Option<T>): Option<U> => {
  if (option.type === "some") return some(f(option.value));
  return none;
};

function of<T>(value: T | null | undefined): Option<T> {
  if (value === null || value === undefined) return none;
  return some(value);
}

const fallback = <T>(value: T) => (option: Option<T>): T => {
  if (option.type === "none") return value;
  return option.value;
};

const flatMap = <T, U>(f: (t: T) => Option<U>) => (
  option: Option<T>
): Option<U> => {
  if (option.type === "none") return none;
  return f(option.value);
};

export const Option = {
  unwrap,
  map,
  of,
  fallback,
  flatMap,
};
