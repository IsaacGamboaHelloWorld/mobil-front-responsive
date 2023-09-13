<template>
  <div class="container_semaphore">
    <div :class="`semaphore semaphore-${props.type} ${companyName}`">
      <p class="vel-text-caption vel-text-semibold text-aling-center">
        {{ props.text }}
      </p>
    </div>
  </div>
</template>
<style lang="sass" scoped src="./VelocitySemaphore.sass"></style>
<script lang="ts" setup>
import { companyName } from '@/commons/constants/companyName';
const props = defineProps<{
  type: 'red' | 'yellow' | 'green';
  text: string;
}>();
</script>
