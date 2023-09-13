<template>
  <div :class="`container_body ${props.type}`">
    <slot name="component"></slot>
  </div>
</template>
<style scoped lang="sass" src="./velocisyPopUp.sass"></style>
<script lang="ts" setup>
export interface Props {
  type: 'up' | 'down';
}
const props = withDefaults(defineProps<Props>(), {
  type: 'up',
});
</script>
