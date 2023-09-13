<template>
  <div>
    <div v-if="!!codeError" class="m-b-22">
      <velocity-alert
        v-if="!alertIsClosed"
        type="red"
        :hasIcon="true"
        :boldText="'Error ' + codeError + '. '"
        :body="messageError"
        :is-closable="true"
        @action-icon="alertIsClosed = true"
      />
    </div>
    <p class="vel-text-body-1 vel-text-semibold color-dark-400 m-b-6">
      {{ $t('AUTH-MODULE.STEPS.IP-CONFIG.TITLE') }}
    </p>
    <p class="vel-text-body-2 color-neutral m-b-14">
      {{ $t('AUTH-MODULE.STEPS.IP-CONFIG.LABEL-1') }}
    </p>
    <div class="m-b-20 options">
      <div class="option">
        <input
          class="radio-input m-r-8"
          v-model="selectedOption"
          type="radio"
          id="unique"
          value="unique"
        />
        <label for="rUnique" class="rText vel-text-small color-dark-400 m-r-24"
          >{{ $t('AUTH-MODULE.STEPS.IP-CONFIG.OPTION-UNIQUE') }}
        </label>
      </div>
      <div class="option">
        <input
          class="radio-input m-r-8"
          v-model="selectedOption"
          type="radio"
          id="range"
          value="range"
        />
        <label for="rRange" class="vel-text-small color-dark-400">
          {{ $t('AUTH-MODULE.STEPS.IP-CONFIG.OPTION-RANGE') }}</label
        >
      </div>
    </div>
    <p class="vel-text-body-2 color-neutral m-b-12">
      {{ $t('AUTH-MODULE.STEPS.IP-CONFIG.LABEL-2') }} {{ ipUser }}
    </p>
    <div v-show="selectedOption === 'unique'">
      <VelocityInput
        id="ip-1"
        :label="$t('AUTH-MODULE.STEPS.IP-CONFIG.INPUT-LABEL-1')"
        :placeHolder="$t('AUTH-MODULE.STEPS.IP-CONFIG.PLACE-HOLDER')"
        v-model="formData.rangeStart"
        :has-error="(validIP.ipStart = v$.rangeStart.$silentErrors.length > 0)"
        :errorMessage="
          v$.rangeStart.$silentErrors.length > 0
            ? v$.rangeStart.$silentErrors[0].$message
            : ''
        "
      />
    </div>
    <div v-show="selectedOption === 'range'">
      <VelocityInput
        id="ip-2"
        :label="$t('AUTH-MODULE.STEPS.IP-CONFIG.INPUT-LABEL-2')"
        :placeHolder="$t('AUTH-MODULE.STEPS.IP-CONFIG.PLACE-HOLDER')"
        v-model="formData.rangeStart"
        :has-error="(validIP.ipStart = v$.rangeStart.$silentErrors.length > 0)"
        :errorMessage="
          v$.rangeStart.$silentErrors.length > 0
            ? v$.rangeStart.$silentErrors[0].$message
            : ''
        "
      />
      <VelocityInput
        id="ip-3"
        :label="$t('AUTH-MODULE.STEPS.IP-CONFIG.INPUT-LABEL-3')"
        :placeHolder="$t('AUTH-MODULE.STEPS.IP-CONFIG.PLACE-HOLDER')"
        v-model="formData.rangeEnd"
        :has-error="(validIP.ipEnd = v$.rangeEnd.$silentErrors.length > 0)"
        :errorMessage="
          v$.rangeEnd.$silentErrors.length > 0
            ? v$.rangeEnd.$silentErrors[0].$message
            : ''
        "
      />
    </div>
    <velocity-button
      :text="$t('REUSABLES.BUTTON.CONTINUE')"
      classesName="btn btn-primary m-t-16 m-b-16"
      size="medium"
      type="button"
      :disabled="!ipIsWrong"
      @action-button="sendForm()"
    ></velocity-button>
    <velocity-button
      :text="$t('REUSABLES.BUTTON.CANCEL')"
      classesName="text text-primary m-a"
      size="medium"
      type="button"
      @action-button="cancel()"
    ></velocity-button>
  </div>
  <VelocityModal
    v-if="hasConfirmed"
    type="custom"
    id="confirmacion cambio de IP"
  >
    <template #component>
      <VelocityConfirmationModal
        type="check"
        :title="$t('AUTH-MODULE.STEPS.IP-CONFIG.CONFIRMATION-LABEL-1')"
        :body="$t('AUTH-MODULE.STEPS.IP-CONFIG.CONFIRMATION-LABEL-2')"
        :button-label="$t('REUSABLES.BUTTON.ACEPT')"
        :has-cancel-button="false"
        @action-button-confirm="cancel()"
      />
    </template>
  </VelocityModal>
</template>
<script setup lang="ts">
import VelocityConfirmationModal from '@/commons/velocity/molecules/velocityConfirmationModal/VelocityConfirmationModal.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import useIPConfig from '@/modules/auth/composables/useIPConfig';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';

const {
  selectedOption,
  ipIsWrong,
  validIP,
  ipUser,
  formData,
  v$,
  sendForm,
  cancel,
  hasConfirmed,
  messageError,
  codeError,
  alertIsClosed,
} = useIPConfig();
</script>
<style scoped lang="sass" src="./IPConfigComponent.sass"></style>
