import { computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required, minValue, numeric } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';

import type { ITransfer } from '@/modules/transfers/entities/transfersInterfaces';
import useTransfersStore from '@/modules/transfers/store/useTransfersStore';

export const useNewTransferForm = () => {
  const transferStore = useTransfersStore();
  const { newTransfer } = storeToRefs(transferStore);
  const initTransferForm: ITransfer = {
    accountID: '',
    acctIdFrom: '',
    acctIdFromMask: '',
    acctIdTo: '',
    acctTypeFrom: '',
    acctTypeFromDesc: '',
    acctTypeTo: '',
    acctTypeToDesc: '',
    exonerateGMF: false,
    financialEntity: '',
    financialEntityCode: '',
    id: '',
    identification: '',
    identificationType: '',
    identificationTypeDesc: '',
    infoAdditional: '',
    payVal: '',
    recipientName: '',
    referenceBillNumber: '',
    txDate: '',
  };
  const rules = computed<any>(() => ({
    recipientName: {
      required: helpers.withMessage('', required),
    },
    identificationTypeDesc: {
      required: helpers.withMessage('', required),
    },
    identification: {
      required: helpers.withMessage('', required),
      onlyNumbers: helpers.withMessage('', numeric),
    },
    financialEntity: {
      required: helpers.withMessage('', required),
    },
    acctTypeToDesc: {
      required: helpers.withMessage('', required),
    },
    acctIdTo: {
      required: helpers.withMessage('', required),
      onlyNumbers: helpers.withMessage('', numeric),
    },
    payVal: {
      required: helpers.withMessage('', required),
      minValue: helpers.withMessage('', minValue(1)),
      onlyNumbers: helpers.withMessage('', numeric),
      noLeadingZero: helpers.withMessage('', noLeadingZero),
    },
  }));

  const noLeadingZero = (value: string) => {
    if (!helpers.req(value)) {
      return true;
    }
    return value[0] !== '0';
  };

  const resetForm = (): void => {
    newTransfer.value = initTransferForm;
  };

  const v$ = useVuelidate(rules, newTransfer.value);

  return { newTransfer, v$, resetForm };
};
