import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type {
  IDetailSummary,
  ISummaryProducts,
} from '../entities/myBankInterfaces';
import STEPS from '../constants/steps';
import { initSummaryProducts } from '../constants/initialStates';

const useMyBankStore = defineStore('MyBankStore', () => {
  const currentStep = ref<string>(STEPS.stepSummary);
  const totalSummary = ref<ISummaryProducts>(initSummaryProducts);
  const sdasummaryBalance = ref<ISummaryProducts>(initSummaryProducts);
  const ddasummaryBalance = ref<ISummaryProducts>(initSummaryProducts);
  const sdadetailSummary = ref<IDetailSummary[]>([]);
  const ddadetailSummary = ref<IDetailSummary[]>([]);
  const rqUID = ref<string>('');

  const getSummaryList = computed<IDetailSummary[] | undefined>(() => {
    if (currentStep.value === STEPS.stepDDADetail)
      return ddadetailSummary.value;
    return sdadetailSummary.value;
  });

  return {
    currentStep,
    totalSummary,
    sdasummaryBalance,
    ddasummaryBalance,
    ddadetailSummary,
    sdadetailSummary,
    setTotalSummary(newState: ISummaryProducts): void {
      totalSummary.value = newState;
    },

    setSdasummaryBalance(newState: ISummaryProducts): void {
      sdasummaryBalance.value = newState;
    },

    setDdasummaryBalance(newState: ISummaryProducts): void {
      ddasummaryBalance.value = newState;
    },

    setSdadetailSummary(newState: IDetailSummary[]): void {
      sdadetailSummary.value = newState;
    },

    setDdadetailSummary(newState: IDetailSummary[]): void {
      ddadetailSummary.value = newState;
    },

    //getters
    getSummaryList,
    rqUID,
  };
});

export default useMyBankStore;
