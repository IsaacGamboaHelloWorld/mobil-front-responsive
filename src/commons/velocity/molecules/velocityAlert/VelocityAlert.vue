<template>
  <div
    :class="`container-alert ${type}`"
    :hasIcon="hasIcon"
    :title="title"
    :body="body"
    :footer="footer"
  >
    <div>
      <div class="container-icon-left p-r-10">
        <i v-if="hasIcon" :class="`icon ${setIcon}`"></i>
      </div>
      <div>
        <h3 v-if="!!title" class="vel-text-semibold m-b-8">
          {{ title }}
        </h3>
        <p class="vel-text-small">
          <span class="vel-text-bold">{{ boldText }} </span> {{ body }}
        </p>
        <div v-if="!!footer">
          <hr class="line" />
          <p class="vel-text-small">{{ footer }}</p>
        </div>
      </div>
    </div>
    <div
      :class="`${!!title && !!footer ? 'flex-start' : ''} container-icon-right`"
    >
      <i
        v-if="isClosable"
        class="icon-icon-close"
        @click="emits('actionIcon')"
      ></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  type: 'blue' | 'green' | 'yellow' | 'red';
  hasIcon?: boolean;
  title?: string;
  body: string;
  boldText?: string;
  footer?: string;
  isClosable?: boolean;
  altIcon?: string;
}
interface IEmits {
  (e: 'actionIcon'): void;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'blue',
  hasIcon: false,
  title: '',
  body: '',
  boldText: '',
  footer: '',
  isClosable: false,
  altIcon: '',
});

const setIcon = computed(() => {
  if (props.hasIcon) {
    if (!!props.altIcon) return props.altIcon;
    if (props.type == 'red') {
      return 'icon-icon-warning';
    } else if (props.type == 'blue') {
      return 'icon-icon-info';
    } else if (props.type == 'yellow') {
      return 'icon-icon-warning';
    } else if (props.type == 'green') {
      return 'icon-icon-check';
    }
  }
  return '';
});

(window as any).utag.track({
  tealium_event: 'exception',
  description: props.boldText,
  fatal: 'false',
  token: !!localStorage.getItem('token') ? !!localStorage.getItem('token') : '',
});

const emits = defineEmits<IEmits>();
</script>
<style scoped lang="sass" src="../velocityAlert/VelocityAlert.sass"></style>
