import { computed, onBeforeMount, onUnmounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMutation, useQuery } from '@tanstack/vue-query';

import useTransfersStore from '@/modules/transfers/store/useTransfersStore';
import useNewTransferServices from '@/modules/transfers/services/useNewTransferServices';
import type { IParametersResponse } from '@/modules/transfers/entities/transfersInterfaces';
import { useNewTransferForm } from './useNewTransferForm';
import type { IClientResponse } from '@/modules/transfers/entities/transfersInterfaces';
import type { IClientFormData } from '@/modules/transfers/entities/transfersInterfaces';
import { initClientFormData } from '@/modules/transfers/constants/initialStates';
import SUBSTEPS from '@/modules/transfers/constants/subSteps';
import useFormattHelper from '@/commons/helpers/formatMoney';
import { useGlobalStore } from '@/stores/globalStore';

const getCurrentDate = (): string => {
  const date = new Date();
  const year: number = date.getFullYear();
  const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const day: string = ('0' + date.getDate()).slice(-2);
  const currentDate = `${year}/${month}/${day}`;
  return currentDate;
};

const useStepTwo = () => {
  const transferStore = useTransfersStore();
  const { getClientData } = useNewTransferServices();
  const globalStore = useGlobalStore();
  const { isFetching } = storeToRefs(globalStore);
  const {
    buttonDisabled,
    transferList,
    transferID,
    clientList,
    currentSubStep,
    bankList,
    idTypeList,
    productTypeList,
  } = storeToRefs(transferStore);
  const { separarUltimosDosCaracteres } = useFormattHelper();
  const { newTransfer, v$, resetForm } = useNewTransferForm();
  const identificationList = ref<string[]>();
  const transferAmout = ref<string>('');
  const recipientLookupModalVisible = ref<boolean>(false);
  const formData = ref<IClientFormData>(initClientFormData);

  const getBankList = computed<string[]>(() => {
    const list: string[] = bankList.value.map((item) => item.entityDesc);
    return list;
  });
  const getIDTypeList = computed<string[]>(() => {
    const list: string[] = idTypeList.value.map((item) => item.idDesc);
    return list;
  });
  const getProductTypeList = computed<string[]>(() => {
    const list: string[] = productTypeList.value.map((item) => item.typeDesc);
    return list;
  });

  const getBankCode = computed<string>(() => {
    const code: string = bankList.value.find(
      (bank) => bank.entityDesc === newTransfer.value.financialEntity,
    )?.entityCode!;
    return code;
  });

  const getIDTypeCode = computed<string>(() => {
    const code: string = idTypeList.value.find(
      (id) => id.idDesc === newTransfer.value.identificationTypeDesc,
    )?.idCode!;
    return code;
  });

  const getPproductTypeCode = computed<string>(() => {
    const code: string = productTypeList.value.find(
      (product) => product.typeDesc === newTransfer.value.acctTypeToDesc,
    )?.typeCode!;
    return code;
  });

  const { getParameters } = useNewTransferServices();

  onBeforeMount(() => {
    isFetching.value = 1;
    fieldsValid.value
      ? (buttonDisabled.value = false)
      : (buttonDisabled.value = true);
  });

  onUnmounted(() => {
    const step = currentSubStep.value;
    if (step === SUBSTEPS.stepThree) {
      transferID.value++;
      newTransfer.value.id = transferID.value.toString();
      newTransfer.value.identificationType = getIDTypeCode.value;
      newTransfer.value.financialEntityCode = getBankCode.value;
      newTransfer.value.acctTypeTo = getPproductTypeCode.value;
      newTransfer.value.payVal = separarUltimosDosCaracteres(
        newTransfer.value.payVal,
      );
      if (!newTransfer.value.txDate)
        newTransfer.value.txDate = getCurrentDate();
      transferList.value.push(newTransfer.value);
      buttonDisabled.value = false;
      resetForm();
    }
  });

  useQuery(['Get Parameters'], getParameters, {
    onSuccess: (data: IParametersResponse) => {
      bankList.value = data.response?.entityDestinyList!;
      idTypeList.value = data.response?.identificationTypeList!;
      productTypeList.value = data.response?.productDestinyTypeList!;
    },
    onSettled: () => {
      isFetching.value = 0;
    },
  });

  const fieldsValid = computed<boolean>(() => {
    v$.value.$validate();
    if (!v$.value.$error) return true;
    return false;
  });

  const getClientDataMutation = useMutation(['spinner'], getClientData, {
    onSuccess: (data: IClientResponse) => {
      clientList.value = data.response.accountsAssociation;
      recipientLookupModalVisible.value = true;
    },
  });

  watch(fieldsValid, () => {
    fieldsValid.value
      ? (buttonDisabled.value = false)
      : (buttonDisabled.value = true);
  });

  const toggleModal = (): void => {
    if (recipientLookupModalVisible.value) {
      recipientLookupModalVisible.value = false;
    } else {
      formData.value.accountID = newTransfer.value.accountID;
      formData.value.searchType = 'accounts';
      getClientDataMutation.mutate(formData.value);
    }
  };

  return {
    newTransfer,
    getBankList,
    getIDTypeList,
    getProductTypeList,
    identificationList,
    transferAmout,
    v$,
    recipientLookupModalVisible,
    toggleModal,
  };
};
export default useStepTwo;
