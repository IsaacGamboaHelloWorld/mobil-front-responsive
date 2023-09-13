<template>
  <velocity-alert
    type="red"
    :body="$t('REUSABLES.PERMITION')"
    :has-icon="true"
    v-if="!hasPermitions(authorizationsPermitionsCodes.query, permitions!)"
  />
  <template v-else>
    <div
      class="breadcrumb-trail m-b-32 m-t-8"
      v-if="currentStep !== STEPS.stepAuthorizationsList"
    >
      <i
        class="icon-icon-arrow-back"
        @click="currentStep = STEPS.stepAuthorizationsList"
      ></i>
      <p class="vel-text-small vel-text-semibold">
        {{ $t('AUTHORIZATIONS-MODULE.MIGA.FIRST') }}
      </p>
      <i class="icon-icon-arrow-keyboard-right row"></i>
      <p
        v-if="
          currentStep === STEPS.stepAuthorizationsDetail ||
          currentStep === STEPS.stepAuthorizationProfileDetail ||
          currentStep === STEPS.stepAuthorizationProductsDetail ||
          currentStep === STEPS.stepAuthorizationAmountDetail
        "
        :class="`vel-text-small vel-text-semibold ${companyName}`"
      >
        {{ $t('AUTHORIZATIONS-MODULE.MIGA.SECOND') }}
      </p>
      <p
        v-if="currentStep === STEPS.stepAuthorizationResult"
        :class="`vel-text-small vel-text-semibold ${companyName}`"
      >
        {{ $t('AUTHORIZATIONS-MODULE.MIGA.RESULT') }}
      </p>
    </div>
    <div>
      <p class="vel-text-semibold vel-text-body-1 m-b-16">
        {{ getTitle }}
      </p>
      <component :is="componentStep"></component>
    </div>
  </template>
</template>
<script lang="ts" setup>
import useAuthorizationsModule from '../composables/useAuthorizationsModule';
import STEPS from '../constants/steps';
import { companyName } from '@/commons/constants/companyName';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import authorizationsPermitionsCodes from '../constants/permitions';

const { getTitle, componentStep, currentStep, permitions, hasPermitions } =
  useAuthorizationsModule();
</script>

<style scoped lang="sass" src="./AuthorizationsView.sass"></style>
