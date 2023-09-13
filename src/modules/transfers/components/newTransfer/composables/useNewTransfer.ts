import { computed, defineAsyncComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMutation } from '@tanstack/vue-query';

import { sblOptionCodes } from '@/commons/constants/responseCodes';
import useDecryptHelper from '@/commons/helpers/decryptHelper';
import { initTransferFormData } from '@/modules/transfers/constants/initialStates';
import type {
  INewTransferFormData,
  INewTransferResponse,
} from '@/modules/transfers/entities/transfersInterfaces';
import SUBSTEPS from '../../../constants/subSteps';
import useTransfersStore from '@/modules/transfers/store/useTransfersStore';
import useNewTransferServices from '@/modules/transfers/services/useNewTransferServices';
import useFormattHelper from '@/commons/helpers/formatMoney';
import RSAEncrypt from '@/commons/helpers/encryptHelper';
import STEPS from '@/modules/transfers/constants/steps';
import { useNewTransferForm } from './useNewTransferForm';
import { getDetailHeaders } from '@/modules/transfers/constants/tableHeaders';
import useSortHelper from '@/commons/helpers/useSortHelpers';
import type { ITransfer } from '@/modules/transfers/entities/transfersInterfaces';
import type { IPermitions } from '@/commons/entities/global.interfaces';
import i18n from '@/locales/i18n';
import { responseCodes } from '@/commons/constants/responseCodes';
import type { IExportFormData } from '@/modules/transfers/entities/transfersInterfaces';

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

const StepFinalComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/transfers/components/newTransfer/components/stepFinal/StepFinalComponent.vue'
    ),
);

const useNewTransfer = () => {
  const transferStore = useTransfersStore();
  const decryptHelper = useDecryptHelper();
  const { newTransfer, resetForm } = useNewTransferForm();

  const {
    currentStep,
    currentSubStep,
    buttonDisabled,
    transferList,
    transferResultList,
    isProgrammedTransfer,
    alertIsVisible,
    alertType,
    alertIcon,
    alertBoldText,
    alertBody,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
  } = storeToRefs(transferStore);

  const transferFormData = ref<INewTransferFormData>(initTransferFormData);
  const fileType = ref<'pdf' | 'xls'>('pdf');
  const { addCurrencyDot } = useFormattHelper();
  const { sortAlphabetically, sortDates, sortNumber } = useSortHelper();
  const { executeNewTransfer, exportTransferResume } = useNewTransferServices();

  const componentStep: any = computed(() => {
    const step = currentSubStep.value;
    if (step == SUBSTEPS.stepOne) return StepOneComponent;
    if (step == SUBSTEPS.stepTwo) return StepTwoComponent;
    if (step == SUBSTEPS.stepThree) return StepThreeComponent;
    if (step == SUBSTEPS.stepFinal) return StepFinalComponent;
    return null;
  });

  const isFinalStep = computed<boolean>(() => {
    if (currentSubStep.value == SUBSTEPS.stepFinal) return true;
    else return false;
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

  const deleteTransfer = (transfer: ITransfer): void => {
    transferList.value = transferList.value.filter(
      (item) => item.id !== transfer.id,
    );
  };

  const editTransfer = (transfer: ITransfer): void => {
    newTransfer.value = transferList.value.find(
      (item) => item.id === transfer.id,
    )!;
    deleteTransfer(transfer);
    currentSubStep.value = SUBSTEPS.stepOne;
  };

  const newTransferMutation = useMutation(['spinner'], executeNewTransfer, {
    onSuccess: (data: INewTransferResponse) => {
      const code = data.response.executeTransactionResultList[0].code;
      if (
        code === responseCodes.transfer.newTransfer.pending ||
        code === responseCodes.transfer.newTransfer.programmed ||
        code === responseCodes.transfer.newTransfer.success
      ) {
        transferResultList.value = data.response?.executeTransactionResultList!;
        currentSubStep.value = SUBSTEPS.stepFinal;
        if (transferResultList.value.length == 1) {
          const code = transferResultList.value[0].code;
          alertIsVisible.value = true;
          alertType.value = 'green';
          alertIcon.value = getTransactionStatus(code)!.icon;
          alertBody.value = getTransactionStatus(code)!.text;
        }
      } else {
        alertIsVisible.value = true;
        alertType.value = 'red';
        alertBody.value = data.response.executeTransactionResultList[0].message;
      }
    },
    onError: (error: any) => {
      alertIsVisible.value = true;
      alertType.value = 'red';
      alertBody.value = error.response.data.message;
      buttonDisabled.value = false;
    },
  });

  const addStep = (): void => {
    buttonDisabled.value = true;
    const step = currentSubStep.value;
    if (step == SUBSTEPS.stepFinal) return;
    if (step == SUBSTEPS.stepThree) navigateToConfirmationMode();
    if (step == SUBSTEPS.stepOne) currentSubStep.value = SUBSTEPS.stepTwo;
    if (step == SUBSTEPS.stepTwo) currentSubStep.value = SUBSTEPS.stepThree;
  };

  const getTransactionStatus = (
    code: string,
  ): { text: string; icon: string } | undefined => {
    if (code === '') code = '0';
    if (code === responseCodes.transfer.newTransfer.pending)
      return {
        text: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.ALERT-LABEL-PENDING',
        ),
        icon: 'icon-icon-clock',
      };
    else if (code === responseCodes.transfer.newTransfer.success) {
      return {
        text: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.ALERT-LABEL-SUCCESS',
        ),
        icon: '',
      };
    } else if (code === responseCodes.transfer.newTransfer.programmed) {
      return {
        text: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.ALERT-LABEL-PROGRAMMED',
        ),
        icon: 'icon-icon-clock',
      };
    }
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

  const exportFile = (type: 'pdf' | 'xls'): void => {
    fileType.value = type;
    const formData = ref<IExportFormData>({
      isMultiTx: transferResultList.value.length > 1 ? true : false,
      rqUID: transferResultList.value[0].rqUID,
      statusCode: '',
    });
    exportFileMutation.mutate(formData.value);
  };

  const exportFileMutation = useMutation(exportTransferResume, {
    onSuccess: (data) => {
      decryptHelper.createFile(data, fileType.value);
    },
  });

  const cancelAction = (): void => {
    currentStep.value == STEPS.stepTransfersDetail;
    transferStore.$resetStore();
    resetForm();
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
    const formData = ref<INewTransferFormData>(transferFormData.value);
    formData.value.transactionList = transferList.value;
    newTransferMutation.mutate(formData.value);
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
  };

  const addNewTransfer = (): void => {
    currentSubStep.value = SUBSTEPS.stepOne;
  };

  const setCredential = (credential: string): void => {
    const cred = RSAEncrypt(localStorage.getItem('publicKey')!, credential);
    transferFormData.value.credential = cred;
  };

  return {
    componentStep,
    newTransfer,
    currentSubStep,
    hasStepIcon,
    addStep,
    isFinalStep,
    buttonDisabled,
    cancelAction,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    transferList,
    hideModal,
    addCurrencyDot,
    successValidation,
    addNewTransfer,
    getDetailHeaders,
    sort,
    deleteTransfer,
    editTransfer,
    exportFile,
    isProgrammedTransfer,
    transferResultList,
    alertIsVisible,
    alertType,
    alertIcon,
    alertBoldText,
    alertBody,
  };
};

export default useNewTransfer;
