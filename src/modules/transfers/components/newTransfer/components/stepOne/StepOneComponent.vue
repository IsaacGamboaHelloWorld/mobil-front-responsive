<template>
  <div class="container-component w-100">
    <div class="container-menu">
      <p class="vel-text-body-1 vel-text-semibold">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-ONE.HEADER') }}
      </p>
      <div class="container-dropdowns m-t-18">
        <velocity-dropdown
          :list="getProductTypeList"
          :label="$t('REUSABLES.INPUT.PRODUCT-TYPE')"
          :placeholder="$t('REUSABLES.INPUT.SELECT-ONE')"
          v-model="newTransfer.acctTypeFromDesc"
        >
        </velocity-dropdown>
        <velocity-dropdown
          :list="filteredProductList"
          :is-writable="true"
          :label="$t('REUSABLES.INPUT.PRODUCT-NAME')"
          :placeholder="$t('REUSABLES.INPUT.TYPE-OR-SELECT-ONE')"
          v-model="selectedProduct"
        >
        </velocity-dropdown>
      </div>
      <div class="container-check m-t-26">
        <input type="checkbox" id="myCheckbox" v-model="isProgrammedTransfer" />
        <p class="vel-text-body-2 m-l-8">
          {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-ONE.BOX-CHECK') }}
        </p>
      </div>
      <div v-if="isProgrammedTransfer" class="m-t-24 container-calendar">
        <velocity-calendar
          @get-date="(date: string[]) => newTransfer.txDate = date[0]"
          label="Fecha"
          :show-filters="false"
          :simple-calendar="true"
          :is-multi-calendars="false"
          :is-range="false"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VelocityDropdown from '@/commons/velocity/atoms/velocityDropdown/VelocityDropdown.vue';
import useStepOne from './../../composables/useStepOne';
import VelocityCalendar from '@/commons/velocity/molecules/velocityCalendar/VelocityCalendar.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
const {
  newTransfer,
  getProductTypeList,
  filteredProductList,
  isProgrammedTransfer,
  selectedProduct,
} = useStepOne();
</script>
<style scoped lang="sass" src="./StepOneComponent.sass"></style>
