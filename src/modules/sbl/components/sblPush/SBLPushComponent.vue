<template>
  <div v-if="alertIsVisible && !isModal">
    <velocity-alert
      type="yellow"
      :hasIcon="true"
      :body="$t('SBL-CHALLENGES.PUSH-NOTIFICATION.TIMEOUT')"
      :is-closable="true"
      @action-icon="alertIsVisible = false"
    />
  </div>
  <div class="container-modal">
    <p
      :class="`vel-text-body-1 vel-text-semibold p-t-40 ${
        props.isModal ? 'txt-center' : 'text-aling-left'
      } `"
    >
      {{ $t('SBL-CHALLENGES.PUSH-NOTIFICATION.TITLE') }}
    </p>
    <p
      :class="`vel-text-body-2 ${props.isModal ? 'txt-center' : 'txt'} p-t-16`"
    >
      {{ $t('SBL-CHALLENGES.PUSH-NOTIFICATION.TEXT-1') }}
    </p>
    <div class="container-timeout p-t-16">
      <div class="container-bar w-100">
        <div class="timeout-bar" :style="{ width: `${barWidthRef}%` }"></div>
        <div class="timeout-bar-back"></div>
      </div>
      <p class="vel-text-body-2 p-l-16">{{ formatTime(timerRef) }}</p>
    </div>
    <p
      :class="`vel-text-body-2 vel-text-semibold p-t-30 ${
        props.isModal ? 'txt-center' : 'text-aling-left'
      }`"
    >
      {{ $t('SBL-CHALLENGES.PUSH-NOTIFICATION.TEXT-2') }}
    </p>
    <p :class="`vel-text-small ${props.isModal ? 'txt-center' : 'txt'} p-t-8`">
      {{ $t('SBL-CHALLENGES.PUSH-NOTIFICATION.TEXT-3') }}
    </p>
    <div class="container-buttons">
      <velocity-button
        classesName="btn btn-primary m-a"
        @click="sendPush()"
        :disabled="buttonDisabled"
        size="medium"
        type="button"
        :text="$t('SBL-CHALLENGES.PUSH-NOTIFICATION.BUTTON-RETRY')"
      />
      <velocity-button
        classesName="btn btn-secundary m-t-8 m-a"
        @click="goToSoftToken()"
        size="medium"
        type="button"
        :text="$t('SBL-CHALLENGES.PUSH-NOTIFICATION.BUTTON-SEND-CODE')"
      />
      <velocity-button
        classesName="text text-primary m-t-8 m-a"
        @click="closeAction()"
        size="medium"
        type="button"
        :text="$t('REUSABLES.BUTTON.CANCEL')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { onBeforeMount } from 'vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import useSBL from '../../composables/useSBL';
import { responseCodes } from '@/commons/constants/responseCodes';

const {
  timerRef,
  barWidthRef,
  alertIsVisible,
  buttonDisabled,
  state,
  startTimer,
  formatTime,
  initPush,
  pushResult,
  cleandFields,
} = useSBL();

interface Props {
  optionCode: string;
  isModal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  optionCode: '',
  isModal: false,
});

interface IEmits {
  (e: 'actionButtonSendCode'): void;
  (e: 'errorSBL', msg: string, code: string): void;
  (e: 'successSBL'): void;
  (e: 'closeAction'): void;
}
const emits = defineEmits<IEmits>();

const pushResultMutation = useMutation(pushResult, {
  onSettled: (data: any) => {
    if (state.isRunning) {
      const status = data.response.validateStatus;
      if (status === responseCodes.sblCodes.retry) pushResultMutation.mutate();
      else {
        if (status === responseCodes.sblCodes.success) {
          emits('successSBL');
        }
      }
    }
  },
  onError: (error: any) => {
    closeAction();
    emits('errorSBL', error.response.data.message, error.response.data.code);
  },
});

const initPushMutation = useMutation(['spinner'], initPush, {
  onSuccess: () => {
    if (!state.isRunning) {
      cleandFields();
      startTimer();
    }
    pushResultMutation.mutate();
  },
  onError: (error: any) => {
    closeAction();
    emits('errorSBL', error.response.data.message, error.response.data.code);
  },
});

const sendPush = (): void => {
  initPushMutation.mutate(props.optionCode);
};

const goToSoftToken = (): void => {
  cleandFields();
  emits('actionButtonSendCode');
};

const closeAction = (): void => {
  cleandFields();
  emits('closeAction');
};

onBeforeMount(() => {
  cleandFields();
  sendPush();
});
</script>
<style scoped lang="sass" src="./SBLPushComponent.sass"></style>
