import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import { useGlobalStore } from '@/stores/globalStore';
import type { IIPConfigForm } from '../entities/authInterfaces';
import i18n from '@/locales/i18n';
import { useAuthStore } from '../store/useAuthStore';
import useAuthServices from '../services/useAuthServices';
import useLogout from '@/commons/helpers/useLogout';

const useIPConfig = () => {
  const globalStore = useGlobalStore();
  const authStore = useAuthStore();
  const { fetchLogout } = useLogout();
  const { setIP } = useAuthServices();
  const { ipUser } = storeToRefs(globalStore);
  const {
    messageError,
    codeError,
    icbsUser,
    hasConfirmed,
    alertIsClosed,
    isBlocked,
  } = storeToRefs(authStore);
  const selectedOption = ref<string>('unique');
  const validIP = ref<{ ipStart: boolean; ipEnd: boolean }>({
    ipStart: false,
    ipEnd: false,
  });

  const formData: IIPConfigForm = reactive({
    rangeStart: '',
    rangeEnd: ' ',
  });
  const alpha = helpers.regex(
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  );

  const wrongIPMessage = i18n.global.t('AUTH-MODULE.STEPS.IP-CONFIG.WRONG-IP');

  const rules = computed(() => ({
    rangeStart: {
      required: helpers.withMessage('', required),
      valid: helpers.withMessage(wrongIPMessage, alpha),
    },
    rangeEnd: {
      required: helpers.withMessage('', required),
      valid: helpers.withMessage(wrongIPMessage, alpha),
    },
  }));

  const v$ = useVuelidate(rules, formData);

  const ipIsWrong = computed(() => {
    if (selectedOption.value == 'unique') {
      if (!validIP.value.ipStart) return true;
      else return false;
    } else {
      if (!validIP.value.ipStart && !validIP.value.ipEnd) return true;
      else return false;
    }
  });

  const cancel = (): void => {
    v$.value.$reset();
    selectedOption.value = 'unique';
    validIP.value = {
      ipStart: false,
      ipEnd: false,
    };
    formData.rangeStart = '';
    formData.rangeEnd = '';
    hasConfirmed.value = false;
    fetchLogout();
    authStore.resetAuthStore();
  };

  const setIPMutation = useMutation(['spinner'], setIP, {
    onSuccess: () => {
      hasConfirmed.value = true;
      isBlocked.value = false;
    },
    onError: (error: any) => {
      messageError.value = error.response.data.message!;
      codeError.value = error.response.data.code;
      alertIsClosed.value = false;
    },
  });

  const sendForm = () => {
    setIPMutation.mutate({ formData: formData, icbsUser: icbsUser.value });
    v$.value.$reset();
  };

  return {
    selectedOption,
    ipIsWrong,
    validIP,
    ipUser,
    formData,
    v$,
    sendForm,
    cancel,
    hasConfirmed,
    messageError,
    codeError,
    alertIsClosed,
  };
};

export default useIPConfig;
