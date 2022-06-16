import { watchEffect } from '@wakeadmin/demi';
import { withRunState } from './withRunState';

describe('withRunState', () => {
  it('loading 需要正常被设置', async () => {
    const fn = jest.fn(() => Promise.resolve('test'));

    const wrapped = withRunState(fn);
    const rtn = wrapped();
    expect(wrapped.loading).toBe(true);
    expect(wrapped.error).toBe(undefined);
    expect(rtn).resolves.toBe('test');
    await rtn;
    expect(wrapped.loading).toBe(false);
    expect(wrapped.error).toBe(undefined);
  });

  it('error 需要正常被设置', async () => {
    const error = new Error('test');
    const fn = jest.fn(() => Promise.reject(error));

    const wrapped = withRunState(fn);
    const rtn = wrapped();
    expect(wrapped.error).toBe(undefined);
    expect(rtn).rejects.toThrow('test');
    await Promise.resolve();
    expect(wrapped.error).toBe(error);
  });

  it('loading, error 需要能被响应', async () => {
    const fn = jest.fn(() => Promise.resolve('test'));
    const wrapped = withRunState(fn);
    const loadingReactiveList: boolean[] = [];

    watchEffect(() => loadingReactiveList.push(wrapped.loading));

    await wrapped();

    expect(loadingReactiveList).toEqual([false, true, false]);
  });

  it('和类配合使用', async () => {
    class Test {
      foo = 'bar';
      fn = withRunState(async () => {
        return this.foo;
      });
    }

    const test = new Test();
    expect(test.fn.loading).toBeFalsy();
    const result = test.fn();
    expect(test.fn.loading).toBeTruthy();
    expect(result).resolves.toBe('bar');
  });
});
