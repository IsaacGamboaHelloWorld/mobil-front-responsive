<template>
  <div class="container_table">
    <table class="table w-100">
      <thead class="table_header">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="semibold vel-text-body-2 vel-text-semibold"
          >
            {{ header }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody class="table_body">
        <template
          v-for="(record, index) in mapRecords.slice(init, end)"
          :key="index"
        >
          <tr :class="`vel-text-body-2 ${!!record.isActive ? 'active' : ''}`">
            <template v-for="(property, key, index) in record" :key="index">
              <td
                v-if="
                  key.toString() !== 'isActive' &&
                  key.toString() !== 'detailFirstCol' &&
                  key.toString() !== 'detailSecondCol'
                "
              >
                {{ property }}
              </td>
            </template>
            <td v-if="!!props.buttonText" id="container-button">
              <velocity-button
                v-if="!props.tableBeginActive"
                classes-name="text text-secondary"
                :disabled="false"
                :text="buttonText"
                :icon="props.icon"
                @action-button="
                  () => {
                    emit('actionButton', record);
                    record.isActive
                      ? (record.isActive = false)
                      : (record.isActive = true);
                  }
                "
              />
            </td>
          </tr>
          <tr
            :class="`container-dropdown${
              record.isActive || props.tableBeginActive ? '-active' : ''
            } fade-in-down-table`"
            v-if="!!record.detailFirstCol"
          >
            <td colspan="2">
              <p
                class="m-l-16 m-b-16 vel-text-semibold vel-text-body-2"
                v-if="!!props.titleDetail"
              >
                {{ titleDetail }}
              </p>
              <div class="container-detail-col">
                <template
                  v-for="(item, index) in record.detailFirstCol"
                  :key="index"
                >
                  <div v-if="!!item.value" class="container-row">
                    <p class="vel-text-semibold vel-text-small">
                      {{ item.label }}
                    </p>
                    <p class="vel-text-small color-neutral">
                      {{ item.value }}
                    </p>
                  </div>
                </template>
              </div>
            </td>
            <td colspan="2">
              <p class="m-b-16 white-space" v-if="!!props.titleDetail"></p>
              <div class="container-detail-col">
                <template
                  v-for="(item, index) in record.detailSecondCol"
                  :key="index"
                >
                  <div v-if="!!item.value" class="container-row">
                    <p class="vel-text-semibold vel-text-small">
                      {{ item.label }}
                    </p>
                    <p class="vel-text-small color-neutral">
                      {{ item.value }}
                    </p>
                  </div>
                </template>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <velocity-paginator
      class="m-t-28"
      :pages="totalPages"
      @get-page="changePage"
    />
  </div>

  <div class="container_table-responsive">
    <table class="table w-100">
      <thead class="table_header">
        <tr>
          <th colspan="2">
            Ordenar por nombre
            <i class="icon-icon-arrow-down" @click="prueba()"></i>
          </th>
        </tr>
      </thead>
      <tbody class="table_body">
        <template
          v-for="(record, index) in mapRecords.slice(initMobile, endMobile)"
          :key="index"
        >
          <tr>
            <td
              colspan="2"
              :class="`container-icon ${!!record.isActive ? 'active' : ''}`"
            >
              <i
                v-if="!record.isActive && !props.tableBeginActive"
                :class="`icon-icon-arrow-expand-more  ${companyName}`"
                @click="
                  record.isActive
                    ? (record.isActive = false)
                    : (record.isActive = true)
                "
              ></i>
              <i
                v-if="!!record.isActive && !props.tableBeginActive"
                :class="`icon-icon-arrow-expand-less  ${companyName}`"
                @click="
                  record.isActive
                    ? (record.isActive = false)
                    : (record.isActive = true)
                "
              ></i>
            </td>
          </tr>
          <tr class="vel-text-body-2">
            <td
              colspan="2"
              :class="`container-labels ${!!record.isActive ? 'active' : ''}`"
            >
              <template v-for="(property, key, index) in record" :key="index">
                <div
                  class="headers m-b-12"
                  v-if="
                    key.toString() !== 'isActive' &&
                    key.toString() !== 'detailFirstCol' &&
                    key.toString() !== 'detailSecondCol' &&
                    (index == 0 || index == 1)
                  "
                >
                  <p class="w-50 vel-text-semibold vel-text-small">
                    {{ headers[index] }}
                  </p>
                  <p class="w-50 vel-text-small color-neutral">
                    {{ property }}
                  </p>
                </div>
              </template>
            </td>
          </tr>
          <tr
            :class="`container-dropdown${
              record.isActive || props.tableBeginActive ? '-active' : ''
            } fade-in-down-table`"
            v-if="!!record.detailFirstCol"
          >
            <td colspan="2">
              <p class="m-l-16 m-b-16 vel-text-semibold vel-text-body-2">
                Detalle
              </p>
              <div class="container-detail-col">
                <template
                  v-for="(item, index) in record.detailFirstCol.concat(
                    record.detailSecondCol,
                  )"
                  :key="index"
                >
                  <div v-if="!!item.value" class="container-row">
                    <p class="vel-text-semibold vel-text-small">
                      {{ item.label }}
                    </p>
                    <p class="vel-text-small color-neutral">
                      {{ item.value }}
                    </p>
                  </div>
                </template>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <velocity-paginator
      class="m-t-28 m-b-28"
      :pages="totalPagesMobile"
      @get-page="changePage"
    />
  </div>
</template>
<style lang="sass" src="./VelocityTable.sass"></style>

<script setup lang="ts">
import { ref, computed, toRef } from 'vue';

import { companyName } from '@/commons/constants/companyName';
import VelocityButton from '../../atoms/velocityButton/VelocityButton.vue';
import VelocityPaginator from '../../molecules/velocityPaginator/VelocityPaginator.vue';
export interface IProps {
  headers: string[];
  records: any[];
  buttonText?: string;
  titleDetail?: string;
  icon?: string;
  tableBeginActive?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  headers: () => [],
  records: () => [],
  buttonText: '',
  icon: 'icon-icon-arrow-expand-more',
  tableBeginActive: false,
});

const emit = defineEmits<{
  (e: 'actionButton', record: any): void;
}>();

const mapRecords = toRef(props, 'records');
const currentPage = ref<number>(1);
const getTotalRecords = computed(() => props.records.length);

const changePage = ($event: any): void => {
  currentPage.value = $event;
  //for desktop
  init.value =
    currentPage.value * elementsPerPageDesktop - elementsPerPageDesktop;
  end.value = currentPage.value * elementsPerPageDesktop;

  //for Mobile
  initMobile.value =
    currentPage.value * elementsPerPageMobile - elementsPerPageMobile;
  endMobile.value = currentPage.value * elementsPerPageMobile;
};

const elementsPerPageDesktop: number = 10;
const elementsPerPageMobile: number = 5;

const init = ref<number>(
  currentPage.value * elementsPerPageDesktop - elementsPerPageDesktop,
);
const end = ref<number>(currentPage.value * elementsPerPageDesktop);

const initMobile = ref<number>(
  currentPage.value * elementsPerPageMobile - elementsPerPageMobile,
);
const endMobile = ref<number>(currentPage.value * elementsPerPageMobile);

const totalPagesMobile = computed(() =>
  Math.ceil(getTotalRecords.value / elementsPerPageDesktop),
);
const totalPages = computed(() =>
  Math.ceil(getTotalRecords.value / elementsPerPageDesktop),
);

const prueba = () => {
  mapRecords.value.sort((a, b) => {
    if (a.acctNickName > b.acctNickName) {
      return 1;
    }
    if (a.acctNickName < b.acctNickName) {
      return -1;
    }
    return 0;
  });
};
</script>
