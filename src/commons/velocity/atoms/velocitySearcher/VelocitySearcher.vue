<template>
  <div>
    <p
      :class="`label vel-text-body-2 vel-text-semibold ${
        !!isActive ? 'selected' : ''
      }`"
    >
      {{ props.label }}
    </p>
    <div class="container-input">
      <input
        :maxlength="props.maxlength"
        :class="`input w-100  ${!!iconRight ? 'p-l-8' : 'p-l-32'}`"
        name="input"
        type="text"
        @focus="isActive = true"
        @focusout="isActive = false"
        :placeholder="props.placeHolder"
        v-model="refValue"
      />
      <i
        :class="`icon-icon-search color-neutral ${
          !!iconRight ? 'right' : 'left'
        }`"
      ></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

export interface Props {
  list: any[];
  label?: string;
  placeHolder?: string;
  property: string;
  iconRight?: boolean;
  maxlength?: number;
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  label: '',
  placeHolder: '',
});

const emit = defineEmits<{
  (e: 'filterList', filterList: any[]): void;
}>();
const refValue = ref<string>('');
const isActive = ref<boolean>(false);

watch(
  refValue,
  (searchValue) => {
    const filterList = props.list.filter(
      (item) =>
        item[props.property]
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) !== -1,
    );
    emit('filterList', filterList);
  },
  { immediate: true },
);

watch(
  () => props.list,
  (list) => {
    emit('filterList', list);
  },
);
</script>
<style scoped lang="sass" src="./VelocitySearcher.sass"></style>
