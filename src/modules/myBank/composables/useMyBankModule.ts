import { storeToRefs } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import { computed, onBeforeMount, ref } from 'vue';

import DetailComponent from '@/modules/myBank/components/detailComponent/DetailComponent.vue';
import SummaryComponent from '@/modules/myBank/components/summaryComponent/SummaryComponent.vue';
import STEPS from '../constants/steps';
import useMyBankStore from '../store/useMyBankStore';
import i18n from '@/locales/i18n';
import {
  requestExportSummary,
  requestExportSummaryDetail,
} from '@/modules/myBank/services/myBankServices';
import useDecryptHelper from '@/commons/helpers/decryptHelper';
import { useGlobalStore } from '@/stores/globalStore';
import type { IPermitions } from '@/commons/entities/global.interfaces';

const fileType = ref<'pdf' | 'xls'>('xls');
const productType = ref<'SDA' | 'DDA'>('SDA');
const getPermitions = ref<any>();

const useMyBankModule = () => {
  const myBankStore = useMyBankStore();
  const { currentStep, rqUID } = storeToRefs(myBankStore);
  const decryptHelper = useDecryptHelper();
  const globalStore = useGlobalStore();
  const { currentGlobalStep } = storeToRefs(globalStore);

  onBeforeMount(() => {
    getPermitions.value = JSON.parse(localStorage.getItem('permitions')!);
  });

  const hasPermitions = (): boolean => {
    return getPermitions.value.some(
      (permition: IPermitions) =>
        permition.code === '114' && permition.childs?.length! > 0,
    );
  };
  const componentStep = computed(() => {
    currentGlobalStep.value = currentStep.value;

    if (currentStep.value === STEPS.stepSummary) return SummaryComponent;
    if (currentStep.value === STEPS.stepSDADetail || STEPS.stepDDADetail)
      return DetailComponent;
    return SummaryComponent;
  });

  const getTitle = computed<string>(() => {
    if (currentStep.value === STEPS.stepSummary)
      return i18n.global.t('MY-BANK-MODULE.TITLE');
    if (currentStep.value === STEPS.stepSDADetail)
      return i18n.global.t('MY-BANK-MODULE.SUMMARY-CARDS.SAVING-TITLE');
    if (currentStep.value === STEPS.stepDDADetail)
      return i18n.global.t('MY-BANK-MODULE.SUMMARY-CARDS.CURRENT-TITLE');
    return '';
  });

  const exportSummaryMutation = useMutation(['spinner'], requestExportSummary, {
    onError: () => {},
    onSuccess: (file) => {
      decryptHelper.createFile(file, fileType.value);
    },
  });

  const exportSummaryDetailMutation = useMutation(
    ['spinner'],
    requestExportSummaryDetail,
    {
      onError: () => {},
      onSuccess: (file: string) => {
        decryptHelper.createFile(file, fileType.value, productType.value);
      },
    },
  );

  const doExport = (type: 'xls' | 'pdf', producType: 'SDA' | 'DDA' = 'SDA') => {
    productType.value = producType;
    fileType.value = type;
    exportSummaryMutation.mutate({ type: type, rqUID: rqUID.value });
  };

  const doExportDetail = (
    type: 'xls' | 'pdf',
    producType: 'SDA' | 'DDA' = 'SDA',
  ) => {
    productType.value = producType;
    fileType.value = type;
    exportSummaryDetailMutation.mutate({
      type: type,
      rqUID: rqUID.value,
      productType: producType,
    });
  };

  return {
    doExportDetail,
    getTitle,
    componentStep,
    doExport,
    currentStep,
    hasPermitions,
  };
};

export default useMyBankModule;
