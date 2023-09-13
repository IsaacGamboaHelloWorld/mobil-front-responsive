<template>
  <div class="w-100">
    <label class="vel-text-semibold vel-text-body-2">{{ props.label }}</label>
    <div class="w-100 button">
      <div
        class="w-90"
        @click="
          () => {
            isDisabled ? (isActive = false) : (isActive = true);
          }
        "
      >
        <p :class="`placeholder vel-text-body-2 ${!!date ? 'active' : ''}`">
          {{ !!date ? stringDate : 'Seleccione una fecha o periodo' }}
        </p>
      </div>

      <i
        v-if="!date"
        class="icon-icon-calendar w-10"
        @click="
          () => {
            isDisabled ? (isActive = false) : (isActive = true);
          }
        "
      ></i>
      <i v-else class="icon-icon-close w-10" @click="cancelAction()"></i>
    </div>
  </div>

  <velocity-modal type="custom" v-if="isActive" id="show-calendar">
    <template #component>
      <div class="container">
        <div
          :class="`${props.isMultiCalendars ? 'calendar_line' : ''} ${
            props.showFilters ? 'filters' : ''
          }`"
        ></div>

        <p
          class="vel-text-body-1 vel-text-semibold m-b-16 m-t-16 text-aling-center"
        >
          Seleccione una fecha o un periodo
        </p>
        <template v-if="props.showFilters">
          <Datepicker-component
            ref="datepicker"
            @internal-model-change="changeInternalModel"
            v-model="date"
            :preset-ranges="presetRanges"
            :range="isRange"
            :multi-calendars="isMultiCalendars"
            :inline="true"
            :day-names="['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']"
            select-text="Seleccionar"
            :max-range="!!props.period ? props.period : null"
            :min-date="!!minDate ? minDate : null"
            :max-date="!!maxDate ? maxDate : null"
            @closed="alertFn"
            cancel-text="Close"
            :enable-time-picker="false"
            locale="es"
            month-name-format="long"
          >
            <template #action-row>
              <div class="w-20" v-if="props.isMultiCalendars && props.isRange">
                <velocity-button
                  classesName="btn btn-primary"
                  size="medium"
                  :disabled="btnIsDisabled"
                  :text="
                    !!props.selectText
                      ? props.selectText
                      : $t('REUSABLES.BUTTON.SELECT')
                  "
                  type="button"
                  @action-button="selectDate"
                />
              </div>
              <div class="w-20" v-if="props.isMultiCalendars && props.isRange">
                <velocity-button
                  classesName="text text-primary "
                  :text="
                    !!props.cancelText
                      ? props.cancelText
                      : $t('REUSABLES.BUTTON.CANCEL')
                  "
                  type="button"
                  @action-button="cancelAction"
                />
              </div>
            </template>
          </Datepicker-component>
        </template>
        <template v-else>
          <Datepicker-component
            ref="datepicker"
            @internal-model-change="changeInternalModel"
            v-model="date"
            :range="isRange"
            :multi-calendars="isMultiCalendars"
            :inline="true"
            :day-names="['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']"
            select-text="Seleccionar"
            :max-range="!!props.period ? props.period : null"
            :min-date="!!minDate ? minDate : null"
            :max-date="!!maxDate ? maxDate : null"
            @closed="alertFn"
            cancel-text="Close"
            :enable-time-picker="false"
            locale="es"
            month-name-format="long"
          >
            <template #action-row>
              <div class="w-20" v-if="props.isMultiCalendars && props.isRange">
                <velocity-button
                  classesName="btn btn-primary"
                  size="medium"
                  :disabled="btnIsDisabled"
                  :text="
                    !!props.selectText
                      ? props.selectText
                      : $t('REUSABLES.BUTTON.SELECT')
                  "
                  type="button"
                  @action-button="selectDate"
                />
              </div>
              <div class="w-20" v-if="props.isMultiCalendars && props.isRange">
                <velocity-button
                  classesName="text text-primary"
                  :text="
                    !!props.cancelText
                      ? props.cancelText
                      : $t('REUSABLES.BUTTON.CANCEL')
                  "
                  type="button"
                  @action-button="cancelAction"
                />
              </div>
            </template>
          </Datepicker-component>
        </template>
      </div>
    </template>
  </velocity-modal>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
} from 'date-fns';

import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import VelocityButton from '../../atoms/velocityButton/VelocityButton.vue';

export interface Props {
  label?: string;
  isDisabled?: boolean;
  period?: string;
  endDate?: string;
  startDate?: string;
  selectText?: string;
  cancelText?: string;
  showFilters?: boolean;
  isRange?: boolean;
  isMultiCalendars?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  isDisabled: false,
  period: '',
  endDate: '',
  startDate: '',
  selectText: '',
  cancelText: '',
  showFilters: true,
  isRange: true,
  isMultiCalendars: true,
});

interface IEmits {
  (e: 'getDate', date: string[]): string;
}

const datepicker = ref();

const isActive = ref<boolean>(false);
const date = ref<Date | any>();
const btnIsDisabled = ref<boolean>(true);
const stringDate = ref<string>('');
const minDate = computed(() => {
  if (!!props.startDate) return new Date(props.startDate);
  return null;
});
const maxDate = computed(() => {
  if (!!props.endDate) return new Date(props.endDate);
  return null;
});

const presetRanges = ref([
  { label: 'Hoy', range: [new Date(), new Date()] },
  {
    label: 'mes actual',
    range: [startOfMonth(new Date()), endOfMonth(new Date())],
  },
  {
    label: 'mes pasado',
    range: [
      startOfMonth(subMonths(new Date(), 1)),
      endOfMonth(subMonths(new Date(), 1)),
    ],
  },
  {
    label: 'ano actual',
    range: [startOfYear(new Date()), endOfYear(new Date())],
  },
]);

const alertFn = () => {
  alert('Menu closed');
};

const formateDate = (date: Date): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = date.getDate();

  return `${year}/${formattedMonth.toString()}/${day.toString()}`;
};

const emits = defineEmits<IEmits>();

const cancelAction = () => {
  isActive.value = false;
  date.value = '';
  emits('getDate', ['', '']);
};

const selectDate = () => {
  datepicker.value.selectDate();

  if (!!date.value) {
    if (!!date.value[0] && !!date.value[1]) {
      emits('getDate', [
        formateDate(date.value[0]),
        formateDate(date.value[1]),
      ]);
      stringDate.value =
        formateDate(date.value[0]) + '-' + formateDate(date.value[1]);
    } else if (!!date.value[0]) {
      isActive.value = false;
      emits('getDate', [
        formateDate(date.value[0]),
        formateDate(date.value[0]),
      ]);
      stringDate.value = formateDate(date.value[0]);
    } else {
      isActive.value = false;
      emits('getDate', [formateDate(date.value), '']);
      stringDate.value = formateDate(date.value);
    }
  }
  isActive.value = false;
};

const changeInternalModel = ($event: any): void => {
  if (!!$event) {
    btnIsDisabled.value = false;
    if (!props.isMultiCalendars && !props.isRange) {
      selectDate();
    }
  } else {
    btnIsDisabled.value = true;
  }
};
</script>
<style scoped lang="sass" src="./VelocityCalendar.sass"></style>
