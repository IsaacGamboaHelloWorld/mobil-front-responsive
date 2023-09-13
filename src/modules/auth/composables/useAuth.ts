import { storeToRefs } from 'pinia';
import { onBeforeUnmount, ref, watch } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { useRouter, type Router } from 'vue-router';

import type {
  IAuth,
  IForgotPasswordResponse,
} from '../entities/authInterfaces';
import RSAEncrypt from '@/commons/helpers/encryptHelper';
import { routesName } from '@/commons/constants/routes';
import { useGlobalStore } from '@/stores/globalStore';
import { useAuthStore } from '../store/useAuthStore';
import { responseCodes } from '@/commons/constants/responseCodes';
import { STEPS } from '../constants/steps';
import useAuthServices from '../services/useAuthServices';
import useLogout from '@/commons/helpers/useLogout';

const password = ref<string>('');
const isDisabled = ref<boolean>(true);
const messageError = ref<string>('');
const codeError = ref<string>('');

const useAuth = () => {
  const { fetchLogout } = useLogout();
  const authStore = useAuthStore();
  const globalStore = useGlobalStore();
  const { sendPassword, forgotPassword } = useAuthServices();
  const router: Router = useRouter();

  const {
    onlyToken,
    getPublicKey,
    currentStep,
    getImage,
    email,
    isBlocked,
    alertIsClosed,
    needToUpdateAll,
  } = storeToRefs(authStore);
  const { icbsUser, hasToken, fullUserName } = storeToRefs(globalStore);

  const passwordMutation = useMutation(['spinner'], sendPassword, {
    onSuccess: (data: IAuth) => {
      password.value = '';
      isBlocked.value = false;
      localStorage.setItem('user', icbsUser.value);
      localStorage.setItem('permitions', JSON.stringify(data.response));

      router.push(routesName.Home.path).then(() => {
        authStore.setAuthState(data);
        currentStep.value = STEPS.stepUserRSAKey;
      });
    },
    onError: (error: any) => {
      messageError.value = error.response.data.message;
      codeError.value = error.response.data.code;
      password.value = '';
      isBlocked.value = false;
      isDisabled.value = true;
      if (
        error.response.data.code === responseCodes.auth.sendAuth.updatePassword
      ) {
        currentStep.value = STEPS.stepChangePassword;
      } else if (
        error.response.data.code === responseCodes.auth.sendAuth.updateImage
      ) {
        currentStep.value = STEPS.stepImages;
      } else if (
        error.response.data.code === responseCodes.auth.sendAuth.updateIP
      ) {
        currentStep.value = STEPS.stepIPConfig;
      } else if (
        error.response.data.code === responseCodes.auth.sendAuth.updateAll
      ) {
        needToUpdateAll.value = true;
        currentStep.value = STEPS.stepChangePassword;
      } else {
        isBlocked.value = true;
      }
    },
  });

  const forgotPasswordMutatiton = useMutation(['spinner'], forgotPassword, {
    onSuccess: (data: IForgotPasswordResponse) => {
      isBlocked.value = false;
      authStore.resetAuthStore();
      email.value = data.response?.email!;
    },
    onSettled: () => {
      fetchLogout();
    },
  });

  const encryptPassword = (): void => {
    const encryptedPassword = RSAEncrypt(getPublicKey.value, password.value);
    passwordMutation.mutate({
      icbsUser: icbsUser.value,
      password: encryptedPassword,
    });
  };

  const cancelAction = () => {
    fetchLogout();
    password.value = '';
    authStore.resetAuthStore();
  };

  watch(password, (newVakue) => {
    newVakue !== '' ? (isDisabled.value = false) : (isDisabled.value = true);
  });

  onBeforeUnmount(() => {
    messageError.value = '';
    codeError.value = '';
  });

  return {
    hasToken,
    forgotPasswordMutatiton,
    cancelAction,
    icbsUser,
    isDisabled,
    onlyToken,
    encryptPassword,
    password,
    getImage,
    isBlocked,
    messageError,
    codeError,
    alertIsClosed,
    fullUserName,
  };
};

export default useAuth;
