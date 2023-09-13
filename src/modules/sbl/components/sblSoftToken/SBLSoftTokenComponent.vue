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
  <div>
    <p
      :class="`vel-text-body-1 vel-text-semibold p-t-40 ${
        props.isModal ? 'txt-center' : 'text-aling-left'
      }`"
    >
      {{ $t('SBL-CHALLENGES.SOFT-TOKEN.TITLE') }}
    </p>
    <p
      :class="`vel-text-body-2 ${props.isModal ? 'txt-center' : 'txt'} p-t-16`"
    >
      {{ $t('SBL-CHALLENGES.SOFT-TOKEN.CONTENT') }}
    </p>
    <div
      :class="`container-code m-t-18 ${
        props.isModal ? 'container-code-modal' : ''
      }`"
    >
      <input
        :class="`${
          props.isModal ? 'container-input-modal' : ''
        } container-input `"
        v-for="(input, index) in inputs"
        :key="index"
        type="tel"
        autocomplete="off"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]*"
        v-model="input.value"
        @keydown="handleKeyDown(index, $event)"
        @beforeinput="($event) => handleInput(index, $event)"
        @click="handleClick(index)"
        @keyup="handleArrowKeys(index, $event)"
        ref="otpInputs"
      />
    </div>
    <div class="container-timeout p-t-30">
      <div class="container-bar w-100">
        <div class="timeout-bar" :style="{ width: `${barWidthRef}%` }"></div>
        <div class="timeout-bar-back"></div>
      </div>
      <p class="vel-text-body-2 p-l-16">{{ formatTime(timerRef) }}</p>
    </div>
    <div class="container-buttons">
      <velocity-button
        classesName="btn btn-primary m-a"
        :disabled="buttonDisabled"
        size="medium"
        @click="authSoftToken()"
        type="button"
        :text="$t('REUSABLES.BUTTON.CONTINUE')"
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
import { ref, watch, computed, reactive, onMounted, onBeforeMount } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import useSBL from '../../composables/useSBL';
import { responseCodes } from '@/commons/constants/responseCodes';

const {
  timerRef,
  barWidthRef,
  alertIsVisible,
  state,
  startTimer,
  formatTime,
  initSoftToken,
  softTokenAuthorize,
  cleandFields,
} = useSBL();

interface Props {
  length?: number;
  value?: string;
  isModal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  length: 8,
  value: () => '',
  code: '',
  isModal: false,
});

interface IEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'errorSBL', msg: string, code: string): void;
  (e: 'successSBL'): void;
  (e: 'closeAction'): void;
}
const emits = defineEmits<IEmits>();

let clickedIndex: any = null;
const otpValue = ref<string>('');
const otpInputs = ref<HTMLInputElement[]>([]);

const inputs = reactive(
  Array.from({ length: props.length }, () => ({ value: '' })),
);

const filledInputs = computed(
  () => inputs.filter((input) => input.value !== '').length,
);
const buttonDisabled = computed(
  () => timerRef.value === 0 || filledInputs.value < props.length,
);

const handleKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace') {
    setTimeout(() => {
      if (index > 0 && !inputs[index].value) {
        otpInputs.value[index - 1].focus();
        clickedIndex = null;
      }
    }, 0);
  }
};

const handleClick = (index: number) => {
  otpInputs.value[index].focus();
  clickedIndex = index;
};

const handleArrowKeys = (index: number, event: KeyboardEvent) => {
  if (event.key === 'ArrowRight' && index < props.length - 1) {
    otpInputs.value[index + 1].focus();
    clickedIndex = index + 1;
  }
  if (event.key === 'ArrowLeft' && index > 0) {
    otpInputs.value[index - 1].focus();
    clickedIndex = index - 1;
  }
};

const handleInput = (index: number, event: any) => {
  const input = event.data as string;
  if (input && !/\d/.test(input)) {
    inputs[index].value = input.replace(/[^0-9]/g, '');
    return;
  }
  if (index === clickedIndex) {
    inputs[index].value = input;
    clickedIndex = null;
  } else if (input && inputs[index].value && index < props.length - 1) {
    inputs[index + 1].value = input;
    setTimeout(() => {
      otpInputs.value[index + 1].focus();
      clickedIndex = null;
    }, 0);
    event.preventDefault();
  }
  const otpArray = inputs.map((input) => input.value).join('');
  otpValue.value = otpArray;
  emits('update:modelValue', otpArray);
};

const initSoftTokenMutation = useMutation(['spinner'], initSoftToken, {
  onSuccess: () => {
    if (!state.isRunning) {
      cleandFields();
      startTimer();
    }
  },
  onError: (error: any) => {
    closeAction();
    emits('errorSBL', error.response.data.message, error.response.data.code);
  },
});

const authorizeSoftToken = useMutation(['spinner'], softTokenAuthorize, {
  onSuccess: (data: any) => {
    if (state.isRunning) {
      const status = data.response.validateStatus;
      if (status === responseCodes.sblCodes.success) {
        emits('successSBL');
        cleandFields();
      }
    }
  },
  onError: (error: any) => {
    emits('errorSBL', error.response.data.message, error.response.data.code);
  },
});

const sendSoftToken = () => {
  initSoftTokenMutation.mutate();
};

const authSoftToken = (): void => {
  authorizeSoftToken.mutate(otpValue.value);
};

const closeAction = (): void => {
  cleandFields();
  emits('closeAction');
};

onBeforeMount(() => {
  cleandFields();
  sendSoftToken();
});

onMounted(() => {
  setTimeout(() => {
    otpInputs.value[0].focus();
  }, 0);
});

watch(
  () => props.value,
  (newValue) => {
    newValue.split('').forEach((char, i) => {
      inputs[i].value = char;
    });
  },
);
</script>
<style scoped lang="sass" src="./SBLSoftTokenComponent.sass"></style>
