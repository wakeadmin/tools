import { injectable } from '@wakeadmin/framework';

export interface PromiseQueueItem<T> {
  resolve(value: T): void;
  reject(error: Error): void;
}

declare global {
  interface DIMapper {
    'DI.bay.promiseQueue': PromiseQueue<any>;
  }
}

/**
 * 用于处理并发请求，比如多个地方同时发起登录请求
 * 我们只能让其中一个进行处理，其他的请求等待
 */
@injectable()
export class PromiseQueue<T> {
  private queue: PromiseQueueItem<T>[] = [];

  /**
   * 返回一个 promise 用于等待
   */
  push = () => {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ resolve, reject });
    });
  };

  /**
   * 清空队列, 正常结束
   */
  flushResolve = (value: T) => {
    this.queue.forEach(item => item.resolve(value));
    this.queue = [];
  };

  /**
   * 清空队列, 移除结束
   */
  flushReject = (error: Error) => {
    this.queue.forEach(item => item.reject(error));
    this.queue = [];
  };
}
