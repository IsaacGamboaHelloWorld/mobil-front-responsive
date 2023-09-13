<template>
  <velocity-modal
    v-if="isLoading || isLoadingDetail || isLoadingSheduleTransfers"
    type="spinner"
  />
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
              :show-filters="false"
            />
          </div>
          <div>
            <velocity-input
              id="input-range-values"
              v-model="targetUser"
              :place-holder="
                $t('TRANSFERS-MODULE.SCHEDULE-TRANFERS.FILTER-PLACEHOLDER')
              "
              :label="$t('TRANSFERS-MODULE.SCHEDULE-TRANFERS.FILTER')"
              size="small"
              icon="icon-icon-search"
            />
          </div>
        </div>
      </template>
    </velocity-acordion>
  </div>

  <div class="m-t-16">
    <div class="vel-table">
      <div class="vel-table_row vel-table_header">
        <div class="row">
          <div
            class="vel-table_col responsive-hidde"
            v-for="(header, index) in getHeaders"
            :key="index"
          >
            <p class="vel-text-semibold vel-text-small">{{ header.title }}</p>
          </div>

          <div class="vel-table_col responsive-show">
            <p class="vel-text-semibold vel-text-small">
              {{ getHeaders[0].title }}
            </p>
            <i class="icon-icon-arrow-down color-neutral"></i>
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
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[0].title }}
                </p>
                <p>{{ record.txDate }}</p>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[1].title }}
                </p>
                <p>
                  {{ record.acctIdTo }}
                </p>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[2].title }}
                </p>

                <div>
                  <p>
                    {{ record.recipientName }}
                  </p>
                </div>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[3].title }}
                </p>
                <p>{{ record.financialEntity }}</p>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[4].title }}
                </p>
                <p>
                  {{
                    !!record.payVal
                      ? addCurrencyDot(record.payVal!.toString())
                      : $t('REUSABLES.NA')
                  }}
                </p>
              </div>
            </div>
          </template>
          <template #body>
            <div class="vel-table_detail w-100" v-if="!!record.detail">
              <row-detail-component :record="record.detail" />
            </div>
          </template>
        </velocity-acordion>
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
<style lang="sass" scoped src="./ScheduledTransfersComponent.sass"></style>
<script lang="ts" setup>
import { ref, watch } from 'vue';

import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import VelocityCalendar from '@/commons/velocity/molecules/velocityCalendar/VelocityCalendar.vue';
import VelocityPaginator from '@/commons/velocity/molecules/velocityPaginator/VelocityPaginator.vue';
import RowDetailComponent from '../rowDetailComponent/RowDetailComponent.vue';
import useSheduleTransfers from '../../composables/useScheduleTransfers';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
const {
  getRecords,
  getHeaders,
  searchDetail,
  addCurrencyDot,
  totalPages,
  changePage,
  startDate,
  endDate,
  init,
  end,
  targetUser,
  isLoading,
  isLoadingDetail,
  isLoadingSheduleTransfers,
} = useSheduleTransfers();
const paginator = ref<any | null>(null);

watch(targetUser, () => {
  changePage(1);
  paginator.value.resetAll();
});

watch(startDate, () => {
  changePage(1);
  paginator.value.resetAll();
});
</script>
