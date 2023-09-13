<template>
  <div>
    <div v-if="!!codeError && !alertIsClosed" class="m-b-22">
      <velocity-alert
        type="red"
        :hasIcon="true"
        :boldText="'Error ' + codeError + '. '"
        :body="messageError"
        :is-closable="true"
        @action-icon="alertIsClosed = true"
      />
    </div>
    <p class="vel-text-subtitle vel-text-semibold m-b-14">
      {{ $t('AUTH-MODULE.STEPS.LOGIN.TITLE') }}
    </p>
    <p class="vel-text-body-2 vel-text-semibold m-b-4">
      {{ $t('AUTH-MODULE.STEPS.LOGIN.LABEL') }}
    </p>
    <p class="vel-text-body-1 color-neutral m-b-24">
      {{ fullUserName }}
    </p>
    <VelocityInput
      class="m-b-22"
      id="user"
      type="password"
      :label="$t('AUTH-MODULE.STEPS.LOGIN.INPUT-LABEL')"
      :placeHolder="$t('AUTH-MODULE.STEPS.LOGIN.PLACE-HOLDER')"
      v-model="onlyToken"
      :maxlength="6"
      :only-numbers="true"
      :descriptionLine="$t('AUTH-MODULE.STEPS.LOGIN.DESCRIPTION-INPUT')"
      :isDisabled="isBlocked"
      :eye-icon-is-hidden="true"
    />
    <VelocityButton
      v-if="!isBlocked"
      classesName="btn btn-primary m-b-8"
      size="large"
      :text="$t('AUTH-MODULE.STEPS.LOGIN.BTN-TITLE')"
      type="button"
      :disabled="isDisabled"
      @action-button="encryptToken()"
    />
    <VelocityButton
      :classesName="
        isBlocked ? ` btn btn-primary m-a` : `text text-primary m-a`
      "
      size="large"
      :text="
        isBlocked
          ? $t('REUSABLES.BUTTON.GO-BACK')
          : $t('AUTH-MODULE.STEPS.LOGIN.SECOND-BTN-TITLE')
      "
      type="button"
      @action-button="cancelAction"
    />
  </div>
</template>

<script setup lang="ts">
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import useLogin from '@/modules/auth/composables/useLogin';

const {
  isBlocked,
  encryptToken,
  isDisabled,
  onlyToken,
  cancelAction,
  messageError,
  codeError,
  alertIsClosed,
  fullUserName,
} = useLogin();
</script>

<style scoped lang="sass" src="./loginTokenComponent.sass"></style>
