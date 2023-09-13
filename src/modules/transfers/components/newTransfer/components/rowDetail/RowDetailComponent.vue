<template>
  <div class="container_detail w-100">
    <div>
      <p class="vel-text-body-2 vel-text-semibold m-b-16">
        {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.TITLE') }}
      </p>
    </div>
    <div class="container_detail_cols">
      <div class="col">
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-1',
              )
            }}
          </p>
          <p>{{ props.transfer.acctTypeFromDesc }}</p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-2',
              )
            }}
          </p>
          <p>{{ props.transfer.acctIdFromMask }}</p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-3',
              )
            }}
          </p>
          <p>{{ props.transfer.txDate }}</p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-4',
              )
            }}
          </p>
          <p>{{ props.transfer.identificationTypeDesc }}</p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-5',
              )
            }}
          </p>
          <p>{{ props.transfer.identification }}</p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-6',
              )
            }}
          </p>
          <p>{{ props.transfer.acctTypeToDesc }}</p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-7',
              )
            }}
          </p>
          <p>{{ props.transfer.acctIdTo }}</p>
        </div>
      </div>
      <div class="col">
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-8',
              )
            }}
          </p>
          <p>
            {{
              !!props.transfer.referenceBillNumber
                ? props.transfer.referenceBillNumber
                : 'N/A'
            }}
          </p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-9',
              )
            }}
          </p>
          <p>
            {{
              !!props.transfer.infoAdditional
                ? props.transfer.infoAdditional
                : 'N/A'
            }}
          </p>
        </div>
        <div class="value m-b12" v-if="!!props.transfer.message">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-10',
              )
            }}
          </p>
          <p>
            {{ props.transfer.message }}
          </p>
        </div>
        <div class="value m-b12" v-if="!!props.transfer.authorizationNumber">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-11',
              )
            }}
          </p>
          <p>
            {{ props.transfer.authorizationNumber }}
          </p>
        </div>
        <div class="value m-b12" v-if="!!props.transfer.emisionDate">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-12',
              )
            }}
          </p>
          <p>
            {{ props.transfer.emisionDate }}
          </p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{
              $t(
                'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-13',
              )
            }}
          </p>
          <p>
            {{
              !!props.transfer.exonerateGMF
                ? $t('REUSABLES.YES')
                : $t('REUSABLES.NO')
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass" src="./RowDetailComponent.sass"></style>
<script lang="ts" setup>
import { initTransfer } from '@/modules/transfers/constants/initialStates';

export interface IProps {
  transfer?: any;
}

const props = withDefaults(defineProps<IProps>(), {
  transfer: () => initTransfer,
});
</script>
