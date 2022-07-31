import { __setMicroAppContextJustForTest } from './microAppContext';
import {
  truncateIdentifierPath,
  splitIdentifierPath,
  noEmptyString,
  trimPathSection,
  purifyUrl,
  normalizeRoute,
  normalizeUrl,
  sortByLevel,
  getQuery,
  combineRoute,
} from './utils';

test('sortByLevel', () => {
  const a: any = { level: 1 };
  const b: any = { level: 2 };
  // 降序
  expect(sortByLevel([a, b])).toEqual([{ level: 2 }, { level: 1 }]);
});

test('truncateIdentifierPath', () => {
  expect(truncateIdentifierPath('a.b.c', 3)).toBe('a.b.c');
  expect(truncateIdentifierPath('a.b.c.d', 3)).toBe('a.b.c');
  expect(truncateIdentifierPath('a.b', 3)).toBe('a.b');
});

test('splitIdentifierPath', () => {
  expect(splitIdentifierPath('')).toEqual([]);
  expect(splitIdentifierPath('hello')).toEqual(['hello']);
  expect(splitIdentifierPath('hello.world')).toEqual(['hello', 'world']);
  expect(splitIdentifierPath(' hello . world')).toEqual(['hello', 'world']);
});

test('noEmptyString', () => {
  expect(noEmptyString('')).toBeFalsy();

  // @ts-expect-error
  expect(noEmptyString(null)).toBeFalsy();

  expect(noEmptyString('  ')).toBeFalsy();

  expect(noEmptyString('x')).toBeTruthy();
});

test('purifyUrl', () => {
  expect(purifyUrl('')).toBe('/#/');
  expect(purifyUrl('#')).toBe('/#/');
  expect(purifyUrl('hello#')).toBe('/hello#/');
  expect(purifyUrl('hello#hello')).toBe('/hello#/hello');
  expect(purifyUrl('/hello')).toBe('/hello#/');
  expect(purifyUrl('/hello/')).toBe('/hello#/');
  expect(purifyUrl('/hello.html')).toBe('/hello.html#/');
  expect(purifyUrl('/hello.html?query')).toBe('/hello.html#/');
  expect(purifyUrl('/hello.html?query#')).toBe('/hello.html#/');
  expect(purifyUrl('/hello.html?query#')).toBe('/hello.html#/');
  expect(purifyUrl('/hello.html?query#/hello')).toBe('/hello.html#/hello');
  expect(purifyUrl('/hello.html?query#/hello/')).toBe('/hello.html#/hello');
  expect(purifyUrl('/hello.html?query#/hello/?query')).toBe('/hello.html#/hello');
});

test('trimPathSection', () => {
  expect(trimPathSection('')).toBe(null);
  // 无法继续裁剪
  expect(trimPathSection('/')).toBe(null);
  expect(trimPathSection('/#/')).toBe(null);

  // 裁剪 path
  expect(trimPathSection('/hello')).toBe('/#/');
  expect(trimPathSection('/hello#')).toBe('/#/');
  expect(trimPathSection('/hello#/')).toBe('/#/');
  expect(trimPathSection('/hello/world')).toBe('/hello#/');
  expect(trimPathSection('/hello/world#')).toBe('/hello#/');
  expect(trimPathSection('/hello/world#/')).toBe('/hello#/');

  // 先裁剪 hash 再裁剪 path
  expect(trimPathSection('/hello#/hello')).toBe('/hello#/');
  expect(trimPathSection('/hello#/hello/world')).toBe('/hello#/hello');
  expect(trimPathSection('/hello/world#/hello/world')).toBe('/hello/world#/hello');
});

test('getQuery', () => {
  expect(getQuery('').toString()).toBe('');
  expect(getQuery('abc').toString()).toBe('');
  expect(getQuery('abc?a=1&b=2').toString()).toBe('a=1&b=2');
});

test('combineRoute', () => {
  expect(combineRoute('hash', '/', '/')).toBe('/#/');
  expect(combineRoute('hash', '/', '/foo/bar')).toBe('/#/foo/bar');
  expect(combineRoute('hash', '/foo#boar', '/foo/bar')).toBe('/foo#/foo/bar');
  expect(combineRoute('hash', '/foo?query#boar', '/foo/bar')).toBe('/foo?query#/foo/bar');

  // history
  expect(combineRoute('history', '/', '/')).toBe('/');
  expect(combineRoute('history', '/', '/foo')).toBe('/foo');
  expect(combineRoute('history', '/foo', '/bar')).toBe('/foo/bar');
  expect(combineRoute('history', '/foo#/foo', '/bar')).toBe('/foo/bar');
  expect(combineRoute('history', '/foo#/foo', '/bar#/bar')).toBe('/foo/bar#/bar');
  expect(combineRoute('history', '/foo?a=1&b=2', '/bar?a=2&c=3')).toBe('/foo/bar?a=2&b=2&c=3');
  expect(combineRoute('history', '/foo?a=1&b=2#/foo', '/bar?a=2&c=3#/bar')).toBe('/foo/bar?a=2&b=2&c=3#/bar');
});

test('normalizeUrl', () => {
  expect(normalizeUrl('')).toBe('/');
  expect(normalizeUrl('/')).toBe('/');
  expect(normalizeUrl('/hello/')).toBe('/hello');
  expect(normalizeUrl('hello')).toBe('/hello');
  expect(normalizeUrl('hello?world')).toBe('/hello?world');
  expect(normalizeUrl('hello?world')).toBe('/hello?world');
  expect(normalizeUrl('hello/?world')).toBe('/hello?world');

  expect(normalizeUrl('hello#hello')).toBe('/hello#/hello');
  expect(normalizeUrl('hello/#hello/')).toBe('/hello#/hello');
  expect(normalizeUrl('hello?query#hello?hashQuery')).toBe('/hello?query#/hello?hashQuery');
});

test('normalizeRoute', () => {
  expect(normalizeRoute('http://example.com')).toEqual({
    raw: 'http://example.com',
    url: 'http://example.com',
    matchable: 'http://example.com',
    routeType: 'href',
  });

  expect(normalizeRoute(`@/hello/world?query#/hello/world?hashQuery`)).toEqual({
    raw: '@/hello/world?query#/hello/world?hashQuery',
    url: '/hello/world?query#/hello/world?hashQuery',
    matchable: '/hello/world#/hello/world',
    routeType: 'outside',
  });

  // with root
  expect(normalizeRoute('/hello/world?hashQuery', '/hello?query#/trim')).toEqual({
    raw: '/hello/world?hashQuery',
    url: '/hello?query#/hello/world?hashQuery',
    matchable: '/hello#/hello/world',
    routeType: 'subRoute',
  });

  // history 模式
  __setMicroAppContextJustForTest({ routeMode: 'history', name: 'test', entry: 'entry', activeRule: '/' });
  expect(normalizeRoute('/hello/world?hashQuery', '/hello?query#/trim')).toEqual({
    raw: '/hello/world?hashQuery',
    url: '/hello/hello/world?query=&hashQuery=',
    matchable: '/hello/hello/world#/',
    routeType: 'subRoute',
  });
  __setMicroAppContextJustForTest(null);

  expect(normalizeRoute('hello/world?hashQuery')).toEqual({
    raw: 'hello/world?hashQuery',
    url: '/hello/world?hashQuery',
    matchable: '/hello/world#/',
    routeType: 'main',
  });
});
