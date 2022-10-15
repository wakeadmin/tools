/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
// vue2 页面作用域测试
import { Vue2, defineComponent } from '@wakeadmin/demi';
import VueRouter, { RouteConfig } from 'vue-router-3';
import { plugin } from './install';
import { NoopComponent, testSuite } from './install.test.share';

const Wrapper = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
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

Vue2.use(VueRouter);
Vue2.use(plugin);

const app = new Vue2({
  // @ts-ignore vue 2 下会报错, 可以忽略
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

test('页面作用域测试', async () => {
  document.body.innerHTML = `<div id="app"></div>`;
  app.$mount('#app');
  await router.push('/foo');

  testSuite({
    async nextPage() {
      await router.push('/bar');
    },
  });
});
