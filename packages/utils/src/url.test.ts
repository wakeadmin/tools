import { trimQuery, joinQuery } from './url';

test('joinQuery', () => {
  expect(joinQuery('/', '')).toBe('/');
  expect(joinQuery('/', 'a=b')).toBe('/?a=b');
  expect(joinQuery('/', '?a=b')).toBe('/?a=b');
  expect(joinQuery('/?a=b', '?c=d')).toBe('/?a=b&c=d');
});

test('trimQuery', () => {
  expect(trimQuery('')).toBe('');
  expect(trimQuery('hello')).toBe('hello');
  expect(trimQuery('hello?')).toBe('hello');
  expect(trimQuery('hello?hello')).toBe('hello');
  expect(trimQuery('hello?hello?world')).toBe('hello');
});
