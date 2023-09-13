<template>
  <div>
    <div class="container_options w-100 m-b-20">
      <div class="w-50">
        <velocity-searcher
          :maxlength="20"
          :list="getRecords"
          property="acctNickName"
          @filter-list="filterList"
          :place-holder="$t('MY-BANK-MODULE.DETAIL.TABLE.SEARCHER-PLACEHOLDER')"
          :label="$t('MY-BANK-MODULE.DETAIL.TABLE.SEARCHER-LABEL')"
        />
      </div>
      <div>
        <velocity-button
          classes-name="btn btn-primary"
          :text="$t('MY-BANK-MODULE.EXPORT-BUTTON')"
          icon="icon-icon-download"
          size="medium"
          :export="true"
          export-types="PDFPRINT"
          @export-pdf="doExportDetail('pdf')"
          :up="false"
        />
      </div>
    </div>
    <div>
      <velocity-table
        :headers="getHeaders"
        :records="filteredList"
        :button-text="$t('MY-BANK-MODULE.DETAIL.TABLE.BUTTON')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import VelocitySearcher from '@/commons/velocity/atoms/velocitySearcher/VelocitySearcher.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityTable from '@/commons/velocity/organisms/velocityTable/VelocityTable.vue';
import useDetail from '@/modules/myBank/composables/useDetail';
import useMyBankModule from '../../composables/useMyBankModule';

const { getRecords, getHeaders, filterList, filteredList } = useDetail();
const { doExportDetail } = useMyBankModule();
</script>

<style scoped lang="sass" src="./DetailComponent.sass"></style>
