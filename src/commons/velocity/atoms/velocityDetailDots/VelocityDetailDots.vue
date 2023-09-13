<template>
  <div class="container-icon">
    <i
      :class="`icon ${companyName} ${isActive ? 'active' : ''}`"
      :id="id"
      @click="isActive ? (isActive = false) : (isActive = true)"
      class="icon-icon-menu-dots"
    ></i>

    <div v-if="isActive">
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
import { computed, ref } from 'vue';

import { companyName } from '@/commons/constants/companyName';

interface Props {
  disabled?: boolean;
  id?: string;
  up?: boolean;
  exportTypes?: string;
}

interface IEmits {
  (e: 'actionButton'): void;
  (e: 'exportExcel'): void;
  (e: 'exportPdf'): void;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  id: '',
  up: true,
  exportTypes: '',
});

const isActive = ref<boolean>(false);
const emits = defineEmits<IEmits>();

const print = () => {
  window.print();
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

<style scoped lang="sass" src="./VelocityDetailDots.sass"></style>
