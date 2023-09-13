import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import STEPS from '../constants/steps';
import type {
  IAssignedProduct,
  IAuthorization,
  IAuthorizationDetail,
  IAuthorizedList,
  IListToAuthorize,
  IListToReject,
  IProfileClientDTO,
  ITransactionFullDetail,
  IUserLimitAmountDTO,
} from '../entities/authorizationsInterfaces';
import {
  initAuthorizedList,
  initListToAuthorize,
  initListToReject,
} from '../constants/initStates';
import type { IPermitions } from '@/commons/entities/global.interfaces';

const useAuthorizationsStore = defineStore('AuthorizationsStore', () => {
  const currentStep = ref<string>(STEPS.stepAuthorizationsList);
  const authorizationSelected = ref<IAuthorization>();
  const authorizationsList = ref<IAuthorization[] | null>();
  const listToAuthorize = ref<IListToAuthorize>(initListToAuthorize);
  const authorizedList = ref<IAuthorizedList[]>([initAuthorizedList]);
  const listToReject = ref<IListToReject>(initListToReject);
  const acceptRqUID = ref<string>('');
  const permitions = ref<IPermitions>();
  const rejectMotive = ref<string>('');

  const getTransactionFullDetailDTO = computed<ITransactionFullDetail[]>(
    () => authorizationSelected.value?.detail?.transactionFullDetailDTO!,
  );

  const getProfileClientDTO = computed<null | IProfileClientDTO>(
    () => authorizationSelected.value?.detail?.profileClientDTO!,
  );

  const getAssignedProducts = computed<null | IAssignedProduct[]>(
    () =>
      authorizationSelected.value?.detail?.listAssignedProductsByUserClient!,
  );

  const getUserLimitAmountDTO = computed<null | IUserLimitAmountDTO>(
    () => authorizationSelected.value?.detail?.userLimitAmountDTO!,
  );

  const resetStore = (): void => {
    currentStep.value = STEPS.stepAuthorizationsList;
    authorizationSelected.value = undefined;
    listToAuthorize.value = initListToAuthorize;
    listToReject.value = initListToReject;
    rejectMotive.value = '';
  };

  const resetAuthorizationList = (): void => {
    authorizationsList.value = null;
  };

  return {
    rejectMotive,
    currentStep,
    authorizationsList,
    authorizationSelected,
    getTransactionFullDetailDTO,
    getUserLimitAmountDTO,
    getProfileClientDTO,
    getAssignedProducts,
    listToAuthorize,
    authorizedList,
    listToReject,
    acceptRqUID,
    permitions,
    resetStore,
    resetAuthorizationList,
    setAuthorizationsList(newState: IAuthorization[]): void {
      authorizationsList.value = newState;
    },
    setAuthorizationDetail(newState: IAuthorizationDetail, id: string): void {
      authorizationsList.value!.find(
        (authorization) => authorization.id === id,
      )!.detail = newState;
    },
  };
});

export default useAuthorizationsStore;
