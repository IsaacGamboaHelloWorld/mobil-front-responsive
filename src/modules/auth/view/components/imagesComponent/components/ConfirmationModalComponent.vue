<template>
  <div class="container-modal">
    <div v-if="!hasConfirmed">
      <div class="icon-yellow container-icon">
        <i class="icon icon-yellow icon-icon-warning"></i>
      </div>
      <div class="container-body">
        <div class="container-text">
          <p class="vel-text-body-1 vel-text-semibold">
            {{ $t('AUTH-MODULE.STEPS.IMAGES.CONFIRMATION-LABEL-1') }}
          </p>
          <p class="vel-text-body-2 p-t-8 text-l">
            {{ $t('AUTH-MODULE.STEPS.IMAGES.CONFIRMATION-LABEL-2') }}
          </p>
        </div>
        <velocity-button
          classes-name="btn btn-primary"
          :text="$t('AUTH-MODULE.STEPS.IMAGES.BUTTON-CHANGE')"
          size="medium"
          type="button"
          @action-button="confirmImage()"
        />
        <velocity-button
          class="p-t-8"
          classesName="text text-primary m-a"
          :text="$t('REUSABLES.BUTTON.CANCEL')"
          size="medium"
          type="button"
          @action-button="toggleModal()"
        />
      </div>
    </div>
    <div v-else>
      <div class="icon-green container-icon">
        <i class="icon icon-green icon-icon-check"></i>
      </div>
      <div class="container-body">
        <div class="container-text">
          <p class="vel-text-body-1 vel-text-semibold">
            {{ $t('AUTH-MODULE.STEPS.IMAGES.CONFIRMATION-LABEL-3') }}
          </p>
          <p class="vel-text-body-2 p-t-8 text-l">
            {{ $t('AUTH-MODULE.STEPS.IMAGES.CONFIRMATION-LABEL-4') }}
          </p>
        </div>
        <velocity-button
          class="p-t-8"
          classesName="btn btn-primary"
          :text="$t('REUSABLES.BUTTON.ACEPT')"
          size="medium"
          type="button"
          @action-button="cancel()"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import useImages from '@/modules/auth/composables/useImages';

const { hasConfirmed, toggleModal, confirmImage, cancel } = useImages();
</script>
<style scoped lang="sass" src="./ConfirmationModalComponent.sass"></style>
