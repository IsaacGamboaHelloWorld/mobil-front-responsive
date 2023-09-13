import { useMutation, useQuery } from '@tanstack/vue-query';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import i18n from '@/locales/i18n';
import { useSearchForm } from './useSearchForm';
import useMovementServices from '../services/movementsServices';
import type { IMovementsParametersResponse } from '../entities/movementsInterfaces';
import { useMovementsStore } from '../store/useMovementsStore';
import STEPS from '../constants/steps';
import getProducts from '@/commons/globalService/globalServices';
import { moduleCodes } from '@/commons/constants/responseCodes';
import type { IProductsResponse } from '@/commons/entities/global.interfaces';

const productName = ref<string>('');
const productTypeSelected = ref<string>('');
const showAllList = ref<boolean>(false);
const showRangeComponent = ref<boolean>(false);
const valueForRange = ref<string>();
const valueTypeSelected = ref<string>('');
const isActiveALertFile = ref<boolean>(false);
const codeMessage = ref<string>('');
const message = ref<string>('');

export const useSearch = () => {
  const { getMovementsParameters, sendMovementsForm, requestFile } =
    useMovementServices();

  const { formData, v$ } = useSearchForm();

  const movementsStore = useMovementsStore();
  const {
    products,
    getPeriod,
    getStartDate,
    getToday,
    movementTypes,
    fileRequestType,
    currentStep,
    productNameStore,
    productId,
    productType,
    period,
  } = storeToRefs(movementsStore);

  const { isFetching } = useQuery(
    ['SearchProductos', moduleCodes.movements],
    () => getProducts(moduleCodes.movements),
    {
      onSuccess: (data: IProductsResponse) => {
        movementsStore.setProducts(data.response);
      },
    },
  );

  const { refetch, isFetching: isLoadingParameters } = useQuery(
    ['Movimientos-Parametros'],
    () => getMovementsParameters(formData.acctType),
    {
      onSuccess: (data: IMovementsParametersResponse) => {
        movementsStore.setMovementTypes(data.response.movementTypes);
        movementsStore.setCalendarParameters(data.response.consultPeriodDTO);
        fileRequestType.value = data.response.fileRequestType;
      },
      enabled: false,
    },
  );

  const productTypeList = computed<string[]>(() => {
    return [...new Set(products.value!.map((product) => product.acctDesc))];
  });

  const getProductMaskedId = computed<string>(() => {
    return products.value.find((product) => product.id === formData.accountID)
      ?.acctIDMasked!;
  });

  const productNameList = computed<string[]>(() => {
    return products
      .value!?.filter(
        (product) => product.acctDesc === productTypeSelected.value,
      )
      .map((productFilter) => productFilter.acctNickName);
  });

  const mapProductNameList = computed<string[]>(() => {
    return productNameList.value.filter(
      (item) =>
        item.toUpperCase().indexOf(productName.value.toUpperCase()) != -1,
    );
  });

  const productValueTypeList = computed<string[]>(() =>
    movementTypes.value.map((movementType) => movementType.name),
  );

  watch(productName, (newValue) => {
    const selectedProduct = products.value?.find(
      (product) => product.acctNickName === newValue,
    );
    if (!!selectedProduct && !!selectedProduct.acctType) {
      productNameStore.value = selectedProduct.acctNickName;
      productId.value = selectedProduct.acctIDMasked;
      showAllList.value = true;
      formData.accountID = selectedProduct.id;
      formData.acctType = selectedProduct.acctType;

      refetch();
    } else {
      showAllList.value = false;
    }
  });

  watch(valueTypeSelected, (newValue) => {
    const selectedValueType = movementTypes.value?.find(
      (movementType) => movementType.name === newValue,
    );
    if (!!selectedValueType) {
      formData.moveType = selectedValueType.name;
      formData.trnType = selectedValueType.code;
    }
  });

  watch(productTypeSelected, (newValue) => {
    productName.value = '';
    productType.value = newValue;
  });

  watch(formData, () => {
    period.value = formData.startDt + ' - ' + formData.endDt;
  });

  watch(
    productTypeList,
    (newValue) => {
      productName.value = productNameList.value[0];
      const defaultString: string = i18n.global.t(
        'MOVEMENTS-MODULE.SEARCH.DEFAULT-PRODUCT-LABEL',
      );

      productTypeSelected.value = newValue.includes(defaultString)
        ? defaultString
        : newValue[0];
    },
    { immediate: true },
  );

  const sendFormMutation = useMutation(['spinner'], sendMovementsForm, {
    onSuccess: (data) => {
      movementsStore.setMovements(data);
      currentStep.value = STEPS.stepDetail;
    },
    onError: (error: any) => {
      message.value = error.response.data.message;
      codeMessage.value = error.response.data.code;
      v$.value.$reset();
    },
  });

  const requestFileMutation = useMutation(['spinner'], requestFile, {
    onSuccess: () => {
      isActiveALertFile.value = true;
    },
    onError: (error: any) => {
      message.value = error.response.data.messageDev;
      codeMessage.value = error.response.data.code;
    },
  });

  const sendForm = () => {
    if (!v$.value.invalid) sendFormMutation.mutate(formData);
  };

  const requestFileAction = () => {
    if (!v$.value.invalid) requestFileMutation.mutate(formData);
  };

  const getFileAlertText = computed<string>(() => {
    if (fileRequestType.value === '2')
      return i18n.global.t('MOVEMENTS-MODULE.SEARCH.FILE-TYPE-MESSAGES.2');

    if (fileRequestType.value === '3')
      return i18n.global.t('MOVEMENTS-MODULE.SEARCH.FILE-TYPE-MESSAGES.3');
    return '';
  });

  const isInvalidRequestFileButton = computed<boolean>(() => {
    if (
      fileRequestType.value === '2' &&
      (formData.startDt === getToday.value || formData.endDt === getToday.value)
    )
      return true;

    if (fileRequestType.value === '3') {
      if (
        formData.startDt !== getToday.value &&
        formData.endDt !== getToday.value
      ) {
        return false;
      }
      if (
        formData.startDt === getToday.value &&
        formData.endDt === getToday.value
      ) {
        return false;
      }
      return true;
    }
    return false;
  });

  onBeforeUnmount(() => {
    message.value = '';
    codeMessage.value = '';
    v$.value.$reset();
  });

  return {
    isLoadingParameters,
    productName,
    productTypeSelected,
    productTypeList,
    getProductMaskedId,
    mapProductNameList,
    formData,
    sendForm,
    getToday,
    getPeriod,
    getStartDate,
    v$,
    showAllList,
    productNameList,
    showRangeComponent,
    valueForRange,
    productValueTypeList,
    valueTypeSelected,
    requestFileAction,
    getFileAlertText,
    isInvalidRequestFileButton,
    isFetching,
    isActiveALertFile,
    codeMessage,
    message,
  };
};

export default useSearch;
