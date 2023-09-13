<template>
  <velocity-modal v-if="isLoading" type="spinner" />
  <div class="section-home">
    <div class="section-main">
      <router-view />
    </div>
    <header-component @activeSideNav="navSwitchState()" />
    <social-networks-component />
    <navigation-services-component
      :class="`nav ${navIsActive ? 'active' : ''}`"
      @activeSideNav="navSwitchState()"
      @turn-off-nav-switch="turnOffNavSwitch()"
    />
    <div :class="`overlay ${navIsActive ? 'active' : ''}`">useHomeFront</div>
  </div>
</template>

<script setup lang="ts">
import navigationServicesComponent from '@/modules/homeFront/components/navigationServices/NavigationServicesComponent.vue';
import headerComponent from '@/modules/homeFront/components/headerComponent/HeaderComponent.vue';
import useHomeFrontModule from '../composables/useHomeFrontModule';
import SocialNetworksComponent from '../components/socialNetworksComponent/SocialNetworksComponent.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';

const { navSwitchState, navIsActive, isLoading, turnOffNavSwitch } =
  useHomeFrontModule();
</script>
<style scoped lang="sass" src="./HomeFrontTemplate.sass"></style>
