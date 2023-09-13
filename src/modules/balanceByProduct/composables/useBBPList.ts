import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import i18n from '@/locales/i18n';
import { useBbpStore } from '../store/useBbpStore';
import type { IProductItem, IProduct } from '../entities/bbpInterfaces';
import STEPS from '../constants/steps';
import useSortHelper from '@/commons/helpers/useSortHelpers';
import { getProductListData } from '../services/bbpServices';
import type { IStatus } from '@/commons/entities/global.interfaces';

const getHeaders = computed<{ title: string; property: string }[]>(() => [
  {
    title: i18n.global.t('BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.NAME'),
    property: 'name',
  },
  {
    title: i18n.global.t('BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.NUMBER'),
    property: 'id',
  },
]);

const showFiduciariaAlert = ref<boolean>(false);
const errorMessage = ref<string>('');
const errorCode = ref<string>('');

const validateFiduciariaState = (list: IProduct[]): void => {
  if (
    list.length === 1 &&
    !list[0].id &&
    !list[0].acctNickName &&
    !!list[0].error?.code &&
    !!list[0].error?.message
  ) {
    showFiduciariaAlert.value = true;
    errorMessage.value = list[0].error?.message;
    errorCode.value = list[0].error?.code;
  } else {
    showFiduciariaAlert.value = false;
    errorMessage.value = '';
    errorCode.value = '';
  }
};

const useBBPList = () => {
  const bbpStore = useBbpStore();
  const { sortAlphabetically, sortNumber } = useSortHelper();
  const { getProductList, currentStep } = storeToRefs(bbpStore);

  const { isFetching } = useQuery(['BBP Data'], getProductListData, {
    onSuccess: (data: { status: IStatus; response: IProduct[] }) => {
      bbpStore.setProductList(data.response);
    },
    onError: (error: any) => {
      bbpStore.setAlertCode(error.response.data.code);
      bbpStore.setAlertMsg(error.response.data.message);
      bbpStore.toggleAlert();
    },
  });
  const pageIndex = ref<number>(1);
  const selectedProductType = ref<string>('');
  const selectedProduct = ref<string>();

  const getProductTypeList = computed<string[]>(() => {
    return [...new Set(getProductList.value.map((item) => item.acctDesc))];
  });

  const getDefault = computed<string>(() => {
    const defaultString: string = i18n.global.t(
      'MOVEMENTS-MODULE.SEARCH.DEFAULT-PRODUCT-LABEL',
    );
    return getProductTypeList.value.includes(defaultString)
      ? defaultString
      : getProductTypeList.value[0];
  });

  const getProductType = (acctDesc: string): string => {
    const type: string = getProductList.value.find(
      (product: IProduct) => product.acctDesc === acctDesc,
    )?.engAcctDesc!;
    return type;
  };

  const getRecords = computed<IProductItem[]>(() => {
    let list: IProduct[] = getProductList.value;
    if (!!selectedProductType.value) {
      list = list.filter((item) => item.acctDesc === selectedProductType.value);
    }
    showFiduciariaAlert.value = false;
    if (selectedProductType.value === 'Fiduciaria') {
      validateFiduciariaState(list);
    }

    return list.map((item) => ({
      name: item.acctNickName,
      number: item.acctIDMasked,
      id: item.acctID,
    }));
  });

  const productList = ref<IProductItem[]>(getRecords.value);

  const getPaginatedProductList = computed<any>(() => {
    const list: [IProductItem[]] = productList.value!.reduce(
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

  const getPages = computed<number>(() => {
    pageIndex.value = 1;
    const productsAmount: number = productList.value?.length!;
    return Math.ceil(productsAmount / 10);
  });

  const filteredList = ref<IProductItem[]>(getPaginatedProductList.value);

  const filterList = ($event: any) => {
    productList.value = $event;
    filteredList.value = getPaginatedProductList.value;
  };

  watch(pageIndex, () => {
    filteredList.value = getPaginatedProductList.value;
  });

  watch(getProductTypeList, () => {
    selectedProductType.value = getDefault.value;
  });

  const selectProduct = (id: any): void => {
    const filteredProduct: IProduct[] = getProductList.value.filter(
      (item) => id == item.acctNickName,
    );
    bbpStore.setProduct(filteredProduct[0]);
    currentStep.value = STEPS.stepsProductDetail;
  };

  const sort = (property: string, order: 'up' | 'down'): void => {
    if (property === 'number') {
      sortNumber(filteredList.value, property, order);
    } else {
      sortAlphabetically(filteredList.value, property, order);
    }
  };

  return {
    getRecords,
    filteredList,
    productList,
    selectedProduct,
    selectedProductType,
    getHeaders,
    getProductTypeList,
    isFetching,
    getPages,
    pageIndex,
    selectProduct,
    filterList,
    sort,
    getProductType,
    showFiduciariaAlert,
    errorMessage,
    errorCode,
  };
};

export default useBBPList;
