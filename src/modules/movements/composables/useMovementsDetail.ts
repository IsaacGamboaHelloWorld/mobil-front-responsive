import { storeToRefs } from 'pinia';
import { useMovementsStore } from '../store/useMovementsStore';
import useMovementServices from '../services/movementsServices';
import i18n from '@/locales/i18n';
import { computed, onBeforeUnmount, ref } from 'vue';
import type { IMovement } from '../entities/movementsInterfaces';
import useFormattHelper from '@/commons/helpers/formatMoney';
import useSortHelper from '@/commons/helpers/useSortHelpers';
import { useMutation } from '@tanstack/vue-query';
import useDecryptHelper from '@/commons/helpers/decryptHelper';

const currentPage = ref<number>(1);
const elementsPerPageDesktop: number = 10;
const init = ref<number>(
  currentPage.value * elementsPerPageDesktop - elementsPerPageDesktop,
);
const end = ref<number>(currentPage.value * elementsPerPageDesktop);
const fileType = ref<'xls' | 'pdf'>('xls');

const getHeaders = computed<{ title: string; property: string }[]>(() => [
  {
    title: i18n.global.t('MOVEMENTS-MODULE.TABLE.DATE'),
    property: 'rowIdFecha',
  },
  {
    title: i18n.global.t('MOVEMENTS-MODULE.TABLE.TRANSACTION'),
    property: 'transaccion',
  },
  {
    title: i18n.global.t('MOVEMENTS-MODULE.TABLE.ID'),
    property: 'numeroDocumento',
  },
  {
    title: i18n.global.t('MOVEMENTS-MODULE.TABLE.DEBITS'),
    property: 'debitos',
  },
  {
    title: i18n.global.t('MOVEMENTS-MODULE.TABLE.CREDITS'),
    property: 'creditos',
  },
]);

const useMovementsDetail = () => {
  const movementsStore = useMovementsStore();
  const {
    movements,
    period,
    productId,
    productNameStore,
    productType,
    getRqUID,
  } = storeToRefs(movementsStore);
  const { addCurrencyDot } = useFormattHelper();
  const { sortAlphabetically, sortDates, sortNumber } = useSortHelper();
  const { exportFile } = useMovementServices();
  const decryptHelper = useDecryptHelper();

  const getRecords = computed<IMovement[]>(() => movements.value!);

  const changePage = ($event: any): void => {
    currentPage.value = $event;
    init.value =
      currentPage.value * elementsPerPageDesktop - elementsPerPageDesktop;
    end.value = currentPage.value * elementsPerPageDesktop;
  };

  const totalPages = computed<number>(() =>
    Math.ceil(getRecords.value?.length! / elementsPerPageDesktop),
  );

  const sort = (property: string, order: 'up' | 'down'): void => {
    const sortedRecords = [...movements.value!];
    if (property === 'rowIdFecha') {
      sortDates(sortedRecords, property, order);
    } else if (property === 'debitos' || property === 'creditos') {
      sortNumber(sortedRecords, property, order);
    } else {
      sortAlphabetically(sortedRecords, property, order);
    }
    movements.value = sortedRecords;
  };

  const exportMutation = useMutation(['spinner'], exportFile, {
    onError: () => {},
    onSuccess: (file) => {
      decryptHelper.createFile(file, fileType.value);
    },
  });
  const doExport = (type: 'xls' | 'pdf') => {
    fileType.value = type;
    exportMutation.mutate({ type: type, rqUID: getRqUID.value });
  };

  onBeforeUnmount(() => {
    movementsStore.resetStore();
  });
  return {
    getHeaders,
    getRecords,
    addCurrencyDot,
    sort,
    changePage,
    init,
    end,
    totalPages,
    period,
    productId,
    productNameStore,
    productType,
    doExport,
  };
};

export default useMovementsDetail;
