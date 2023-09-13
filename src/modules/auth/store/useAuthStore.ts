import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type {
  IAuth,
  IAuthUserRSAKey,
  IImageList,
  ILoginResponse,
} from '../entities/authInterfaces';
import {
  initAuth,
  initAuthUserRSAKey,
  initLoginResponse,
} from '../constants/initialStates';
import { STEPS } from '../constants/steps';
import type { IPermitions } from '@/commons/entities/global.interfaces';

export const useAuthStore = defineStore('AuthStore', () => {
  const hasConfirmed = ref<boolean>(false);
  const displayConfirmationModal = ref<boolean>(false);
  const icbsUser = ref<string>('');
  const userRSAKeyState = ref<IAuthUserRSAKey>(initAuthUserRSAKey);
  const loginState = ref<ILoginResponse>();
  const authState = ref<IAuth>(initAuth);
  const onlyToken = ref<string>('');
  const currentStep = ref<string>(STEPS.stepUserRSAKey);
  const codeError = ref<string>('');
  const messageError = ref<string>('');
  const alertIsClosed = ref<boolean>(false);
  const securityModalVisible = ref<boolean>(false);
  const email = ref<string>('');
  const selectedImage = ref<string>('');
  const selectedCategory = ref<string>('');
  const images = ref<IImageList[]>([]);
  const categories = ref<{ id: string; value: string }[]>([]);
  const isBlocked = ref<boolean>(false);
  const needToUpdateAll = ref<boolean>(false);
  const changeLanguage = ref<boolean>(false);

  const getPublicKey = computed<string>(
    () => userRSAKeyState.value.response?.publicKey!,
  );

  const getPermitions = computed<IPermitions[]>(
    () => authState.value.response!,
  );

  const getImage = computed<string>(
    () => loginState.value?.response!.encodeImage!,
  );

  const resetAuthStore = (): void => {
    icbsUser.value = '';
    userRSAKeyState.value = initAuthUserRSAKey;
    loginState.value = initLoginResponse;
    authState.value = initAuth;
    onlyToken.value = '';
    currentStep.value = STEPS.stepUserRSAKey;
    codeError.value = '';
    messageError.value = '';
    alertIsClosed.value = false;
    email.value = '';
    selectedImage.value = '';
    selectedCategory.value = '';
    images.value = [];
    categories.value = [];
    isBlocked.value = false;
  };

  return {
    //State
    messageError,
    hasConfirmed,
    codeError,
    userRSAKeyState,
    loginState,
    authState,
    onlyToken,
    icbsUser,
    currentStep,
    alertIsClosed,
    securityModalVisible,
    email,
    displayConfirmationModal,
    selectedImage,
    selectedCategory,
    images,
    categories,
    isBlocked,
    needToUpdateAll,
    changeLanguage,

    //Actions
    setUserRSAKeyState(newState: IAuthUserRSAKey): void {
      userRSAKeyState.value = newState;
    },

    setLoginState(newState: ILoginResponse): void {
      loginState.value = newState;
    },

    setAuthState(newState: IAuth): void {
      authState.value = newState;
    },
    resetAuthStore,

    //getters
    getPublicKey,
    getPermitions,
    getImage,
  };
});
