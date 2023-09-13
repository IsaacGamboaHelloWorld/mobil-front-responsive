<template>
  <div v-if="pages > 0" class="container-paginator">
    <velocity-button
      v-show="currentPage != 1"
      classesName="text text-secondary p-r-32 m-r-20"
      icon="icon-icon-arrow-keyboard-left"
      :text="$t('REUSABLES.BUTTON.PREVIOUS-PAGE')"
      type="button"
      @click="emits('getPage', currentPage)"
      @action-button="goPrevPage"
    />
    <div class="container-mobile">
      <button :class="`container-page-selector ${companyName} selected`">
        {{ currentPage }}
      </button>
    </div>
    <div v-if="pages <= 7" class="container-pages">
      <div v-for="(page, index) in pages" :key="index">
        <button
          @click="
            handleSelectPage(page, index + 1), emits('getPage', currentPage)
          "
          :class="[
            'container-page-selector',
            companyName,
            currentPage == page ? 'selected' : '',
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
    <div v-else class="container-pages">
      <button
        @click="handleSelectPage(1, 0), emits('getPage', currentPage)"
        :class="[
          'container-page-selector',
          companyName,
          currentPage == 1 ? 'selected' : '',
        ]"
      >
        {{ 1 }}
      </button>
      <div v-show="currentPage - 4 > 1" class="container-page-selector">
        ...
      </div>
      <div
        v-for="(page, index) in getPagesArray"
        :key="index"
        class="container-page-selector"
      >
        <button
          @click="
            handleSelectPage(page, index + 1), emits('getPage', currentPage)
          "
          :class="[
            'container-page-selector',
            companyName,
            currentPage == page ? 'selected' : '',
          ]"
        >
          {{ page }}
        </button>
      </div>
      <div v-show="currentPage + 4 < pages" class="container-page-selector">
        ...
      </div>
      <button
        @click="handleSelectPage(pages, 5), emits('getPage', currentPage)"
        :class="[
          'container-page-selector',
          companyName,
          currentPage == pages ? 'selected' : '',
        ]"
      >
        {{ pages }}
      </button>
    </div>
    <velocity-button
      v-show="currentPage != pages"
      classesName="text text-secondary p-l-32 m-l-20"
      icon="icon-icon-arrow-keyboard-right"
      :text="$t('REUSABLES.BUTTON.NEXT-PAGE')"
      type="button"
      @click="emits('getPage', currentPage)"
      @action-button="goNextPage"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { companyName } from '@/commons/constants/companyName';
import VelocityButton from '../../atoms/velocityButton/VelocityButton.vue';

export interface Props {
  pages: number;
}
interface IEmits {
  (e: 'getPage', id: number): number;
}
const props = withDefaults(defineProps<Props>(), {
  pages: 0,
});

const currentPage = ref<number>(1);
const currentIndex = ref<number>(0);
const firstPage = ref<number>(2);
const lastPage = ref<number>(5);

const getPagesArray = computed<number[]>(() => {
  const pages = [];
  for (let i = firstPage.value; i <= lastPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

const handleSelectPage = (page: number, index: number): void => {
  currentPage.value = page;
  currentIndex.value = index;

  if (props.pages <= 7) {
    return;
  }
  if (index === 0 && page !== 1) {
    if (page === 5) {
      currentIndex.value = 4;
    } else {
      currentIndex.value = 3;
    }
  }
  if (index === 5 && page !== props.pages) {
    currentIndex.value = 1;
  }
  if (
    index === 4 &&
    currentPage.value !== 5 &&
    currentPage.value + 4 <= props.pages
  ) {
    currentIndex.value = 1;
  }
  if (currentPage.value + 4 === props.pages) {
    currentIndex.value = 1;
    firstPage.value = props.pages - 4;
    lastPage.value = props.pages - 1;
  } else if (currentPage.value - 4 === 1) {
    currentIndex.value = 4;
    firstPage.value = 2;
    lastPage.value = 5;
  }
  if (currentIndex.value === 0) {
    firstPage.value = 2;
    lastPage.value = 5;
  } else if (currentIndex.value === 5) {
    firstPage.value = props.pages - 4;
    lastPage.value = props.pages - 1;
  } else if (
    currentIndex.value === 1 &&
    currentPage.value > 5 &&
    currentPage.value < props.pages - 4
  ) {
    firstPage.value = currentPage.value;
    lastPage.value = firstPage.value + 2;
  } else if (
    currentIndex.value === 3 &&
    currentPage.value > 5 &&
    currentPage.value + 4 < props.pages
  ) {
    firstPage.value = currentPage.value - 2;
    lastPage.value = firstPage.value + 2;
  }
};

const goNextPage = (): void => {
  currentPage.value++;
  currentIndex.value++;
  handleSelectPage(currentPage.value, currentIndex.value);
};

const goPrevPage = (): void => {
  currentPage.value--;
  currentIndex.value--;
  handleSelectPage(currentPage.value, currentIndex.value);
};

const resetAll = () => {
  currentIndex.value = 0;
  currentPage.value = 1;
};

const emits = defineEmits<IEmits>();
defineExpose({
  resetAll,
  currentPage,
});
</script>
<style
  scoped
  lang="sass"
  src="../velocityPaginator/VelocityPaginator.sass"
></style>
