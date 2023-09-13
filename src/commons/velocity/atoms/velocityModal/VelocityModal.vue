<template>
  <div
    v-if="props.type === 'custom'"
    :class="`modal-overlay w-100 ${companyName}`"
    @click="emits('closeModal')"
  >
    <div :class="`container_body ${width}`">
      <slot name="component"></slot>
    </div>
  </div>

  <div
    v-if="props.type === 'spinner'"
    :class="`modal-overlay ${companyName} spinner`"
  >
    <div class="container_body active">
      <div>
        <LottieAnimation
          :animationData="getAnimation"
          :height="200"
          :width="200"
          :speed="2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bpopAniation from '@/assets/bpop/animation.json';
import bavvAniation from '@/assets/bavv/animation.json';
import bbogAniation from '@/assets/bbog/animation.json';
import boccAniation from '@/assets/bocc/animation.json';

import { companyName } from '@/commons/constants/companyName';
import { computed, onMounted } from 'vue';
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
const { currentGlobalStep, currentModule } = storeToRefs(globalStore);

interface Props {
  type: 'spinner' | 'custom';
  width?: 'w-100' | 'w-80' | 'w-60' | 'w-50' | '';
  id?: string;
}

interface IEmits {
  (e: 'closeModal'): void;
}
const emits = defineEmits<IEmits>();

const props = withDefaults(defineProps<Props>(), {
  type: 'custom',
  width: '',
});

onMounted(() => {
  if (props.type === 'custom') {
    (window as any).utag.link({
      tealium_event: 'modal',
      page_path: currentGlobalStep.value,
      event_category: currentModule.value + '-' + currentGlobalStep.value,
      event_label: props.id,
      token: !!localStorage.getItem('token')
        ? !!localStorage.getItem('token')
        : '',
    });
  }
});

const getAnimation = computed(() => {
  if (companyName === 'bpop') return bpopAniation;
  if (companyName === 'bavv') return bavvAniation;
  if (companyName === 'bocc') return boccAniation;
  return bbogAniation;
});
</script>

<style scoped lang="sass" src="./VelocityModal.sass"></style>
