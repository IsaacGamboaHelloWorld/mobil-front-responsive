import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent, onBeforeUnmount } from 'vue';

import STEPS from '../constants/steps';
import { useMovementsStore } from '../store/useMovementsStore';
import { useGlobalStore } from '@/stores/globalStore';
import useSearch from './useSearch';

const SearchComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/movements/components/searchComponent/SearchComponent.vue'
    ),
);
const MovementDetailComponent = defineAsyncComponent(
  () =>
    import(
      '@/modules/movements/components/MovementsDetailComponent/MovementsDetailComponent.vue'
    ),
);

const useMovementsModule = () => {
  const movementsStore = useMovementsStore();
  const { currentStep } = storeToRefs(movementsStore);
  const globalStore = useGlobalStore();
  const { isFetching } = storeToRefs(globalStore);
  const { isLoadingParameters } = useSearch();
  const { currentGlobalStep } = storeToRefs(globalStore);

  const componentStep = computed<any>(() => {
    currentGlobalStep.value = currentStep.value;
    if (currentStep.value === STEPS.stepSearch) return SearchComponent;
    return MovementDetailComponent;
  });

  onBeforeUnmount(() => {
    movementsStore.resetStore();
  });

  return {
    componentStep,
    isFetching,
    isLoadingParameters,
    currentStep,
  };
};

export default useMovementsModule;
