<template>
  <velocity-modal v-if="isFetching" type="spinner" />
  <div class="container-main">
    <div class="container-head">
      <div class="product-name">
        <p class="vel-text-semibold">
          {{ getProduct.acctDesc }}
        </p>
        <p class="subtitle">{{ getProductSubTitle }}</p>
      </div>
      <div class="container-detail">
        <velocity-button
          v-if="movementsButtonEnabled"
          class="button"
          classes-name="btn btn-secundary"
          :text="$t('BALANCE-BY-PRODUCTS-MODULE.TODAY-MOVEMENTS')"
          size="medium"
        />
        <velocity-button
          class="button"
          classes-name="btn btn-primary"
          :text="$t('MY-BANK-MODULE.EXPORT-BUTTON')"
          icon="icon-icon-download"
          size="medium"
          :export="true"
          @export-excel="exportFile('xls')"
          @export-pdf="exportFile('pdf')"
          :up="false"
        />
      </div>
    </div>
    <div class="m-t-16">
      <div class="vel-table container-table">
        <div class="vel-table_row vel-table_header responsive-hidde">
          <div class="row">
            <div
              class="vel-table_col"
              v-for="(header, index) in getHeaders"
              :key="index"
            >
              <p class="vel-text-semibold vel-text-small">{{ header.title }}</p>
            </div>
          </div>
        </div>
        <div class="vel-table_row vel-table_header responsive-show">
          <div class="row">
            <p class="vel-text-semibold vel-text-small">
              {{ getHeaders[0].title }}
            </p>
          </div>
        </div>
        <template v-if="!!productList">
          <div class="container-records">
            <velocity-acordion
              v-for="product in productList"
              class="vel-table_row"
              type="custom"
              :arrow-disabled="true"
              size="normal"
              :key="product.id"
              :is-active="true"
            >
              <template #head>
                <div class="row">
                  <div class="vel-table_col">
                    <p class="responsive-show vel-text-small">
                      {{ getHeaders[0].title }}
                    </p>
                    <p class="vel-text-small">{{ product.acctNickName }}</p>
                  </div>
                  <div class="vel-table_col">
                    <p class="responsive-show vel-text-small">
                      {{ getHeaders[1].title }}
                    </p>
                    <p class="vel-text-small">{{ product.acctIDMasked }}</p>
                  </div>
                  <div class="vel-table_col">
                    <p class="responsive-show vel-text-small">
                      {{ getHeaders[2].title }}
                    </p>
                    <p class="vel-text-small">{{ columnValue }}</p>
                  </div>
                </div>
              </template>
              <template #body>
                <div class="vel-table_detail w-100">
                  <p class="vel-text-body-2 vel-text-semibold detail">
                    {{ $t('BALANCE-BY-PRODUCTS-MODULE.TABLE.PRODUCT-DETAIL') }}
                  </p>
                  <div class="container-detail w-75">
                    <div class="w-100">
                      <div
                        class="row"
                        v-for="(item, index) in getDetail[0]"
                        :key="index"
                      >
                        <p class="w-100 vel-text-small vel-text-semibold">
                          {{ item.balanceLabel }}
                        </p>
                        <p class="w-100 vel-text-small">{{ item.amt }}</p>
                      </div>
                    </div>
                    <div class="w-100">
                      <div
                        class="row"
                        v-for="(item, index) in getDetail[1]"
                        :key="index"
                      >
                        <p class="w-100 vel-text-small vel-text-semibold">
                          {{ item.balanceLabel }}
                        </p>
                        <p class="w-100 vel-text-small">{{ item.amt }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </velocity-acordion>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import useBBPDetail from './../../composables/useBBPDetail';

const {
  getProduct,
  getProductSubTitle,
  getHeaders,
  productList,
  columnValue,
  getDetail,
  isFetching,
  movementsButtonEnabled,
  exportFile,
} = useBBPDetail();
</script>
<style scoped lang="sass" src="./ProductDetailComponent.sass"></style>
