import { storeToRefs } from 'pinia';
import { computed, onBeforeUnmount, ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import useAuthorizationsStore from '../store/useAuthorizationsStore';
import i18n from '@/locales/i18n';
import useAuthorizationsServices from '../services/useAuthorizationsServices';
import useDecryptHelper from '@/commons/helpers/decryptHelper';
import type { IAuthorizedList } from '../entities/authorizationsInterfaces';

const fileType = ref<'xls' | 'pdf'>('xls');

const getSemaphoreInfo = (
  type: string,
): [string, 'red' | 'yellow' | 'green'] => {
  if (type === 'A')
    return [
      i18n.global.t('AUTHORIZATIONS-MODULE.STEP-RESULT.APPROVED'),
      'green',
    ];
  if (type === 'R')
    return [
      i18n.global.t('AUTHORIZATIONS-MODULE.STEP-RESULT.REJECTED'),
      'yellow',
    ];
  if (type === 'E')
    return [i18n.global.t('AUTHORIZATIONS-MODULE.STEP-RESULT.ERROR'), 'red'];

  return ['', 'red'];
};

const useAuthorizationResult = () => {
  const authorizationsStore = useAuthorizationsStore();
  const { exportFile } = useAuthorizationsServices();
  const decryptHelper = useDecryptHelper();
  const { authorizedList, acceptRqUID, rejectMotive } =
    storeToRefs(authorizationsStore);

  const getRecords = computed<IAuthorizedList[]>(() => authorizedList.value);

  const isSingleAuthorization = computed<boolean>(() => {
    if (authorizedList.value.length > 1) return false;
    else return true;
  });

  const exportMutation = useMutation(['spinner'], exportFile, {
    onError: () => {},
    onSuccess: (file) => {
      decryptHelper.createFile(file, fileType.value);
    },
  });
  const doExport = (type: 'xls' | 'pdf') => {
    fileType.value = type;
    exportMutation.mutate({
      type: type,
      rqUID: acceptRqUID.value,
      isReject: false,
    });
  };

  const getAlertInfo = (statusCode: string): [string, string] => {
    if (statusCode === 'A')
      return [
        i18n.global.t('AUTHORIZATIONS-MODULE.STEP-RESULT.ALERT-TITLE-A'),
        i18n.global.t('AUTHORIZATIONS-MODULE.STEP-RESULT.SUCCESS-ALERT'),
      ];
    if (statusCode === 'R')
      return [
        i18n.global.t('AUTHORIZATIONS-MODULE.STEP-RESULT.ALERT-TITLE-R'),
        i18n.global.t('AUTHORIZATIONS-MODULE.STEP-RESULT.R-ALERT') +
          '"' +
          rejectMotive.value +
          '"',
      ];
    return ['', ''];
  };

  onBeforeUnmount(() => {
    authorizationsStore.resetStore();
    authorizationsStore.resetAuthorizationList();
  });
  return {
    getRecords,
    isSingleAuthorization,
    getAlertInfo,
    doExport,
    getSemaphoreInfo,
  };
};

export default useAuthorizationResult;
