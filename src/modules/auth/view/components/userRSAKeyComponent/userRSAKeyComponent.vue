<template>
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
  <div v-if="sessionClosed && !alertIsClosed" class="m-b-22">
    <velocity-alert
      type="green"
      :hasIcon="true"
      :body="$t('AUTH-MODULE.STEPS.USER-RSA-KEY.SESSION-CLOSED')"
      :is-closable="true"
      @action-icon="closeAlert()"
    />
  </div>
  <div>
    <p class="vel-text-subtitle vel-text-semibold m-b-14">
      {{ $t('AUTH-MODULE.STEPS.USER-RSA-KEY.TITLE') }}
    </p>
    <p class="vel-text-body-2 color-neutral m-b-22">
      {{ $t('AUTH-MODULE.STEPS.USER-RSA-KEY.INFORMATION') }}
    </p>
    <VelocityInput
      class="m-b-22"
      id="user"
      :label="$t('AUTH-MODULE.STEPS.USER-RSA-KEY.INPUT-LABEL')"
      :placeHolder="$t('AUTH-MODULE.STEPS.USER-RSA-KEY.PLACE-HOLDER')"
      v-model="icbsUser"
      :has-error="v$.icbsUser.$silentErrors.length > 0"
      :descriptionLine="$t('AUTH-MODULE.STEPS.USER-RSA-KEY.DESCRIPTION-INPUT')"
      :maxlength="30"
      :isDisabled="isBlocked"
    />
    <VelocityButton
      v-if="!isBlocked"
      classesName="btn btn-primary"
      size="large"
      :text="$t('AUTH-MODULE.STEPS.USER-RSA-KEY.BTN-TITLE')"
      type="button"
      :disabled="isDisabled"
      @action-button="sendIcbsUser()"
    />
    <VelocityButton
      v-else
      classesName="btn btn-primary m-a"
      size="large"
      :text="$t('REUSABLES.BUTTON.GO-BACK')"
      type="button"
      @action-button="reload()"
    />
    <velocity-alert
      class="m-t-24"
      v-if="!alertIsClosed && !!email"
      type="blue"
      :hasIcon="true"
      :body="
        $t('AUTH-MODULE.STEPS.USER-RSA-KEY.EMAIL-TEXT-BEFORE') +
        ' (' +
        email +
        ') ' +
        $t('AUTH-MODULE.STEPS.USER-RSA-KEY.EMAIL-TEXT-AFTER')
      "
      :is-closable="true"
      @action-icon="alertIsClosed = true"
    />
  </div>
</template>

<script setup lang="ts">
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import useUserRSAKey from '@/modules/auth/composables/useUserRSAKey';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
const {
  isBlocked,
  email,
  isDisabled,
  icbsUser,
  messageError,
  codeError,
  sendIcbsUser,
  v$,
  alertIsClosed,
  sessionClosed,
  closeAlert,
  reload,
} = useUserRSAKey();
</script>

<style scoped lang="sass" src="./userRSAKeyComponent.sass"></style>
