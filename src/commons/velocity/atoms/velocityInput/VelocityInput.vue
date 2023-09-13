<template>
  <div class="container-input">
    <label
      class="label vel-text-body-2 vel-text-semibold"
      :class="{
        'label-error': props.hasError && isFocused,
        'label-error-bbog':
          props.hasError && isFocused && companyName === 'bbog',
        'label-success': !props.hasError && isFocused,
        disabled: props.isDisabled,
      }"
      :for="props.id"
      >{{ props.label }}
      <i
        v-if="props.politics"
        class="pop-up icon-icon-info m-l-8"
        @mouseover="showPopUp = true"
        @mouseout="showPopUp = false"
        @click="!!showPopUp ? (showPopUp = false) : (showPopUp = true)"
      >
        <velocity-pop-up v-if="showPopUp" type="down">
          <template #component>
            <div class="politics">
              <div class="arrow"></div>
              <p class="vel-text-caption vel-text-semibold m-b-4">
                {{ $t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.POLITICS.TITLE') }}
              </p>
              <p class="vel-text-micro">
                {{ $t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.POLITICS.LABEL-1') }}
              </p>
              <ul class="vel-text-micro m-b-10 m-l-14">
                <li>
                  {{ $t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.POLITICS.LABEL-2') }}
                </li>
                <li>
                  {{ $t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.POLITICS.LABEL-3') }}
                </li>
                <li>
                  {{ $t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.POLITICS.LABEL-4') }}
                </li>
              </ul>
              <p class="vel-text-micro">
                {{ $t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.POLITICS.LABEL-5') }}
              </p>
            </div>
          </template>
        </velocity-pop-up>
      </i>
    </label>
    <div class="m-b-8 relative-container">
      <input
        :maxlength="props.maxlength"
        autocomplete="off"
        class="input"
        :class="{
          'input-error': props.hasError && isFocused,
          'input-error-bbog':
            props.hasError && isFocused && companyName === 'bbog',
          'input-success': !props.hasError && isFocused,
          small: props.size === 'small',
        }"
        :id="props.id"
        :type="!showPassword ? props.type : 'text'"
        :placeholder="props.placeHolder"
        v-model="value"
        @focus="isFocused = true"
        :onpaste="cancelPasteAndCopy"
        :oncopy="cancelPasteAndCopy"
        :disabled="isDisabled"
        :readonly="props.readonly"
      />
      <i
        v-if="props.type === 'password'"
        v-show="!props.eyeIconIsHidden"
        :class="
          showPassword === true
            ? 'icon-icon-visibility'
            : 'icon-icon-visibility-off'
        "
        @click="
          showPassword === true ? (showPassword = false) : (showPassword = true)
        "
      ></i>

      <i v-if="!!props.icon" :class="props.icon"></i>
    </div>

    <span v-if="!!props.descriptionLine" class="detail vel-text-small">
      {{ props.descriptionLine }}
    </span>
    <span
      v-if="!!props.errorMessage && isFocused"
      class="message vel-text-small"
      :class="{
        'message-error': props.hasError && isFocused,
        'message-success': !props.hasError && isFocused,
      }"
    >
      {{ props.errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import VelocityPopUp from '../velocityPopUp/VelocityPopUp.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { computed, ref, watch } from 'vue';
import useFormattHelper from '@/commons/helpers/formatMoney';
import { companyName } from '@/commons/constants/companyName';

export interface Props {
  label?: string;
  id: string;
  hasError?: boolean;
  placeHolder?: string;
  errorMessage?: string | any;
  descriptionLine?: string;
  modelValue: string;
  type?: 'text' | 'password';
  maxlength?: number;
  onlyNumbers?: boolean;
  isDisabled?: boolean;
  alpha?: boolean;
  politics?: boolean;
  withValueFormat?: boolean;
  size?: '' | 'small';
  readonly?: boolean;
  eyeIconIsHidden?: boolean;
  icon?: string;
}
const props = withDefaults(defineProps<Props>(), {
  hasError: false,
  label: '',
  placeHolder: '',
  descriptionLine: '',
  errorMessage: '',
  modelValue: '',
  type: 'text',
  maxlength: 100,
  onlyNumbers: false,
  isDisabled: false,
  alpha: false,
  politics: false,
  withValueFormat: false,
  size: '',
  readonly: false,
  eyeIconIsHidden: false,
});
const showPopUp = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const isFocused = ref<boolean>(false);

const { formatCurrencyInput } = useFormattHelper();
const globalStore = useGlobalStore();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const value = computed<string>({
  get() {
    if (props.withValueFormat) {
      return formatCurrencyInput(props.modelValue);
    }
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value.toString());
  },
});

watch(value, (newValue) => {
  if (props.onlyNumbers) {
    value.value = newValue.replace(/\D/g, '');
  } else if (props.alpha) {
    value.value = processString(newValue);
  }
});

const processString = (value: string): string => {
  const specialCharacters = globalStore.specialCharacters;
  const uniqueCharsA = new Set([...specialCharacters]);
  const result = [...value].filter((char) => !uniqueCharsA.has(char)).join('');
  return result;
};

const cancelPasteAndCopy = (event: any) => {
  if (globalStore.activePaste === 'false') event.preventDefault();
};
</script>

<style scoped lang="sass" src="./VelocityInput.sass"></style>
