import { watchEffect } from 'vue';
import { UniverseHistory } from './UniverseHistory';

beforeAll(() => {
  jest.useFakeTimers();
});

describe('UniverseLocation', () => {
  const h = new UniverseHistory();
  let location: any;

  watchEffect(
    () => {
      location = h.location;
    },
    { flush: 'sync' }
  );

  expect(h.location).toEqual({
    hashPath: '/',
    hashQuery: {},
    href: 'http://localhost/',
    path: '/',
    query: {},
  });
  expect(h.location).toBe(location);

  test('pushState', () => {
    // 变更路径
    history.pushState({}, 'test', '/base/foo?a=1&b=2#/bar?c=3&d=4');
    expect(h.location).toEqual({
      hashPath: '/bar',
      hashQuery: { c: '3', d: '4' },
      href: 'http://localhost/base/foo?a=1&b=2#/bar?c=3&d=4',
      path: '/base/foo',
      query: { a: '1', b: '2' },
    });
    expect(h.location).toBe(location);
  });

  test('pushState by hash', () => {
    // 变更 hash
    history.pushState({}, 'test', '#/baz?a=1&b=2');
    expect(h.location).toEqual({
      hashPath: '/baz',
      hashQuery: { a: '1', b: '2' },
      href: 'http://localhost/base/foo?a=1&b=2#/baz?a=1&b=2',
      path: '/base/foo',
      query: { a: '1', b: '2' },
    });
    expect(h.location).toBe(location);
  });

  test('replaceState', () => {
    // replace
    history.replaceState({}, 'test', '/bar');
    expect(h.location).toEqual({
      hashPath: '/',
      hashQuery: {},
      href: 'http://localhost/bar',
      path: '/bar',
      query: {},
    });
    expect(h.location).toBe(location);
  });

  test('back', () => {
    // back
    history.back();
    // jsdom 会使用setTimeout 调度 back
    jest.runAllTimers();
    expect(h.location).toEqual({
      hashPath: '/bar',
      hashQuery: { c: '3', d: '4' },
      href: 'http://localhost/base/foo?a=1&b=2#/bar?c=3&d=4',
      path: '/base/foo',
      query: { a: '1', b: '2' },
    });
    expect(h.location).toBe(location);
  });

  test('location set hash', () => {
    window.location.hash = '#/hash?a=1&b=2';
    // jsdom 会使用setTimeout 调度 back
    jest.runAllTimers();
    expect(h.location).toEqual({
      hashPath: '/hash',
      hashQuery: { a: '1', b: '2' },
      href: 'http://localhost/base/foo?a=1&b=2#/hash?a=1&b=2',
      path: '/base/foo',
      query: { a: '1', b: '2' },
    });
    expect(h.location).toBe(location);
  });
});
