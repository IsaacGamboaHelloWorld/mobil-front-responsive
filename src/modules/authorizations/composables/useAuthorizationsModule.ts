import { storeToRefs } from 'pinia';
import {
  computed,
  defineAsyncComponent,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue';
import i18n from '@/locales/i18n';

import useAuthorizationsStore from '../store/useAuthorizationsStore';
import STEPS from '../constants/steps';
import { useGlobalStore } from '@/stores/globalStore';
import type { IPermitions } from '@/commons/entities/global.interfaces';
import usePermitionHelper from '@/commons/helpers/permitionsHelper';
import authorizationsPermitionsCodes from '../constants/permitions';

const AuthorizationsListComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/authorizations/view/components/authorizationList/AuthorizationListComponent.vue'
    ),
);

const AuthorizationsDetailComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/authorizations/view/components/authorizationDetail/AuthorizationDetailComponent.vue'
    ),
);

const AuthorizationResultComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/authorizations/view/components/authorizationResult/AuthorizationResultComponent.vue'
    ),
);
const AuthorizationProfileDetailComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/authorizations/view/components/authorizationProfileDetail/AuthorizationProfileDetailComponent.vue'
    ),
);
const AuthorizationProductsDetailComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/authorizations/view/components/authorizationProductsDetail/AuthorizationProductsDetailComponent.vue'
    ),
);
const AuthorizationAmountDetailComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/authorizations/view/components/authorizationAmountDetail/AuthorizationAmountDetailComponent.vue'
    ),
);

const useAuthorizationsModule = () => {
  const authorizationsStore = useAuthorizationsStore();
  const { currentStep, permitions } = storeToRefs(authorizationsStore);
  const globalStore = useGlobalStore();
  const { currentGlobalStep } = storeToRefs(globalStore);
  const { hasPermitions } = usePermitionHelper();

  const componentStep: any = computed(() => {
    currentGlobalStep.value = currentStep.value;

    if (currentStep.value === STEPS.stepAuthorizationsList)
      return AuthorizationsListComponent;
    if (currentStep.value === STEPS.stepAuthorizationResult)
      return AuthorizationResultComponent;
    if (currentStep.value === STEPS.stepAuthorizationsDetail)
      return AuthorizationsDetailComponent;
    if (currentStep.value === STEPS.stepAuthorizationProfileDetail)
      return AuthorizationProfileDetailComponent;
    if (currentStep.value === STEPS.stepAuthorizationProductsDetail)
      return AuthorizationProductsDetailComponent;
    if (currentStep.value === STEPS.stepAuthorizationAmountDetail)
      return AuthorizationAmountDetailComponent;
    return null;
  });

  const getTitle = computed<string>(() => {
    if (currentStep.value === STEPS.stepAuthorizationsList)
      return i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TITLE');
    return '';
  });

  onBeforeUnmount(() => {
    authorizationsStore.resetStore();
  });

  onBeforeMount(() => {
    const permition: IPermitions = JSON.parse(
      localStorage.getItem('permitions')!,
    ).find(
      (permition: IPermitions) =>
        permition.code === authorizationsPermitionsCodes.serviceCode,
    );
    permitions.value = permition;
  });

  return {
    getTitle,
    componentStep,
    currentStep,
    permitions,
    hasPermitions,
  };
};

export default useAuthorizationsModule;
