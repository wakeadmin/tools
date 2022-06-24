import { reactive } from '@wakeadmin/demi';

/**
 * 为异步方法自动追加 loading 和 error 状态
 * @param action
 * @returns
 */
export function withRunState<T extends Function>(action: T) {
  const state = reactive<{ loading?: boolean; error?: Error }>({
    loading: false,
    error: undefined,
  });

  // 并发调用合并
  let queue: [Function, Function][] = [];
  const flushQueue = (type: 'resolve' | 'reject', value: any) => {
    if (queue.length === 0) {
      return;
    }

    const q = queue;
    queue = [];
    q.forEach(([resolve, reject]) => {
      const fn = type === 'resolve' ? resolve : reject;
      fn(value);
    });
  };

  const wrapped = async (...args: any[]) => {
    if (state.loading) {
      return await new Promise((resolve, reject) => {
        queue.push([resolve, reject]);
      });
    }

    try {
      state.loading = true;
      state.error = undefined;
      const rtn = await action(...args);
      flushQueue('resolve', rtn);
      return rtn;
    } catch (err) {
      state.error = err as Error;
      flushQueue('reject', err);
      throw err;
    } finally {
      state.loading = false;
    }
  };

  Object.defineProperties(wrapped, {
    loading: {
      get() {
        return state.loading;
      },
      set(value: boolean) {
        state.loading = value;
      },
    },
    error: {
      get() {
        return state.error;
      },
      set(value?: Error) {
        state.error = value;
      },
    },
  });

  return wrapped as unknown as T & { loading: boolean; error?: Error };
}
