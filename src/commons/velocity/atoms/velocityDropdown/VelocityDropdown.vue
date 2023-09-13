<template>
  <div class="container-dropdown w-100" v-if="props.type === 'custom'">
    <div class="container-label">
      <p
        :class="[
          props.hasError ? 'error' : '',
          isActive ? 'selected' : '',
          'label-text vel-text-body-2 vel-text-semibold',
        ]"
      >
        {{ props.label }}
      </p>
      <i
        id="icon-label"
        :class="[
          labelIcon,
          hasError ? 'error' : '',
          isActive ? 'selected' : '',
        ]"
      ></i>
    </div>

    <div class="container-selector">
      <input
        v-model="value"
        :class="[
          props.hasError ? 'selector-error' : '',
          'selector vel-text-body-2 p-l-8 w-100',
        ]"
        :readonly="!isWritable"
        type="text"
        @click="isActive = !isActive"
        :placeholder="placeholder"
      />
      <div v-if="getIsActive" class="container-options fade-in-down w-100">
        <div
          :class="`option w-100 ${companyName}`"
          v-for="item in props.list"
          :key="item"
          @click="
            isActive = false;
            value = item;
          "
        >
          <p class="vel-text-body-1">{{ item }}</p>
        </div>
      </div>
      <i
        id="icon-arrow"
        :class="
          !getIsActive
            ? 'icon-icon-arrow-expand-more'
            : 'icon-icon-arrow-expand-less'
        "
        @click="isActive = !isActive"
      ></i>
    </div>
    <p v-if="props.hasError" class="message vel-text-small error m-b-8">
      {{ props.errorMessage }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { companyName } from '@/commons/constants/companyName';

export interface Props {
  list?: string[];
  label?: string;
  modelValue: string;
  placeholder?: string;
  isWritable?: boolean;
  type?: string;
  labelIcon?: string;
  hasError?: boolean;
  errorMessage?: string | any;
}

interface IEmits {
  (e: 'update:modelValue', value: string): void;
}
const emits = defineEmits<IEmits>();

const props = withDefaults(defineProps<Props>(), {
  list: () => [''],
  label: '',
  placeholder: '',
  isWritable: false,
  type: 'custom',
  labelIcon: '',
  hasError: false,
  errorMessage: '',
});

const isActive = ref<boolean>(false);

const getIsActive = computed(() => {
  return isActive.value;
});

const value = computed<string>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value.toString());
  },
});
</script>
<style
  scoped
  lang="sass"
  src="./../velocityDropdown/VelicityDropdown.sass"
></style>
