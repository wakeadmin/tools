import { BaseInterceptor } from './BaseInterceptor';

test('BaseInterceptor 未注册情况', async () => {
  const interceptor = new BaseInterceptor();
  const req: any = {};
  const res: any = {};
  const request = jest.fn(() => Promise.resolve(res));

  await interceptor.apply(req, request);

  expect(request).toBeCalled();
});

test('BaseInterceptor', async () => {
  const interceptor = new BaseInterceptor();

  const fn1 = jest.fn(async (req, next) => next());
  const fn2 = jest.fn(async (req, next) => next());

  interceptor.register(fn1);
  interceptor.register(fn2);

  const req: any = {};
  const res: any = {};
  const request = async () => res;

  const result = await interceptor.apply(req, request);

  expect(result).toEqual([res, res]);
  expect(fn1).toBeCalledTimes(1);
  expect(fn2).toBeCalledTimes(1);

  expect(fn1.mock.calls[0][0]).toBe(req);
  expect(fn2.mock.calls[0][0]).toBe(req);
});

test('BaseInterceptor error', async () => {
  const interceptor = new BaseInterceptor();

  const fn1 = jest.fn(async (req, next) => next());
  const fn2 = jest.fn(async (req, next) => next());

  interceptor.register(fn1);
  interceptor.register(fn2);

  const req: any = {};
  const request = async () => {
    throw new Error('test');
  };

  expect(interceptor.apply(req, request)).rejects.toThrowError('test');
});
