<template>
  <velocity-modal v-if="isFetching || isLoadingParameters" type="spinner" />
  <div class="container-main">
    <velocity-alert
      v-if="!!codeMessage || !!message"
      type="red"
      is-closable
      :bold-text="codeMessage"
      :body="message"
      class="m-t-20 m-l-20 m-r-20"
      has-icon
      @action-icon="
        codeMessage = '';
        message = '';
      "
    />
    <velocity-alert
      v-if="isActiveALertFile"
      type="green"
      is-closable
      :body="$t('MOVEMENTS-MODULE.SEARCH.FILE-SUCCES')"
      class="m-t-20 m-l-20 m-r-20"
      has-icon
      @action-icon="isActiveALertFile = false"
    />
    <velocity-alert
      type="yellow"
      :body="getFileAlertText"
      v-if="!!getFileAlertText"
      class="m-t-20 m-l-20 m-r-20"
    />
    <div class="container-label">
      <p class="vel-text-body-1 vel-text-semibold">
        {{ $t('MOVEMENTS-MODULE.SEARCH.COMPONENT-LABEL') }}
      </p>
    </div>
    <div class="container-selectors">
      <div>
        <velocity-dropdown
          v-model="productTypeSelected"
          :list="productTypeList"
          :label="$t('MOVEMENTS-MODULE.SEARCH.TYPE-LABEL')"
        />
      </div>
      <div>
        <velocity-dropdown
          v-model="productName"
          :list="!!showAllList ? productNameList : mapProductNameList"
          :is-writable="true"
          :label="$t('MOVEMENTS-MODULE.SEARCH.NAME-LABEL')"
          :placeholder="$t('MOVEMENTS-MODULE.SEARCH.PRODUCT-DROPDOWN-LABEL')"
        />
        <div v-show="!!productName" class="container-product">
          <p class="vel-text-small product">
            No. {{ !!getProductMaskedId ? getProductMaskedId : '' }}
          </p>
        </div>
      </div>
      <div>
        <!-- Validar si debe usarse endDate o today -->
        <velocity-calendar
          :selectText="$t('MOVEMENTS-MODULE.SEARCH.CALENDAR-SELECT')"
          :cancelText="$t('MOVEMENTS-MODULE.SEARCH.CALENDAR-CANCEL')"
          :period="getPeriod"
          :endDate="getToday"
          :startDate="getStartDate"
          :isDisabled="v$.acctType.$invalid || v$.accountID.$invalid"
          :label="$t('MOVEMENTS-MODULE.SEARCH.CALENDAR-LABEL')"
          @get-date="
            (date) => ((formData.startDt = date[0]), (formData.endDt = date[1]))
          "
        />
      </div>
    </div>
  </div>

  <div class="container-main m-t-16">
    <velocity-acordion
      type="normal"
      :title="$t('MOVEMENTS-MODULE.SEARCH.OTHER-PARAMETERS')"
    >
      <template #body>
        <div class="container-selectors w-100">
          <div class="container-dropdown">
            <velocity-dropdown
              v-model="valueTypeSelected"
              :list="productValueTypeList"
              :label="$t('MOVEMENTS-MODULE.SEARCH.VALUE')"
              :placeholder="$t('MOVEMENTS-MODULE.SEARCH.VALUE-PLACEHOLDER')"
            />
          </div>
          <div class="container-dropdown">
            <velocity-input
              id="input-range-values"
              v-model="valueForRange"
              :place-holder="$t('MOVEMENTS-MODULE.SEARCH.RANGE-PLACEHOLDER')"
              :label="$t('MOVEMENTS-MODULE.SEARCH.RANGE')"
              @click="showRangeComponent = true"
              :readonly="true"
              size="small"
            />
          </div>
        </div>
      </template>
    </velocity-acordion>
  </div>
  <div class="container-buttons m-t-24">
    <velocity-button
      icon="icon-icon-document
      "
      classesName="btn btn-secundary m-r-16"
      :text="$t('REUSABLES.BUTTON.FILE')"
      size="medium"
      type="button"
      @action-button="requestFileAction"
      :disabled="v$.$invalid || isInvalidRequestFileButton"
    />
    <velocity-button
      icon="
      icon-icon-search
      "
      classesName="btn btn-primary"
      :text="$t('REUSABLES.BUTTON.SEARCH')"
      size="medium"
      type="button"
      @action-button="sendForm"
      :disabled="v$.$invalid"
    />
  </div>

  <range-component
    v-if="showRangeComponent"
    :placeHolderStartValue="
      $t('MOVEMENTS-MODULE.SEARCH.START-VALUE-PLACEHOLDER')
    "
    :placeHolderEndtValue="$t('MOVEMENTS-MODULE.SEARCH.END-VALUE-PLACEHOLDER')"
    :labelStartValue="$t('MOVEMENTS-MODULE.SEARCH.START-VALUE')"
    :labelEndValue="$t('MOVEMENTS-MODULE.SEARCH.END-VALUE')"
    @close-modal="showRangeComponent = false"
    @range="
      (startValue, endValue) => {
        formData.lowCurAmt = separarUltimosDosCaracteres(startValue);
        formData.highCurAmt = separarUltimosDosCaracteres(endValue);
        showRangeComponent = false;
        valueForRange =
          addCurrencyDot(formData.lowCurAmt) +
          ' - ' +
          addCurrencyDot(formData.highCurAmt);
      }
    "
  />
</template>
<script setup lang="ts">
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityDropdown from '@/commons/velocity/atoms/velocityDropdown/VelocityDropdown.vue';
import { useSearch } from '../../composables/useSearch';
import VelocityCalendar from '@/commons/velocity/molecules/velocityCalendar/VelocityCalendar.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import RangeComponent from '../rangeComponent/RangeComponent.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import useFormattHelper from '@/commons/helpers/formatMoney';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
const {
  showRangeComponent,
  productNameList,
  productName,
  productTypeSelected,
  productTypeList,
  getProductMaskedId,
  mapProductNameList,
  formData,
  v$,
  getPeriod,
  getToday,
  getStartDate,
  sendForm,
  showAllList,
  valueForRange,
  productValueTypeList,
  valueTypeSelected,
  requestFileAction,
  getFileAlertText,
  isInvalidRequestFileButton,
  isFetching,
  isLoadingParameters,
  isActiveALertFile,
  codeMessage,
  message,
} = useSearch();

const { addCurrencyDot, separarUltimosDosCaracteres } = useFormattHelper();
</script>
<style scoped lang="sass" src="./SearchComponent.sass"></style>
