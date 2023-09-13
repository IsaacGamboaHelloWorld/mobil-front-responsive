import { defineStore } from 'pinia';
import { ref } from 'vue';

import STEPS from '../constants/steps';
import type {
  IBankItem,
  IClient,
  IIDTypeItem,
  ILastTransaction,
  IProductTypeItem,
  ITransfer,
  ITransferResult,
  ITemplate,
  IScheduledTransfers,
} from '../entities/transfersInterfaces';
import type {
  IPermitions,
  IProduct,
} from '@/commons/entities/global.interfaces';
import SUBSTEPS from '../constants/subSteps';
import { initProduct } from '@/modules/movements/constants/initialStates';
import { initTransfer } from '../constants/initialStates';

const useTransfersStore = defineStore('tranfersStore', () => {
  const transferID = ref<number>(0);
  const currentStep = ref<string>(STEPS.stepTransfersDetail);
  const lastTransfersList = ref<ILastTransaction[] | null>();
  const scheduleTransfers = ref<IScheduledTransfers[] | null>();
  const clientList = ref<IClient[]>([]);
  const permitions = ref<IPermitions>();
  const count = ref<number>();
  const currentSubStep = ref<string>(SUBSTEPS.stepOne);
  const buttonDisabled = ref<boolean>(true);
  const productList = ref<IProduct[]>([initProduct]);
  const transferList = ref<ITransfer[]>([]);
  const newTransfer = ref<ITransfer>(initTransfer);
  const transferResultList = ref<ITransferResult[]>([]);
  const bankList = ref<IBankItem[]>([]);
  const idTypeList = ref<IIDTypeItem[]>([]);
  const productTypeList = ref<IProductTypeItem[]>([]);
  const isProgrammedTransfer = ref<boolean>(false);
  const productName = ref<string>('');
  const alertIsVisible = ref<boolean>(false);
  const alertType = ref<'blue' | 'green' | 'yellow' | 'red'>();
  const alertIcon = ref<string>('');
  const alertBoldText = ref<string>('');
  const alertBody = ref<string>('');
  const templateList = ref<ITemplate[]>();
  const templateName = ref<string>('');
  const securityModalVisible = ref<boolean>(false);
  const sblPushModalVisible = ref<boolean>(false);
  const sblSoftTokenModalVisible = ref<boolean>(false);
  const passwordModalVisible = ref<boolean>(false);
  const tokenModalVisible = ref<boolean>(false);
  const selectedTemplateId = ref<number>(0);
  const templatesShareList = ref<
    {
      id?: number;
      name?: string;
      date?: string;
    }[]
  >([]);

  const $resetStore = (): void => {
    templatesShareList.value = [];
    bankList.value = [];
    idTypeList.value = [];
    productTypeList.value = [];
    alertIsVisible.value = false;
    alertType.value = undefined;
    alertIcon.value = '';
    alertBoldText.value = '';
    alertBody.value = '';
    productName.value = '';
    transferID.value = 0;
    productList.value = [initProduct];
    transferList.value = [];
    transferResultList.value = [];
    buttonDisabled.value = true;
    currentStep.value = STEPS.stepTransfersDetail;
    currentSubStep.value = SUBSTEPS.stepOne;
    isProgrammedTransfer.value = false;
    templateList.value = [];
    templateName.value = '';
    buttonDisabled.value = false;
    securityModalVisible.value = false;
    sblPushModalVisible.value = false;
    sblSoftTokenModalVisible.value = false;
    passwordModalVisible.value = false;
    tokenModalVisible.value = false;
    selectedTemplateId.value = 0;
  };
  return {
    currentStep,
    setLastTransfers(newState: ILastTransaction[]): void {
      lastTransfersList.value = newState;
    },
    setScheduleTransfers(newState: IScheduledTransfers[]): void {
      scheduleTransfers.value = newState;
    },
    setTransferDetail(newState: ILastTransaction, id: string): void {
      lastTransfersList.value!.find((transfer) => transfer.id === id)!.detail =
        newState;
    },
    setScheduleTransferDetail(newState: ILastTransaction, id: string): void {
      scheduleTransfers.value!.find((transfer) => transfer.id === id)!.detail =
        newState;
    },
    scheduleTransfers,
    lastTransfersList,
    permitions,
    count,
    currentSubStep,
    buttonDisabled,
    productList,
    transferList,
    transferResultList,
    newTransfer,
    transferID,
    isProgrammedTransfer,
    productName,
    alertIsVisible,
    alertType,
    alertIcon,
    alertBoldText,
    alertBody,
    clientList,
    bankList,
    idTypeList,
    productTypeList,
    templateList,
    templateName,
    securityModalVisible,
    sblPushModalVisible,
    sblSoftTokenModalVisible,
    passwordModalVisible,
    tokenModalVisible,
    selectedTemplateId,
    templatesShareList,
    $resetStore,
  };
});

export default useTransfersStore;
