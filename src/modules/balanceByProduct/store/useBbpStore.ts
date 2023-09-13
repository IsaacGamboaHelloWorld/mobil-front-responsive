import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import {
  initDetail,
  initProductDetail,
  initProduct,
} from '../constants/initialStates';
import STEPS from '../constants/steps';
import type { IProduct, IDetail, IDetailList } from '../entities/bbpInterfaces';

export const useBbpStore = defineStore('Balance by Products', () => {
  const currentStep = ref<string>(STEPS.stepProductsView);
  const alertIsDisplayed = ref<boolean>(false);
  const alertMsg = ref<string>('');
  const alertCode = ref<string>('');
  const productListState = ref<IProduct[]>([initProduct]);
  const productState = ref<IProduct>(initProduct);
  const productDetailState = ref<IDetailList>(initProductDetail);
  const rQIdState = ref<IDetail>(initDetail);

  const getAlertMsg = computed<string>(() => alertMsg.value);
  const getAlertCode = computed<string>(() => alertCode.value);
  const alertIsVisible = computed<boolean>(() => alertIsDisplayed.value);
  const getProductList = computed<IProduct[]>(() => productListState.value);
  const getProduct = computed<IProduct>(() => productState.value);
  const getRQId = computed<IDetail>(() => rQIdState.value);
  const getProductDetail = computed<IDetailList>(
    () => productDetailState.value,
  );

  function toggleAlert(): void {
    alertIsDisplayed.value = !alertIsDisplayed.value;
  }
  function setAlertCode(newCode: string): void {
    alertCode.value = newCode;
  }
  function setAlertMsg(newMsg: string): void {
    alertMsg.value = newMsg;
  }
  function setProduct(newState: IProduct): void {
    productState.value = newState;
  }
  function setProductList(newState: IProduct[]): void {
    productListState.value = newState;
  }
  function setProductDetail(newState: IDetailList): void {
    productDetailState.value = newState;
  }
  function setRqUID(newState: IDetail): void {
    rQIdState.value = newState;
  }

  function $cleanStore(): void {
    currentStep.value = STEPS.stepProductsView;
    alertIsDisplayed.value = false;
    alertMsg.value = '';
    alertCode.value = '';
    productState.value = initProduct;
    productListState.value = [initProduct];
    productDetailState.value = initProductDetail;
    rQIdState.value = initDetail;
  }

  return {
    currentStep,
    getProduct,
    getProductList,
    getProductDetail,
    getRQId,
    alertIsVisible,
    getAlertMsg,
    getAlertCode,
    $cleanStore,
    setProduct,
    setProductList,
    setProductDetail,
    setRqUID,
    toggleAlert,
    setAlertCode,
    setAlertMsg,
  };
});
