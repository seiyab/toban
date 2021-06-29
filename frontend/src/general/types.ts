// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyKey = keyof any;

export type Overload<Super, Sub> = Omit<Super, keyof Sub> & Sub;
