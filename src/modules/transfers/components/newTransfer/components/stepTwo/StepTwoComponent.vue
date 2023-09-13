<template>
  <VelocityModal v-if="recipientLookupModalVisible" type="custom">
    <template #component>
      <recipient-lookup-component @close="toggleModal" />
    </template>
  </VelocityModal>

  <div class="container-component w-100">
    <div class="container-menu">
      <div class="container-header">
        <p class="vel-text-body-1 vel-text-semibold">
          {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.HEADER-1') }}
        </p>
        <velocity-button
          type="button"
          size="medium"
          classes-name="text text-secondary"
          @action-button="toggleModal"
          :text="
            $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.SEARCH-BUTTON')
          "
          icon="icon icon-icon-search"
        >
        </velocity-button>
      </div>
      <div class="container-dropdowns m-t-18">
        <velocity-input
          id="recipientName"
          class="input"
          size="small"
          :maxlength="40"
          :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-1')"
          :has-error="v$.recipientName.$silentErrors.length > 0"
          :error-message="
            v$.recipientName.$silentErrors.length > 0
              ? v$.recipientName.$silentErrors[0].$message
              : ''
          "
          :placeHolder="$t('REUSABLES.INPUT.SELECT-ONE')"
          v-model="newTransfer.recipientName"
        />
        <div class="container-dropdowns input">
          <velocity-dropdown
            class="input"
            :list="getIDTypeList"
            :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-2')"
            :placeholder="$t('REUSABLES.INPUT.SELECT-ONE')"
            v-model="newTransfer.identificationTypeDesc"
          >
          </velocity-dropdown>
          <velocity-input
            id="identification"
            class="input w-100"
            size="small"
            :only-numbers="true"
            :maxlength="16"
            :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-9')"
            :has-error="v$.identification.$silentErrors.length > 0"
            :errorMessage="
              v$.identification.$silentErrors.length > 0
                ? v$.identification.$silentErrors[0].$message
                : ''
            "
            :placeHolder="$t('REUSABLES.INPUT.TYPE-NUMBER')"
            v-model="newTransfer.identification"
          />
        </div>
      </div>
      <div class="container-dropdowns w-100 m-t-24">
        <velocity-dropdown
          class="input"
          :list="getBankList"
          :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-3')"
          :placeholder="$t('REUSABLES.INPUT.SELECT-ONE')"
          v-model="newTransfer.financialEntity"
        >
        </velocity-dropdown>
        <velocity-dropdown
          class="input"
          :list="getProductTypeList"
          :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-4')"
          :placeholder="$t('REUSABLES.INPUT.SELECT-ONE')"
          v-model="newTransfer.acctTypeToDesc"
        >
        </velocity-dropdown>
      </div>
      <div class="container-dropdowns w-100 m-t-24">
        <velocity-input
          id="acctIdTo"
          class="input"
          size="small"
          :only-numbers="true"
          :maxlength="17"
          :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-5')"
          :has-error="v$.acctIdTo.$silentErrors.length > 0"
          :errorMessage="
            v$.acctIdTo.$silentErrors.length > 0
              ? v$.acctIdTo.$silentErrors[0].$message
              : ''
          "
          :placeHolder="$t('REUSABLES.INPUT.SELECT-ONE')"
          v-model="newTransfer.acctIdTo"
        />
        <velocity-input
          id="payVal"
          class="input"
          size="small"
          :only-numbers="true"
          :maxlength="16"
          :with-value-format="true"
          :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-6')"
          :has-error="v$.payVal.$silentErrors.length > 0"
          :errorMessage="
            v$.payVal.$silentErrors.length > 0
              ? v$.payVal.$silentErrors[0].$message
              : ''
          "
          :placeHolder="$t('REUSABLES.INPUT.SELECT-ONE')"
          v-model="newTransfer.payVal"
        />
      </div>
    </div>
    <div class="container-menu accordion m-t-16">
      <velocity-acordion
        :title="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.HEADER-2')"
        type="normal"
        size="big"
      >
        <template #body>
          <div class="container-dropdowns w-100 accordion-body">
            <velocity-input
              id="referenceBillNumber"
              class="input"
              size="small"
              :maxlength="24"
              :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-7')"
              :placeHolder="$t('REUSABLES.INPUT.TYPE-OR-SELECT')"
              v-model="newTransfer.referenceBillNumber"
            />
            <velocity-input
              id="infoAdditional"
              class="input m-b-18"
              size="small"
              :maxlength="120"
              :label="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-8')"
              :placeHolder="$t('REUSABLES.INPUT.TYPE')"
              v-model="newTransfer.infoAdditional"
            />
          </div>
        </template>
      </velocity-acordion>
    </div>
    <div class="container-check m-t-26">
      <input
        type="checkbox"
        id="exonerateGMF"
        v-model="newTransfer.exonerateGMF"
      />
      <p class="vel-text-body-2 m-l-8">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.BOX-CHECK') }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import VelocityDropdown from '@/commons/velocity/atoms/velocityDropdown/VelocityDropdown.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import RecipientLookupComponent from '../recipientLookup/RecipientLookupComponent.vue';
import useStepTwo from '../../composables/useStepTwo';
const {
  newTransfer,
  getBankList,
  getIDTypeList,
  getProductTypeList,
  v$,
  recipientLookupModalVisible,
  toggleModal,
} = useStepTwo();
</script>
<style scoped lang="sass" src="./StepTwoComponent.sass"></style>
