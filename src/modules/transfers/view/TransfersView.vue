<template>
  <div>
    <div
      class="container_module_top"
      v-if="
        currentStep == STEPS.stepScheduleTransfers ||
        currentStep === STEPS.stepTransfersDetail ||
        currentStep === STEPS.stepTemplates
      "
    >
      <div class="container_title">
        <p class="vel-text-semibold vel-text-body-1">
          {{ $t('TRANSFERS-MODULE.TITLE') }}
        </p>
        <velocity-button
          class="button"
          classes-name="btn btn-primary"
          :text="$t('TRANSFERS-MODULE.NEW')"
          @action-button="currentStep = STEPS.stepNewTransfer"
          icon="icon-icon-more"
          size="medium"
        />
      </div>
      <div class="container_tab m-t-20">
        <div
          :class="`${
            currentStep === STEPS.stepTransfersDetail ? 'active' : ''
          } ${companyName}`"
          @click="currentStep = STEPS.stepTransfersDetail"
        >
          <p class="vel-text-small vel-text-semibold $">
            {{ $t('TRANSFERS-MODULE.LAST') }}
          </p>
        </div>
        <div
          :class="`${
            currentStep === STEPS.stepScheduleTransfers ? 'active' : ''
          } ${companyName}`"
          @click="currentStep = STEPS.stepScheduleTransfers"
        >
          <p :class="`vel-text-small vel-text-semibold`">
            {{ $t('TRANSFERS-MODULE.SCHEDULE') }}
          </p>
        </div>
        <div
          :class="`${
            currentStep === STEPS.stepTemplates ? 'active' : ''
          } ${companyName}`"
          @click="currentStep = STEPS.stepTemplates"
        >
          <p :class="`vel-text-small vel-text-semibold`">
            {{ $t('TRANSFERS-MODULE.TEMPLATES') }}
          </p>
        </div>
      </div>
    </div>
    <div class="m-t-16">
      <component :is="componentStep"></component>
    </div>
  </div>
</template>
<style lang="sass" scoped src="./TransefersVIew.sass"></style>
<script lang="ts" setup>
import useTransfersModule from '@/modules/transfers/composables/useTransfersModule';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import { companyName } from '@/commons/constants/companyName';
const { componentStep, currentStep, STEPS } = useTransfersModule();
</script>
