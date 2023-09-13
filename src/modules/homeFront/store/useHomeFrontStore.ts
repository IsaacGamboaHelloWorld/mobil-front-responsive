import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type {
  IHomeData,
  INotificationList,
  IPendingTransactions,
} from '../entities/homeFrontInterfaces';
import { initHomeData } from '../constants/initialStates';

export const useHomeFrontStore = defineStore('HomeFrontStore', () => {
  const homeFrontState = ref<IHomeData>(initHomeData);

  const getTotalPendingTransactions = computed<number>(
    () =>
      homeFrontState.value?.response?.pendingTransactions.monetaryTx! +
      homeFrontState.value?.response?.pendingTransactions.noMonetaryTx!,
  );

  const getPedingTransactions = computed<IPendingTransactions>(
    () => homeFrontState.value?.response?.pendingTransactions!,
  );

  const getLoginHour = computed<string>(
    () => homeFrontState.value?.response?.loginHour!,
  );

  const getNotificationsList = computed<INotificationList[]>(
    () => homeFrontState.value?.response?.notificationList!,
  );

  const getFirstName = computed<string>(
    () => homeFrontState.value?.response?.firstName!,
  );

  const getLastName = computed<string>(
    () => homeFrontState.value?.response?.lastName!,
  );

  const getCompanyName = computed<string>(
    () => homeFrontState.value?.response?.companyName!,
  );

  const getID = computed<string>(
    () => homeFrontState.value?.response?.identification!,
  );

  const getLoginDate = computed<string>(
    () => homeFrontState.value?.response?.loginDate!,
  );

  const getInternalID = computed<string>(
    () => homeFrontState.value?.response?.internalBankCode!,
  );

  const getUserIP = computed<string>(
    () => homeFrontState.value?.response?.userIp!,
  );

  return {
    homeFrontState,
    setHomeFrontState(newState: IHomeData): void {
      homeFrontState.value = newState;
    },
    getFirstName,
    getLastName,
    getCompanyName,
    getID,
    getLoginDate,
    getInternalID,
    getUserIP,
    getNotificationsList,
    getLoginHour,
    getPedingTransactions,
    getTotalPendingTransactions,
  };
});
