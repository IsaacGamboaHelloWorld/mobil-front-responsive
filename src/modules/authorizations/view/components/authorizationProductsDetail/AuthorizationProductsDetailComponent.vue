<template>
  <div>
    <div class="card m-b-18">
      <div class="card_header">
        <p class="vel-text-body-1 vel-text-semibold">
          {{ $t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TITLE-PRODUCTS') }}
        </p>
      </div>
      <div class="card_body">
        <div
          v-for="item in getTransactionFullDetailDTO"
          :key="item.name"
          class="m-b-8"
        >
          <p class="vel-text-body-2 vel-text-semibold w-50">
            {{ item.langText }}
          </p>
          <p class="vel-text-body-2 color-neutral w-50">{{ item.value }}</p>
        </div>
      </div>
    </div>
    <div v-for="item in getAssignedProducts" :key="item.productTypeCode">
      <velocity-acordion type="custom" text-in-button>
        <template #head>
          <p class="vel-text-body-1 vel-text-semibold p-t-18 p-b-18 p-l-18">
            {{ item.productTypeName }}
          </p>
        </template>
        <template #body>
          <div class="m-t-10 w-100">
            <div class="container_permitions">
              <p class="vel-text-body-2 vel-text-semibold m-b-10">
                {{ $t('AUTHORIZATIONS-MODULE.STEP-DETAIL.PRODUCTS-CARD') }}
              </p>
              <div>
                <p
                  v-for="product in item.clientProduct"
                  :key="product.productNumber"
                  class="vel-text-body-2 color-neutral"
                >
                  {{ product.productName }} -
                  {{ product.productNumber }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </velocity-acordion>
      <hr class="separator-line w-100" />
    </div>
  </div>
</template>
<style
  scoped
  lang="sass"
  src="./AuthorizationProductsDetailComponent.sass"
></style>
<script lang="ts" setup>
import useAuthorizationsDetail from '@/modules/authorizations/composables/useAuthoriozationDetail';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
const { getAssignedProducts, getTransactionFullDetailDTO } =
  useAuthorizationsDetail();
</script>
