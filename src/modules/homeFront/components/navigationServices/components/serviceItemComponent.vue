<template>
  <div
    :class="`service ${props.companyName} ${
      props.isActive ? 'active' : ''
    } m-x-a`"
  >
    <p class="text-aling-center m-b-12">
      <i :class="props.icon"></i>
    </p>
    <p class="text-aling-center vel-text-small vel-text-semibold">
      {{ props.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  companyName: string;
  icon: string;
  text: string;
  isActive?: boolean;
}>();
</script>
<style scoped lang="sass" src="./serviceItemComponent.sass"></style>
