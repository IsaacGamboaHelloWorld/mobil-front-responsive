import { computed, ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import i18n from '@/locales/i18n';
import useTransfersStore from '../store/useTransfersStore';
import useTransfersServices from '../services/useTransfersServices';
import type {
  IScheduleResponse,
  IScheduleTransfersDetailResponse,
  IScheduledTransfers,
} from '../entities/transfersInterfaces';
import usePermitionHelper from '@/commons/helpers/permitionsHelper';
import tranfersPermitionsCodes from '../constants/permitions';
import useFormattHelper from '@/commons/helpers/formatMoney';

const currentPage = ref<number>(1);
const idTransferSelected = ref<string>('');
const maxDays = ref<number>(0);
const elementsPerPageDesktop: number = 10;
const init = ref<number>(
  currentPage.value * elementsPerPageDesktop - elementsPerPageDesktop,
);
const end = ref<number>(currentPage.value * elementsPerPageDesktop);
const startDate = ref<string>('');
const endDate = ref<string>('');
const targetUser = ref<string>('');

const getHeaders = computed<{ title: string; property: string }[]>(() => [
  {
    title: i18n.global.t('TRANSFERS-MODULE.SCHEDULE-TRANFERS.TABLE.DATE'),
    property: 'txDate',
  },
  {
    title: i18n.global.t(
      'TRANSFERS-MODULE.SCHEDULE-TRANFERS.TABLE.PRODUCT-NAME',
    ),
    property: 'acctIdTo',
  },
  {
    title: i18n.global.t('TRANSFERS-MODULE.SCHEDULE-TRANFERS.TABLE.NAME'),
    property: 'recipientName',
  },
  {
    title: i18n.global.t('TRANSFERS-MODULE.SCHEDULE-TRANFERS.TABLE.ENTITIE'),
    property: 'financialEntity',
  },
  {
    title: i18n.global.t('TRANSFERS-MODULE.SCHEDULE-TRANFERS.TABLE.VALUE'),
    property: 'payVal',
  },
]);

const useSheduleTransfers = () => {
  const transferStore = useTransfersStore();
  const { scheduleTransfers, permitions } = storeToRefs(transferStore);
  const { getScheduleTransfers, getScheduleTransfersDetail, getPArameters } =
    useTransfersServices();
  const { hasPermitions } = usePermitionHelper();
  const { addCurrencyDot, formateDate } = useFormattHelper();

  const { isLoading } = useQuery([''], getPArameters, {
    onSuccess: (data) => {
      maxDays.value = data.response.maxDays;
    },
  });

  const { isLoading: isLoadingSheduleTransfers } = useQuery(
    ['scheduleTransfers'],
    getScheduleTransfers,
    {
      onSuccess: (data: IScheduleResponse) => {
        transferStore.setScheduleTransfers(data.response.scheduledTransactions);
      },
    },
  );

  const { refetch, isFetching: isLoadingDetail } = useQuery(
    ['scheduleTransfersDetail?id'],
    () => getScheduleTransfersDetail(idTransferSelected.value),
    {
      onSuccess: (data: IScheduleTransfersDetailResponse) => {
        console.log('entree');
        transferStore.setScheduleTransferDetail(
          data.response?.transaction!,
          idTransferSelected.value,
        );
      },
      enabled: false,
    },
  );

  const filterDate = (trasnfer: IScheduledTransfers): boolean => {
    return (
      new Date(trasnfer.txDate) >= new Date(startDate.value) &&
      new Date(trasnfer.txDate) <= new Date(endDate.value)
    );
  };

  const getRecords = computed<IScheduledTransfers[] | null>(() => {
    if (!!scheduleTransfers.value) {
      let filterList: IScheduledTransfers[] = scheduleTransfers.value.filter(
        (transfer) =>
          transfer.recipientName
            .toLowerCase()
            .indexOf(targetUser.value.toLowerCase()) !== -1,
      );
      if (!!startDate.value && !!endDate.value) {
        filterList = filterList?.filter(filterDate);
      }
      return filterList;
    }

    return null;
  });

  const getInitialDate = computed<string>(() => {
    const nuevaFecha = new Date();
    nuevaFecha.setDate(nuevaFecha.getDate() - maxDays.value);
    return formateDate(nuevaFecha);
  });

  const totalPages = computed<number>(() =>
    Math.ceil(getRecords.value?.length! / 10),
  );

  const changePage = ($event: any): void => {
    currentPage.value = $event;
    init.value =
      currentPage.value * elementsPerPageDesktop - elementsPerPageDesktop;
    end.value = currentPage.value * elementsPerPageDesktop;
  };

  const searchDetail = (id: string): void => {
    const shceduleTransfer = scheduleTransfers.value!.find(
      (trasnfer) => trasnfer.id === id,
    );

    if (!shceduleTransfer?.detail) {
      idTransferSelected.value = id;
      refetch();
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
    startDate,
    endDate,
    isLoading,
    getInitialDate,
    init,
    end,
    targetUser,
    isLoadingSheduleTransfers,
    isLoadingDetail,
  };
};

export default useSheduleTransfers;
