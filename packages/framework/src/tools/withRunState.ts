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

  const wrapped = async (...args: any[]) => {
    try {
      state.loading = true;
      state.error = undefined;
      const rtn = await action(...args);
      return rtn;
    } catch (err) {
      state.error = err as Error;
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
