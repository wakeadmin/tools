export class PromiseQueue<T> {
  private queue: [Function, Function][] = [];

  push = (): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.queue.push([resolve, reject]);
    });
  };

  flushResolve = (value: T) => {
    if (!this.queue.length) {
      return;
    }

    const q = this.queue;
    this.queue = [];
    for (const i of q) {
      i[0](value);
    }
  };

  flushReject = (error: Error) => {
    if (!this.queue.length) {
      return;
    }

    const q = this.queue;
    this.queue = [];
    for (const i of q) {
      i[1](error);
    }
  };
}
