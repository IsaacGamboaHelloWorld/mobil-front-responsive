<template>
  <div class="velocity-accordion">
    <div
      class="container-header"
      v-if="!!props.title && props.type === 'normal'"
    >
      <p
        :class="
          props.size === 'big'
            ? 'vel-text-body-1 vel-text-semibold'
            : 'vel-text-small vel-text-semibold'
        "
      >
        {{ props.title }}
      </p>
      <velocity-button
        :icon="
          !!toggle
            ? 'icon-icon-arrow-expand-less'
            : 'icon-icon-arrow-expand-more'
        "
        classesName="text text-secondary m-a"
        :text="
          !!toggle ? $t('REUSABLES.BUTTON.LESS') : $t('REUSABLES.BUTTON.PLUS')
        "
        size="text-medium"
        type="button"
        @action-button="switchToggleMenu()"
      />
    </div>
    <div
      v-if="props.type === 'custom'"
      :class="`container-head  ${!!toggle ? 'open' : ''}`"
    >
      <slot name="head"></slot>
      <velocity-button
        :class="{ 'acordion-icon': !!props.isForTable }"
        v-if="!props.arrowDisabled"
        :icon="
          props.arrowRigth
            ? 'icon-icon-arrow-keyboard-right'
            : !!toggle
            ? 'icon-icon-arrow-expand-less'
            : 'icon-icon-arrow-expand-more'
        "
        classesName="text text-secondary m-r-20"
        :text="getBtnText"
        :hide-text-on-mobile="props.hideTextOnMobile"
        size="text-medium"
        type="button"
        @action-button="switchToggleMenu()"
      />
    </div>
    <div
      v-show="!!toggle"
      :class="`container-body w-100 ${!!toggle ? 'open' : ''} fade-in-down`"
    >
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import VelocityButton from '../../atoms/velocityButton/VelocityButton.vue';
import i18n from '@/locales/i18n';

interface IEmits {
  (e: 'actionAcordionButton', state: boolean): void;
}
interface Props {
  btnText?: string;
  title?: string;
  type: 'custom' | 'normal';
  size?: 'big' | 'normal';
  arrowDisabled?: boolean;
  arrowRigth?: boolean;
  isForTable?: boolean;
  isActive?: boolean;
  textInButton?: boolean;
  hideTextOnMobile?: boolean;
}

const getBtnText = computed<string>(() => {
  if (props.textInButton) {
    return !!toggle.value
      ? i18n.global.t('REUSABLES.BUTTON.LESS')
      : i18n.global.t('REUSABLES.BUTTON.PLUS');
  } else {
    return props.btnText || '';
  }
});

const props = withDefaults(defineProps<Props>(), {
  arrowDisabled: false,
  arrowRigth: false,
  hideTextOnMobile: false,
});

const toggle = ref<boolean>(false);
const emits = defineEmits<IEmits>();

onBeforeMount(() => {
  if (props.isActive) toggle.value = true;
});

const switchToggleMenu = (): void => {
  !toggle.value ? (toggle.value = true) : (toggle.value = false);
  emits('actionAcordionButton', toggle.value);
};
defineExpose({
  switchToggleMenu,
});
</script>

<style scoped lang="sass" src="./VelocityAcordion.sass"></style>
