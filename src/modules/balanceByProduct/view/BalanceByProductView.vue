<template>
  <div class="container-homefront">
    <velocity-alert
      v-if="alertIsVisible"
      class="m-b-16"
      type="red"
      :has-icon="true"
      :is-closable="true"
      :body="getAlertMsg"
      @action-icon="bbpStore.toggleAlert()"
    ></velocity-alert>
    <div class="breadcrumb-trail m-b-32 m-t-8">
      <i
        v-if="currentStep === STEPS.stepsProductDetail"
        class="clickable icon-icon-arrow-back"
        @click="currentStep = STEPS.stepProductsView"
      ></i>
      <p class="vel-text-small vel-text-semibold">
        {{ $t('BALANCE-BY-PRODUCTS-MODULE.BREADCRUMB-1') }}
      </p>
      <i class="icon-icon-arrow-keyboard-right row"></i>
      <p
        :class="`clickable vel-text-small vel-text-semibold ${companyName}`"
        @click="reloadPage"
      >
        {{ $t('BALANCE-BY-PRODUCTS-MODULE.BBP-LABEL') }}
      </p>
    </div>
    <component :is="componentStep"></component>
  </div>
</template>
<script setup lang="ts">
import { companyName } from '@/commons/constants/companyName';
import useBBP from '../composables/useBBP';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import STEPS from '../constants/steps';

const {
  componentStep,
  alertIsVisible,
  getAlertMsg,
  bbpStore,
  currentStep,
  reloadPage,
} = useBBP();
</script>
<style lang="sass" src="./BalanceByProductView.sass"></style>
