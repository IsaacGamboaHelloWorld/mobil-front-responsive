import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent, onUnmounted } from 'vue';

import STEPS from '../constants/steps';

import { useBbpStore } from '../store/useBbpStore';

const ProductDetailComponent = defineAsyncComponent(
  () => import('../components/ProductDetail/ProductDetailComponent.vue'),
);
const ProductListComponent = defineAsyncComponent(
  () => import('../components/ProductList/ProductListComponent.vue'),
);

const useBBP = () => {
  const bbpStore = useBbpStore();
  const { currentStep, alertIsVisible, getAlertCode, getAlertMsg } =
    storeToRefs(bbpStore);

  onUnmounted(() => {
    bbpStore.$cleanStore();
  });

  const componentStep: any = computed(() => {
    if (currentStep.value === STEPS.stepProductsView)
      return ProductListComponent;
    if (currentStep.value === STEPS.stepsProductDetail)
      return ProductDetailComponent;
    return null;
  });

  const reloadPage = () => {
    window.location.reload();
  };

  return {
    componentStep,
    alertIsVisible,
    getAlertCode,
    getAlertMsg,
    bbpStore,
    currentStep,
    reloadPage,
  };
};

export default useBBP;
