<template>
  <div>
    <p class="vel-text-body-1 vel-text-semibold p-t-40">
      {{ getTitle }}
    </p>
    <VelocityInput
      class="m-t-16"
      id="password"
      type="password"
      :eye-icon-is-hidden="props.eyeIconIsHidden"
      :placeHolder="getInputPlaceHolder"
      v-model="credential"
    />
    <VelocityButton
      class="m-t-16"
      classesName="btn btn-primary"
      size="large"
      :text="$t('REUSABLES.BUTTON.ACEPT')"
      type="button"
      :disabled="buttonIsDisabled"
      @action-button="emits('getCredential', credential)"
    />
    <VelocityButton
      classesName=" text text-primary m-a"
      size="large"
      :text="$t('REUSABLES.BUTTON.CANCEL')"
      type="button"
      @action-button="emits('closeAction')"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import i18n from '@/locales/i18n';

export interface Props {
  type: 'password' | 'token';
  eyeIconIsHidden?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'password',
  eyeIconIsHidden: false,
});

interface IEmits {
  (e: 'closeAction'): void;
  (e: 'getCredential', credential: string): void;
}

const emits = defineEmits<IEmits>();
const buttonIsDisabled = ref<boolean>(true);
const credential = ref<string>('');

const getTitle = computed<string>(() => {
  if (props.type === 'password') return 'Ingrese su contraseña';
  if (props.type === 'token') return 'Ingrese su token';
  return '';
});

const getInputPlaceHolder = computed<string>(() => {
  if (props.type === 'password')
    return i18n.global.t('AUTH-MODULE.STEPS.AUTH.PLACE-HOLDER');
  if (props.type === 'token')
    return i18n.global.t('AUTH-MODULE.STEPS.LOGIN.PLACE-HOLDER');
  return '';
});

watch(credential, (newValue) => {
  !!newValue
    ? (buttonIsDisabled.value = false)
    : (buttonIsDisabled.value = true);
});
</script>
