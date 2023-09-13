<template>
  <div class="container_detail">
    <p class="m-b-16 vel-text-semibold vel-text-body-2">
      {{ $t('TRANSFERS-MODULE.DETAIL.TITLE') }}
    </p>
    <div>
      <div class="detail_col w-50">
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.TYPE') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.acctTypeFrom || '' }}
          </p>
        </div>
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.NUMBER') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.acctIdFrom || '' }}
          </p>
        </div>
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.DATE') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.txDate || '' }}
          </p>
        </div>
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.TYPE-ID') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.identificationTypeDesc || '' }}
          </p>
        </div>
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.ID') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.identification || '' }}
          </p>
        </div>
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.TYPE-PRODUCT') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.acctTypeToDesc || '' }}
          </p>
        </div>
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.ID-PRODUCT') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.acctIdTo || '' }}
          </p>
        </div>
      </div>
      <div class="detail_col w-50">
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.REFERENCE') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.referenceBillNumber || '' }}
          </p>
        </div>
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.INFO') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.infoAdditional || 'N/A' }}
          </p>
        </div>
        <div class="detail" v-if="props.record?.errorDesc">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.DESC') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.errorDesc || '' }}
          </p>
        </div>
        <div class="detail" v-if="props.record?.authorizationNumber">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.AUTH') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.authorizationNumber || '' }}
          </p>
        </div>
        <div class="detail" v-if="props.record?.emisionDate">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.DATE-ISSUE') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.emisionDate || '' }}
          </p>
        </div>
        <div class="detail">
          <p class="w-50 vel-text-semibold vel-text-small">
            {{ $t('TRANSFERS-MODULE.DETAIL.EXO') }}
          </p>
          <p class="w-50 vel-text-small color-neutral">
            {{ props.record?.exonerateGMF === 'false' ? 'No' : 'Si' || '' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass" src="./RowDetailComponent.sass"></style>
<script lang="ts" setup>
import type { ILastTransaction } from '../../entities/transfersInterfaces';

const props = defineProps<{
  record?: ILastTransaction;
}>();
</script>
