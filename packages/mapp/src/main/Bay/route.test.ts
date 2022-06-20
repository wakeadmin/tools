import { ErrorPage, LandingPage, IndependentPage, MainPage } from '../components';

import { createRoutes } from './route';
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
