<template>
  <div class="container-button">
    <button
      :type="props.type"
      :class="`${classesName} ${companyName} ${props.size}`"
      :disabled="disabled"
      :id="id"
      @click="clickEvent()"
    >
      <div :class="`text-container ${hideTextOnMobile ? 'hide-text' : ''}`">
        <span :innerHTML="text" class="vel-text-bold"></span>
      </div>
      <i class="m-l-8" v-if="!!icon" :class="icon"></i>

      <small class="loading-dots">
        <span class="dot-btn"></span>
        <span class="dot-btn"></span>
        <span class="dot-btn"></span>
      </small>
    </button>
    <div v-if="!!props.export && isActive">
      <ul :class="`selector ${!!up ? 'up' : 'down'}`">
        <li
          v-if="
            getExportType === 'ALL' ||
            getExportType === 'PDF' ||
            getExportType === 'PDFPRINT' ||
            getExportType === 'XLSPDF'
          "
          class="vel-text-body-1"
          @click="
            emits('exportPdf');
            isActive = false;
          "
        >
          PDF
        </li>
        <li
          v-if="
            getExportType === 'ALL' ||
            getExportType === 'XLS' ||
            getExportType === 'XLSPRINT' ||
            getExportType === 'XLSPDF'
          "
          class="vel-text-body-1"
          @click="
            emits('exportExcel');
            isActive = false;
          "
        >
          Excel
        </li>
        <li
          class="vel-text-body-1"
          v-if="
            getExportType === 'ALL' ||
            getExportType === 'PRINT' ||
            getExportType === 'PDFPRINT' ||
            getExportType === 'XLSPRINT'
          "
          @click="print()"
        >
          Imprimir
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import { companyName } from '@/commons/constants/companyName';
import { useGlobalStore } from '@/stores/globalStore';

const globalStore = useGlobalStore();
const { currentGlobalStep, currentModule } = storeToRefs(globalStore);

interface Props {
  type?: 'submit' | 'button' | 'reset';
  size?: 'large' | 'medium' | 'small' | 'default' | 'text-medium';
  classesName: string;
  disabled?: boolean;
  id?: string;
  text: string;
  icon?: string;
  isLoading?: boolean;
  up?: boolean;
  export?: boolean;
  exportTypes?: string;
  hideTextOnMobile?: boolean;
}

interface IEmits {
  (e: 'actionButton'): void;
  (e: 'exportExcel'): void;
  (e: 'exportPdf'): void;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  size: 'default',
  classesName: '',
  disabled: false,
  id: '',
  text: '',
  icon: '',
  isLoading: false,
  up: true,
  export: false,
  exportTypes: '',
  hideTextOnMobile: false,
});

const isActive = ref<boolean>(false);
const emits = defineEmits<IEmits>();

const print = () => {
  window.print();
};
const clickEvent = () => {
  (window as any).utag.link({
    tealium_event: 'click',
    event_category: currentModule.value + '-' + currentGlobalStep.value,
    event_label: props.text,
    token: !!localStorage.getItem('token')
      ? !!localStorage.getItem('token')
      : '',
  });
  emits('actionButton');
  !!isActive.value ? (isActive.value = false) : (isActive.value = true);
};
const getExportType = computed<string>(() => {
  if (!!props.exportTypes) {
    if (props.exportTypes === 'XLS') return 'XLS';
    if (props.exportTypes === 'PDF') return 'PDF';
    if (props.exportTypes === 'PRINT') return 'PRINT';
    if (props.exportTypes === 'XLSPDF') return 'XLSPDF';
    if (props.exportTypes === 'XLSPRINT') return 'XLSPRINT';
    if (props.exportTypes === 'PDFPRINT') return 'PDFPRINT';
  }
  return 'ALL';
});
</script>

<style scoped lang="sass" src="./VelocityButton.sass"></style>
