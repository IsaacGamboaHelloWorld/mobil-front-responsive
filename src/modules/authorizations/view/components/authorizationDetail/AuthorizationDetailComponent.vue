<template>
  <div>
    <div class="container_title m-b-18">
      <p class="vel-text-semibold vel-text-body-1">
        {{ $t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TITLE') }}
      </p>
    </div>
    <div class="container_detail">
      <div
        class="detail w-50 m-b-12"
        v-for="item in getTransactionFullDetailDTO"
        :key="item.name"
      >
        <p class="vel-text-semibold vel-text-small w-50">{{ item.langText }}</p>
        <p class="color-neutral vel-text-small w-50">
          {{
            item.name === 'amt'
              ? addCurrencyDot(item.value)
              : !!item.value
              ? item.value
              : 'N/A'
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass" src="./AuthorizationDetailComponent.sass"></style>
<script lang="ts" setup>
import useAuthorizationsDetail from '@/modules/authorizations/composables/useAuthoriozationDetail';
const { getTransactionFullDetailDTO, addCurrencyDot } =
  useAuthorizationsDetail();
</script>
