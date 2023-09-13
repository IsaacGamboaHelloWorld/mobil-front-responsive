<template>
  <velocity-modal v-if="isLoading" type="spinner" />

  <div class="container-myBank">
    <summary-card-component
      class="m-b-24"
      v-for="(summary, index) in mapSummaryInfo"
      :key="index"
      :summary-products="summary"
    />
    <div class="container_down w-100 m-t-18">
      <div class="container_down-button">
        <velocity-button
          classes-name="btn btn-primary"
          :text="$t('MY-BANK-MODULE.EXPORT-BUTTON')"
          icon="icon-icon-download"
          size="medium"
          :export="true"
          @export-excel="doExport('xls')"
          @export-pdf="doExport('pdf')"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass" src="./SummaryComponent.sass"></style>
<script lang="ts" setup>
import SummaryCardComponent from '../summaryCardComponent/SummaryCardComponent.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import useSummary from '../../composables/useSummary';
import useMyBankModule from '../../composables/useMyBankModule';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
const { mapSummaryInfo, isLoading } = useSummary();
const { doExport } = useMyBankModule();
</script>
