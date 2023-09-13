<template>
  <VelocityModal v-if="securityModalVisible" type="custom">
    <template #component>
      <div class="container-modal">
        <SBLPushComponent
          v-if="sblPushModalVisible"
          @success-s-b-l="successValidation()"
          @close-action="hideModal()"
          @action-button-send-code="
            (sblPushModalVisible = false), (sblSoftTokenModalVisible = true)
          "
          :option-code="sblOptionCodes.authorizations"
          :is-modal="true"
        />
        <SBLSoftTokenComponent
          v-if="sblSoftTokenModalVisible"
          @success-s-b-l="successValidation()"
          @close-action="hideModal()"
          :is-modal="true"
        />
        <AuthModalComponent
          v-if="passwordModalVisible"
          type="password"
          @get-credential="successValidation"
          @close-action="hideModal()"
        />
        <AuthModalComponent
          v-if="tokenModalVisible"
          type="token"
          @get-credential="successValidation"
          @close-action="hideModal()"
        />
      </div>
    </template>
  </VelocityModal>
  <div class="m-b-32 container-img">
    <img :src="`${staticsPath}/${companyName}/logo.svg`" alt="Banco Popular" />
  </div>
  <velocity-alert
    v-if="alertIsVisible"
    class="m-b-16 alert"
    :type="alertType"
    :alt-icon="alertIcon"
    :bold-text="alertBoldText"
    :body="alertBody"
    :has-icon="true"
  />
  <div class="step-bar w-100">
    <div
      :class="`step-bar-icon-container selected-${
        currentSubStep === SUBSTEPS.stepOne ? companyName : ''
      }`"
    >
      <i
        v-if="hasStepIcon(SUBSTEPS.stepOne)"
        class="icon icon-icon-check"
        :class="isFinalStep ? `icon-colored-${companyName}` : 'icon-gray'"
      ></i>
      <p v-else>1</p>
    </div>
    <hr class="step-bar-line" />
    <div
      :class="`step-bar-icon-container selected-${
        currentSubStep === SUBSTEPS.stepTwo ? companyName : ''
      }`"
    >
      <i
        v-if="hasStepIcon(SUBSTEPS.stepTwo)"
        class="icon icon-icon-check"
        :class="isFinalStep ? `icon-colored-${companyName}` : 'icon-gray'"
      ></i>
      <p v-else>2</p>
    </div>
    <hr class="step-bar-line" />
    <div
      :class="`step-bar-icon-container selected-${
        currentSubStep === SUBSTEPS.stepThree ? companyName : ''
      }`"
    >
      <i
        v-if="hasStepIcon(SUBSTEPS.stepThree)"
        class="icon icon-icon-check"
        :class="isFinalStep ? `icon-colored-${companyName}` : 'icon-gray'"
      ></i>
      <p v-else>3</p>
    </div>
  </div>
  <p class="vel-text-body-1 vel-text-semibold title">
    {{
      isFinalStep
        ? $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.TITLE-2')
        : $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.TITLE-1')
    }}
  </p>
  <div>
    <component :is="componentStep"></component>
  </div>
  <div v-if="isFinalStep" class="container-buttons m-t-16">
    <velocity-button
      type="button"
      size="medium"
      :export="true"
      @export-excel="exportFile('xls')"
      @export-pdf="exportFile('pdf')"
      classes-name="btn btn-secundary"
      icon="icon icon-icon-download"
      :text="$t('REUSABLES.BUTTON.EXPORT')"
    >
    </velocity-button>
    <velocity-button
      type="button"
      size="medium"
      @action-button="cancelAction()"
      classes-name="btn btn-primary m-a"
      :text="$t('REUSABLES.BUTTON.CLOSE')"
    >
    </velocity-button>
  </div>
  <div v-else class="container-buttons m-t-16">
    <velocity-button
      type="button"
      size="medium"
      v-show="currentSubStep === SUBSTEPS.stepThree"
      classes-name="btn btn-secundary"
      icon="icon icon-icon-more"
      @action-button="addNewTransfer"
      :text="
        $t(
          'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.ADD-TRANSACTION-BUTTON',
        )
      "
    ></velocity-button>

    <div
      :class="`${
        currentSubStep === SUBSTEPS.stepThree ? '' : 'r'
      } container-buttons last-buttons`"
    >
      <velocity-button
        type="button"
        size="medium"
        @action-button="cancelAction()"
        classes-name="text text-primary"
        :text="$t('REUSABLES.BUTTON.CANCEL')"
      >
      </velocity-button>
      <velocity-button
        type="button"
        size="medium"
        @action-button="addStep()"
        classes-name="btn btn-primary m-a"
        :disabled="buttonDisabled"
        :text="$t('REUSABLES.BUTTON.CONTINUE')"
      >
      </velocity-button>
    </div>
  </div>
  <velocity-accordion
    v-if="transferList.length >= 1 && currentSubStep === SUBSTEPS.stepOne"
    class="container-accordion m-t-16"
    :title="$t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-ONE.TRANSFER-LIST')"
    :btn-text="$t('REUSABLES.BUTTON.SEE-MORE')"
    type="normal"
    size="normal"
  >
    <template #body>
      <div class="vel-table w-100">
        <div class="vel-table_row vel-table_header">
          <div class="row">
            <div
              class="vel-table_col"
              v-for="(header, index) in getDetailHeaders"
              :key="index"
            >
              <p class="vel-text-semibold">{{ header.title }}</p>
              <velocity-icon
                :is-sort-icon="true"
                @action-order-icon="
                (order:any) => {
                  sort(header.property, order);
                }
              "
              />
            </div>
            <div v-if="transferList.length >= 1" class="vel-table_col"></div>
          </div>
        </div>
        <template v-if="!!transferList">
          <velocity-accordion
            v-for="transfer in transferList"
            class="vel-table_row"
            type="custom"
            size="normal"
            :arrow-disabled="true"
            :key="transfer.id"
          >
            <template #head>
              <div class="row">
                <div class="vel-table_col">
                  {{ transfer.txDate }}
                </div>
                <div class="vel-table_col">
                  {{ transfer.acctTypeToDesc }}
                </div>
                <div class="vel-table_col">
                  {{ transfer.recipientName }}
                </div>
                <div class="vel-table_col">
                  {{ transfer.financialEntity }}
                </div>
                <div class="vel-table_col">
                  {{ addCurrencyDot(transfer.payVal?.toString()!) }}
                </div>
                <div
                  v-if="transferList.length >= 1"
                  class="vel-table_col container-icons"
                >
                  <i
                    @click="editTransfer(transfer)"
                    :class="`icon-table icon-table-${companyName} icon-icon-edit`"
                  ></i>
                  <i
                    @click="deleteTransfer(transfer)"
                    :class="`icon-table icon-table-${companyName} icon-icon-delete m-l-26`"
                  ></i>
                </div>
              </div>
            </template>
          </velocity-accordion>
        </template>
        <div v-else>
          <p class="vel-text-body-2 color-neutral m-b-40 m-l-8 m-t-16">
            {{ $t('AUTHORIZATIONS-MODULE.STEP-LIST.EMPTY') }}
          </p>
        </div>
      </div>
    </template>
  </velocity-accordion>
  <div v-if="isFinalStep" class="container-advice m-t-16 vel-text-small">
    {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.ADVICE-LABEL') }}
  </div>
  <p
    v-if="newTransfer.exonerateGMF && currentSubStep === SUBSTEPS.stepTwo"
    class="m-t-28"
    style="text-align: justify"
  >
    {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.DISCLAIMER') }}
  </p>
  <div :class="isFinalStep ? 'm-t-16' : 'm-t-24'">
    <p>
      {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.DISCLAIMER-PART-1') }}
      <span class="vel-text-semibold text-colored">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.DISCLAIMER-PART-2') }}</span
      >
      {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.DISCLAIMER-PART-3') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import useNewTransfer from '../composables/useNewTransfer';
import SUBSTEPS from '../../../constants/subSteps';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import SBLPushComponent from '@/modules/sbl/components/sblPush/SBLPushComponent.vue';
import SBLSoftTokenComponent from '@/modules/sbl/components/sblSoftToken/SBLSoftTokenComponent.vue';
import AuthModalComponent from '@/modules/auth/view/components/authModals/AuthModalComponent.vue';
import VelocityAccordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import { sblOptionCodes } from '@/commons/constants/responseCodes';
import { companyName } from '@/commons/constants/companyName';
import { staticsPath } from '@/commons/constants/staticsPath';
const {
  componentStep,
  hasStepIcon,
  addStep,
  isFinalStep,
  buttonDisabled,
  cancelAction,
  currentSubStep,
  newTransfer,
  securityModalVisible,
  sblPushModalVisible,
  sblSoftTokenModalVisible,
  passwordModalVisible,
  tokenModalVisible,
  hideModal,
  successValidation,
  transferList,
  addNewTransfer,
  addCurrencyDot,
  getDetailHeaders,
  sort,
  deleteTransfer,
  editTransfer,
  exportFile,
  alertIsVisible,
  alertType,
  alertIcon,
  alertBoldText,
  alertBody,
} = useNewTransfer();
</script>

<style scoped lang="sass" src="./NewTransferComponent.sass"></style>
