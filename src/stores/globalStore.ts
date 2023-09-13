import { useIsFetching, useIsMutating } from '@tanstack/vue-query';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('GlobalStore', () => {
  const icbsUser = ref<string>('');
  const xAuthToken = ref<string>('');
  const ipUser = ref<string>('');
  const hasToken = ref<boolean>(false);
  const tokenType = ref<string>('');
  const sessionClosed = ref<boolean>(false);
  const activePaste = ref<string>('false');
  const specialCharacters = ref<string>('');
  const currentModule = ref<string>('');
  const currentGlobalStep = ref<string>('');
  const userHasLogout = ref<boolean>(false);
  const fullUserName = ref<string>('');

  const isFetching = useIsFetching({ queryKey: ['Logout'] });
  const isMutating = useIsMutating({ mutationKey: ['spinner'] });

  const resetGlobalStore = () => {
    icbsUser.value = '';
    xAuthToken.value = '';
    hasToken.value = false;
    tokenType.value = '';
  };

  return {
    //State
    tokenType,
    hasToken,
    isMutating,
    isFetching,
    icbsUser,
    xAuthToken,
    ipUser,
    sessionClosed,
    activePaste,
    specialCharacters,
    currentModule,
    currentGlobalStep,
    userHasLogout,
    fullUserName,
    resetGlobalStore,
  };
});
