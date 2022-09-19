import { Cache } from './cache';

test('cache', () => {
  window.localStorage.setItem('i18n_en', JSON.stringify({ hello: 'Hello' }));

  const cache = new Cache();

  expect(cache.get('en')).toEqual({ hello: 'Hello' });
  expect(cache.get('en')).toEqual({ hello: 'Hello' });

  cache.set('en', { hello: 'world', save: 'Save' });

  expect(cache.get('en')).toEqual({ hello: 'world', save: 'Save' });
  expect(window.localStorage.getItem('i18n_en')).toBe('{"hello":"world","save":"Save"}');
});
