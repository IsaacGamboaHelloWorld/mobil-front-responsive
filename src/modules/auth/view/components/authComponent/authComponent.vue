<template>
  <div>
    <div v-if="!!codeError && !alertIsClosed" class="m-b-22">
      <velocity-alert
        type="red"
        :hasIcon="true"
        :boldText="'Error ' + codeError + '. '"
        :body="messageError"
        :is-closable="true"
        @action-icon="alertIsClosed = true"
      />
    </div>
    <p class="vel-text-subtitle vel-text-semibold m-b-14">
      {{ $t('AUTH-MODULE.STEPS.AUTH.TITLE') }}
    </p>

    <div class="container m-b-24">
      <div class="container-img">
        <img
          v-if="!!getImage"
          :src="`data:image/png;base64,${getImage}`"
          alt="auth-image-aval"
        />
      </div>
      <div class="container-information">
        <p class="vel-text-body-2 vel-text-semibold">
          {{ $t('AUTH-MODULE.STEPS.AUTH.LABEL-USER') }}
        </p>
        <p class="m-b-4 color-neutral vel-text-body-1">
          {{ fullUserName }}
        </p>
        <p class="vel-text-body-2 vel-text-semibold m-b-12" v-if="!!onlyToken">
          {{ $t('AUTH-MODULE.STEPS.AUTH.LABEL-TOKEN') }}
          <span class="color-neutral vel-text-body-2 vel-text-semibold">{{
            onlyToken
          }}</span>
        </p>
        <p class="vel-text-caption vel-text-light color-neutral">
          {{ $t('AUTH-MODULE.STEPS.AUTH.DESCRIPTION') }}
        </p>
      </div>
    </div>

    <VelocityInput
      id="user"
      :label="$t('AUTH-MODULE.STEPS.AUTH.INPUT-LABEL')"
      type="password"
      :placeHolder="$t('AUTH-MODULE.STEPS.AUTH.PLACE-HOLDER')"
      v-model="password"
      :isDisabled="isBlocked"
    />
    <div class="w-100 text-aling-end m-b-14" v-if="!!hasToken">
      <button
        class="btn-forgot-password"
        @click="forgotPasswordMutatiton.mutate()"
      >
        {{ $t('AUTH-MODULE.STEPS.AUTH.FORGOT-PASSWORD') }}
      </button>
    </div>
    <VelocityButton
      v-if="!isBlocked"
      :classesName="`${!!hasToken ? '' : 'm-t-24'} btn btn-primary`"
      size="large"
      :text="
        isBlocked
          ? $t('REUSABLES.BUTTON.GO-BACK')
          : $t('AUTH-MODULE.STEPS.AUTH.BTN-TITLE')
      "
      type="button"
      :disabled="isDisabled"
      @action-button="encryptPassword()"
    />
    <VelocityButton
      :classesName="
        isBlocked ? ` btn btn-primary m-a` : `text text-primary m-a`
      "
      size="large"
      :text="
        isBlocked
          ? $t('REUSABLES.BUTTON.GO-BACK')
          : $t('AUTH-MODULE.STEPS.AUTH.SECOND-BTN-TITLE')
      "
      type="button"
      @action-button="cancelAction"
    />
  </div>
</template>

<script setup lang="ts">
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityInput from '@/commons/velocity/atoms/velocityInput/VelocityInput.vue';
import useAuth from '@/modules/auth/composables/useAuth';

const {
  hasToken,
  forgotPasswordMutatiton,
  cancelAction,
  isDisabled,
  onlyToken,
  encryptPassword,
  password,
  getImage,
  isBlocked,
  messageError,
  codeError,
  alertIsClosed,
  fullUserName,
} = useAuth();
</script>

<style scoped lang="sass" src="./authComponent.sass"></style>
