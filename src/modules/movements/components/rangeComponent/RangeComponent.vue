<template>
  <velocity-modal type="custom">
    <template #component>
      <div class="container_range_component">
        <div class="m-b-16">
          <velocity-input
            id="startValue"
            :place-holder="props.placeHolderStartValue"
            :label="props.labelStartValue"
            v-model="startValue"
            :has-error="!startValue"
            :only-numbers="true"
            :with-value-format="true"
          />
        </div>
        <div>
          <velocity-input
            id="startValue"
            :place-holder="props.placeHolderEndtValue"
            :label="props.labelEndValue"
            v-model="endValue"
            :has-error="!endValue"
            :only-numbers="true"
            :with-value-format="true"
          />
        </div>
        <div class="container_buttons">
          <div class="m-r-10">
            <velocity-button
              classes-name="text text-primary"
              size="small"
              :text="$t('REUSABLES.BUTTON.CANCEL')"
              @action-button="emit('close-modal')"
            />
          </div>
          <div>
            <velocity-button
              classes-name="btn btn-primary"
              size="small"
              :disabled="!startValue || !endValue"
              :text="$t('REUSABLES.BUTTON.SELECT')"
              @action-button="emit('range', startValue, endValue)"
            />
          </div>
        </div>
      </div>
    </template>
  </velocity-modal>
</template>
<style scoped src="./RangeComponent.sass" lang="sass"></style>
<script lang="ts" setup>
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import { ref } from 'vue';

const props = defineProps<{
  placeHolderStartValue: string;
  placeHolderEndtValue: string;
  labelStartValue: string;
  labelEndValue: string;
}>();

const emit = defineEmits<{
  (e: 'range', startValue: string, endValue: string): void;
  (e: 'close-modal'): void;
}>();

const startValue = ref<string>('');
const endValue = ref<string>('');
</script>
