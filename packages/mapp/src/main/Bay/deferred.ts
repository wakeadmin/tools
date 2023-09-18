export class Deferred<T> {
  promise!: Promise<T>;

  resolve!: (value: T | PromiseLike<T>) => void;

  reject!: (reason?: unknown) => void;

  constructor() {
    this.reset();
  }

  reset() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export const parcelUnmountDeferred = new Deferred<void>();
parcelUnmountDeferred.resolve();

export const qiankunUnmountDeferred = new Deferred<void>();
qiankunUnmountDeferred.resolve();
