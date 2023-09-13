import { useMutation } from '@tanstack/vue-query';
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { useAuthStore } from '../store/useAuthStore';
import { STEPS } from './../constants/steps';
import { useGlobalStore } from '@/stores/globalStore';
import useAuthServices from '../services/useAuthServices';
import useLogin from './useLogin';

const useUserRSAKey = () => {
  const authStore = useAuthStore();
  const globalStore = useGlobalStore();

  const {
    icbsUser,
    currentStep,
    messageError,
    codeError,
    alertIsClosed,
    email,
    isBlocked,
  } = storeToRefs(authStore);

  const { sessionClosed } = storeToRefs(globalStore);
  const { sendUser } = useAuthServices();
  const { encryptToken } = useLogin();

  onBeforeMount(() => {
    v$.value.$reset();
    icbsUser.value = '';
    globalStore.resetGlobalStore();
  });

  const rules = computed(() => ({
    icbsUser: {
      required,
      $autoDirty: true,
    },
  }));

  const v$ = useVuelidate(rules, { icbsUser });

  const userRSAKeyMutation = useMutation(['spinner'], sendUser, {
    onError: (error: any) => {
      if (error.response.status === 404) {
        encryptToken(' ');
      }
      authStore.resetAuthStore();
      v$.value.$reset();
      messageError.value = error.response.data.message!;
      codeError.value = error.response.data.code;
      isBlocked.value = true;
    },
    onSuccess: (data) => {
      authStore.setUserRSAKeyState(data);
      globalStore.icbsUser = icbsUser.value;
      globalStore.fullUserName = data.response?.fullUserName!;
      globalStore.hasToken = data.response?.hasToken!;
      globalStore.tokenType = data.response?.tokenType!;
      isBlocked.value = false;
      if (data.response?.tokenType === '1') {
        if (data.response.hasToken === true) {
          currentStep.value = STEPS.stepLogin;
        } else {
          encryptToken(' ');
        }
      } else {
        encryptToken(' ');
      }
      localStorage.setItem('publicKey', data.response?.publicKey!);
    },
  });

  const sendIcbsUser = () => {
    userRSAKeyMutation.mutate(icbsUser.value);
  };

  const closeAlert = () => {
    alertIsClosed.value = true;
    sessionClosed.value = false;
  };

  const isDisabled = computed<boolean>(() => v$.value.$invalid);

  const reload = (): void => {
    window.location.reload();
  };

  onBeforeUnmount(() => {
    messageError.value = '';
    codeError.value = '';
    sessionClosed.value = false;
  });

  return {
    email,
    alertIsClosed,
    sendIcbsUser,
    userRSAKeyMutation,
    isDisabled,
    icbsUser,
    messageError,
    codeError,
    v$,
    sessionClosed,
    closeAlert,
    isBlocked,
    reload,
  };
};

export default useUserRSAKey;
