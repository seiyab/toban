export function pipe<T>(value: T): Pipe<T> {
  return Pipe.of(value);
}

class Pipe<T> {
  private value: T;

  private constructor(value: T) {
    this.value = value;
  }

  public static of<T>(value: T): Pipe<T> {
    return new Pipe(value);
  }

  public and<U>(f: (t: T) => U): Pipe<U> {
    return new Pipe(f(this.value));
  }

  public end(): T {
    return this.value;
  }
}
