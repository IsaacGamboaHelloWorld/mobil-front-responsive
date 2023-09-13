import { storeToRefs } from 'pinia';

import useTransfersStore from '@/modules/transfers/store/useTransfersStore';
import useSortHelper from '@/commons/helpers/useSortHelpers';
import useFormattHelper from '@/commons/helpers/formatMoney';
import { getDetailHeaders } from '@/modules/transfers/constants/tableHeaders';
import type { ITransfer } from '@/modules/transfers/entities/transfersInterfaces';
import SUBSTEPS from '@/modules/transfers/constants/subSteps';

const useStepThree = () => {
  const transferStore = useTransfersStore();
  const { transferList, newTransfer, currentSubStep } =
    storeToRefs(transferStore);
  const { sortAlphabetically, sortDates, sortNumber } = useSortHelper();
  const { addCurrencyDot } = useFormattHelper();

  const sort = (property: string, order: 'up' | 'down'): void => {
    if (property === 'date') {
      sortDates(transferList.value, property, order);
    } else if (property === 'value') {
      sortNumber(transferList.value, property, order);
    } else {
      sortAlphabetically(transferList.value, property, order);
    }
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

  return {
    getDetailHeaders,
    transferList,
    sort,
    addCurrencyDot,
    deleteTransfer,
    editTransfer,
  };
};
export default useStepThree;
