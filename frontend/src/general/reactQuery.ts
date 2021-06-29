import { AnyKey, Overload } from "@/general/types";

type LooseAsyncResult<T> = {
  isError: false;
  isIdle: false;
  isLoading: false;
  isSuccess: false;
  data?: T;
};

export type AsyncResult<T> =
  | Overload<LooseAsyncResult<T>, { isIdle: true }>
  | Overload<LooseAsyncResult<T>, { isLoading: true }>
  | Overload<LooseAsyncResult<T>, { isError: true }>
  | Overload<LooseAsyncResult<T>, { isSuccess: true; data: T }>;

const template = {
  isError: false,
  isIdle: false,
  isLoading: false,
  isSuccess: false,
} as const;

type JoinResult<
  R extends { [k in AnyKey]: AsyncResult<unknown> }
> = AsyncResult<
  {
    [k in keyof R]: Exclude<R[k]["data"], undefined>;
  }
>;

function join<R extends { [k in AnyKey]: AsyncResult<unknown> }>(
  results: R
): JoinResult<R> {
  if (Object.values<AsyncResult<unknown>>(results).some((r) => r.isError)) {
    return {
      ...template,
      isError: true,
    };
  }
  if (Object.values<AsyncResult<unknown>>(results).some((r) => r.isLoading)) {
    return {
      ...template,
      isLoading: true,
    };
  }
  if (Object.values<AsyncResult<unknown>>(results).some((r) => r.isIdle)) {
    return {
      ...template,
      isIdle: true,
    };
  }
  if (Object.values<AsyncResult<unknown>>(results).every((r) => r.isSuccess)) {
    return {
      ...template,
      isSuccess: true,
      data: Object.fromEntries(
        Object.entries<AsyncResult<unknown>>(results).map(([key, value]) => [
          key,
          value.data,
        ])
      ) as { [k in keyof R]: Exclude<R[k]["data"], undefined> },
    };
  }
  return {
    ...template,
    isError: true,
  };
}

const map = <T, U>(f: (t: T) => U) => (
  result: AsyncResult<T>
): AsyncResult<U> => {
  if (result.isSuccess) {
    return {
      ...result,
      data: f(result.data),
    };
  }
  return {
    ...result,
    data: undefined,
  };
};
export const AsyncResult = {
  join,
  map,
};
