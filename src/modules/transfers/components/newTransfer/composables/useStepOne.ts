import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount, ref, watch } from 'vue';

import { moduleCodes } from '@/commons/constants/responseCodes';
import type { IProductsResponse } from '@/commons/entities/global.interfaces';
import getProducts from '@/commons/globalService/globalServices';
import useTransfersStore from '@/modules/transfers/store/useTransfersStore';
import { useNewTransferForm } from './useNewTransferForm';
import { useGlobalStore } from '@/stores/globalStore';

const useStepOne = () => {
  const transferStore = useTransfersStore();
  const globalStore = useGlobalStore();
  const { isFetching } = storeToRefs(globalStore);
  const { buttonDisabled, productList, isProgrammedTransfer, productName } =
    storeToRefs(transferStore);
  const { newTransfer } = useNewTransferForm();
  const selectedProduct = ref<string>('');

  const getSelectedProductType = computed<string>(() => {
    return newTransfer.value.acctTypeFromDesc!;
  });

  const getProductTypeList = computed<string[]>(() => {
    return [...new Set(productList.value.map((product) => product.acctDesc))];
  });

  const getProductList = computed<string[]>(() => {
    let list: string[] = [];
    if (!!getSelectedProductType.value) {
      list = productList.value
        .filter((product) => product.acctDesc === getSelectedProductType.value)
        .map((product) => product.acctNickName);
      return list;
    }
    list = productList.value.map((product) => product.acctNickName);
    return list;
  });

  const filteredProductList = computed<any[]>(() => {
    let list: any[] = [];
    !!selectedProduct.value
      ? (list = getProductList.value.filter(
          (item) =>
            item.toLowerCase().indexOf(selectedProduct.value.toLowerCase()) !==
            -1,
        ))
      : (list = getProductList.value);
    return list;
  });

  const getType = computed<string>(() => {
    const code: string = productList.value.find(
      (product) => product.acctDesc === getSelectedProductType.value,
    )?.acctType!;
    return code;
  });

  const getProductID = computed<string>(() => {
    const code: string = productList.value.find(
      (product) => product.acctNickName === selectedProduct.value,
    )?.id!;
    return code;
  });

  const getProductMaskedID = computed<string>(() => {
    const code: string = productList.value.find(
      (product) => product.acctNickName === selectedProduct.value,
    )?.acctIDMasked!;
    return code;
  });

  onBeforeMount(() => {
    isFetching.value = 1;
    if (!!selectedProduct.value && newTransfer.value.acctTypeFromDesc)
      buttonDisabled.value = false;
    else buttonDisabled.value = true;
  });

  useQuery(['product-list'], () => getProducts(moduleCodes.movements), {
    onSuccess: (data: IProductsResponse) => {
      productList.value = data.response;
    },
    onSettled: () => {
      isFetching.value = 0;
    },
  });

  watch([getSelectedProductType, selectedProduct], ([type, product]) => {
    !!type && product
      ? (buttonDisabled.value = false)
      : (buttonDisabled.value = true);
  });

  watch(selectedProduct, (newValue) => {
    productName.value = selectedProduct.value;
    if (!!newValue) {
      newTransfer.value.accountID = getProductID.value;
      newTransfer.value.acctIdFromMask = getProductMaskedID.value;
      if (!getSelectedProductType.value) {
        newTransfer.value.acctTypeFrom = getType.value;
        newTransfer.value.acctTypeFromDesc = productList.value.find(
          (product) => product.acctNickName === selectedProduct.value,
        )?.acctDesc!;
      }
    }
  });

  watch(getSelectedProductType, (newValue) => {
    if (!!newValue) {
      newTransfer.value.acctTypeFrom = getType.value;
      const sameProduct: boolean = productList.value.some(
        (product) =>
          product.id === getProductID.value &&
          product.acctType === getType.value,
      );
      if (selectedProduct.value && !sameProduct) {
        selectedProduct.value = '';
      }
    }
  });

  return {
    buttonDisabled,
    getProductTypeList,
    filteredProductList,
    getProductList,
    isProgrammedTransfer,
    newTransfer,
    selectedProduct,
  };
};

export default useStepOne;
