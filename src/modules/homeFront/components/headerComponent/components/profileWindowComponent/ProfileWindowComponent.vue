<template>
  <div class="container-profile">
    <div class="container-user">
      <div class="container-picture">
        <img
          id="profile-photo"
          :src="`${staticsPath}/global-img/auth-img.png`"
          alt="Grupo aval foto perfil"
        />
        <velocity-icon
          class="icon-general"
          icon="icon-icon-close"
          @action-icon="$emit('close')"
        />
      </div>
      <p :class="`text-${companyName} vel-text-body-1 vel-text-semibold`">
        {{ getFirstName }} {{ getLastName }}
      </p>
    </div>
    <div class="container-info">
      <p class="p-t-8 vel-text-body-2 vel-text-semibold color-neutra-400">
        {{ $t('HOMEFRONT-MODULE.PROFILE-WINDOW.COMPANY-LABEL') }}
      </p>
      <p class="p-t-4 company-name vel-text-body-2 color-neutral">
        {{ getCompanyName }}
      </p>

      <p class="p-t-8 vel-text-body-2 vel-text-semibold color-neutral-400">
        {{ $t('HOMEFRONT-MODULE.PROFILE-WINDOW.ID-LABEL') }}
      </p>
      <p class="p-t-4 company-name vel-text-body-2 color-neutral">
        {{ getID }}
      </p>

      <p class="p-t-8 vel-text-body-2 vel-text-semibold color-neutral-400">
        {{ $t('HOMEFRONT-MODULE.PROFILE-WINDOW.INTERNAL-ID-LABEL') }}
      </p>
      <p class="p-t-4 p-b-8 company-name vel-text-body-2 color-neutral">
        {{ getInternalID }}
      </p>
    </div>
    <div class="container-info">
      <p class="p-t-8 vel-text-body-2 vel-text-semibold color-neutral-400">
        {{ $t('HOMEFRONT-MODULE.PROFILE-WINDOW.CURRENT-DATE-LABEL') }}
      </p>
      <p class="p-t-4 company-name vel-text-body-2 color-neutral">
        {{ currentDate }} - {{ currentHour }}
      </p>

      <p class="p-t-8 vel-text-body-2 vel-text-semibold color-neutral-400">
        {{ $t('HOMEFRONT-MODULE.PROFILE-WINDOW.LAST-LOGIN-LABEL') }}
      </p>
      <p class="p-t-4 company-name vel-text-body-2 color-neutral">
        {{ getLoginDate }} - {{ getLoginHour }}
      </p>

      <p class="p-t-8 vel-text-body-2 vel-text-semibold color-neutral-400">
        {{ $t('HOMEFRONT-MODULE.PROFILE-WINDOW.IP-LABEL') }}
      </p>
      <p class="p-t-4 p-b-8 company-name vel-text-body-2 color-neutral">
        {{ getUserIP }}
      </p>
    </div>
    <div class="p-b-8 p-t-16 container-button">
      <velocity-button
        id="profile-button"
        size="medium"
        classesName="text text-secondary button"
        :text="$t('HOMEFRONT-MODULE.PROFILE-WINDOW.EDIT-PROFILE-BUTTON-LABEL')"
        type="button"
        @action-button="editProfile"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import useProfileWindow from '@/modules/homeFront/composables/useProfileWindow';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import { staticsPath } from '@/commons/constants/envConstants';

const {
  editProfile,
  companyName,
  currentDate,
  currentHour,
  getFirstName,
  getLastName,
  getCompanyName,
  getID,
  getInternalID,
  getLoginDate,
  getUserIP,
  getLoginHour,
} = useProfileWindow();
</script>
<style scoped lang="sass" src="./ProfileWindowComponent.sass"></style>
