import { computed, ref, watch } from 'vue';
import useAuthorizationsStore from '../store/useAuthorizationsStore';
import { storeToRefs } from 'pinia';
import { useMutation, useQuery } from '@tanstack/vue-query';

import i18n from '@/locales/i18n';
import type {
  IAuthorization,
  IAuthorizationsResponse,
  IAuthorizedListResponse,
  IListToAuthorize,
  IListToReject,
} from '../entities/authorizationsInterfaces';
import useAuthorizationsServices from '../services/useAuthorizationsServices';
import useSortHelper from '@/commons/helpers/useSortHelpers';
import useFormattHelper from '@/commons/helpers/formatMoney';
import STEPS from '../constants/steps';
import { sblOptionCodes } from '@/commons/constants/responseCodes';
import RSAEncrypt from '@/commons/helpers/encryptHelper';
import type { IPermitions } from '@/commons/entities/global.interfaces';
import usePermitionHelper from '@/commons/helpers/permitionsHelper';
import authorizationsPermitionsCodes from '../constants/permitions';

const typeAction = ref<'reject' | 'authorize'>('authorize');
const securityModalVisible = ref<boolean>(false);
const modalRejectVisible = ref<boolean>(false);
const sblPushModalVisible = ref<boolean>(false);
const sblSoftTokenModalVisible = ref<boolean>(false);
const passwordModalVisible = ref<boolean>(false);
const tokenModalVisible = ref<boolean>(false);
const typeAuthorization = ref<string>('');
const filterForType = ref<string>('');
const id = ref<string>('');
const startDate = ref<string>('');
const endDate = ref<string>('');
const currentPage = ref<number>(1);
const elementsPerPageDesktop: number = 10;
const init = ref<number>(
  currentPage.value * elementsPerPageDesktop - elementsPerPageDesktop,
);
const end = ref<number>(currentPage.value * elementsPerPageDesktop);
const errorMessage = ref<string>('');
const errorCode = ref<string>('');
const alertIsClosed = ref<boolean>(false);

