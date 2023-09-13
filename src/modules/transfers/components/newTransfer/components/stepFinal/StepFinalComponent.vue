<template>
  <div class="container-component w-100">
    <div v-if="getProccessedTransactionList.length > 1">
      <div class="vel-table">
        <div class="vel-table_row vel-table_header responsive-hidde">
          <div class="row">
            <div
              class="vel-table_col"
              v-for="(header, index) in getDetailHeaders"
              :key="index"
            >
              <p class="vel-text-small vel-text-semibold">{{ header.title }}</p>
              <velocity-icon
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
        <div class="vel-table_row vel-table_header responsive-show">
          <div class="row">
            <div class="vel-table_col">
              <p class="vel-text-small vel-text-semibold">
                {{ getDetailHeaders[0].title }}
              </p>
              <velocity-icon
                :is-sort-icon="true"
                @action-order-icon="
                (order:any) => {
                  sort(getDetailHeaders[0].property, order);
                }
              "
              />
            </div>
          </div>
        </div>
        <template v-if="!!getProccessedTransactionList">
          <velocity-acordion
            v-for="transfer in getProccessedTransactionList"
            class="vel-table_row"
            type="custom"
            size="normal"
            :key="transfer.id"
          >
            <template #head>
              <div class="row">
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-small vel-text-semibold">
                    {{ getDetailHeaders[0].title }}
                  </p>
                  <p class="vel-text-small">{{ transfer.txDate }}</p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-small vel-text-semibold">
                    {{ getDetailHeaders[1].title }}
                  </p>
                  <p class="vel-text-small">{{ transfer.acctTypeToDesc }}</p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-small vel-text-semibold">
                    {{ getDetailHeaders[2].title }}
                  </p>
                  <p class="vel-text-small">{{ transfer.recipientName }}</p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-small vel-text-semibold">
                    {{ getDetailHeaders[3].title }}
                  </p>
                  <p class="vel-text-small">{{ transfer.financialEntity }}</p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-small vel-text-semibold">
                    {{ getDetailHeaders[4].title }}
                  </p>
                  <p class="vel-text-small">
                    {{ addCurrencyDot(transfer.payVal?.toString()!) }}
                  </p>
                </div>
                <div class="vel-table_col">
                  <p class="responsive-show vel-text-small vel-text-semibold">
                    {{ getDetailHeaders[5].title }}
                  </p>
                  <div
                    :class="`container-status ${
                      getTransactionStatus(transfer.code)!.state
                    }`"
                  >
                    <p class="vel-text-small vel-text-semibold">
                      {{ transfer.status.label }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
            <template #body>
              <div class="vel-table_detail w-100">
                <velocity-alert
                  class="container-alert"
                  type="green"
                  :hasIcon="true"
                  :body="transfer.message"
                  :alt-icon="getTransactionStatus(transfer.code)!.icon"
                />
                <row-detail-component :transfer="transfer" />
              </div>
            </template>
          </velocity-acordion>
        </template>
      </div>
    </div>
    <div v-else>
      <div class="container-menu">
        <div class="container-row">
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-1') }}
            </p>
            <p class="vel-text-small w-50">
              {{ getProccessedTransactionList[0].authorizationNumber }}
            </p>
          </div>
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-2') }}
            </p>
            <p class="vel-text-small w-50">
              {{ getProccessedTransactionList[0].emisionDate }}
            </p>
          </div>
        </div>
      </div>
      <p class="vel-text-body-1 vel-text-semibold m-t-16">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.HEADER-1') }}
      </p>
      <div class="container-menu m-t-16">
        <div class="container-row">
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-3') }}
            </p>
            <p class="vel-text-small">
              {{ getProccessedTransactionList[0].acctTypeFromDesc }}
            </p>
          </div>
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-4') }}
            </p>
            <p class="vel-text-small">
              {{ getProccessedTransactionList[0].txDate }}
            </p>
          </div>
        </div>
        <div class="container-row">
          <div class="container-data lone">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-5') }}
            </p>
            <p class="vel-text-small">
              {{ productName }}
            </p>
          </div>
        </div>
      </div>
      <p class="vel-text-body-1 vel-text-semibold m-t-16">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.HEADER-2') }}
      </p>
      <div class="container-menu m-t-16">
        <div class="container-row">
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-6') }}
            </p>
            <p class="vel-text-small w-50">
              {{ getProccessedTransactionList[0].recipientName }}
            </p>
          </div>
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-7') }}
            </p>
            <p class="vel-text-small">
              {{
                addCurrencyDot(
                  getProccessedTransactionList[0].payVal!.toString(),
                )
              }}
            </p>
          </div>
        </div>
        <div class="container-row">
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-8') }}
            </p>
            <p class="vel-text-small">
              {{ getProccessedTransactionList[0].identificationTypeDesc }}
            </p>
          </div>
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-9') }}
            </p>
            <p class="vel-text-small">
              {{ getProccessedTransactionList[0].acctTypeToDesc }}
            </p>
          </div>
        </div>
        <div class="container-row">
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{
                $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-10')
              }}
            </p>
            <p class="vel-text-small">
              {{ getProccessedTransactionList[0].identification }}
            </p>
          </div>
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{
                $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-11')
              }}
            </p>
            <p class="vel-text-small">
              {{ getProccessedTransactionList[0].acctIdTo }}
            </p>
          </div>
        </div>
        <div class="container-row">
          <div class="container-data lone">
            <p class="vel-text-small vel-text-semibold w-50">
              {{
                $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-12')
              }}
            </p>
            <p class="vel-text-small">
              {{ getProccessedTransactionList[0].financialEntity }}
            </p>
          </div>
        </div>
      </div>
      <p class="vel-text-body-1 vel-text-semibold m-t-16">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.HEADER-3') }}
      </p>
      <div class="container-menu m-t-16">
        <div class="container-row">
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{
                $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-13')
              }}
            </p>
            <p class="vel-text-small">
              {{
                !!getProccessedTransactionList[0].referenceBillNumber
                  ? getProccessedTransactionList[0].referenceBillNumber
                  : 'N/A'
              }}
            </p>
          </div>
          <div class="container-data">
            <p class="vel-text-small vel-text-semibold w-50">
              {{
                $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-14')
              }}
            </p>
            <p class="vel-text-small">
              {{
                !!getProccessedTransactionList[0].exonerateGMF
                  ? $t('REUSABLES.YES')
                  : $t('REUSABLES.NO')
              }}
            </p>
          </div>
        </div>
        <div class="container-row">
          <div class="container-data lone">
            <p class="vel-text-small vel-text-semibold w-50">
              {{
                $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-FINALE.LABEL-15')
              }}
            </p>
            <p class="vel-text-small">
              {{
                !!getProccessedTransactionList[0].infoAdditional
                  ? getProccessedTransactionList[0].infoAdditional
                  : 'N/A'
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useStepFinal from '../../composables/useStepFInal';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import RowDetailComponent from '../rowDetail/RowDetailComponent.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';

const {
  getProccessedTransactionList,
  getDetailHeaders,
  addCurrencyDot,
  sort,
  getTransactionStatus,
  productName,
} = useStepFinal();
</script>
<style scoped lang="sass" src="./StepFinalComponent.sass"></style>
