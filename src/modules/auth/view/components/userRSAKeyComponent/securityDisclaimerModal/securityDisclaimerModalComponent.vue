<template>
  <div class="container-modal">
    <div class="container-icon">
      <velocity-icon
        class="icon-general"
        icon="icon-icon-close"
        @click="toggleSecurityModal()"
      />
    </div>
    <div class="container-text">
      <p :class="`vel-text-bold ${companyName} m-b-16`">
        {{ getLabel['TITLE-1'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-1'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getBankLabel['LIST-1'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-2'] }}
        </li>
      </ul>
      <ul class="m-b-8">
        <p class="vel-text-body-2 color-dark-400 m-b-8">
          {{ getLabel['LIST-3'] }}
        </p>
        <ul class="p-l-8 m-b-8">
          <li class="vel-text-small color-dark-400">
            {{ getLabel['LIST-4'] }}
          </li>
          <li class="vel-text-small color-dark-400">
            {{ getLabel['LIST-5'] }}
          </li>
        </ul>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-6'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-7'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-8'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-9'] }}
        </li>
      </ul>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-2'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getBankLabel['LIST-1'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-11'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-12'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-13'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-14'] }}
        </li>
      </ul>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-3'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-15'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-16'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-17'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-18'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getBankLabel['LIST-19'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-20'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-21'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-22'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-23'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-24'] }}
        </li>
      </ul>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-4'] }}
      </p>
      <ul class="m-b-16">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-25'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-26'] }}
        </li>
        <ul class="p-l-8">
          <li class="vel-text-small color-dark-400">
            {{ getLabel['LIST-27'] }}
          </li>
        </ul>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-28'] }}
        </li>
        <ul class="p-l-8">
          <li class="vel-text-small color-dark-400">
            {{ getLabel['LIST-29'] }}
          </li>
          <li class="vel-text-small color-dark-400">
            {{ getLabel['LIST-30'] }}
          </li>
        </ul>
      </ul>
      <p :class="`vel-text-semibold m-b-16`">
        {{ getLabel['TITLE-5'] }}
      </p>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-6'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-2'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-31'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-32'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-33'] }}
        </li>
      </ul>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-3'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-34'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-35'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-37'] }}
        </li>
      </ul>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-4'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getBankLabel['LABEL-5'] }}
      </p>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-7'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-6'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-38'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-39'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-40'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-41'] }}
        </li>
      </ul>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-8'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-7'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-42'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-43'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-44'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-45'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-47'] }}
        </li>
      </ul>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-9'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-9'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-48'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-49'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-50'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-51'] }}
        </li>
      </ul>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-10'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-10'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-52'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-53'] }}
        </li>
      </ul>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-11'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-11'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-54'] }}
        </li>
      </ul>
      <p :class="`vel-text-semibold m-b-8`">
        {{ getLabel['TITLE-12'] }}
      </p>
      <p class="vel-text-body-2 color-dark-400 m-b-8">
        {{ getLabel['LABEL-12'] }}
      </p>
      <ul class="m-b-8">
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-55'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-56'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-57'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-58'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-59'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-60'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getBankLabel['LIST-61'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-62'] }}
        </li>
        <li class="vel-text-small color-dark-400">
          {{ getLabel['LIST-63'] }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { companyName } from '@/commons/constants/companyName';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import conditionsEn from '@/modules/auth/constants/conditionsEn.json';
import conditionsEs from '@/modules/auth/constants/conditionsEs.json';
import useSecurityModal from '@/modules/auth/composables/useSecurityModal';

const { toggleSecurityModal } = useSecurityModal();
const getLabel = computed(() => {
  if (localStorage.getItem('lang') === 'es') {
    return conditionsEs.all;
  } else {
    return conditionsEn.all;
  }
});

const getBankLabel = computed(() => {
  if (localStorage.getItem('lang') === 'es') {
    if (companyName == 'bavv') {
      return conditionsEs.bavv;
    } else if (companyName == 'bbog') {
      return conditionsEs.bbog;
    } else if (companyName == 'bocc') {
      return conditionsEs.bocc;
    } else {
      return conditionsEs.bpop;
    }
  } else {
    if (companyName == 'bavv') {
      return conditionsEn.bavv;
    } else if (companyName == 'bbog') {
      return conditionsEn.bbog;
    } else if (companyName == 'bocc') {
      return conditionsEn.bocc;
    } else {
      return conditionsEn.bpop;
    }
  }
});
</script>
<style scoped lang="sass" src="./securityDisclaimerModalComponent.sass"></style>
