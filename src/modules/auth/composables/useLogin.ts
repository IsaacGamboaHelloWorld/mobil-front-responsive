import { useMutation } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import RSAEncrypt from '@/commons/helpers/encryptHelper';
import { useAuthStore } from '../store/useAuthStore';
import { STEPS } from './../constants/steps';
import useAuthServices from '../services/useAuthServices';
import useLogout from '@/commons/helpers/useLogout';
import { useGlobalStore } from '@/stores/globalStore';

const useLogin = () => {
  const authStore = useAuthStore();
  const globalStore = useGlobalStore();
  const { hasToken, tokenType, fullUserName } = storeToRefs(globalStore);
  const { fetchLogout } = useLogout();
  const { sendToken, changeLanguage, sendUser } = useAuthServices();
  const {
    alertIsClosed,
    icbsUser,
    currentStep,
    getPublicKey,
    onlyToken,
    messageError,
    codeError,
    isBlocked,
  } = storeToRefs(authStore);
  const isDisabled = ref<boolean>(true);

  const changeLanguageMutation = useMutation(['spinner'], changeLanguage);

  const userRSAKeyMutation = useMutation(['spinner'], sendUser, {
    onSettled: () => {
      const encryptedtoken = RSAEncrypt(getPublicKey.value, onlyToken.value);
      tokenMutation.mutate({
        token: encryptedtoken,
        icbsUser: icbsUser.value,
      });
    },
  });

  const tokenMutation = useMutation(['spinner'], sendToken, {
    onSuccess: (data) => {
      authStore.setLoginState(data);
      isBlocked.value = false;
      if (hasToken.value === true && tokenType.value === '2') {
        currentStep.value = STEPS.stepSBLPush;
      } else {
        currentStep.value = STEPS.stepAuth;
      }
      authStore.changeLanguage && changeLanguageMutation.mutate();
    },
    onError: (error: any) => {
      isDisabled.value = true;
      isBlocked.value = true;
      onlyToken.value = '';
      messageError.value = error.response.data.message!;
      codeError.value = error.response.data.code;
    },
  });

  const encryptToken = (token?: string): void => {
    const encryptedtoken = RSAEncrypt(getPublicKey.value, onlyToken.value);
    if (hasToken.value === true && tokenType.value === '1') {
      userRSAKeyMutation.mutate(icbsUser.value);
    } else {
      if (token !== ' ') {
        tokenMutation.mutate({
          token: encryptedtoken,
          icbsUser: icbsUser.value,
        });
      } else {
        tokenMutation.mutate({
          token: token,
          icbsUser: icbsUser.value,
        });
      }
    }
  };

  const cancelAction = () => {
    fetchLogout();
    authStore.resetAuthStore();
  };

  watch(onlyToken, (newValue) => {
    newValue !== '' ? (isDisabled.value = false) : (isDisabled.value = true);
  });
  return {
    isBlocked,
    messageError,
    codeError,
    cancelAction,
    encryptToken,
    isDisabled,
    onlyToken,
    icbsUser,
    alertIsClosed,
    fullUserName,
  };
};

export default useLogin;
