import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import i18n from '@/locales/i18n';
import useTransfersStore from '../store/useTransfersStore';
import useTransfersServices from '../services/useTransfersServices';
import type {
  IBodyRequest,
  ILastTransaction,
  ILastTransfersDetailResponse,
  ILastTransfersResponse,
} from '../entities/transfersInterfaces';
import usePermitionHelper from '@/commons/helpers/permitionsHelper';
import tranfersPermitionsCodes from '../constants/permitions';
import useFormattHelper from '@/commons/helpers/formatMoney';

const currentPage = ref<number>(1);
const idTransferSelected = ref<string>('');
const maxDays = ref<number>(0);
const filter: IBodyRequest = reactive({
  filters: [
    {
      columnName: 'state',
      operand: '',
      operator: 'equal',
    },
  ],
  pageNumber: 1,
});
const stateSelected = ref<string>('');
const startDate = ref<string>('');
const endDate = ref<string>('');

const getStateList = computed<string[]>(() => [
  i18n.global.t('STATES.ALL'),
  i18n.global.t('STATES.NAT'),
  i18n.global.t('STATES.VE'),
  i18n.global.t('STATES.NA'),
  i18n.global.t('STATES.EXI'),
  i18n.global.t('STATES.PA'),
  i18n.global.t('STATES.RE'),
  i18n.global.t('STATES.AN'),
  i18n.global.t('STATES.NE'),
]);

const getSemaphoreInfo = (
  type: string,
): [string, 'red' | 'yellow' | 'green'] => {
  if (type === 'NAT') return [i18n.global.t('STATES.NAT'), 'red'];
  if (type === 'VE') return [i18n.global.t('STATES.VE'), 'yellow'];
  if (type === 'NA') return [i18n.global.t('STATES.NA'), 'red'];
  if (type === 'EXI') return [i18n.global.t('STATES.EXI'), 'green'];
  if (type === 'PA') return [i18n.global.t('STATES.PA'), 'yellow'];
  if (type === 'REC') return [i18n.global.t('STATES.RE'), 'red'];
  if (type === 'AN') return [i18n.global.t('STATES.AN'), 'red'];
  if (type === 'NE') return [i18n.global.t('STATES.NE'), 'red'];
  return ['', 'red'];
};

const getState = (
  type: string,
): 'NAT' | 'VE' | 'NA' | 'EXI' | 'PA' | 'REC' | 'AN' | 'NE' | '' => {
  if (i18n.global.t('STATES.NAT') === type) return 'NAT';
  if (i18n.global.t('STATES.VE') === type) return 'VE';
  if (i18n.global.t('STATES.NA') === type) return 'NA';
  if (i18n.global.t('STATES.EXI') === type) return 'EXI';
  if (i18n.global.t('STATES.PA') === type) return 'PA';
  if (i18n.global.t('STATES.RE') === type) return 'REC';
  if (i18n.global.t('STATES.AN') === type) return 'AN';
  if (i18n.global.t('STATES.NE') === type) return 'NE';
  return '';
};
const useLastTransfers = () => {
  const transferStore = useTransfersStore();
  const { lastTransfersList, permitions, count } = storeToRefs(transferStore);
  const { getLastTransfers, getLastTransfersDetail, getPArameters } =
    useTransfersServices();
  const { hasPermitions } = usePermitionHelper();
  const { addCurrencyDot, formateDate } = useFormattHelper();

  const { isLoading } = useQuery([''], getPArameters, {
    onSuccess: (data) => {
      maxDays.value = data.response.maxDays;
    },
  });

  const getLastTransfersMutation = useMutation(['spinner'], getLastTransfers, {
    onSuccess: (data: ILastTransfersResponse) => {
      transferStore.setLastTransfers(data.response?.lastTransactions!);
      count.value = data.response?.count;
    },
  });

  const getDetailMutation = useMutation(['spinner'], getLastTransfersDetail, {
    onSuccess: (data: ILastTransfersDetailResponse) => {
      transferStore.setTransferDetail(
        data.response?.transaction!,
        idTransferSelected.value,
      );
    },
  });

  onBeforeMount(() => {
    getLastTransfersMutation.mutate(filter);
  });
  const getHeaders = computed<{ title: string; property: string }[]>(() => [
    {
      title: i18n.global.t('TRANSFERS-MODULE.LAST-TRANFERS.TABLE.DATE'),
      property: 'txDate',
    },
    {
      title: i18n.global.t('TRANSFERS-MODULE.LAST-TRANFERS.TABLE.PRODUCT-NAME'),
      property: 'acctIdTo',
    },
    {
      title: i18n.global.t('TRANSFERS-MODULE.LAST-TRANFERS.TABLE.NAME'),
      property: 'recipientName',
    },
    {
      title: i18n.global.t('TRANSFERS-MODULE.LAST-TRANFERS.TABLE.ENTITIE'),
      property: 'financialEntity',
    },
    {
      title: i18n.global.t('TRANSFERS-MODULE.LAST-TRANFERS.TABLE.VALUE'),
      property: 'payVal',
    },
    {
      title: i18n.global.t('TRANSFERS-MODULE.LAST-TRANFERS.TABLE.STATE'),
      property: 'state',
    },
  ]);

  const getRecords = computed<ILastTransaction[] | null>(() => {
    return lastTransfersList.value!;
  });

  const getInitialDate = computed<string>(() => {
    const nuevaFecha = new Date();
    nuevaFecha.setDate(nuevaFecha.getDate() - maxDays.value);
    return formateDate(nuevaFecha);
  });

  const totalPages = computed<number>(() => Math.ceil(count.value! / 10));

  const changePage = ($event: any): void => {
    currentPage.value = $event;
    filter.pageNumber = currentPage.value;
  };

  watch(stateSelected, (newValue) => {
    currentPage.value = 1;
    filter.pageNumber = currentPage.value;
    if (newValue === i18n.global.t('STATES.ALL')) {
      filter.filters[0].operand = '';
    } else {
      filter.filters[0].operand = getState(newValue);
    }
  });

  watch(startDate, (newValue) => {
    currentPage.value = 1;
    filter.pageNumber = currentPage.value;
    if (!newValue) {
      filter.filters.splice(-2);
    } else {
      filter.filters.push(
        {
          columnName: 'paymentDate',
          operand: newValue,
          operator: 'great_eq_than',
        },
        {
          columnName: 'paymentDate',
          operand: endDate.value,
          operator: 'less_eq_than',
        },
      );
    }
  });

  watch(filter, (newValue) => {
    getLastTransfersMutation.mutate(newValue);
  });

  const searchDetail = (id: string, date: string): void => {
    const transfer = lastTransfersList.value!.find(
      (trasnfer) => trasnfer.id === id,
    );

    if (!transfer?.detail) {
      idTransferSelected.value = id;
      getDetailMutation.mutate({ id: id, date: date });
    }
  };
  return {
    getHeaders,
    getRecords,
    hasPermitions,
    permitions,
    searchDetail,
    tranfersPermitionsCodes,
    addCurrencyDot,
    totalPages,
    changePage,
    getStateList,
    filter,
    stateSelected,
    startDate,
    endDate,
    getSemaphoreInfo,
    isLoading,
    getInitialDate,
  };
};

export default useLastTransfers;
