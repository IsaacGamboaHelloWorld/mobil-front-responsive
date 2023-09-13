<template>
  <div class="container-main">
    <velocity-alert
      v-if="isSingleAuthorization"
      :type="getSemaphoreInfo(getRecords[0].statusCode)[1]"
      :title="getAlertInfo(getRecords[0].statusCode)[0]"
      :body="getAlertInfo(getRecords[0].statusCode)[1]"
      :has-icon="true"
    />
    <div class="container-header">
      <p class="vel-text-body-1 vel-text-semibold">
        {{ $t('AUTHORIZATIONS-MODULE.STEP-RESULT.HEADER') }}
      </p>
      <velocity-button
        classesName="btn btn-secundary m-a"
        :text="$t('REUSABLES.BUTTON.EXPORT')"
        :icon="'icon icon-icon-download'"
        size="medium"
        :export="true"
        export-types="PDF"
        type="button"
        @export-excel="doExport('xls')"
        @export-pdf="doExport('pdf')"
      />
    </div>
    <div
      class="container-accordion m-b-16"
      v-for="(record, index) in getRecords"
      :key="index"
    >
      <velocity-acordion type="custom" size="big" is-active>
        <template #head>
          <div class="container-accordion-header w-100">
            <p class="vel-text-body-1 vel-text-semibold">
              {{ record.serviceName }}
            </p>
            <velocity-semaphore
              :type="getSemaphoreInfo(record.statusCode)[1]"
              :text="getSemaphoreInfo(record.statusCode)[0]"
            />
          </div>
        </template>
        <template #body>
          <VelocityAlert
            v-if="!isSingleAuthorization"
            class="w-100 alert"
            :type="getSemaphoreInfo(record.statusCode)[1]"
            :body="getAlertInfo(record.statusCode)[1]"
            :has-icon="true"
          />
          <div
            class="container-accordion-body"
            v-if="record.transactionFullDetailDTO.length !== 0"
          >
            <div class="container-column">
              <div
                v-for="recordDetail in record.transactionFullDetailDTO.slice(
                  0,
                  Math.ceil(record.transactionFullDetailDTO.length / 2),
                )"
                :key="recordDetail.name"
                class="container-data"
              >
                <template v-if="!!recordDetail.value">
                  <p class="m-b-12 w-50 vel-text-body-2 vel-text-semibold">
                    {{ recordDetail.langText }}
                  </p>
                  <p class="m-b-12 w-50 vel-text-body-2 color-neutral">
                    {{ recordDetail.value }}
                  </p>
                </template>
              </div>
            </div>
            <div class="container-column">
              <div
                v-for="recordDetail in record.transactionFullDetailDTO.slice(
                  Math.ceil(record.transactionFullDetailDTO.length / 2),
                  record.transactionFullDetailDTO.length,
                )"
                :key="recordDetail.name"
                class="container-data"
              >
                <template v-if="!!recordDetail.value">
                  <p class="m-b-12 w-50 vel-text-body-2 vel-text-semibold">
                    {{ recordDetail.langText }}
                  </p>
                  <p class="m-b-12 w-50 vel-text-body-2 color-neutral">
                    {{ recordDetail.value }}
                  </p>
                </template>
              </div>
            </div>
          </div>
          <div v-else class="w-100 container-special-detail">
            <div class="w-100">
              <div class="container-data">
                <p class="m-b-12 w-50 vel-text-body-2 vel-text-semibold">
                  {{ $t('AUTHORIZATIONS-MODULE.STEP-RESULT.LABEL-5') }}
                </p>
                <p class="m-b-12 w-50 vel-text-body-2 color-neutral">
                  {{ record.transactionDate }}
                </p>
              </div>
              <div class="container-data">
                <p class="m-b-12 w-50 vel-text-body-2 vel-text-semibold">
                  {{ $t('AUTHORIZATIONS-MODULE.STEP-RESULT.USER-NAME') }}
                </p>
                <p class="m-b-12 w-50 vel-text-body-2 color-neutral">
                  {{ record.creatorUserName }}
                </p>
              </div>
              <div class="container-data">
                <p class="m-b-12 w-50 vel-text-body-2 vel-text-semibold">
                  {{ $t('AUTHORIZATIONS-MODULE.STEP-RESULT.LABEL-3') }}
                </p>
                <p class="m-b-12 w-50 vel-text-body-2 color-neutral">
                  {{ record.authCode }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </velocity-acordion>
    </div>
  </div>
</template>
<script setup lang="ts">
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
import useAuthorizationResult from '@/modules/authorizations/composables/useAuthorizationResult';
import VelocitySemaphore from '@/commons/velocity/atoms/velocitySemaphore/VelocitySemaphore.vue';
const {
  getRecords,
  isSingleAuthorization,
  getSemaphoreInfo,
  getAlertInfo,
  doExport,
} = useAuthorizationResult();
</script>
<style scoped lang="sass" src="./AuthorizationResultComponent.sass"></style>
