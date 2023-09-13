<template>
  <velocity-modal v-if="isLoading" type="spinner" />

  <VelocityModal
    v-if="securityModalVisible"
    type="custom"
    id="Confirmacion de autorizacion"
  >
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
        <auth-modal-component
          v-if="passwordModalVisible"
          type="password"
          @get-credential="successValidation"
          @close-action="hideModal()"
        />
        <auth-modal-component
          v-if="tokenModalVisible"
          :eye-icon-is-hidden="true"
          type="token"
          @get-credential="successValidation"
          @close-action="hideModal()"
        />
        <reject-component
          v-if="modalRejectVisible"
          @close-action="hideModal()"
          @get-desc="
            (rejectDescription) => {
              listToReject.rejectionMotive = rejectDescription;
              rejectMotive = rejectDescription;
              navigateToConfirmationMode();
            }
          "
        />
      </div>
    </template>
  </VelocityModal>

  <div class="container_filters">
    <velocity-acordion
      :title="$t('AUTHORIZATIONS-MODULE.FILTERS.TITLE')"
      type="normal"
      size="big"
    >
      <template #body>
        <div class="filters w-100">
          <div class="m-r-16">
            <velocity-calendar
              @get-date="(date:any) => ((startDate = date[0]), (endDate = date[1]))"
              :label="$t('AUTHORIZATIONS-MODULE.FILTERS.CALENDAR-LABEL')"
              :start-date="getMin"
              :end-date="getMax"
              :show-filters="false"
            />
          </div>
          <div>
            <velocity-dropdown
              :list="getListTypes"
              v-model="typeAuthorization"
              :label="$t('AUTHORIZATIONS-MODULE.FILTERS.TYPE-LABEL')"
              :placeholder="
                $t('AUTHORIZATIONS-MODULE.FILTERS.TYPE-PLACEHOLDER')
              "
            />
          </div>
        </div>
      </template>
    </velocity-acordion>
  </div>

  <div
    v-if="(!!errorCode || !!errorMessage) && !alertIsClosed"
    class="m-b-22 m-t-22"
  >
    <velocity-alert
      type="red"
      :hasIcon="true"
      :boldText="'Error ' + errorCode + '. '"
      :body="errorMessage"
      :is-closable="true"
      @action-icon="alertIsClosed = true"
    />
  </div>

  <div class="m-t-16">
    <div class="vel-table">
      <div class="vel-table_row vel-table_header">
        <div class="row">
          <div class="vel-table_col check">
            <velocity-check-box @action-check="activateAll" :line="true" />
          </div>
          <div
            class="vel-table_col responsive-hidde"
            v-for="(header, index) in getHeaders"
            :key="index"
          >
            <div>
              <p class="vel-text-semibold vel-text-small">{{ header.title }}</p>
              <p class="color-neutral vel-text-small header-subtitle">
                {{ header.subtitle }}
              </p>
            </div>
            <velocity-icon
              :is-sort-icon="true"
              @action-order-icon="
                (order) => {
                  sort(header.property, order);
                }
              "
            />
          </div>

          <div class="vel-table_col responsive-show">
            <p class="vel-text-semibold vel-text-small">
              {{ getHeaders[0].title }}
            </p>
            <velocity-icon
              :is-sort-icon="true"
              @action-order-icon="
                (order) => {
                  sort(getHeaders[0].property, order);
                }
              "
            />
          </div>
        </div>
      </div>
      <template v-if="!!getRecords && getRecords.length > 0">
        <velocity-acordion
          class="vel-table_row"
          type="custom"
          size="big"
          v-for="record in getRecords.slice(init, end)"
          :key="record.id"
          btn-text=""
          :is-for-table="true"
          @action-acordion-button="($event)=>{searchDetail(record.id!)} "
        >
          <template #head>
            <div class="row">
              <div class="vel-table_col check">
                <velocity-check-box
                  :is-active="record.isActive"
                  @action-check="(isActive:any) => activateThis(isActive, record.id!)"
                />
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[0].title }}
                </p>
                <p>{{ record.date }}</p>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[1].title }}
                </p>
                <p>
                  {{
                    !!record.authorizationsType
                      ? getType(record.authorizationsType!)
                      : $t('REUSABLES.NA')
                  }}
                </p>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[2].title }}
                </p>

                <div>
                  <p>
                    {{ record.service }}
                  </p>
                  <p class="color-neutral vel-text-small">
                    {{ record.action }}
                  </p>
                </div>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[3].title }}
                </p>
                <p>{{ record.creator }}</p>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[4].title }}
                </p>
                <p>
                  {{
                    !!record.transactionAmount &&
                    record.transactionAmount !== 'N/A'
                      ? addCurrencyDot(record.transactionAmount!)
                      : $t('REUSABLES.NA')
                  }}
                </p>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[5].title }}
                </p>
                <p>
                  {{
                    !!record.paymentReference &&
                    record.paymentReference !== 'N/A'
                      ? record.paymentReference
                      : $t('REUSABLES.NA')
                  }}
                </p>
              </div>
            </div>
          </template>
          <template #body>
            <div
              class="vel-table_detail w-100"
              v-if="hasPermitions(authorizationsPermitionsCodes.query, permitions!)"
            >
              <row-detail-component
                :records="record.detail?.icbsRoleGroupDetailDTO[0].roleQuantity"
                @action-button="setDetail(record.id!)"
              />
            </div>
          </template>
        </velocity-acordion>
        <div class="vel-table_row">
          <div class="container-buttons">
            <velocity-button
              v-if="
                hasPermitions(authorizationsPermitionsCodes.reject, permitions!)
              "
              class="m-t-16 m-b-16"
              classesName="btn btn-secundary"
              :text="$t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.BTN-B')"
              :disabled="buttonDisabled"
              size="large"
              type="button"
              @action-button="reject()"
            />
            <velocity-button
              v-if="
                hasPermitions(authorizationsPermitionsCodes.authorize, permitions!)
              "
              class="m-t-16 m-b-16"
              classesName="btn btn-primary "
              :text="$t('AUTHORIZATIONS-MODULE.STEP-LIST.TABLE.BTN-A')"
              :disabled="buttonDisabled"
              size="large"
              type="button"
              @action-button="authorize()"
            />
          </div>
        </div>
      </template>
      <div v-else>
        <p class="vel-text-body-2 color-neutral m-b-40 m-l-8 m-t-16">
          {{ $t('AUTHORIZATIONS-MODULE.STEP-LIST.EMPTY') }}
        </p>
      </div>
    </div>

    <velocity-paginator
      ref="paginator"
      class="m-t-28 m-b-28"
      :pages="totalPages"
      @get-page="changePage"
    />
  </div>
