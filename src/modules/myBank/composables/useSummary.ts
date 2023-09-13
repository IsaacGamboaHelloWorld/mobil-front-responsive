import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import i18n from '@/locales/i18n';
import type { ISummaryProducts } from '../entities/myBankInterfaces';
import useMyBankStore from '../store/useMyBankStore';
import STEPS from '../constants/steps';
import { getMyBankData } from '../services/myBankServices';

const useSummary = () => {
  const myBankStore = useMyBankStore();
  const {
    currentStep,
    sdasummaryBalance,
    ddasummaryBalance,
    totalSummary,
    rqUID,
  } = storeToRefs(myBankStore);

  const { isLoading } = useQuery(['summaryData'], getMyBankData, {
    onSuccess(newSummaryData) {
      if (newSummaryData.status?.code === '0' && !!newSummaryData.response) {
        rqUID.value = newSummaryData.response.rqUID;
        myBankStore.setTotalSummary(newSummaryData.response.totalSummary);
        myBankStore.setDdasummaryBalance(
          newSummaryData.response.ddasummaryBalance,
        );
        myBankStore.setSdasummaryBalance(
          newSummaryData.response.sdasummaryBalance,
        );
        myBankStore.setSdadetailSummary(
          newSummaryData.response.sdadetailSummary!,
        );
        myBankStore.setDdadetailSummary(
          newSummaryData.response.ddadetailSummary!,
        );
      }
    },
  });

  const mapSummaryInfo = computed<ISummaryProducts[]>(() => [
    {
      ...ddasummaryBalance.value,
      title: i18n.global.t('MY-BANK-MODULE.SUMMARY-CARDS.CURRENT-TITLE'),
      navigateTo: STEPS.stepDDADetail,
    },
    {
      ...sdasummaryBalance.value,
      title: i18n.global.t('MY-BANK-MODULE.SUMMARY-CARDS.SAVING-TITLE'),
      navigateTo: STEPS.stepSDADetail,
    },
    {
      ...totalSummary.value,
      title: i18n.global.t('MY-BANK-MODULE.SUMMARY-CARDS.TOTAL-TITLE'),
    },
  ]);

  return { currentStep, mapSummaryInfo, isLoading };
};

export default useSummary;
