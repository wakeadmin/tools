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
      path: '/base/error',
      component: ErrorPage,
      meta: {
        builtin: true,
      },
    },
    {
      name: 'landing',
      path: '/base/landing',
      component: LandingPage,
      meta: {
        builtin: true,
      },
    },
    {
      name: '3',
      path: '/base/3',
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

    expect(bay.router.push).toBeCalledWith({ name: 'error', query: { code: '404', type: 'http' }, replace: undefined });
  });

  test('openApp', () => {
    nav.openApp({ name: 'foo', route: { path: '/custom', query: { foo: 'bar' }, redirect: true } });

    expect(replace).toBeCalledWith(null, '', '/base/foo#/custom?foo=bar');
  });

  test('openUrl', () => {
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

  test('openMain', () => {
    nav.openMain();
    expect(push).toBeCalledWith(null, '', '/base/foo');
  });
});