</template>
<style scoped lang="sass" src="./AuthorizationListComponent.sass"></style>
<script lang="ts" setup>
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityDropdown from '@/commons/velocity/atoms/velocityDropdown/VelocityDropdown.vue';
import VelocityCalendar from '@/commons/velocity/molecules/velocityCalendar/VelocityCalendar.vue';
import useAuthorizationsList from '@/modules/authorizations/composables/useAuthorizationsList';
import RowDetailComponent from '../rowDetailComponent/RowDetailComponent.vue';
import VelocityCheckBox from '@/commons/velocity/atoms/velocityCheckBox/VelocityCheckBox.vue';
import VelocityPaginator from '@/commons/velocity/molecules/velocityPaginator/VelocityPaginator.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import SBLPushComponent from '@/modules/sbl/components/sblPush/SBLPushComponent.vue';
import SBLSoftTokenComponent from '@/modules/sbl/components/sblSoftToken/SBLSoftTokenComponent.vue';
import AuthModalComponent from '@/modules/auth/view/components/authModals/AuthModalComponent.vue';
import { sblOptionCodes } from '@/commons/constants/responseCodes';
import RejectComponent from '../rejectComponent/RejectComponent.vue';
import { ref, watch } from 'vue';
import authorizationsPermitionsCodes from '@/modules/authorizations/constants/permitions';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';

const {
  typeAuthorization,
  getHeaders,
  getRecords,
  getListTypes,
  startDate,
  endDate,
  searchDetail,
  activateAll,
  activateThis,
  sort,
  changePage,
  init,
  end,
  totalPages,
  addCurrencyDot,
  getMin,
  getMax,
  setDetail,
  securityModalVisible,
  sblPushModalVisible,
  sblSoftTokenModalVisible,
  passwordModalVisible,
  tokenModalVisible,
  successValidation,
  hideModal,
  authorize,
  getType,
  buttonDisabled,
  reject,
  modalRejectVisible,
  listToReject,
  navigateToConfirmationMode,
  permitions,
  hasPermitions,
  isLoading,
  errorCode,
  errorMessage,
  alertIsClosed,
  rejectMotive,
} = useAuthorizationsList();

const paginator = ref<any | null>(null);

watch(typeAuthorization, () => {
  paginator.value.resetAll();
});
</script>
