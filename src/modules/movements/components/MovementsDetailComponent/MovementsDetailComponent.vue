<template>
  <div class="m-t-10 m-l-10 m-r-10">
    <velocity-acordion
      class="acordion m-b-12"
      type="normal"
      :title="$t('MOVEMENTS-MODULE.PARAMETERS.TITLE')"
      size="big"
      btn-text="Ver mas"
    >
      <template #body>
        <div class="container_parameters w-100">
          <div class="col w-50">
            <div class="value m-b12">
              <p class="vel-text-semibold">
                {{ $t('MOVEMENTS-MODULE.PARAMETERS.TYPE') }}
              </p>
              <p class="color-neutral">{{ productType }}</p>
            </div>
            <div class="value m-b12">
              <p class="vel-text-semibold">
                {{ $t('MOVEMENTS-MODULE.PARAMETERS.NAME') }}
              </p>
              <p class="color-neutral">{{ productNameStore }}</p>
            </div>
          </div>
          <div class="col w-50">
            <div class="value m-b12">
              <p class="vel-text-semibold">
                {{ $t('MOVEMENTS-MODULE.PARAMETERS.ID') }}
              </p>
              <p class="color-neutral">{{ productId }}</p>
            </div>
            <div class="value m-b12">
              <p class="vel-text-semibold">
                {{ $t('MOVEMENTS-MODULE.PARAMETERS.PERIOD') }}
              </p>
              <p class="color-neutral">{{ period }}</p>
            </div>
          </div>
        </div>
      </template>
    </velocity-acordion>
    <div class="container_title">
      <p class="vel-text-semibold vel-text-body-1">
        {{ $t('MOVEMENTS-MODULE.TITLE') }}
      </p>
      <velocity-button
        classes-name="btn btn-primary"
        :text="$t('REUSABLES.BUTTON.EXPORT')"
        icon="icon-icon-download"
        size="medium"
        :export="true"
        @export-excel="doExport('xls')"
        @export-pdf="doExport('pdf')"
        :up="false"
      />
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
              <p class="vel-text-semibold">{{ header.title }}</p>
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
              <p class="vel-text-semibold">Ordenar por fecha</p>
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
            :key="record.numeroDocumento"
            btn-text=""
          >
            <template #head>
              <div class="row">
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-semibold">
                    {{ getHeaders[0].title }}
                  </p>
                  <p>
                    {{ record.rowIdFecha }}
                  </p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-semibold">
                    {{ getHeaders[1].title }}
                  </p>
                  <p>{{ record.transaccion }}</p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-semibold">
                    {{ getHeaders[2].title }}
                  </p>
                  <p>{{ record.numeroDocumento }}</p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-semibold">
                    {{ getHeaders[3].title }}
                  </p>
                  <p>{{ addCurrencyDot(record.debitos) }}</p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-semibold">
                    {{ getHeaders[4].title }}
                  </p>
                  <p>{{ addCurrencyDot(record.creditos) }}</p>
                </div>
              </div>
            </template>
            <template #body>
              <div class="vel-table_detail w-100">
                <row-detail-component :records="record" />
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
        class="m-t-28 m-b-28"
        :pages="totalPages"
        @get-page="changePage"
      />
    </div>
  </div>
</template>
<style scoped src="./MovementsDetailComponent.sass" lang="sass"></style>
<script setup lang="ts">
import useMovementsDetail from '@/modules/movements/composables/useMovementsDetail';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityPaginator from '@/commons/velocity/molecules/velocityPaginator/VelocityPaginator.vue';
import RowDetailComponent from '../rowDetailComponent/RowDetailComponent.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
const {
  getHeaders,
  getRecords,
  addCurrencyDot,
  sort,
  changePage,
  init,
  end,
  totalPages,
  period,
  productId,
  productNameStore,
  productType,
  doExport,
} = useMovementsDetail();
</script>
