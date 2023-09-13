<template>
  <div
    class="breadcrumb-trail m-b-32 m-t-8"
    v-if="currentStep !== STEPS.stepSearch"
  >
    <i class="icon-icon-arrow-back" @click="currentStep = STEPS.stepSearch"></i>
    <p class="vel-text-small vel-text-semibold">
      {{ $t('MOVEMENTS-MODULE.MIGA.FIRST') }}
    </p>
    <i class="icon-icon-arrow-keyboard-right row"></i>
    <p
      v-if="currentStep === STEPS.stepDetail"
      :class="`vel-text-small vel-text-semibold ${companyName}`"
    >
      {{ $t('MOVEMENTS-MODULE.MIGA.SECOND') }}
    </p>
  </div>
  <div class="container_movements">
    <component :is="componentStep"></component>
  </div>
</template>
<style scoped lang="sass"></style>
<script setup lang="ts">
import useMovementsModule from '../composables/useMovementsModule';
import STEPS from '../constants/steps';
import { companyName } from '@/commons/constants/companyName';
const { componentStep, currentStep } = useMovementsModule();
</script>
