import { routesName } from '@/commons/constants/routes';
import type { IServiceItem } from './../entities/homeFrontInterfaces';
import i18n from '@/locales/i18n.js';

export const serviceItemsMock: IServiceItem[] = [
  {
    text: i18n.global.t('HOMEFRONT-MODULE.SERVICE-ITEMS.BANK'),
    icon: 'icon-icon-home',
    code: '114',
    isActive: false,
    navigateTo: routesName.myBank.path,
    name: routesName.myBank.name,
  },
  {
    text: i18n.global.t('HOMEFRONT-MODULE.SERVICE-ITEMS.SEARCH'),
    icon: 'icon-icon-search',
    code: '00',
    isActive: false,
    showChilds: false,
    name: routesName.movements.name,
    childs: [
      {
        text: i18n.global.t('HOMEFRONT-MODULE.SERVICE-ITEMS.BALANCES'),
        icon: 'icon-icon-search',
        code: '10101',
        navigateTo: routesName.balanceByProduct.path,
        name: routesName.balanceByProduct.name,
        isActive: false,
      },
      {
        text: i18n.global.t('HOMEFRONT-MODULE.SERVICE-ITEMS.MOVEMENTS'),
        icon: 'icon-icon-search',
        code: '102',
        navigateTo: routesName.movements.path,
        name: routesName.movements.name,
        isActive: false,
      },
    ],
  },
  {
    text: i18n.global.t('HOMEFRONT-MODULE.SERVICE-ITEMS.TRANSFERS'),
    icon: 'icon-icon-money-transfer',
    code: '20201',
    isActive: false,
    navigateTo: routesName.transfers.path,
    name: routesName.transfers.name,
  },
  {
    text: i18n.global.t('HOMEFRONT-MODULE.SERVICE-ITEMS.AUTHORIZATIONS'),
    icon: 'icon-icon-double-check',
    code: '211',
    isActive: false,
    navigateTo: routesName.authorizations.path,
    name: routesName.authorizations.name,
  },
];

export const contactService: IServiceItem = {
  text: i18n.global.t('HOMEFRONT-MODULE.SERVICE-ITEMS.CONTACT'),
  icon: 'icon-icon-call',
  code: '',
  isActive: false,
  navigateTo: 'contactenos',
  showChilds: false,
};
