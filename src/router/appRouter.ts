import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import internalRoutes from '@/modules/homeFront/router/internalRoutes';
import { routesName } from '@/commons/constants/routes';

const routes = [
  {
    path: '/',
    redirect: routesName.auth.path,
  },
  {
    path: routesName.auth.path,
    name: 'login',
    component: () => import('@/modules/auth/view/LoginView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: routesName.auth.path,
  },
  //portal-empresarial
  internalRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && to.fullPath !== routesName.auth.path) {
    next({ name: 'login' });
  } else if (
    !!localStorage.getItem('token') &&
    !!localStorage.getItem('permitions') &&
    to.fullPath === routesName.auth.path
  ) {
    next(routesName.Home.path);
  } else {
    next();
  }
});

router.afterEach(() => {
  (window as any).utag.track({
    tealium_event: 'page_view',
    page_path: window.location.pathname,
    token: !!localStorage.getItem('token')
      ? !!localStorage.getItem('token')
      : '',
  });
});
export default router;
