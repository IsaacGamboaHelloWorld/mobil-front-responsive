import { computed, onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMutation } from '@tanstack/vue-query';

import useTransfersStore from '@/modules/transfers/store/useTransfersStore';
import type {
  IUser,
  IUserListResponse,
  IShareTemplateFormData,
} from '@/modules/transfers/entities/transfersInterfaces';
import { initUser } from '@/modules/transfers/constants/initialStates';
import useTemplateServices from '@/modules/transfers/services/useTemplatesServices';
import i18n from '@/locales/i18n';
import useFormattHelper from '@/commons/helpers/formatMoney';
import type { IPermitions } from '@/commons/entities/global.interfaces';
import {
  responseCodes,
  sblOptionCodes,
} from '@/commons/constants/responseCodes';

const useShareTemplate = () => {
  const tranfersStore = useTransfersStore();
  const {
    templatesShareList,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    alertIsVisible,
    alertBody,
  } = storeToRefs(tranfersStore);
  const { getUserList, shareTemplate } = useTemplateServices();
  const { formateDate } = useFormattHelper();

  const templatesShared = ref<boolean>(false);
  const shareButtonDisabled = ref<boolean>(true);
  const userList = ref<IUser[]>([initUser]);
  const pageIndex = ref<number>(1);
  const userIDList = ref<number[]>([]);
  const formData = ref<IShareTemplateFormData>({
    templateIdList: [],
    userIdList: [],
  });
  const usersShared = ref<string[]>([]);

  const getTemplatesHeaders = computed<{ title: string; property: string }[]>(
    () => [
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-NAME',
        ),
        property: 'name',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-DATE',
        ),
        property: 'date',
      },
    ],
  );

  const getUsersHeaders = computed<{ title: string; property: string }[]>(
    () => [
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-USER',
        ),
        property: 'name',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-USER-NAME',
        ),
        property: 'name',
      },
    ],
  );

  const getSharedTemplatesHeader = computed<
    { title: string; property: string }[]
  >(() => [
    {
      title: i18n.global.t('TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-NAME'),
      property: 'name',
    },
    {
      title: i18n.global.t(
        'TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-USER-NAME',
      ),
      property: 'date',
    },
    {
      title: i18n.global.t(
        'TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-STATUS',
      ),
      property: 'name',
    },
    {
      title: i18n.global.t(
        'TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-CAUSE',
      ),
      property: 'name',
    },
  ]);

  const getUsersMutation = useMutation(['spinner'], getUserList, {
    onSuccess: (data: IUserListResponse) => {
      userList.value = data.response?.userList!;
    },
  });

  const shareTemplatesMutation = useMutation(['spinner'], shareTemplate, {
    onSuccess: () => {
      templatesShared.value = true;
    },
  });

  onBeforeMount(() => {
    getUsersMutation.mutate();
  });

  const getPaginatedUsersList = computed<IUser[]>(() => {
    const list: [IUser[]] = userList.value!.reduce(
      (result: any, item, index) => {
        const chunkIndex = Math.floor(index / 10);
        if (!result[chunkIndex]) {
          result[chunkIndex] = [];
        }
        result[chunkIndex].push(item);
        return result;
      },
      [],
    );
    return list[pageIndex.value - 1];
  });

  const getPages = computed<number>(() => {
    if (!userList.value) return 1;
    const templatesAmount: number = userList.value!.length;
    return Math.ceil(templatesAmount / 10);
  });

  const selectUser = (id: number): void => {
    if (userIDList.value.includes(id)) {
      userIDList.value = userIDList.value.filter((n) => n !== id);
    } else {
      userIDList.value.push(id);
    }
    userIDList.value.length >= 1
      ? (shareButtonDisabled.value = false)
      : (shareButtonDisabled.value = true);
  };

  const buttonAction = (): void => {
    if (templatesShared.value) closeAction();
    else {
      const templateList: string[] = templatesShareList.value.map(
        (item) => item.id?.toString()!,
      );
      const userList: string[] = userIDList.value.map((item) =>
        item.toString(),
      );
      usersShared.value = getPaginatedUsersList.value
        .filter((user) => userList.includes(user.id))
        .map((user) => user.name);
      formData.value.templateIdList = templateList;
      formData.value.userIdList = userList;
      navigateToConfirmationMode();
    }
  };

  const navigateToConfirmationMode = (): void => {
    alertIsVisible.value = false;
    alertBody.value = '';
    const getPermitions: IPermitions[] = JSON.parse(
      localStorage.getItem('permitions')!,
    );
    const { hasAutentication, isPasswordConfirm, isTokenConfirm }: IPermitions =
      getPermitions.find(
        (permition) => permition.code === sblOptionCodes.authorizations,
      )!;
    const needsAuth: number = parseInt(hasAutentication!);
    const requestPass: number = parseInt(isPasswordConfirm!);
    const requestToken: number = parseInt(isTokenConfirm!);
    if (needsAuth) {
      displaySecurityModal();
      if (requestPass) {
        passwordModalVisible.value = true;
      } else if (requestToken) {
        tokenModalVisible.value = true;
      } else {
        passwordModalVisible.value = true;
      }
    } else {
      successValidation();
    }
  };

  const successValidation = (): void => {
    hideModal();
    shareTemplatesMutation.mutate(formData.value);
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
  };

  const closeAction = (): void => {
    hideModal();
    tranfersStore.$resetStore();
  };

  const getTransactionStatus = (code: string) => {
    if (code === '') code = '0';
    if (code === responseCodes.transfer.newTransfer.pending)
      return {
        state: 'pending',
        label: 'Por autorizar',
        icon: 'icon-icon-clock',
      };
    else if (code === responseCodes.transfer.newTransfer.success) {
      return {
        state: 'success',
        label: 'Exitosa',
        icon: '',
      };
    } else if (code === responseCodes.transfer.newTransfer.programmed) {
      return {
        state: 'success',
        label: 'Programada',
        icon: 'icon-icon-clock',
      };
    }
  };

  return {
    getPaginatedUsersList,
    getPages,
    shareButtonDisabled,
    templatesShared,
    templatesShareList,
    getTemplatesHeaders,
    getUsersHeaders,
    pageIndex,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    alertIsVisible,
    alertBody,
    getSharedTemplatesHeader,
    userList,
    usersShared,
    closeAction,
    getTransactionStatus,
    successValidation,
    hideModal,
    selectUser,
    buttonAction,
    formateDate,
  };
};
export default useShareTemplate;
