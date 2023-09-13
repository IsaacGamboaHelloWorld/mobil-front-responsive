import { useMutation } from '@tanstack/vue-query';
import { computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import {
  helpers,
  required,
  sameAs,
  minLength,
  not,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import i18n from '@/locales/i18n';
import { useAuthStore } from '../store/useAuthStore';
import type { IChangePasswordForm } from '../entities/authInterfaces';
import useAuthServices from '../services/useAuthServices';
import useLogout from '@/commons/helpers/useLogout';
import { useGlobalStore } from '@/stores/globalStore';
import useBlockCodes from '@/commons/helpers/useBlockCodesHelper';
import { authBlockCodes } from '@/commons/constants/responseCodes';
import { STEPS } from '../constants/steps';

const useChangePassword = () => {
  const { fetchLogout } = useLogout();
  const globalStore = useGlobalStore();

  const authStore = useAuthStore();
  const {
    icbsUser,
    messageError,
    codeError,
    alertIsClosed,
    displayConfirmationModal,
    hasConfirmed,
    isBlocked,
    needToUpdateAll,
    currentStep,
  } = storeToRefs(authStore);

  const { changePassword } = useAuthServices();
  const { isBlockCode } = useBlockCodes();

  const formData: IChangePasswordForm = reactive({
    confirmpassword: '',
    newpassword: '',
    oldpassword: '',
  });

  const alpha = (value: string): boolean => {
    const specialCharacters = globalStore.specialCharacters;
    const caracteres = new Set(value);
    return !Array.from(specialCharacters).some((caracter) =>
      caracteres.has(caracter),
    );
  };

  const differentValue = (value: string): boolean => {
    return !value.includes(formData.oldpassword);
  };

  const nameIsPassword = (value: string): boolean => {
    return !value.toUpperCase().includes(icbsUser.value.toUpperCase());
  };
  const requiredMessage = i18n.global.t(
    'AUTH-MODULE.STEPS.CHANGE-PASSWORD.ERRORS.REQUIRED',
  );
  const minLengthMessage = i18n.global.t(
    'AUTH-MODULE.STEPS.CHANGE-PASSWORD.ERRORS.MIN-LENGTH',
  );
  const politicsMessage = i18n.global.t(
    'AUTH-MODULE.STEPS.CHANGE-PASSWORD.ERRORS.POLITICS',
  );

  const differentValueMessage = i18n.global.t(
    'AUTH-MODULE.STEPS.CHANGE-PASSWORD.ERRORS.DIFFERENT',
  );
  const nameIsPasswordMessage = i18n.global.t(
    'AUTH-MODULE.STEPS.CHANGE-PASSWORD.ERRORS.NAME-IS-PASS',
  );

  const sameAsMessage = i18n.global.t(
    'AUTH-MODULE.STEPS.CHANGE-PASSWORD.ERRORS.SAME-AS',
  );

  const rules = computed(() => ({
    newpassword: {
      required: helpers.withMessage(requiredMessage, required),
      minLengthValue: helpers.withMessage(minLengthMessage, minLength(8)),
      valid: helpers.withMessage(politicsMessage, alpha),
      otherProperty: not(sameAs(formData.oldpassword)),
      differentValue: helpers.withMessage(
        differentValueMessage,
        differentValue,
      ),
      nameIsPassword: helpers.withMessage(
        nameIsPasswordMessage,
        nameIsPassword,
      ),
    },
    confirmpassword: {
      sameAs: helpers.withMessage(sameAsMessage, sameAs(formData.newpassword)),
    },
    oldpassword: {
      required: helpers.withMessage(requiredMessage, required),
    },
  }));
  const v$ = useVuelidate(rules, formData);

  const resetAll = () => {
    v$.value.$reset();
    formData.confirmpassword = '';
    formData.newpassword = '';
    formData.oldpassword = '';
    displayConfirmationModal.value = false;
    hasConfirmed.value = false;
  };

  const changePasswordMutation = useMutation(['spinner'], changePassword, {
    onSuccess: () => {
      hasConfirmed.value = true;
      isBlocked.value = false;
      messageError.value = '';
      codeError.value = '';
    },
    onError: (error: any) => {
      toggleModal();
      messageError.value =
        error.response.data.message! || error.response.data.messageDev;
      codeError.value = error.response.data.code;
      alertIsClosed.value = false;
      if (isBlockCode(authBlockCodes, error.response.data.code.toString())) {
        isBlocked.value = true;
      }
    },
  });

  const toggleModal = (): void => {
    displayConfirmationModal.value = !displayConfirmationModal.value;
  };

  const confirmPassword = (): void => {
    changePasswordMutation.mutate(formData);
    v$.value.$reset();
  };

  const cancelAction = () => {
    if (hasConfirmed.value && needToUpdateAll.value) {
      currentStep.value = STEPS.stepImages;
    } else {
      fetchLogout();
      authStore.resetAuthStore();
    }
    resetAll();
  };

  return {
    formData,
    toggleModal,
    cancelAction,
    v$,
    messageError,
    codeError,
    alertIsClosed,
    displayConfirmationModal,
    confirmPassword,
    hasConfirmed,
    isBlocked,
  };
};

export default useChangePassword;
