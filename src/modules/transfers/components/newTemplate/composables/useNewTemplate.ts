import { computed, defineAsyncComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMutation } from '@tanstack/vue-query';

import useTransfersStore from '@/modules/transfers/store/useTransfersStore';
import { useNewTransferForm } from '../../newTransfer/composables/useNewTransferForm';
import type { INewTemplateFormData } from '@/modules/transfers/entities/transfersInterfaces';
import { getDetailHeaders } from '@/modules/transfers/constants/tableHeaders';
import useSortHelper from '@/commons/helpers/useSortHelpers';
import RSAEncrypt from '@/commons/helpers/encryptHelper';
import useFormattHelper from '@/commons/helpers/formatMoney';
import SUBSTEPS from '@/modules/transfers/constants/subSteps';
import useTemplateServices from '@/modules/transfers/services/useTemplatesServices';
import { initNewTemplateFormData } from '@/modules/transfers/constants/initialStates';
import { sblOptionCodes } from '@/commons/constants/responseCodes';
import type { IPermitions } from '@/commons/entities/global.interfaces';
import i18n from '@/locales/i18n';
import STEPS from '@/modules/transfers/constants/steps';

const StepOneComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/newTransfer/components/stepOne/StepOneComponent.vue'
    ),
);

const StepTwoComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/newTransfer/components/stepTwo/StepTwoComponent.vue'
    ),
);

const StepThreeComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/newTransfer/components/stepThree/StepThreeComponent.vue'
    ),
);

