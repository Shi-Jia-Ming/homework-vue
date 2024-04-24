import { RouteRecordRaw, Router, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    component: import('../views/LoginView.vue')
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;