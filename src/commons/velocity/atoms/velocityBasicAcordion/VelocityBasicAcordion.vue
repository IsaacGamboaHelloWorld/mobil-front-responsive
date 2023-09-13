<template>
  <div class="velocity-accordion">
    <div class="container-header m-t-16 m-b-16">
      <p class="vel-text-small vel-text-semibold color-dark-400">
        {{ $t(props.title) }}
      </p>
      <i
        :class="`${
          !!toggle
            ? 'icon-icon-arrow-expand-more'
            : 'icon-icon-arrow-expand-less'
        }`"
        @click="switchToggleMenu"
      ></i>
    </div>
    <div v-if="props.data" :class="`container-items ${!!toggle ? 'open' : ''}`">
      <div
        class="item text-aling-left m-b-8"
        v-for="{ city, phone } in data"
        :key="city"
      >
        <p
          class="item-name vel-text-small vel-text-semibold p-b-8 color-dark-400"
        >
          {{ city }}
        </p>
        <p class="item-phone vel-text-small">{{ phone }}</p>
      </div>
    </div>
    <div v-else :class="`container-items ${!!toggle ? 'open' : ''}`">
      <p v-for="number in 12" :key="number" class="vel-text-small p-b-8">
        {{
          $t(`AUTH-MODULE.SERVICE-LINES.${companyName}.LABEL-${number}`, {
            att: '@',
          })
        }}
      </p>
      <p class="vel-text-small">
        {{ $t(`AUTH-MODULE.SERVICE-LINES.${companyName}.LABEL-13`) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { IserviceLine } from '@/modules/auth/constants/serviceLine';
import { companyName } from '@/commons/constants/companyName';

const props = defineProps<{
  title: string;
  icon?: string;
  data?: IserviceLine[];
}>();

const toggle = ref<boolean>(false);

function switchToggleMenu(): void {
  !toggle.value ? (toggle.value = true) : (toggle.value = false);
}
</script>

<style scoped lang="sass" src="./VelocityBasicAcordion.sass"></style>
