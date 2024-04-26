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
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    redirect: '/home/class',
    children: [
      {
        path: 'class',
        name: 'class manage',
        component: () => import('../components/ClassManage.vue')
      },
      {
        path: 'student',
        name: 'student manage',
        component: () => import('../components/StudentManage.vue')
      },
      {
        path: 'department',
        name: 'department manage',
        component: () => import('../components/DepartmentManage.vue')
      },
      {
        path: 'staff',
        name: 'staff manage',
        component: () => import('../components/StaffManage.vue')
      },
      {
        path: 'statistic',
        name: 'data statistic',
        component: () => import('../components/DataStatistic.vue')
      }
    ]
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;