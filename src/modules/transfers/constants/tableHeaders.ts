import i18n from '@/locales/i18n';
import { computed } from 'vue';

export const getDetailHeaders = computed<{ title: string; property: string }[]>(
  () => [
    {
      title: i18n.global.t(
        'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-1',
      ),
      property: 'date',
    },
    {
      title: i18n.global.t(
        'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-2',
      ),
      property: 'productName',
    },
    {
      title: i18n.global.t(
        'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-3',
      ),
      property: 'recipientName',
    },
    {
      title: i18n.global.t(
        'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-4',
      ),
      property: 'bank',
    },
    {
      title: i18n.global.t(
        'TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-THREE.TABLE-HEADER.LABEL-5',
      ),
      property: 'value',
    },
  ],
);
