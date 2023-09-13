<template>
  <div class="container-main">
    <div v-for="logo in logos" :key="logo.name">
      <div :class="`m-b-8 container-icon ${logo.name}`">
        <img
          v-if="logo.name == 'whatsapp'"
          :src="`${staticsPath}/global-img/logo-whatsapp.png`"
          class="whatsapp-logo"
        />
        <div v-else class="container-circle">
          <i :class="`icon icon-icon-${logo.icon}`"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { staticsPath } from '@/commons/constants/envConstants';
import { logos } from '@/modules/homeFront/constants/socialNetworkIcons';
</script>

<style
  scoped
  lang="sass"
  src="../socialNetworksComponent/SocialNetworksComponent.sass"
></style>
