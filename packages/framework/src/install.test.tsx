/* eslint-disable vue/one-component-per-file */
// vue3 页面作用域测试
/** @jsx h */
import { cleanup } from '@testing-library/vue';
import { createApp, App, defineComponent } from '@wakeadmin/demi';
import { h } from '@wakeadmin/h';
import { RouterView, Router, createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import { plugin } from './install';

const NoopComponent = (name: string) =>
  defineComponent({
    render() {
      return <div title="page">{name}</div>;
    },
  });

const Wrapper = defineComponent({
  render() {
    return (
      <div title="wrapper">
        <RouterView></RouterView>
      </div>
    );
  },
});

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Wrapper,
    children: [
      {
        path: '/foo',
        component: NoopComponent('Foo'),
      },
      {
        path: '/bar',
        component: NoopComponent('Bar'),
      },
    ],
  },
];

function initialApp(): [App, Router] {
  const app = createApp({
    render() {
      return (
        <div class="app">
          <RouterView />
        </div>
      );
    },
  });
  const router = createRouter({
    routes,
    history: createWebHistory(),
  });

  app.use(router);
  app.use(plugin);

  return [app, router];
}

afterEach(cleanup);

test('挂载到页面实例', async () => {
  const [app, router] = initialApp();

  app.mount('body');

  router.push('/');


  console.log(document.body.innerHTML);
});
