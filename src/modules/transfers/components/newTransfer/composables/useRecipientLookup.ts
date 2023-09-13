import useSortHelper from '@/commons/helpers/useSortHelpers';
import i18n from '@/locales/i18n';
import type { IClient } from '@/modules/transfers/entities/transfersInterfaces';
import useTransfersStore from '@/modules/transfers/store/useTransfersStore';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const useRecipientLookup = () => {
  const transferStore = useTransfersStore();
  const { newTransfer, clientList, bankList, idTypeList, productTypeList } =
    storeToRefs(transferStore);
  const { sortAlphabetically, sortNumber } = useSortHelper();
  const searchFieldValue = ref<string>('');
  const pageIndex = ref<number>(1);
  const paginatorIsVisible = ref<boolean>(true);

  const getDetailHeaders = computed<{ title: string; property: string }[]>(
    () => [
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.TABLE-HEADER.LABEL-1',
        ),
        property: 'recipientName',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.TABLE-HEADER.LABEL-2',
        ),
        property: 'identificationType',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.TABLE-HEADER.LABEL-3',
        ),
        property: 'identification',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.TABLE-HEADER.LABEL-4',
        ),
        property: 'financialEntityCode',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.TABLE-HEADER.LABEL-5',
        ),
        property: 'acctTypeTo',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.TABLE-HEADER.LABEL-6',
        ),
        property: 'acctIdTo',
      },
    ],
  );

  const getClientList = computed<IClient[]>(() => {
    const list: IClient[] = clientList.value.map((item) => ({
      recipientName: item.recipientName,
      identificationType: idTypeList.value.find(
        (product) => product.idCode === item.identificationType,
      )?.idDesc!,
      identification: item.identification,
      financialEntityCode: bankList.value.find(
        (bank) => bank.entityCode === item.financialEntityCode,
      )?.entityDesc!,
      acctTypeTo: productTypeList.value.find(
        (product) => product.typeCode === item.acctTypeTo,
      )?.typeDesc!,
      acctIdTo: item.acctIdTo,
    }));
    return list;
  });

  const getPaginatedClientList = computed<IClient[]>(() => {
    const list: [IClient[]] = getClientList.value.reduce(
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

  const filteredList = ref<IClient[]>(getPaginatedClientList.value);

  const filterList = ($event: any) => {
    const completeList: IClient[] = getClientList.value;
    if ($event.length == completeList.length) {
      paginatorIsVisible.value = true;
      filteredList.value = getPaginatedClientList.value;
    } else {
      paginatorIsVisible.value = false;
      filteredList.value = $event;
    }
  };

  watch(pageIndex, () => {
    filteredList.value = getPaginatedClientList.value;
  });

  const getPages = computed<number>(() => {
    const clientAmount: number = getClientList.value.length;
    return Math.ceil(clientAmount / 10);
  });

  const addClientData = (client: IClient): void => {
    newTransfer.value.recipientName = client.recipientName;
    newTransfer.value.identificationTypeDesc = client.identificationType;
    newTransfer.value.identification = client.identification;
    newTransfer.value.financialEntity = client.financialEntityCode;
    newTransfer.value.acctTypeToDesc = client.acctTypeTo;
    newTransfer.value.acctIdTo = client.acctIdTo;
    newTransfer.value.identificationType = idTypeList.value.find(
      (item) => item.idDesc === newTransfer.value.identificationTypeDesc,
    )?.idCode!;
    newTransfer.value.financialEntityCode = bankList.value.find(
      (item) => item.entityDesc === newTransfer.value.financialEntity,
    )?.entityCode!;
    newTransfer.value.acctTypeTo = productTypeList.value.find(
      (item) => item.typeDesc === newTransfer.value.acctTypeToDesc,
    )?.typeCode!;
  };

  const sort = (property: string, order: 'up' | 'down'): void => {
    if (property === 'identification' || property === 'acctIdTo') {
      sortNumber(filteredList.value, property, order);
    } else {
      sortAlphabetically(filteredList.value, property, order);
    }
  };

  return {
    searchFieldValue,
    clientList,
    getClientList,
    getDetailHeaders,
    getPages,
    pageIndex,
    filteredList,
    paginatorIsVisible,
    sort,
    filterList,
    addClientData,
  };
};
export default useRecipientLookup;
