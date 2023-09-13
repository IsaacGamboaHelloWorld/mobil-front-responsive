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
  <div>
    <p class="vel-text-semibold vel-text-body-1 m-b-16">
      {{ $t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.TITLE') }}
    </p>
    <p class="vel-text-body-2 color-neutral m-b-16">
      {{ $t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.DESCRIPTION') }}
    </p>
    <VelocityInput
      class="m-b-22"
      id="oldPaswword"
      type="password"
      :has-error="v$.oldpassword.$silentErrors.length > 0"
      :label="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.LABEL-BEFORE')"
      :placeHolder="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.PLACEHOLDER')"
      v-model="formData.oldpassword"
      :isDisabled="isBlocked"
    />
    <VelocityInput
      class="m-b-22"
      id="newPassword"
      type="password"
      :label="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.LABEL-NEW')"
      :placeHolder="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.PLACEHOLDER')"
      :has-error="v$.newpassword.$silentErrors.length > 0"
      :errorMessage="
        v$.newpassword.$silentErrors.length > 0
          ? v$.newpassword.$silentErrors[0].$message
          : ''
      "
      v-model="formData.newpassword"
      :politics="true"
      :isDisabled="isBlocked"
    />
    <VelocityInput
      class="m-b-22"
      id="confirmPassword"
      type="password"
      :has-error="v$.confirmpassword.$silentErrors.length > 0"
      :label="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.LABEL-CONFIRMATION-NEW')"
      :errorMessage="
        v$.confirmpassword.$silentErrors.length > 0
          ? v$.confirmpassword.$silentErrors[0].$message
          : ''
      "
      :placeHolder="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.PLACEHOLDER')"
      v-model="formData.confirmpassword"
      :politics="true"
      :isDisabled="isBlocked"
    />
    <VelocityButton
      v-if="!isBlocked"
      classesName="btn btn-primary"
      size="large"
      text="Continuar"
      type="button"
      :disabled="v$.$invalid"
      @action-button="toggleModal()"
    />
    <VelocityButton
      :classesName="
        isBlocked ? ` btn btn-primary m-a` : `text text-primary m-a`
      "
      size="large"
      :text="
        isBlocked
          ? $t('REUSABLES.BUTTON.GO-BACK')
          : $t('AUTH-MODULE.STEPS.AUTH.SECOND-BTN-TITLE')
      "
      type="button"
      @action-button="cancelAction()"
    />
  </div>
  <VelocityModal
    v-if="displayConfirmationModal"
    type="custom"
    id="confirmacion cambio de contraseña"
  >
    <template #component>
      <VelocityConfirmationModal
        v-if="!hasConfirmed"
        type="warning"
        :title="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.CONFIRMATION-LABEL-1')"
        :body="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.CONFIRMATION-LABEL-2')"
        :button-label="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.BUTTON-CHANGE')"
        @action-button-confirm="confirmPassword()"
        @action-button-cancel="toggleModal()"
      />
      <VelocityConfirmationModal
        v-else
        type="check"
        :title="$t('AUTH-MODULE.STEPS.CHANGE-PASSWORD.CONFIRMATION-LABEL-3')"
        :button-label="$t('REUSABLES.BUTTON.ACEPT')"
        :has-cancel-button="false"
        @action-button-confirm="cancelAction()"
      />
    </template>
  </VelocityModal>
</template>

<script setup lang="ts">
import VelocityConfirmationModal from '@/commons/velocity/molecules/velocityConfirmationModal/VelocityConfirmationModal.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import useChangePassword from '@/modules/auth/composables/useChangePassword';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
const {
  formData,
  toggleModal,
  cancelAction,
  v$,
  messageError,
  codeError,
  alertIsClosed,
  displayConfirmationModal,
  hasConfirmed,
  confirmPassword,
  isBlocked,
} = useChangePassword();
</script>
