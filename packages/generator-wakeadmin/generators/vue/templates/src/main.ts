<% if (type === 'vue2') { %>
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import i18n from './i18n'
import './locales'

Vue.config.productionTip = false;

new Vue({
  i18n: i18n.i18n,
  router,
  render: h => h(App),
}).$mount('#app')

<% } else { %>
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import { routes } from './router';
import i18n from './i18n'
import './locales'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App).use(router).use(i18n);

app.mount('#app');

<% } %>
