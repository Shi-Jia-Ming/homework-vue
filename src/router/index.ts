import { RouteRecordRaw, Router, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    component: import('../components/HelloWorld.vue')
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;