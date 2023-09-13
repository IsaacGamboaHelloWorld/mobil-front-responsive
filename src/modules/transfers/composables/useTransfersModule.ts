import { storeToRefs } from 'pinia';
import {
  computed,
  defineAsyncComponent,
  onBeforeMount,
  onUnmounted,
} from 'vue';

import { useGlobalStore } from '@/stores/globalStore';
import useTransfersStore from '../store/useTransfersStore';
import type { IPermitions } from '@/commons/entities/global.interfaces';
import STEPS from '../constants/steps';

const LastTransfers = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/LastTransfers/LastTransfersComponent.vue'
    ),
);

const ScheduleTransfers = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/scheduleTransfers/ScheduledTransfersComponent.vue'
    ),
);

const newTransferComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/newTransfer/view/NewTransferComponent.vue'
    ),
);

const templatesComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/templatesComponent/TemplatesComponent.vue'
    ),
);

const newTemplateComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/newTemplate/view/NewTemplateComponent.vue'
    ),
);

const reUseTemplateComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/reUseTemplate/ReUseTemplateComponent.vue'
    ),
);

const duplicateTemplateComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/duplicateTemplate/DuplicateTemplateComponent.vue'
    ),
);

const modifyTemplateComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/modifyTemplate/ModifyTemplateComponent.vue'
    ),
);

const shareTemplateComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/shareTemplate/ShareTemplateComponent.vue'
    ),
);

const useTransfersModule = () => {
  const trasnfersStore = useTransfersStore();
  const globalStore = useGlobalStore();

  const { currentStep, permitions } = storeToRefs(trasnfersStore);
  const { currentGlobalStep } = storeToRefs(globalStore);

  const componentStep: any = computed(() => {
    currentGlobalStep.value = currentStep.value;
    if (currentStep.value == STEPS.stepNewTransfer) return newTransferComponent;
    if (currentStep.value === STEPS.stepTransfersDetail) return LastTransfers;
    if (currentStep.value === STEPS.stepScheduleTransfers)
      return ScheduleTransfers;
    if (currentStep.value === STEPS.stepTemplates) return templatesComponent;
    if (currentStep.value === STEPS.stepShareTemplate)
      return shareTemplateComponent;
    if (currentStep.value === STEPS.stepDuplicateTemplate)
      return duplicateTemplateComponent;
    if (currentStep.value === STEPS.stepModifyTemplate)
      return modifyTemplateComponent;
    if (currentStep.value === STEPS.stepReuseTemplate)
      return reUseTemplateComponent;
    if (currentStep.value === STEPS.stepNewTemplate)
      return newTemplateComponent;
    return null;
  });

  onUnmounted(() => {
    trasnfersStore.$resetStore();
  });

  onBeforeMount(() => {
    const permition = JSON.parse(localStorage.getItem('permitions')!).find(
      (permition: IPermitions) => permition.code === '20201',
    );
    permitions.value = permition;
  });

  return { componentStep, currentStep, STEPS };
};

export default useTransfersModule;
