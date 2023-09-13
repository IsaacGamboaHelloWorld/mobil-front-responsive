<template>
  <VelocityModal
    v-if="!!isIPLoading || !!isParametersLoading || !!isLoadingSecondIP"
    type="spinner"
  >
  </VelocityModal>
  <VelocityModal
    v-if="securityModalVisible"
    type="custom"
    id="mensaje Seguridad"
  >
    <template #component>
      <securityDisclaimerModalComponent />
    </template>
  </VelocityModal>
  <div class="container">
    <div class="container-left">
      <div
        class="language color-neutral vel-text-overline"
        v-if="currentStep === STEPS.stepUserRSAKey"
      >
        <velocity-dropdown
          v-model="language"
          :list="[$t('AUTH-MODULE.OPTION-ES'), $t('AUTH-MODULE.OPTION-EN')]"
        />
        <p class="m-a">IP: {{ ipUser }}</p>
      </div>
      <div class="container-information">
        <div class="m-b-32 container-img">
          <img
            :src="`${staticsPath}/${companyName}/logo.svg`"
            alt="Banco Popular"
          />
        </div>
        <template v-if="!!componentStep()">
          <component :is="componentStep()"></component>
        </template>
        <SBLPushComponent
          v-if="currentStep === STEPS.stepSBLPush"
          @success-s-b-l="successSBL()"
          @close-action="closeAction()"
          @error-s-b-l="handleSBLError"
          @action-button-send-code="goToSoftToken()"
          :option-code="sblOptionCodes.login"
        />
        <SBLSoftTokenComponent
          v-if="currentStep === STEPS.stepSBLSoftToken"
          @success-s-b-l="successSBL()"
          @close-action="closeAction()"
          @error-s-b-l="handleSBLError"
        />
      </div>

      <div class="container-terms">
        <p class="vel-text-small color-neutral">
          {{ $t('AUTH-MODULE.SECURITY-CONDITIONS-BEFORE') }}
          <a href="#" @click="toggleSecurityModal()">{{
            $t('AUTH-MODULE.SECURITY-CONDITIONS')
          }}</a>
          {{ $t('AUTH-MODULE.SECURITY-CONDITIONS-AFTER') }}
        </p>
        <hr class="m-t-22" />
        <velocity-basic-acordion
          :title="'AUTH-MODULE.ACORDION-TITLE-BUSINESS'"
          :data="serviceLinesBusiness()"
        />
        <hr />
        <velocity-basic-acordion
          :title="'AUTH-MODULE.ACORDION-TITLE-CUSTOMER'"
        />
      </div>
    </div>
    <div :class="`container-right ${companyName}`">
      <div class="info w-100">
        <p class="vel-text-overline">Versión {{ getVersion }}</p>
        <div class="container-images">
          <img
            class="img-aval m-r-48"
            :src="`${staticsPath}/global-img/aval-neutral.svg`"
            alt=""
          />
          <img
            class="img-super"
            :src="`${staticsPath}/global-img/superintendencia-white.png`"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import securityDisclaimerModalComponent from './components/userRSAKeyComponent/securityDisclaimerModal/securityDisclaimerModalComponent.vue';
import { staticsPath } from '@/commons/constants/envConstants';
import useAuthModule from '../composables/useAuthModule';
import VelocityBasicAcordion from '@/commons/velocity/atoms/velocityBasicAcordion/VelocityBasicAcordion.vue';
import VelocityDropdown from '@/commons/velocity/atoms/velocityDropdown/VelocityDropdown.vue';
import SBLPushComponent from '@/modules/sbl/components/sblPush/SBLPushComponent.vue';
import SBLSoftTokenComponent from '@/modules/sbl/components/sblSoftToken/SBLSoftTokenComponent.vue';
import { sblOptionCodes } from '@/commons/constants/responseCodes';
import { STEPS } from '../constants/steps';

const {
  language,
  serviceLinesBusiness,
  componentStep,
  companyName,
  ipUser,
  getVersion,
  toggleSecurityModal,
  securityModalVisible,
  isIPLoading,
  isParametersLoading,
  currentStep,
  successSBL,
  closeAction,
  handleSBLError,
  goToSoftToken,
  isLoadingSecondIP,
} = useAuthModule();
</script>
<style scoped lang="sass" src="./LoginView.sass"></style>
