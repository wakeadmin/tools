import { ErrorPage, LandingPage, IndependentPage, MainPage } from '../components';

import { createRoutes, Navigator } from './route';
import { normalizeApps } from './options';

test('create routes', () => {
  const base = '/base';
  const apps = normalizeApps(base, [
    {
      name: '1',
      entry: '/1',
      activeRule: '/1',
    },
    {
      name: '2',
      entry: '/2',
      activeRule: '/2/3/4',
    },
    {
      name: '3',
      entry: '/3',
      activeRule: '/3',
      independent: true,
    },
  ]);

  const routes = createRoutes(base, apps);
  expect(routes).toMatchObject([
    {
      name: 'error',
      path: '/error',
      component: ErrorPage,
      meta: {
        builtin: true,
      },
    },
    {
      name: 'landing',
      path: '/landing',
      component: LandingPage,
      meta: {
        builtin: true,
      },
    },
    {
      name: '3',
      path: '/3',
      component: IndependentPage,
      meta: {
        app: {
          activeRule: '/base/3',
          container: '#root',
          entry: '/3',
          independent: true,
          name: '3',
        },
        independent: true,
      },
    },
    {
      name: 'main',
      path: '/:main*',
      component: MainPage,
      meta: {
        main: true,
      },
    },
  ]);
});

describe('navigator', () => {
  const bay = {
    baseUrl: '/',
    router: {
      push: jest.fn(),
    },
    nonIndependentApps: [
      {
        activeRule: '/base/foo',
      },
    ],
    getApp: jest.fn(() => ({
      activeRule: '/base/foo',
    })),
  };

  const nav = new Navigator(bay as any);
  const push = jest.spyOn(window.history, 'pushState');
  const replace = jest.spyOn(window.history, 'replaceState');

  beforeEach(() => {
    push.mockClear();
    replace.mockClear();
  });

  test('openError', () => {
    nav.openError({ type: 'http', code: '404' });

    expect(push).toBeCalledWith(null, '', '/error?type=http&code=404');
  });

  test('openApp', () => {
    nav.openApp({
      name: 'foo',
      query: { foo: 'bar' },
      hashPath: '/hash/path',
      hashQuery: { bar: 'baz' },
      redirect: true,
    });

    expect(replace).toBeCalledWith(null, '', '/base/foo?foo=bar#/hash/path?bar=baz');
  });

  describe('openUrl', () => {
    test('常规调用', () => {
      nav.openUrl('/full');
      expect(push).toBeCalledWith(null, '', '/full');

      nav.openUrl({
        path: '/full',
        query: { foo: 'bar' },
        hashPath: '/path',
        hashQuery: { bar: 'bar' },
      });

      expect(push).toBeCalledWith(null, '', '/full?foo=bar#/path?bar=bar');
    });

    test('已包含query', () => {
      nav.openUrl({
        path: '/full?a=b',
        query: { foo: 'bar' },
        hashPath: '/path?c=d',
        hashQuery: { bar: 'bar' },
      });

      expect(push).toBeCalledWith(null, '', '/full?a=b&foo=bar#/path?c=d&bar=bar');
    });

    test('已包含hash', () => {
      nav.openUrl({
        path: '/full?a=b#/oh/my/god',
        query: { foo: 'bar' },
        hashPath: '/path?c=d',
        hashQuery: { bar: 'bar' },
      });

      expect(push).toBeCalledWith(null, '', '/full?a=b&foo=bar#/path?c=d&bar=bar');
    });

    test('已包含 hash 2', () => {
      nav.openUrl({
        path: '/full?a=b#/oh/my/god?c=d',
        query: { foo: 'bar' },
        hashQuery: { bar: 'bar' },
      });

      expect(push).toBeCalledWith(null, '', '/full?a=b&foo=bar#/oh/my/god?c=d&bar=bar');
    });
  });

  test('openMain', () => {
    nav.openMain();
    expect(push).toBeCalledWith(null, '', '/base/foo');
  });
});
