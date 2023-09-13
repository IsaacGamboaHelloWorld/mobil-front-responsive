<template>
  <div class="container-modal">
    <div class="container-header">
      <p class="vel-text-body-1 vel-text-semibold">
        {{ $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.LABEL-MODAL') }}
      </p>
      <velocity-button
        classesName="m-a text text-secondary"
        icon="icon-icon-close"
        :text="$t('REUSABLES.BUTTON.CLOSE')"
        type="button"
        @action-button="emits('close')"
      />
    </div>
    <div class="searcher">
      <velocity-searcher
        :label="$t('REUSABLES.INPUT.SEARCH')"
        :icon-right="true"
        :list="getClientList"
        property="recipientName"
        @filter-list="filterList"
        v-model="searchFieldValue"
        :place-holder="
          $t('TRANSFERS-MODULE.STEP-NEW-TRANSFER.STEP-TWO.PLACEHOLDER-SEARCH')
        "
      />
    </div>
    <div class="vel-table container-table">
      <div class="vel-table_row vel-table_header responsive-hidde p-l-8">
        <div class="row">
          <div
            class="vel-table_col"
            v-for="(header, index) in getDetailHeaders"
            :key="index"
          >
            <p class="vel-text-small vel-text-semibold">{{ header.title }}</p>
            <velocity-icon
              :is-sort-icon="true"
              @action-order-icon="
                (order:any) => {
                  sort(header.property, order);
                }
              "
            />
          </div>
        </div>
      </div>
      <template v-if="!!getClientList">
        <div class="container-records p-l-8 m-b-16">
          <div
            v-for="client in filteredList"
            class="vel-table_row"
            type="custom"
            size="normal"
            @action-acordion-button="addClientData(client), emits('close')"
            :key="client.identification"
          >
            <div class="row">
              <div class="vel-table_col">
                <p class="responsive-show vel-text-small vel-text-semibold">
                  {{ getDetailHeaders[0].title }}
                </p>
                <p class="vel-text-small">{{ client.recipientName }}</p>
              </div>
              <div class="vel-table_col">
                <p class="responsive-show vel-text-small vel-text-semibold">
                  {{ getDetailHeaders[1].title }}
                </p>
                <p class="vel-text-small">{{ client.identificationType }}</p>
              </div>
              <div class="vel-table_col">
                <p class="responsive-show vel-text-small vel-text-semibold">
                  {{ getDetailHeaders[2].title }}
                </p>
                <p class="vel-text-small">{{ client.identification }}</p>
              </div>
              <div class="vel-table_col responsive-hidde">
                <p class="vel-text-small">{{ client.financialEntityCode }}</p>
              </div>
              <div class="vel-table_col responsive-hidde">
                <p class="vel-text-small">{{ client.acctTypeTo }}</p>
              </div>
              <div class="vel-table_col responsive-hidde">
                <p class="vel-text-small">{{ client.acctIdTo }}</p>
              </div>
            </div>
            <velocity-icon
              :class="`icon icon-icon-arrow-keyboard-right ${companyName}`"
              @action-icon="addClientData(client), emits('close')"
            />
          </div>
        </div>
      </template>
      <velocity-paginator
        v-if="paginatorIsVisible"
        class="m-b-16"
        :pages="getPages"
        @get-page="(page: number) => pageIndex = page"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import VelocitySearcher from '@/commons/velocity/atoms/velocitySearcher/VelocitySearcher.vue';
import VelocityPaginator from '@/commons/velocity/molecules/velocityPaginator/VelocityPaginator.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import useRecipientLookup from '../../composables/useRecipientLookup';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import { companyName } from '@/commons/constants/companyName';

const {
  searchFieldValue,
  getDetailHeaders,
  getClientList,
  getPages,
  pageIndex,
  filteredList,
  paginatorIsVisible,
  filterList,
  sort,
  addClientData,
} = useRecipientLookup();

interface IEmits {
  (e: 'close'): void;
}
const emits = defineEmits<IEmits>();
</script>
<style scoped lang="sass" src="./RecipientLookupComponent.sass"></style>
