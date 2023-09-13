import { computed, onBeforeMount, ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import i18n from '@/locales/i18n';
import useTemplateServices from '../services/useTemplatesServices';
import type {
  ITemplate,
  ITemplateDetail,
  ITemplateListResponse,
} from '../entities/transfersInterfaces';
import useTransfersStore from '../store/useTransfersStore';
import RSAEncrypt from '@/commons/helpers/encryptHelper';
import STEPS from '../constants/steps';
import SUBSTEPS from '../constants/subSteps';
import useFormattHelper from '@/commons/helpers/formatMoney';
import type { IPermitions } from '@/commons/entities/global.interfaces';
import { sblOptionCodes } from '@/commons/constants/responseCodes';

const useTemplates = () => {
  const { getTemplateList, getTemplateDetail, deleteTemplate } =
    useTemplateServices();
  const tranfersStore = useTransfersStore();
  const { formateDate } = useFormattHelper();
  const {
    templateList,
    currentStep,
    transferList,
    currentSubStep,
    alertIsVisible,
    alertType,
    alertBody,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    selectedTemplateId,
    templatesShareList,
  } = storeToRefs(tranfersStore);

  const pageIndex = ref<number>(1);
  const templatetoDeleteID = ref<number>(0);
  const shareButtonDisabled = ref<boolean>(true);
  const stepValue = ref<'reuse' | 'duplicate' | 'modify'>();

  const getHeaders = computed<{ title: string; property: string }[]>(() => [
    {
      title: i18n.global.t('TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-NAME'),
      property: 'name',
    },
    {
      title: i18n.global.t('TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.HEADER-DATE'),
      property: 'date',
    },
  ]);

  const getPaginatedTemplateList = computed<ITemplate[]>(() => {
    const list: [ITemplate[]] = templateList.value!.reduce(
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
    if (!templateList.value) return 1;
    const templatesAmount: number = templateList.value!.length;
    return Math.ceil(templatesAmount / 10);
  });

  const getTemplateListMutation = useMutation(['spinner'], getTemplateList, {
    onSuccess: (data: ITemplateListResponse) => {
      templateList.value = data.response?.templateList;
    },
  });

  const getTemplateDetailMutation = useMutation(
    ['spinner'],
    getTemplateDetail,
    {
      onSuccess: (data: ITemplateDetail) => {
        transferList.value = data.response?.templateTransactions!;
        if (stepValue.value === 'reuse')
          currentStep.value = STEPS.stepReuseTemplate;
        if (stepValue.value === 'duplicate')
          currentStep.value = STEPS.stepDuplicateTemplate;
        if (stepValue.value === 'modify')
          currentStep.value = STEPS.stepModifyTemplate;
        currentSubStep.value = SUBSTEPS.stepThree;
      },
      onError: () => {
        selectedTemplateId.value = 0;
      },
    },
  );

  const deleteTemplateMutation = useMutation(['spinner'], deleteTemplate, {
    onSuccess: () => {
      localStorage.removeItem('Authorization');
      getTemplateListMutation.mutate();
      alertIsVisible.value = true;
      alertType.value = 'green';
      alertBody.value = i18n.global.t(
        'TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.DELETED',
      );
    },
  });

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

  const successValidation = (credential?: string): void => {
    hideModal();
    !!credential ? setCredential(credential) : setCredential('');
  };

  const selectTemplate = (template: {
    id: number;
    name: string;
    date: string;
  }): void => {
    const index = templatesShareList.value.findIndex(
      (item) => item.id === template.id,
    );
    if (index !== -1) {
      templatesShareList.value.splice(index, 1);
    } else {
      templatesShareList.value.push(template);
    }
    templatesShareList.value.length >= 1
      ? (shareButtonDisabled.value = false)
      : (shareButtonDisabled.value = true);
  };

  const setCredential = (credential: string): void => {
    const cred = RSAEncrypt(localStorage.getItem('publicKey')!, credential);
    const formData = { id: templatetoDeleteID.value, auth: cred };
    deleteTemplateMutation.mutate(formData);
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

  const deleteTemplateAction = (id: number): void => {
    templatetoDeleteID.value = id;
    navigateToConfirmationMode();
  };

  const reUseTemplateAction = (id: number): void => {
    stepValue.value = 'reuse';
    getTemplateDetailMutation.mutate(id);
  };

  const modifyTemplateAction = (id: number): void => {
    stepValue.value = 'modify';
    selectedTemplateId.value = id;
    getTemplateDetailMutation.mutate(id);
  };

  const duplicateTemplateAction = (id: number): void => {
    stepValue.value = 'duplicate';
    getTemplateDetailMutation.mutate(id);
  };

  onBeforeMount(() => {
    hideModal();
    getTemplateListMutation.mutate();
    templatesShareList.value = [];
  });

  const goToStep = (step: STEPS): void => {
    currentStep.value = step;
  };

  return {
    getHeaders,
    templateList,
    getPages,
    pageIndex,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    alertIsVisible,
    alertType,
    alertBody,
    getPaginatedTemplateList,
    shareButtonDisabled,
    goToStep,
    reUseTemplateAction,
    modifyTemplateAction,
    duplicateTemplateAction,
    formateDate,
    deleteTemplateAction,
    successValidation,
    hideModal,
    selectTemplate,
  };
};

export default useTemplates;
