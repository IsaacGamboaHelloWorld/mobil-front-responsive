import { storeToRefs } from 'pinia';
import { computed, ref, watch, defineAsyncComponent, onBeforeMount } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import { companyName } from '@/commons/constants/companyName';
import { STEPS } from './../constants/steps';
import { serviceLinesBusiness } from '../constants/serviceLine';
import { useAuthStore } from '../store/useAuthStore';
import useAuthServices from '../services/useAuthServices';
import type { IParameters } from '../entities/authInterfaces';
import { useGlobalStore } from '@/stores/globalStore';
import packageInfo from './../../../../package.json';
import i18n from '@/locales/i18n.js';
import useSecurityModal from './useSecurityModal';
import useLogout from '@/commons/helpers/useLogout';

const IPConfigComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/auth/view/components/IPConfigComponent/IPConfigComponent.vue'
    ),
);
const loginTokenComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/auth/view/components/loginTokenComponent/loginTokenComponent.vue'
    ),
);
const authComponent = defineAsyncComponent(
  () =>
    import('@/modules/auth/view/components/authComponent/authComponent.vue'),
);
const loginUserComponentVue = defineAsyncComponent(
  () =>
    import(
      '@/modules/auth/view/components/userRSAKeyComponent/userRSAKeyComponent.vue'
    ),
);
const ChangePasswordComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/auth/view/components/changePassword/ChangePasswordComponent.vue'
    ),
);
const imagesComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/auth/view/components/imagesComponent/ImagesComponent.vue'
    ),
);

const useAuthModule = () => {
  const { initialParameters, getIp, getIpSecondMethod } = useAuthServices();
  const { fetchLogout } = useLogout();
  const authStore = useAuthStore();
  const globalStore = useGlobalStore();
  const { toggleSecurityModal } = useSecurityModal();
  const {
    currentStep,
    displayConfirmationModal,
    securityModalVisible,
    codeError,
    messageError,
    changeLanguage,
  } = storeToRefs(authStore);
  const { ipUser, activePaste, specialCharacters, currentGlobalStep } =
    storeToRefs(globalStore);

  const getVersion = computed<string>(() => packageInfo.version);
  const language = ref<string>(
    localStorage.getItem('lang') === 'en'
      ? i18n.global.t('AUTH-MODULE.OPTION-EN')
      : i18n.global.t('AUTH-MODULE.OPTION-ES'),
  );

  onBeforeMount(() => {
    const navigatorInfo: Navigator = window.navigator;
    const screenInfo: Screen = window.screen;
    const devicePrint: string =
      navigatorInfo.platform.replace(/\s+|[^a-zA-Z0-9]/g, '') +
        navigatorInfo.appVersion.replace(/\s+|[^a-zA-Z0-9]/g, '') +
        navigatorInfo.mimeTypes.length +
        navigatorInfo.userAgent.replace(/\D+/g, '') +
        navigatorInfo.plugins.length +
        screenInfo.height ||
      '' + screenInfo.width ||
      '' + screenInfo.pixelDepth ||
      '';
    localStorage.setItem('DevicePrint', devicePrint);
  });

  const { refetch, isFetching: isLoadingSecondIP } = useQuery(
    ['ip-second'],
    () => getIpSecondMethod(),
    {
      onSuccess: (data: any) => {
        ipUser.value = data.ipString;
        localStorage.setItem('ip', data.ipString);
      },
      onError: () => {
        ipUser.value = '127.0.0.1';
        localStorage.setItem('ip', '127.0.0.1');
      },
      enabled: false,
    },
  );

  const { refetch: refetchFirstIPMethod, isFetching: isIPLoading } = useQuery(
    ['ip'],
    getIp,
    {
      onSuccess: (data) => {
        ipUser.value = data;
        localStorage.setItem('ip', data);
      },
      onError: () => {
        refetch();
      },
      enabled: false,
    },
  );

  const { isLoading: isParametersLoading } = useQuery(
    ['authParameters'],
    initialParameters,
    {
      onSuccess: (data: IParameters) => {
        fetchLogout();
        if (!!data.response?.activePaste)
          activePaste.value = data.response?.activePaste;
        if (!!data.response?.specialCharacters)
          specialCharacters.value = data.response?.specialCharacters;
        !!data.response?.ipAddress
          ? localStorage.setItem('ip', data.response.ipAddress)
          : refetchFirstIPMethod();
      },
      retry: true,
    },
  );

  const componentStep = (): any => {
    const step: string = currentStep.value;
    currentGlobalStep.value = step;
    if (step === STEPS.stepUserRSAKey) return loginUserComponentVue;
    if (step === STEPS.stepLogin) return loginTokenComponent;
    if (step === STEPS.stepAuth) return authComponent;
    if (step === STEPS.stepChangePassword) return ChangePasswordComponent;
    if (step === STEPS.stepIPConfig) return IPConfigComponent;
    if (step === STEPS.stepImages) return imagesComponent;
    return null;
  };

  watch(language, (newValue) => {
    changeLanguage.value = true;
    if (newValue === 'Español' || newValue === 'Spanish' || newValue === 'es') {
      localStorage.setItem('lang', 'es');
      i18n.global.locale.value = 'es';
      language.value = i18n.global.t('AUTH-MODULE.OPTION-ES');
    } else {
      localStorage.setItem('lang', 'en');
      i18n.global.locale.value = 'en';
      language.value = i18n.global.t('AUTH-MODULE.OPTION-EN');
    }
  });

  const successSBL = (): void => {
    currentStep.value = STEPS.stepAuth;
  };

  const goToSoftToken = () => {
    currentStep.value = STEPS.stepSBLSoftToken;
  };

  const handleSBLError = (code: string, msg: string) => {
    messageError.value = msg;
    codeError.value = code;
  };

  const closeAction = () => {
    fetchLogout();
    authStore.resetAuthStore();
  };

  return {
    language,
    serviceLinesBusiness,
    companyName,
    displayConfirmationModal,
    componentStep,
    ipUser,
    getVersion,
    securityModalVisible,
    toggleSecurityModal,
    isParametersLoading,
    isIPLoading,
    currentStep,
    successSBL,
    goToSoftToken,
    closeAction,
    handleSBLError,
    isLoadingSecondIP,
  };
};

export default useAuthModule;
