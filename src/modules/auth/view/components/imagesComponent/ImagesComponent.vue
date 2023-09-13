<template>
  <VelocityModal v-if="!!isImagesFetching" type="spinner"> </VelocityModal>
  <div class="container-main">
    <p class="vel-text-body-1 vel-text-semibold p-b-16">
      {{ $t('AUTH-MODULE.STEPS.IMAGES.HEADER') }}
    </p>
    <p class="vel-text-body-2 vel-text-light p-b-16">
      {{ $t('AUTH-MODULE.STEPS.IMAGES.BODY') }}
    </p>
    <velocity-dropdown
      v-model="selectedCategory"
      label-icon="icon-icon-person"
      :list="categoryList"
      :has-error="imageWasUsedBefore"
      :error-message="usedImageMEssage"
      :label="$t('AUTH-MODULE.STEPS.IMAGES.DROPDOWN-LABEL')"
      :placeholder="$t('AUTH-MODULE.STEPS.IMAGES.DROPDOWN-PLACEHOLDER')"
    />
    <div class="container-images">
      <div
        v-for="image in imagesList"
        :key="image.name"
        class="photo-container"
      >
        <img
          class="photo"
          @click="selectedImage = image.name"
          :src="`data:image/png;base64,${image.encodedImageFile}`"
          draggable="false"
        />
        <div
          class="photo-overlay"
          :style="{ display: selectedImage === image.name ? 'block' : 'none' }"
        ></div>
      </div>
    </div>
    <velocity-button
      class="p-t-22"
      classes-name="btn btn-primary"
      :text="$t('REUSABLES.BUTTON.CONTINUE')"
      size="medium"
      type="button"
      :disabled="isDisabled"
      @action-button="toggleModal()"
    />
    <velocity-button
      class="p-t-8"
      classesName="text text-primary m-a"
      :text="$t('REUSABLES.BUTTON.CANCEL')"
      size="medium"
      type="button"
      @action-button="cancel()"
    />
  </div>
  <VelocityModal
    v-if="displayConfirmationModal"
    type="custom"
    id="confirmacion cambio de imagen"
  >
    <template #component>
      <ConfirmationModalComponent />
    </template>
  </VelocityModal>
</template>
<script setup lang="ts">
import useImages from '@/modules/auth/composables/useImages';
import VelocityDropdown from '@/commons/velocity/atoms/velocityDropdown/VelocityDropdown.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import ConfirmationModalComponent from './components/ConfirmationModalComponent.vue';

const {
  isDisabled,
  displayConfirmationModal,
  categoryList,
  imagesList,
  selectedCategory,
  selectedImage,
  cancel,
  toggleModal,
  isImagesFetching,
  usedImageMEssage,
  imageWasUsedBefore,
} = useImages();
</script>
<style scoped lang="sass" src="./ImagesComponent.sass"></style>
