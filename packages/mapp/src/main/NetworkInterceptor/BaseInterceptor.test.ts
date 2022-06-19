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

  expect(result).toEqual({ type: 'success', result: [res, res] });

  expect(fn1).toBeCalledTimes(1);
  expect(fn2).toBeCalledTimes(1);

  expect(fn1.mock.calls[0][0]).toBe(req);
  expect(fn2.mock.calls[0][0]).toBe(req);

  expect(fn1.mock.results[0].value).resolves.toBe(res);
  expect(fn2.mock.results[0].value).resolves.toBe(res);
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

  const rt = await interceptor.apply(req, request);
  expect(rt.type).toBe('error');
});
