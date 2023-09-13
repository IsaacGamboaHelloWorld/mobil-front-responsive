<template>
  <div class="container-component w-100">
    <div class="container-resume">
      <p class="vel-text-body-1 vel-text-semibold">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TITLE') }}
      </p>
    </div>
    <div>
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
            <div v-if="transferList.length > 1" class="vel-table_col"></div>
          </div>
        </div>
        <template v-if="!!transferList">
          <velocity-acordion
            v-for="transfer in transferList"
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
                <div
                  v-if="transferList.length > 1"
                  class="vel-table_col container-icons"
                >
                  <i
                    @click="editTransfer(transfer)"
                    :class="`icon-${companyName} icon-icon-edit`"
                  ></i>
                  <i
                    @click="deleteTransfer(transfer)"
                    :class="`icon-${companyName} icon-icon-delete m-l-26`"
                  ></i>
                </div>
              </div>
            </template>
            <template #body>
              <div class="vel-table_detail w-100">
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
                        <p>{{ transfer.acctTypeFromDesc }}</p>
                      </div>
                      <div class="value m-b12">
                        <p class="vel-text-semibold">
                          {{
                            $t(
                              'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-2',
                            )
                          }}
                        </p>
                        <p>{{ transfer.acctIdFromMask }}</p>
                      </div>
                      <div class="value m-b12">
                        <p class="vel-text-semibold">
                          {{
                            $t(
                              'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-3',
                            )
                          }}
                        </p>
                        <p>{{ transfer.txDate }}</p>
                      </div>
                      <div class="value m-b12">
                        <p class="vel-text-semibold">
                          {{
                            $t(
                              'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-4',
                            )
                          }}
                        </p>
                        <p>{{ transfer.identificationTypeDesc }}</p>
                      </div>
                      <div class="value m-b12">
                        <p class="vel-text-semibold">
                          {{
                            $t(
                              'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-5',
                            )
                          }}
                        </p>
                        <p>{{ transfer.identification }}</p>
                      </div>
                      <div class="value m-b12">
                        <p class="vel-text-semibold">
                          {{
                            $t(
                              'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-6',
                            )
                          }}
                        </p>
                        <p>{{ transfer.acctTypeToDesc }}</p>
                      </div>
                      <div class="value m-b12">
                        <p class="vel-text-semibold">
                          {{
                            $t(
                              'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-DETAIL.LABEL-7',
                            )
                          }}
                        </p>
                        <p>{{ transfer.acctIdTo }}</p>
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
                            !!transfer.referenceBillNumber
                              ? transfer.referenceBillNumber
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
                            !!transfer.infoAdditional
                              ? transfer.infoAdditional
                              : 'N/A'
                          }}
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
                            !!transfer.exonerateGMF
                              ? $t('REUSABLES.YES')
                              : $t('REUSABLES.NO')
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
    </div>
  </div>
</template>
<script setup lang="ts">
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import useStepThree from '../../composables/useStepThree';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import { companyName } from '@/commons/constants/companyName';

const {
  getDetailHeaders,
  sort,
  transferList,
  addCurrencyDot,
  deleteTransfer,
  editTransfer,
} = useStepThree();
</script>
<style scoped lang="sass" src="./StepThreeComponent.sass"></style>
