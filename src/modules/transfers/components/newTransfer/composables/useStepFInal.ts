import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useFormattHelper from '@/commons/helpers/formatMoney';
import i18n from '@/locales/i18n';
import type { ITransfer } from '@/modules/transfers/entities/transfersInterfaces';
import useTransfersStore from '@/modules/transfers/store/useTransfersStore';
import useSortHelper from '@/commons/helpers/useSortHelpers';
import { responseCodes } from '@/commons/constants/responseCodes';

const useStepFinal = () => {
  const { addCurrencyDot } = useFormattHelper();
  const { sortAlphabetically, sortDates, sortNumber } = useSortHelper();
  const transferStore = useTransfersStore();
  const { transferList, transferResultList, productName } =
    storeToRefs(transferStore);

  const getDetailHeaders = computed<{ title: string; property: string }[]>(
    () => [
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-1',
        ),
        property: 'date',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-2',
        ),
        property: 'productName',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-3',
        ),
        property: 'recipientName',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-4',
        ),
        property: 'bank',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-5',
        ),
        property: 'value',
      },
      {
        title: i18n.global.t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-6',
        ),
        property: 'value',
      },
    ],
  );

  const sort = (property: string, order: 'up' | 'down'): void => {
    if (property === 'date') {
      sortDates(transferList.value, property, order);
    } else if (property === 'value') {
      sortNumber(transferList.value, property, order);
    } else {
      sortAlphabetically(transferList.value, property, order);
    }
  };

  const getProccessedTransactionList = computed<any[]>(() => {
    const list: any[] = transferList.value.map(
      (item: ITransfer, index: number) => {
        return {
          ...item,
          ...transferResultList.value[index],
          status: getTransactionStatus(transferResultList.value[index].code!),
        };
      },
    );
    return list;
  });

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
    getProccessedTransactionList,
    getDetailHeaders,
    productName,
    addCurrencyDot,
    getTransactionStatus,
    sort,
  };
};

export default useStepFinal;
