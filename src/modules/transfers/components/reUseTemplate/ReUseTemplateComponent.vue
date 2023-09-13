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
  <velocity-alert
    v-if="alertIsVisible"
    class="m-b-16"
    :type="alertType"
    :body="alertBody"
    :has-icon="true"
  />
  <div>
    <div class="breadcrumb-trail m-b-32 m-t-8">
      <p class="vel-text-small vel-text-semibold">
        {{ $t('TRANSFERS-MODULE.TITLE') }}
      </p>
      <i class="icon-icon-arrow-keyboard-right row"></i>
      <p :class="`vel-text-small vel-text-semibold ${companyName}`">
        {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.BREADCRUMB.REUSE') }}
      </p>
    </div>
    <p class="vel-text-body-1 vel-text-semibold title m-t-26 m-b-16">
      {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.BREADCRUMB.REUSE') }}
    </p>
    <div>
      <component :is="componentStep"></component>
    </div>
    <div class="container-buttons m-t-16">
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
        :class="` ${
          currentSubStep === SUBSTEPS.stepThree ? '' : 'r'
        } container-buttons m-t-16`"
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
                <p class="vel-text-small vel-text-semibold">
                  {{ header.title }}
                </p>
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
                    <p class="vel-text-small">{{ transfer.txDate }}</p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small">{{ transfer.acctTypeToDesc }}</p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small">{{ transfer.recipientName }}</p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small">{{ transfer.financialEntity }}</p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small">
                      {{ addCurrencyDot(transfer.payVal?.toString()!) }}
                    </p>
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
    <p
      v-if="newTransfer.exonerateGMF && currentSubStep === SUBSTEPS.stepTwo"
      class="m-t-28"
      style="text-align: justify"
    >
      {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.DISCLAIMER') }}
    </p>
    <p class="m-t-24 vel-text-small">
      {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.DISCLAIMER-PART-1') }}
      <span class="vel-text-semibold text-colored">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.DISCLAIMER-PART-2') }}</span
      >
      {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.DISCLAIMER-PART-3') }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { companyName } from '@/commons/constants/companyName';
import SUBSTEPS from '@/modules/transfers/constants/subSteps';
import VelocityAccordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import SBLPushComponent from '@/modules/sbl/components/sblPush/SBLPushComponent.vue';
import SBLSoftTokenComponent from '@/modules/sbl/components/sblSoftToken/SBLSoftTokenComponent.vue';
import AuthModalComponent from '@/modules/auth/view/components/authModals/AuthModalComponent.vue';
import { sblOptionCodes } from '@/commons/constants/responseCodes';
import useNewTransfer from '../newTransfer/composables/useNewTransfer';
import useNewTemplate from '../newTemplate/composables/useNewTemplate';

const {
  editTransfer,
  deleteTransfer,
  addStep,
  addNewTransfer,
  successValidation,
} = useNewTransfer();

const {
  transferList,
  componentStep,
  newTransfer,
  currentSubStep,
  getDetailHeaders,
  securityModalVisible,
  sblPushModalVisible,
  sblSoftTokenModalVisible,
  passwordModalVisible,
  tokenModalVisible,
  alertIsVisible,
  alertType,
  alertBody,
  hideModal,
  addCurrencyDot,
  cancelAction,
  sort,
} = useNewTemplate();
</script>
<style scoped lang="sass" src="./ReUseTemplateComponent.sass"></style>
