<template>
  <div :class="`container-notification ${company}`">
    <p class="vel-text-overline color-neutral">
      {{ formateDate(new Date(props.date)) }}
    </p>
    <p class="p-t-8 vel-text-body-2 vel-text-semibold">
      {{ !!title ? title : '' }}
    </p>
    <p class="p-t-8 vel-text-body-2">
      {{ !!content ? content : '' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import useFormattHelper from '@/commons/helpers/formatMoney';

const { formateDate } = useFormattHelper();

interface Props {
  date: string;
  title: string;
  content: string;
  company: string;
}

const props: Props = withDefaults(defineProps<Props>(), {
  date: '',
  title: '',
  content: '',
  company: '',
});
</script>

<style scoped lang="sass" src="./ItemNotificationComponent.sass"></style>
