import { asyncModuleLoader, httpLoader } from './loader';

test('async loader', async () => {
  const res: Record<string, string> = {};
  expect(await asyncModuleLoader(async () => res)).toBe(res);
  expect(await asyncModuleLoader(async () => ({ __esModule: true, default: res }))).toBe(res);
  expect(
    await asyncModuleLoader(async () => {
      throw new Error('error');
    })
  ).toEqual(null);
});

test('fetch loader', async () => {
  const res = {};

  // @ts-expect-error
  window.fetch = jest.fn(async () => {
    return {
      ok: true,
      json() {
        return res;
      },
    };
  });

  expect(await httpLoader('http://example.com')).toBe(res);
});
