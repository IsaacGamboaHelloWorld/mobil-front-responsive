<template>
  <div>
    <h1>holaaaa desde banco</h1>
    {{ authState.status.message }}
  </div>
</template>

<style lang="sass"></style>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../auth/store/useAuthStore';

const store = useAuthStore();
const { authState } = storeToRefs(store);
</script>
