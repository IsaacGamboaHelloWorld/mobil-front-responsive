<template>
  <div>
    <VelocityModal
      type="custom"
      v-if="confirmValueModalVisible || confirmDateModalVisible"
    >
      <template #component>
        <VelocityConfirmationModal
          v-if="confirmValueModalVisible"
          type="warning"
          :title="$t('TRANSFERS-MODULE.STEP-TEMPLATES.BUTTON.CHANGE-VALUE')"
          :button-label="$t('REUSABLES.BUTTON.CONTINUE')"
          @action-button-confirm="
            {
              (confirmValueModalVisible = false),
                (valueChangeModalVisible = true);
            }
          "
          @action-button-cancel="confirmValueModalVisible = false"
        />
        <VelocityConfirmationModal
          v-if="confirmDateModalVisible"
          type="warning"
          :title="$t('TRANSFERS-MODULE.STEP-TEMPLATES.BUTTON.CHANGE-DATE')"
          :body="$t('TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.CHANGE-DATE')"
          :button-label="$t('REUSABLES.BUTTON.CONTINUE')"
          @action-button-confirm="
            {
              (confirmDateModalVisible = false), (calendarModalVisible = true);
            }
          "
          @action-button-cancel="confirmDateModalVisible = false"
        />
      </template>
    </VelocityModal>
    <VelocityModal
      type="custom"
      v-if="valueChangeModalVisible || calendarModalVisible"
    >
      <template #component>
        <velocity-calendar
          v-if="calendarModalVisible"
          @get-date="(date: string[]) => changeDate(date[0])"
          label="Fecha"
          :show-filters="false"
          :simple-calendar="true"
          :is-multi-calendars="false"
          :is-range="false"
        />
        <div class="container-modal" v-if="valueChangeModalVisible">
          <p class="m-t-40 m-b-22 vel-text-body-1 vel-text-semibold">
            {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.CHANGE-VALUE') }}
          </p>
          <velocity-input
            id="name"
            class="input w-100"
            size="small"
            :only-numbers="true"
            :with-value-format="true"
            placeHolder="$0.00"
            v-model="newValue"
          />
          <velocity-button
            classesName="btn btn-primary m-t-8 m-a"
            @click="changeValues(newValue)"
            :disabled="!!newValue ? false : true"
            size="medium"
            type="button"
            :text="$t('REUSABLES.BUTTON.SAVE')"
          />
          <velocity-button
            classesName="text text-primary m-t-8 m-a m-b-8"
            @click="valueChangeModalVisible = false"
            size="medium"
            type="button"
            :text="$t('REUSABLES.BUTTON.CANCEL')"
          />
        </div>
      </template>
    </VelocityModal>
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
    <VelocityModal v-if="templateNameModalIsVisible" type="custom">
      <template #component>
        <div class="container-modal">
          <p class="m-t-40 m-b-22 vel-text-body-1 vel-text-semibold">
            {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.INPUT-NAME') }}
          </p>
          <velocity-input
            id="name"
            class="input w-100"
            size="small"
            :placeHolder="
              $t('TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.NAME-PLACEHOLDER')
            "
            v-model="templateName"
          />
          <velocity-button
            classesName="btn btn-secundary m-t-8 m-a"
            @click="addStep()"
            :disabled="!!templateName ? false : true"
            size="medium"
            type="button"
            :text="$t('REUSABLES.BUTTON.SAVE')"
          />
          <velocity-button
            classesName="text text-primary m-t-8 m-a m-b-8"
            @click="templateNameModalIsVisible = false"
            size="medium"
            type="button"
            :text="$t('REUSABLES.BUTTON.CANCEL')"
          />
        </div>
      </template>
    </VelocityModal>
    <velocity-alert
      v-if="alertIsVisible"
      class="m-b-16"
      :type="alertType"
      :alt-icon="alertIcon"
      :bold-text="alertBoldText"
      :body="alertBody"
      :has-icon="true"
    />
    <div class="breadcrumb-trail m-b-32 m-t-8">
      <p class="vel-text-small vel-text-semibold">
        {{ $t('TRANSFERS-MODULE.TITLE') }}
      </p>
      <i class="icon-icon-arrow-keyboard-right row"></i>
      <p :class="`vel-text-small vel-text-semibold ${companyName}`">
        {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.BREADCRUMB.DUPLICATE') }}
      </p>
    </div>
    <div class="m-b-18">
      <p
        v-if="currentSubStep === SUBSTEPS.stepThree"
        class="vel-text-body-1 vel-text-semibold"
      >
        {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.BREADCRUMB.DUPLICATE') }}
      </p>
    </div>

    <div
      class="step-bar w-100 m-b-26"
      v-if="currentSubStep != SUBSTEPS.stepThree"
    >
      <div
        :class="`step-bar-icon-container selected-${
          currentSubStep === SUBSTEPS.stepOne ? companyName : ''
        }`"
      >
        <i
          v-if="hasStepIcon(SUBSTEPS.stepOne)"
          class="icon icon-icon-check icon-gray"
        ></i>
        <p class="icon-text" v-else>1</p>
      </div>
      <hr class="step-bar-line" />
      <div
        :class="`step-bar-icon-container selected-${
          currentSubStep === SUBSTEPS.stepTwo ? companyName : ''
        }`"
      >
        <i
          v-if="hasStepIcon(SUBSTEPS.stepTwo)"
          class="icon icon-icon-check icon-gray"
        ></i>
        <p class="icon-text" v-else>2</p>
      </div>
    </div>
    <div
      class="container-options m-b-16"
      v-if="currentSubStep === SUBSTEPS.stepThree"
    >
      <velocity-button
        type="button"
        size="medium"
        classes-name="btn btn-secundary"
        icon="icon icon-icon-money-coin"
        @action-button="confirmValueModalVisible = true"
        :text="$t('TRANSFERS-MODULE.STEP-TEMPLATES.BUTTON.CHANGE-VALUE')"
      ></velocity-button>
      <velocity-button
        type="button"
        size="medium"
        classes-name="btn btn-secundary"
        icon="icon icon-icon-calendar"
        @action-button="confirmDateModalVisible = true"
        :text="$t('TRANSFERS-MODULE.STEP-TEMPLATES.BUTTON.CHANGE-DATE')"
      ></velocity-button>
    </div>
    <div>
      <component :is="componentStep"></component>
    </div>
    <div class="container-buttons m-t-16">
      <velocity-button
        v-if="!templateCreated"
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
        :class="`${!!templateCreated ? 'r' : 'container-buttons'} ${
          currentSubStep === SUBSTEPS.stepThree ? '' : 'r'
        } m-t-16`"
      >
        <velocity-button
          v-if="!templateCreated"
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
          :text="
            templateCreated
              ? $t('REUSABLES.BUTTON.CLOSE')
              : currentSubStep == SUBSTEPS.stepThree
              ? $t('TRANSFERS-MODULE.STEP-TEMPLATES.BUTTON.SAVE-NEW')
              : $t('REUSABLES.BUTTON.CONTINUE')
          "
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
import SUBSTEPS from '../../constants/subSteps';
import { sblOptionCodes } from '@/commons/constants/responseCodes';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import SBLPushComponent from '@/modules/sbl/components/sblPush/SBLPushComponent.vue';
import SBLSoftTokenComponent from '@/modules/sbl/components/sblSoftToken/SBLSoftTokenComponent.vue';
import AuthModalComponent from '@/modules/auth/view/components/authModals/AuthModalComponent.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import useNewTemplate from '../newTemplate/composables/useNewTemplate';
import VelocityAccordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import useNewTransfer from '../newTransfer/composables/useNewTransfer';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import VelocityConfirmationModal from '@/commons/velocity/molecules/velocityConfirmationModal/VelocityConfirmationModal.vue';
import VelocityCalendar from '@/commons/velocity/molecules/velocityCalendar/VelocityCalendar.vue';

const { editTransfer, deleteTransfer, addNewTransfer } = useNewTransfer();

const {
  templateCreated,
  currentSubStep,
  templateName,
  componentStep,
  transferList,
  getDetailHeaders,
  securityModalVisible,
  sblPushModalVisible,
  sblSoftTokenModalVisible,
  passwordModalVisible,
  tokenModalVisible,
  alertIsVisible,
  alertType,
  alertIcon,
  alertBoldText,
  alertBody,
  templateNameModalIsVisible,
  confirmValueModalVisible,
  valueChangeModalVisible,
  confirmDateModalVisible,
  calendarModalVisible,
  newValue,
  changeDate,
  changeValues,
  addStep,
  successValidation,
  hideModal,
  addCurrencyDot,
  cancelAction,
  hasStepIcon,
  sort,
} = useNewTemplate();
</script>
<style scoped lang="sass" src="./DuplicateTemplateComponent.sass"></style>