const useAuthorizationsList = () => {
  const authorizationsStore = useAuthorizationsStore();
  const {
    getAuthorization,
    acceptAuthorizations,
    rejectAuthorizations,
    getAuthorizations,
  } = useAuthorizationsServices();
  const {
    authorizationsList,
    authorizationSelected,
    currentStep,
    listToAuthorize,
    authorizedList,
    listToReject,
    acceptRqUID,
    permitions,
    rejectMotive,
  } = storeToRefs(authorizationsStore);
  const { sortAlphabetically, sortDates, sortNumber, getMinDate, getMaxDate } =
    useSortHelper();
  const { addCurrencyDot } = useFormattHelper();
  const { hasPermitions } = usePermitionHelper();

  const buttonDisabled = computed<boolean>(() => {
    return !getRecords.value!.some((record) => !!record.isActive);
  });

  const getHeaders = computed<
    { title: string; property: string; subtitle?: string }[]
  >(() => [
    {
      title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.DATE'),
      property: 'date',
    },
    {
      title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.TYPE'),
      property: 'authorizationsType',
    },
    {
      title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.SERVICE'),
      subtitle: 'Accion',
      property: 'service',
    },
    {
      title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.USER'),
      property: 'creator',
    },
    {
      title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.VALUE'),
      property: 'value',
    },
    {
      title: i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.REFERENCE'),
      property: 'paymentReference',
    },
  ]);
  const { isLoading } = useQuery(['authorizationsList'], getAuthorizations, {
    onSuccess: (data: IAuthorizationsResponse) => {
      !!data.response
        ? authorizationsStore.setAuthorizationsList(data.response)
        : console.log('error inesperado');
    },
    onError: () => {},
  });

  const getRecords = computed<IAuthorization[] | null>(() => {
    let filteredRecords = authorizationsList.value;
    if (!!filterForType.value) {
      filteredRecords = filteredRecords?.filter(
        (authorization) =>
          authorization.authorizationsType === filterForType.value,
      );
    }
    if (!!startDate.value && !!endDate.value) {
      filteredRecords = filteredRecords?.filter(filterDate);
    }
    return filteredRecords!;
  });
  const totalPages = computed<number>(() =>
    Math.ceil(getRecords.value?.length! / elementsPerPageDesktop),
  );

  const changePage = ($event: any): void => {
    currentPage.value = $event;
    init.value =
      currentPage.value * elementsPerPageDesktop - elementsPerPageDesktop;
    end.value = currentPage.value * elementsPerPageDesktop;
  };

  const filterDate = (authorization: any): boolean => {
    return (
      new Date(authorization.date) >= new Date(startDate.value) &&
      new Date(authorization.date) <= new Date(endDate.value)
    );
  };

  const getType = (type: string): string => {
    if (type === 'nomonetary' || type === 'noMonetary')
      return i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.NO-MONETARY');
    if (type === 'file')
      return i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.FILE');
    if (type === 'monetary')
      return i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.MONETARY');
    return '';
  };

  const getListTypes = computed<string[]>(() => {
    return [
      i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.ALL'),
      i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.MONETARY'),
      i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.NO-MONETARY'),
      i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.FILE'),
    ];
  });

  const authorizationMutation = useMutation(['spinner'], getAuthorization, {
    onSuccess: (data) => {
      authorizationsStore.setAuthorizationDetail(data.response!, id.value);
    },
  });

  const acceptAuthorizationMutation = useMutation(
    ['spinner'],
    acceptAuthorizations,
    {
      onSuccess: (data: IAuthorizedListResponse) => {
        acceptRqUID.value = data.response?.rqUID!;
        authorizedList.value = data.response?.transaction!;
        currentStep.value = STEPS.stepAuthorizationResult;
        alertIsClosed.value = true;
      },
      onError: (error: any) => {
        errorMessage.value = error.response.data.message;
        errorCode.value = error.response.data.code;
      },
    },
  );

  const rejectAuthorizationMutation = useMutation(
    ['spinner'],
    rejectAuthorizations,
    {
      onSuccess: (data: IAuthorizedListResponse) => {
        acceptRqUID.value = data.response?.rqUID!;
        authorizedList.value = data.response?.transaction!;
        currentStep.value = STEPS.stepAuthorizationResult;
        alertIsClosed.value = true;
      },
      onError: (error: any) => {
        errorMessage.value = error.response.data.message;
        errorCode.value = error.response.data.code;
      },
    },
  );

  const searchDetail = (recordID: string): void => {
    if (hasPermitions(authorizationsPermitionsCodes.query, permitions.value!)) {
      const authorization = authorizationsList.value!.find(
        (authorization) => authorization.id === recordID,
      );

      if (!authorization?.detail) {
        id.value = recordID;
        authorizationMutation.mutate(recordID);
      }
    }
  };
  const activateAll = (isActive: boolean): void => {
    authorizationsList.value?.map(
      (authorization) => (authorization.isActive = isActive),
    );
  };

  const activateThis = (isActive: boolean, id: string): void => {
    authorizationsList.value!.find(
      (authorization) => authorization.id === id,
    )!.isActive = isActive;
  };

  const sort = (property: string, order: 'up' | 'down'): void => {
    const sortedRecords = [...authorizationsList.value!];

    if (property === 'date') {
      sortDates(sortedRecords, property, order);
    } else if (property === 'value') {
      sortNumber(sortedRecords, property, order);
    } else {
      sortAlphabetically(sortedRecords, property, order);
    }
    authorizationsList.value = sortedRecords;
  };

  const getMin = computed<string>(() => {
    if (!getRecords.value) return '';
    return getMinDate(getRecords.value, 'date');
  });
  const getMax = computed<string>(() => {
    if (!getRecords.value) return '';
    return getMaxDate(getRecords.value, 'date');
  });

  const setDetail = (id: string): void => {
    authorizationSelected.value = authorizationsList.value!.find(
      (authorization) => authorization.id === id,
    );
    if (!!authorizationSelected.value?.detail?.profileClientDTO) {
      currentStep.value = STEPS.stepAuthorizationProfileDetail;
    } else if (
      !!authorizationSelected.value?.detail?.listAssignedProductsByUserClient
    ) {
      currentStep.value = STEPS.stepAuthorizationProductsDetail;
    } else if (!!authorizationSelected.value?.detail?.userLimitAmountDTO) {
      currentStep.value = STEPS.stepAuthorizationAmountDetail;
    } else {
      currentStep.value = STEPS.stepAuthorizationsDetail;
    }
  };
  const authorize = (): void => {
    typeAction.value = 'authorize';
    const activeAuthorizations: IAuthorization[] =
      authorizationsList.value?.filter(
        (authorization) => !!authorization.isActive,
      )!;
    listToAuthorize.value!.transactions = activeAuthorizations.map(
      (authorization) => {
        return {
          id: authorization.id!,
          isFile: authorization.isFile,
          isMonetary: authorization.isMonetary,
          serviceName: authorization.service,
          serviceAction: authorization.action,
          serviceNameAlt: authorization.serviceAlt,
        };
      },
    );
    navigateToConfirmationMode();
  };

  const reject = (): void => {
    typeAction.value = 'reject';
    modalRejectVisible.value = true;
    const activeAuthorizations: IAuthorization[] =
      authorizationsList.value?.filter(
        (authorization) => !!authorization.isActive,
      )!;
    listToReject.value!.transactions = activeAuthorizations.map(
      (authorization) => {
        return {
          id: authorization.id!,
          isFile: authorization.isFile,
          isMonetary: authorization.isMonetary,
          serviceName: authorization.service,
          serviceAction: authorization.action,
          serviceNameAlt: authorization.serviceAlt,
        };
      },
    );
    modalRejectVisible.value = true;
    displaySecurityModal();
  };

  const navigateToConfirmationMode = (): void => {
    hideModal();
    const getPermitions: IPermitions[] = JSON.parse(
      localStorage.getItem('permitions')!,
    );
    const { hasAutentication, isPasswordConfirm, isTokenConfirm }: IPermitions =
      getPermitions.find(
        (permition: any) => permition.code === sblOptionCodes.authorizations,
      )!;
    const needsAuth: number = parseInt(hasAutentication!);
    const requestPass: number = parseInt(isPasswordConfirm!);
    const requestToken: number = parseInt(isTokenConfirm!);
    if (needsAuth) {
      displaySecurityModal();
      if (requestPass) {
        passwordModalVisible.value = true;
      } else if (requestToken) {
        if (localStorage.getItem('tokenType') === '2') {
          sblPushModalVisible.value = true;
        } else {
          tokenModalVisible.value = true;
        }
      } else {
        passwordModalVisible.value = true;
      }
    } else {
      successValidation();
    }
  };

  watch(typeAuthorization, (newValue) => {
    changePage(1);
    if (
      newValue ===
      i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.NO-MONETARY')
    )
      filterForType.value = 'noMonetary';
    else if (
      newValue ===
      i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.MONETARY')
    )
      filterForType.value = 'monetary';
    else if (
      newValue === i18n.global.t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.FILE')
    )
      filterForType.value = 'file';
    else filterForType.value = '';
  });

  const successValidation = (credential?: string): void => {
    if (typeAction.value === 'reject') {
      hideModal();
      !!credential ? setCredential(credential) : setCredential('');
      const list: IListToReject = listToReject.value;
      rejectAuthorizationMutation.mutate(list);
    } else {
      hideModal();
      !!credential ? setCredential(credential) : setCredential('');
      const list: IListToAuthorize = listToAuthorize.value;
      acceptAuthorizationMutation.mutate(list);
    }
  };

  const displaySecurityModal = (): void => {
    securityModalVisible.value = true;
  };

  const hideModal = (): void => {
    securityModalVisible.value = false;
    sblPushModalVisible.value = false;
    sblSoftTokenModalVisible.value = false;
    passwordModalVisible.value = false;
    tokenModalVisible.value = false;
    modalRejectVisible.value = false;
  };

  const setCredential = (credential: string): void => {
    const cred = RSAEncrypt(localStorage.getItem('publicKey')!, credential);
    listToAuthorize.value.credential = cred;
    listToReject.value.credential = cred;
  };

  return {
    getType,
    searchDetail,
    getListTypes,
    typeAuthorization,
    getHeaders,
    getRecords,
    authorizationMutation,
    startDate,
    endDate,
    id,
    activateAll,
    activateThis,
    sort,
    changePage,
    init,
    end,
    totalPages,
    addCurrencyDot,
    getMin,
    getMax,
    setDetail,
    displaySecurityModal,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    hideModal,
    successValidation,
    authorize,
    buttonDisabled,
    reject,
    modalRejectVisible,
    listToReject,
    navigateToConfirmationMode,
    permitions,
    hasPermitions,
    isLoading,
    errorMessage,
    errorCode,
    alertIsClosed,
    rejectMotive,
  };
};

export default useAuthorizationsList;
