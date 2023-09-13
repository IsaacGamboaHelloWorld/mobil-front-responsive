<template>
  <div class="container-modal">
    <div v-if="props.type == 'warning'" class="icon-warning container-icon">
      <i class="icon icon-warning icon-icon-warning"></i>
    </div>
    <div v-else class="icon-check container-icon">
      <i class="icon icon-check icon-icon-check"></i>
    </div>
    <div class="w-100 m-b-12">
      <div class="container-text">
        <p class="vel-text-body-1 vel-text-semibold">
          {{ props.title }}
        </p>
        <p class="vel-text-body-2 p-t-8 text-l">
          {{ props.body }}
        </p>
      </div>
      <velocity-button
        v-if="!!buttonLabel"
        classes-name="btn btn-primary"
        :text="props.buttonLabel"
        size="medium"
        type="button"
        @click="emits('actionButtonConfirm')"
      />
      <velocity-button
        v-if="props.hasCancelButton"
        class="p-t-8"
        classesName="text text-primary m-a"
        :text="$t('REUSABLES.BUTTON.CANCEL')"
        size="medium"
        type="button"
        @click="emits('actionButtonCancel')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VelocityButton from '../../atoms/velocityButton/VelocityButton.vue';
export interface Props {
  type: 'warning' | 'check';
  title?: string;
  body?: string;
  buttonLabel?: string;
  hasCancelButton?: boolean;
}
interface IEmits {
  (e: 'actionButtonConfirm'): void;
  (e: 'actionButtonCancel'): void;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'check',
  title: '',
  body: '',
  buttonLabel: '',
  hasCancelButton: true,
});

const emits = defineEmits<IEmits>();
</script>

<style scoped lang="sass" src="./VelocityConfirmationModal.sass"></style>
