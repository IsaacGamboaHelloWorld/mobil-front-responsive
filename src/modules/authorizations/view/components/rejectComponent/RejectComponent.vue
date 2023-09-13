<template>
  <div>
    <div class="icon-warning container-icon m-a">
      <i class="icon icon-warning icon-icon-warning"></i>
    </div>
    <p class="vel-text-body-1 vel-text-semibold m-t-22">
      {{ $t('AUTHORIZATIONS-MODULE.REJECT.TITLE') }}
    </p>
    <p class="color-neutral vel-text-body-2 m-t-8 m-b-22 text-aling-center">
      {{ $t('AUTHORIZATIONS-MODULE.REJECT.DESC') }}
    </p>
    <VelocityInput
      class="m-t-16 text-aling-left"
      id="password"
      type="text"
      :placeHolder="$t('AUTHORIZATIONS-MODULE.REJECT.PLACEHOLDER')"
      v-model="desc"
      :label="$t('AUTHORIZATIONS-MODULE.REJECT.LABEL')"
      :maxlength="80"
    />
    <VelocityButton
      class="m-t-16"
      classesName="btn btn-primary"
      size="large"
      :text="$t('REUSABLES.BUTTON.ACEPT')"
      type="button"
      :disabled="buttonIsDisabled"
      @action-button="emits('getDesc', desc)"
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
<style scoped lang="sass" src="./RejectComponent.sass"></style>
<script setup lang="ts">
import { ref, watch } from 'vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';

export interface Props {
  type: 'password' | 'token';
}

interface IEmits {
  (e: 'closeAction'): void;
  (e: 'getDesc', rejectDescription: string): void;
}

const emits = defineEmits<IEmits>();
const buttonIsDisabled = ref<boolean>(true);
const desc = ref<string>('');

watch(desc, (newValue) => {
  !!newValue
    ? (buttonIsDisabled.value = false)
    : (buttonIsDisabled.value = true);
});
</script>
