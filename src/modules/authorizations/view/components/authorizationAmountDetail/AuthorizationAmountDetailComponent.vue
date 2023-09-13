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
    <div v-for="(item, index) in getUserLimitAmountDTO?.services" :key="index">
      <velocity-acordion type="custom" text-in-button>
        <template #head>
          <p class="vel-text-body-1 vel-text-semibold p-t-18 p-b-18 p-l-18">
            {{ item.serviceName }}
          </p></template
        >
        <template #body>
          <div class="container_table w-100">
            <div class="vel-table">
              <div class="vel-table_row vel-table_header">
                <div class="row">
                  <div
                    class="vel-table_col"
                    v-for="header in getHeaders"
                    :key="header.property"
                  >
                    <p class="vel-text-semibold vel-text-small">
                      {{ header.title }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="vel-table_row"
                v-for="record in item.products"
                :key="record.productId"
              >
                <div class="row">
                  <div class="vel-table_col">
                    <p class="vel-text-small color-neutral">
                      {{ record.productTypeName }}
                    </p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small color-neutral">
                      {{ record.productNumber }}
                    </p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small color-neutral">
                      {{ record.productName }}
                    </p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small color-neutral">
                      {{ record.limitList[0].limitAmount }}
                    </p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small color-neutral">
                      {{ record.limitList[1].limitAmount }}
                    </p>
                  </div>
                  <div class="vel-table_col">
                    <p class="vel-text-small color-neutral">
                      {{ record.limitList[2].limitAmount }}
                    </p>
                  </div>
                </div>
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
  src="./AuthorizationAmountDetailComponent.sass"
></style>
<script lang="ts" setup>
import useAuthorizationsDetail from '@/modules/authorizations/composables/useAuthoriozationDetail';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
const { getUserLimitAmountDTO, getTransactionFullDetailDTO, getHeaders } =
  useAuthorizationsDetail();
</script>
