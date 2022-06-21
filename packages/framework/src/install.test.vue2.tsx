/* eslint-disable vue/one-component-per-file */
// vue2 页面作用域测试
import { createApp, defineComponent } from '@wakeadmin/demi';
import VueRouter, { RouteConfig } from 'vue-router-3';
import { plugin } from './install';
import { NoopComponent, testSuite } from './install.test.share';

const Wrapper = defineComponent({
  name: 'Wrapper',
  render() {
    return (
      <div title="wrapper">
        <router-view></router-view>
      </div>
    );
  },
});

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Wrapper,
    children: [
      {
        path: '/foo',
        component: async () => NoopComponent('Foo'),
      },
      {
        path: '/bar',
        component: async () => NoopComponent('Bar'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

const app = createApp({
  router,
  name: 'App',
  render() {
    return (
      <div title="app">
        <router-view />
      </div>
    );
  },
});

app.use(plugin);
app.use(VueRouter);

test('页面作用域测试', async () => {
  document.body.innerHTML = `<div id="app"></div>`;
  app.mount('#app');
  await router.push('/foo');

  testSuite({
    async nextPage() {
      await router.push('/bar');
    },
  });
});
