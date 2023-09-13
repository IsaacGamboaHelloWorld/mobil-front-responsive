import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useAuthorizationsStore from '../store/useAuthorizationsStore';
import useFormattHelper from '@/commons/helpers/formatMoney';
import i18n from '@/locales/i18n';

const getHeaders = computed<{ title: string; property: string }[]>(() => [
  {
    title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TABLE.TYPE'),
    property: 'productTypeName',
  },
  {
    title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TABLE.ID'),
    property: 'productNumber',
  },
  {
    title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TABLE.NAME'),
    property: 'productName',
  },
  {
    title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TABLE.TRANSACTION'),
    property: 'limitAmount',
  },
  {
    title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TABLE.DAY'),
    property: 'limitAmount-day',
  },
  {
    title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TABLE.MONTH'),
    property: 'limitAmount-month',
  },
]);

const useAuthorizationsDetail = () => {
  const authorizationsStore = useAuthorizationsStore();
  const { addCurrencyDot } = useFormattHelper();
  const {
    getTransactionFullDetailDTO,
    getProfileClientDTO,
    getAssignedProducts,
    getUserLimitAmountDTO,
  } = storeToRefs(authorizationsStore);

  return {
    getTransactionFullDetailDTO,
    getProfileClientDTO,
    addCurrencyDot,
    getAssignedProducts,
    getUserLimitAmountDTO,
    getHeaders,
  };
};

export default useAuthorizationsDetail;
