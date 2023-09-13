import type { RouteRecordRaw } from 'vue-router';

import { routesName } from '@/commons/constants/routes';

const internalRoutes: RouteRecordRaw = {
  path: routesName.Home.path,
  redirect: { name: routesName.myBank.name },
  component: () => import('@/modules/homeFront/template/HomeFrontTemplate.vue'),
  children: [
    {
      path: routesName.myBank.path,
      name: routesName.myBank.name,
      component: () => import('@/modules/myBank/view/MyBankView.vue'),
    },
    {
      path: routesName.movements.path,
      name: routesName.movements.name,
      component: () => import('@/modules/movements/view/MovementsView.vue'),
    },
    {
      path: routesName.transfers.path,
      name: routesName.transfers.name,
      component: () => import('@/modules/transfers/view/TransfersView.vue'),
    },
    {
      path: routesName.authorizations.path,
      name: routesName.authorizations.name,
      component: () =>
        import('@/modules/authorizations/view/AuthorizationsView.vue'),
    },
    {
      path: routesName.balanceByProduct.path,
      name: routesName.balanceByProduct.name,
      component: () =>
        import('@/modules/balanceByProduct/view/BalanceByProductView.vue'),
    },
  ],
};

export default internalRoutes;
