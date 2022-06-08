import { getAdministrator } from './administrator';

test('getAdministrator', () => {
  const a = {};
  const t = getAdministrator(a);
  expect(t).toBe(getAdministrator(a));
  expect(t).toEqual({});
});
