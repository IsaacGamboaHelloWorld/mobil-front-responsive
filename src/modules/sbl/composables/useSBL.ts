import { reactive, ref } from 'vue';

import useSBLServices from '../services/SBLServices';

const useSBL = () => {
  const { initPush, initSoftToken, pushResult, softTokenAuthorize } =
    useSBLServices();
  const buttonDisabled = ref<boolean>(true);
  const alertIsVisible = ref<boolean>(false);
  const timeout: number = 180;
  const maxBarWidth: number = 100;

  const state = reactive<any>({
    timer: timeout,
    barWidth: maxBarWidth,
    isRunning: false,
    intervalId: null as any,
  });

  const timerRef = ref<number>(state.timer);
  const barWidthRef = ref<number>(state.barWidth);

  const cleandFields = () => {
    buttonDisabled.value = true;
    alertIsVisible.value = false;
    state.isRunning = false;
    state.timer = timeout;
    state.barWidth = maxBarWidth;
    state.intervalId = null;
    timerRef.value = state.timer;
    barWidthRef.value = state.barWidth;
  };

  const finishTimer = (): void => {
    state.isRunning = false;
    clearInterval(state.intervalId!);
    buttonDisabled.value = false;
    alertIsVisible.value = true;
  };

  const startTimer = (): void => {
    state.isRunning = true;
    state.intervalId = setInterval(() => {
      state.timer ? state.timer-- : finishTimer();
      timerRef.value = state.timer;
      barWidthRef.value = (state.timer / timeout) * 100;
    }, 1000);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return {
    state,
    timerRef,
    barWidthRef,
    buttonDisabled,
    alertIsVisible,
    formatTime,
    initPush,
    initSoftToken,
    pushResult,
    softTokenAuthorize,
    cleandFields,
    startTimer,
  };
};

export default useSBL;
