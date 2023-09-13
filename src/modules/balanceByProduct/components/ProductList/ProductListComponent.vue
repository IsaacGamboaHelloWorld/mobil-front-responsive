<template>
  <velocity-modal v-if="isFetching" type="spinner" />
  <div>
    <velocity-alert
      v-if="
        PRODUCTS.fiduciary === getProductType(selectedProductType) &&
        companyName === 'bocc'
      "
      class="m-b-16"
      type="yellow"
      :has-icon="true"
      :body="$t('BALANCE-BY-PRODUCTS-MODULE.BOCC-ADVICE')"
    />
    <div class="container-main p-t-10">
      <p class="vel-text-body-1 vel-text-semibold">
        {{ $t('BALANCE-BY-PRODUCTS-MODULE.BBP-LABEL') }}
      </p>
      <div class="container-filters p-t-16">
        <velocity-dropdown
          class="w-100"
          :label="$t('BALANCE-BY-PRODUCTS-MODULE.TABLE.PRODUCT-TYPE')"
          :placeholder="$t('REUSABLES.INPUT.SELECT-ONE')"
          :list="getProductTypeList"
          v-model="selectedProductType"
        >
        </velocity-dropdown>
        <velocity-searcher
          class="w-100"
          property="name"
          :list="getRecords"
          :icon-right="true"
          :place-holder="$t('REUSABLES.INPUT.SEARCH')"
          :label="$t('REUSABLES.INPUT.PRODUCT-NAME')"
          v-model="selectedProduct"
          @filter-list="filterList"
        />
      </div>
      <velocity-alert
        v-if="!!showFiduciariaAlert"
        class="m-t-16"
        type="red"
        :has-icon="true"
        :body="errorMessage"
        :bold-text="errorCode"
      />

      <div class="p-t-24" v-show="!showFiduciariaAlert">
        <div class="vel-table container-table">
          <div class="vel-table_row vel-table_header">
            <div class="row">
              <div class="responsive-show">
                <p class="vel-text-semibold vel-text-small m-r-8">
                  {{ getHeaders[0].title }}
                </p>
                <velocity-icon
                  class="vel-text-small"
                  :is-sort-icon="true"
                  @action-order-icon="
                (order:any) => {
                  sort(getHeaders[0].property, order);
                }
              "
                />
              </div>
              <div
                class="vel-table_col responsive-hidde"
                v-for="(header, index) in getHeaders"
                :key="index"
              >
                <p class="vel-text-small vel-text-semibold">
                  {{ header.title }}
                </p>
                <velocity-icon
                  class="vel-text-small"
                  :is-sort-icon="true"
                  @action-order-icon="
                (order:any) => {
                  sort(header.property, order);
                }
              "
                />
              </div>
            </div>
          </div>
          <div>
            <div v-if="productList.length == 0">
              <p class="vel-text-body-2 color-neutral m-b-40 m-l-8 m-t-16">
                {{ $t('AUTHORIZATIONS-MODULE.STEP-LIST.EMPTY') }}
              </p>
            </div>
            <div v-else class="container-records">
              <velocity-acordion
                v-for="product in filteredList"
                class="vel-table_row"
                type="custom"
                size="normal"
                @action-acordion-button="selectProduct(product.name)"
                :key="product.name"
                :btn-text="$t('BALANCE-BY-PRODUCTS-MODULE.TABLE.BUTTON-LABEL')"
                :arrow-rigth="true"
                :hide-text-on-mobile="true"
              >
                >
                <template #head>
                  <div class="row">
                    <div class="vel-table_col">
                      <p
                        class="vel-text-small vel-text-semibold responsive-show"
                      >
                        {{ getHeaders[0].title }}
                      </p>
                      <p class="vel-text-small">{{ product.name }}</p>
                    </div>
                    <div class="vel-table_col">
                      <p
                        class="vel-text-small vel-text-semibold responsive-show"
                      >
                        {{ getHeaders[1].title }}
                      </p>
                      <p class="vel-text-small">{{ product.number }}</p>
                    </div>
                  </div>
                </template>
                <template #body>
                  <div class="vel-table_detail w-100"></div>
                </template>
              </velocity-acordion>
            </div>
          </div>
        </div>
        <velocity-paginator
          ref="paginator"
          v-if="!!productList"
          class="m-b-16 m-t-16"
          :pages="getPages"
          @get-page="(page: number) => pageIndex = page"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import VelocityDropdown from '@/commons/velocity/atoms/velocityDropdown/VelocityDropdown.vue';
import VelocitySearcher from '@/commons/velocity/atoms/velocitySearcher/VelocitySearcher.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import VelocityPaginator from '@/commons/velocity/molecules/velocityPaginator/VelocityPaginator.vue';
import useBBPList from '../../composables/useBBPList';
import PRODUCTS from '../../constants/products';
import { companyName } from '@/commons/constants/companyName';

const {
  selectedProductType,
  selectedProduct,
  getRecords,
  getProductTypeList,
  productList,
  getHeaders,
  isFetching,
  getPages,
  pageIndex,
  filteredList,
  filterList,
  sort,
  selectProduct,
  getProductType,
  showFiduciariaAlert,
  errorMessage,
  errorCode,
} = useBBPList();

const paginator = ref<any | null>(null);

watch(getProductTypeList, () => {
  paginator.value.resetAll();
});
</script>
<style scoped lang="sass" src="./ProductListComponent.sass"></style>