const useNewTemplate = () => {
  const transferStore = useTransfersStore();
  const { newTransfer, resetForm } = useNewTransferForm();
  const { addCurrencyDot } = useFormattHelper();
  const { sortAlphabetically, sortDates, sortNumber } = useSortHelper();
  const { createTemplate, updateTemplate } = useTemplateServices();

  const {
    currentSubStep,
    buttonDisabled,
    transferList,
    isProgrammedTransfer,
    alertIsVisible,
    alertType,
    alertIcon,
    alertBoldText,
    alertBody,
    templateName,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    currentStep,
    selectedTemplateId,
  } = storeToRefs(transferStore);

  const templateCreated = ref<boolean>(false);
  const templateFormData = ref<INewTemplateFormData>(initNewTemplateFormData);
  const templateNameModalIsVisible = ref<boolean>(false);
  const requestTemplateEdit = ref<boolean>(false);
  const confirmValueModalVisible = ref<boolean>(false);
  const valueChangeModalVisible = ref<boolean>(false);
  const confirmDateModalVisible = ref<boolean>(false);
  const calendarModalVisible = ref<boolean>(false);
  const newValue = ref<string>('');

  const componentStep: any = computed(() => {
    const step = currentSubStep.value;
    if (step == SUBSTEPS.stepOne) return StepOneComponent;
    if (step == SUBSTEPS.stepTwo) return StepTwoComponent;
    if (step == SUBSTEPS.stepThree) return StepThreeComponent;
    return null;
  });

  const hasStepIcon = (step: string): boolean => {
    if (step == SUBSTEPS.stepOne) {
      if (step == currentSubStep.value) {
        return false;
      } else {
        return true;
      }
    } else if (step == SUBSTEPS.stepTwo) {
      if (
        step == currentSubStep.value ||
        currentSubStep.value == SUBSTEPS.stepOne
      ) {
        return false;
      } else {
        return true;
      }
    } else if (step == SUBSTEPS.stepThree) {
      if (
        step == currentSubStep.value ||
        currentSubStep.value == SUBSTEPS.stepOne ||
        currentSubStep.value == SUBSTEPS.stepTwo
      ) {
        return false;
      } else {
        return true;
      }
    } else return true;
  };

  const createTemplateMutation = useMutation(['spinner'], createTemplate, {
    onSuccess: () => {
      alertIsVisible.value = true;
      alertType.value = 'green';
      alertBody.value = i18n.global.t(
        'TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.SUCCESS',
      );
      templateCreated.value = true;
    },
    onError: () => {
      alertIsVisible.value = true;
      buttonDisabled.value = false;
    },
  });

  const editTemplateMutation = useMutation(['spinner'], updateTemplate, {
    onSuccess: () => {
      alertIsVisible.value = true;
      alertType.value = 'green';
      alertBody.value = i18n.global.t(
        'TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.SUCCESS',
      );
      templateCreated.value = true;
    },
    onError: () => {
      alertIsVisible.value = true;
      buttonDisabled.value = false;
    },
  });

  const changeDate = (date: string): void => {
    calendarModalVisible.value = false;
    transferList.value = transferList.value.map((obj) => ({
      ...obj,
      txDate: date,
    }));
  };

  const changeValues = (value: string): void => {
    valueChangeModalVisible.value = false;
    transferList.value = transferList.value.map((obj) => ({
      ...obj,
      payVal: value,
    }));
    newValue.value = '';
  };

  const navigateToConfirmationMode = (): void => {
    alertIsVisible.value = false;
    alertIcon.value = '';
    alertBody.value = '';
    alertBoldText.value = '';
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
    templateFormData.value.templateName = templateName.value;
    templateFormData.value.templateTransactions = transferList.value;
    if (requestTemplateEdit.value) {
      const form = {
        id: selectedTemplateId.value,
        formData: templateFormData.value,
      };
      editTemplateMutation.mutate(form);
    } else createTemplateMutation.mutate(templateFormData.value);
  };

  const setCredential = (credential: string): void => {
    const cred = RSAEncrypt(localStorage.getItem('publicKey')!, credential);
    templateFormData.value.credential = cred;
  };

  const displaySecurityModal = (): void => {
    securityModalVisible.value = true;
  };

  const hideModal = (): void => {
    buttonDisabled.value = false;
    securityModalVisible.value = false;
    sblPushModalVisible.value = false;
    sblSoftTokenModalVisible.value = false;
    passwordModalVisible.value = false;
    tokenModalVisible.value = false;
    templateNameModalIsVisible.value = false;
  };

  const handleButton = (): void => {
    const step = currentStep.value;
    if (templateCreated.value) cancelAction();
    if (step === STEPS.stepNewTemplate) {
      navigateToConfirmationMode();
    } else if (
      step === STEPS.stepDuplicateTemplate ||
      step === STEPS.stepModifyTemplate
    ) {
      if (templateNameModalIsVisible.value) {
        navigateToConfirmationMode();
        templateNameModalIsVisible.value = false;
      } else templateNameModalIsVisible.value = true;
    }
  };

  const addStep = (isEdit?: boolean): void => {
    if (isEdit) requestTemplateEdit.value = true;
    buttonDisabled.value = true;
    const step = currentSubStep.value;
    if (step == SUBSTEPS.stepThree) handleButton();
    if (step == SUBSTEPS.stepOne) currentSubStep.value = SUBSTEPS.stepTwo;
    if (step == SUBSTEPS.stepTwo) currentSubStep.value = SUBSTEPS.stepThree;
  };

  const sort = (property: string, order: 'up' | 'down'): void => {
    if (property === 'date') {
      sortDates(transferList.value, property, order);
    } else if (property === 'value') {
      sortNumber(transferList.value, property, order);
    } else {
      sortAlphabetically(transferList.value, property, order);
    }
  };

  const cancelAction = (): void => {
    hideModal();
    templateCreated.value = false;
    requestTemplateEdit.value = false;
    transferStore.$resetStore();
    resetForm();
  };

  return {
    componentStep,
    newTransfer,
    currentSubStep,
    buttonDisabled,
    transferList,
    isProgrammedTransfer,
    alertIsVisible,
    alertType,
    alertIcon,
    alertBoldText,
    alertBody,
    templateCreated,
    templateName,
    securityModalVisible,
    getDetailHeaders,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    templateNameModalIsVisible,
    confirmValueModalVisible,
    valueChangeModalVisible,
    confirmDateModalVisible,
    calendarModalVisible,
    newValue,
    changeDate,
    changeValues,
    successValidation,
    hideModal,
    hasStepIcon,
    addStep,
    addCurrencyDot,
    cancelAction,
    sort,
  };
};

export default useNewTemplate;
