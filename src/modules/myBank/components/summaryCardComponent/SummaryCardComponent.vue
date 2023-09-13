<template>
  <div class="card_component">
    <div class="card_component_header">
      <p v-if="!!props.summaryProducts.title" class="vel-text-semibold">
        {{ props.summaryProducts.title }}
      </p>
      <velocity-button
        v-if="!!props.summaryProducts.navigateTo"
        size="text-medium"
        classes-name="text text-secondary"
        icon="icon-icon-arrow-keyboard-right"
        :text="$t('MY-BANK-MODULE.SUMMARY-CARDS.BUTTON')"
        @action-button="navigate()"
      />
    </div>
    <div class="card_component_body">
      <div>
        <p class="vel-text-semibold vel-text-body-2">
          {{ $t('MY-BANK-MODULE.SUMMARY-CARDS.AVAILABLE-BALANCE') }}
        </p>
        <p class="color-neutral vel-text-body-2">
          {{ availableBalance }}
        </p>
      </div>
      <div>
        <p class="vel-text-semibold vel-text-body-2">
          {{ $t('MY-BANK-MODULE.SUMMARY-CARDS.REDEMPTION-BALANCE') }}
        </p>
        <p class="color-neutral vel-text-body-2">
          {{ tradeBalance }}
        </p>
      </div>
      <div>
        <p class="vel-text-semibold vel-text-body-2">
          {{ $t('MY-BANK-MODULE.SUMMARY-CARDS.CURRENT-BALANCE') }}
        </p>
        <p class="color-neutral vel-text-body-2">{{ currentBalance }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass" src="./SummaryCardComponent.sass"></style>
<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import type { ISummaryProducts } from '@/modules/myBank/entities/myBankInterfaces';
import useMyBankStore from '../../store/useMyBankStore';
import STEPS from '../../constants/steps';
import useFormattHelper from '@/commons/helpers/formatMoney';

const myBankStore = useMyBankStore();
const { addCurrencyDot } = useFormattHelper();
const { currentStep } = storeToRefs(myBankStore);

const props = defineProps<{
  summaryProducts: ISummaryProducts;
}>();

const navigate = (): void => {
  props.summaryProducts.navigateTo === STEPS.stepDDADetail
    ? (currentStep.value = STEPS.stepDDADetail)
    : (currentStep.value = STEPS.stepSDADetail);
};

const availableBalance = computed<string>(() =>
  addCurrencyDot(props.summaryProducts.availableBalance),
);
const tradeBalance = computed<string>(() =>
  addCurrencyDot(props.summaryProducts.tradeBalance),
);
const currentBalance = computed<string>(() =>
  addCurrencyDot(props.summaryProducts.currentBalance),
);
</script>
