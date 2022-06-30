import { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

export const routes: RouteRecordRaw[] = [
  { path: '/retail/goods-mgr/classfiy/goods', component: () => import('../views/ClassifyGoods.vue') },
  { path: '/retail/goods-mgr/classfiy/visible', component: () => import('../views/ClassifyVisible.vue') },
  {
    path: '/:any*',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];
