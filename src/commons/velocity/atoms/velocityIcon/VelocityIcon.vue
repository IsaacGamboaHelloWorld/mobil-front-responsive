<template>
  <i
    v-if="props.isSortIcon"
    :class="`icon-icon-arrow-${arrow} color-neutral`"
    @click="
      emits('actionOrderIcon', arrow);
      arrow === 'up' ? (arrow = 'down') : (arrow = 'up');
    "
  ></i>
  <i
    v-else
    @click="emits('actionIcon')"
    :class="`${props.icon} ${companyName} ${!!props.isActive ? 'active' : ''}`"
  ></i>
</template>
<script setup lang="ts">
import { companyName } from '@/commons/constants/companyName';
import { ref } from 'vue';
export interface Props {
  icon?: string;
  isActive?: boolean;
  isSortIcon?: boolean;
}
interface IEmits {
  (e: 'actionIcon'): void;
  (e: 'actionOrderIcon', order: 'up' | 'down'): void;
}
const props = withDefaults(defineProps<Props>(), {
  icon: '',
  isActive: false,
  isSortIcon: false,
});
const emits = defineEmits<IEmits>();
const arrow = ref<'up' | 'down'>('down');
</script>
<style scoped lang="sass" src="./VelocityIcon.sass"></style>
