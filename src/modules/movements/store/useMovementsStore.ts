import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import STEPS from './../constants/steps';
import type { IProduct } from '@/commons/entities/global.interfaces';
import {
  initCalendarParameters,
  initMovementTypes,
  initProduct,
} from '../constants/initialStates';
import type {
  ICalendarParameters,
  IMovement,
  IMovementResponse,
  IMovementTypes,
} from '../entities/movementsInterfaces';

export const useMovementsStore = defineStore('movementsStore', () => {
  const products = ref<IProduct[]>([initProduct]);
  const calendarParameters = ref<ICalendarParameters>(initCalendarParameters);
  const currentStep = ref<string>(STEPS.stepSearch);
  const movementTypes = ref<IMovementTypes[]>([initMovementTypes]);
  const fileRequestType = ref<string>('');
  const movements = ref<IMovement[]>();
  const getRqUID = ref<string>('');

  const productNameStore = ref<string>('');
  const productId = ref<string>('');
  const productType = ref<string>('');
  const period = ref<string>('');

  const getPeriod = computed<string>(() => {
    return !!calendarParameters.value.period
      ? calendarParameters.value.period
      : '';
  });
  const getEndDate = computed<string>(() => {
    return !!calendarParameters.value.endDate
      ? calendarParameters.value.endDate
      : '';
  });
  const getToday = computed<string>(() => {
    return !!calendarParameters.value.today
      ? calendarParameters.value.today
      : '';
  });
  const getStartDate = computed<string>(() => {
    return !!calendarParameters.value.startDate
      ? calendarParameters.value.startDate
      : '';
  });

  const resetStore = (): void => {
    products.value = [initProduct];
    calendarParameters.value = initCalendarParameters;
    currentStep.value = STEPS.stepSearch;
    movementTypes.value = [initMovementTypes];
    fileRequestType.value = '';
    movements.value = undefined;
    productNameStore.value = '';
    productId.value = '';
    productType.value = '';
    period.value = '';
  };

  return {
    currentStep,
    products,
    setMovementTypes(newState: IMovementTypes[]) {
      movementTypes.value = newState;
    },
    setProducts(newState: IProduct[]): void {
      products.value = newState;
    },
    setCalendarParameters(newState: ICalendarParameters): void {
      calendarParameters.value = newState;
    },
    setMovements(newState: IMovementResponse): void {
      movements.value = newState.response.todayMovementRs;
      getRqUID.value = newState.response.rqUID;
    },
    getToday,
    getPeriod,
    getEndDate,
    getStartDate,
    movementTypes,
    fileRequestType,
    getRqUID,
    productNameStore,
    productId,
    productType,
    period,
    resetStore,
    movements,
  };
});
