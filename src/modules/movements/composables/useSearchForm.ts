import useVuelidate from '@vuelidate/core';
import { computed, reactive } from 'vue';
import { required } from '@vuelidate/validators';

import type { ISearchForm } from '../entities/movementsInterfaces';

export const useSearchForm = () => {
  const formData: ISearchForm = reactive({
    accountID: '',
    acctCur: 'COP',
    acctType: '',
    dateType: 'string',
    endDt: '',
    highCurAmt: '99999999999999999',
    lowCurAmt: '0',
    startDt: '',
    trnType: 'ALL',
    moveType: 'ALL',
  });

  const rules = computed(() => ({
    accountID: {
      required,
    },
    acctType: {
      required,
    },
    startDt: {
      required,
    },
    endDt: {
      required,
    },
  }));

  const v$ = useVuelidate(rules.value, formData);

  return { formData, v$ };
};
