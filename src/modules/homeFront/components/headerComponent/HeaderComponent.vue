<template>
  <div class="container-header">
    <div class="container-info">
      <p class="text-label-name vel-text-subtitle vel-text-semibold">
        {{ $t('HOMEFRONT-MODULE.HEADER.TITLE') }}
        {{ getFirstName }}
        {{ getLastName }}
      </p>
      <div class="info-label">
        <p
          class="text-label-company vel-text-body-2 vel-text-semibold color-neutral"
        >
          {{ $t('HOMEFRONT-MODULE.HEADER.LABEL-COMPANY') }}
        </p>
        <p class="m-l-4 text-label-company-name vel-text-body-2 color-neutral">
          {{ getCompanyName }}
        </p>
      </div>
    </div>
    <div class="container-icons m-r-24">
      <div class="mobile">
        <div class="m-r-24">
          <velocity-icon
            class="icon-general"
            icon=" icon-icon-menu"
            @action-icon="emit('activeSideNav')"
          />
        </div>
        <div>
          <img
            :src="`${staticsPath}/${companyName}/logo.svg`"
            alt="Logo aval"
            @click="navigateHome()"
          />
        </div>
      </div>
      <div class="container-icon">
        <velocity-icon
          class="icon-header"
          :isActive="notificationsIsVisible"
          icon="icon-icon-notifications"
          @action-icon="toggleNotifications"
        />
        <div v-if="notificationsIsVisible">
          <div class="notifications-desktop">
            <notifications-component
              class="notifications-component"
              @close="toggleNotifications"
            />
          </div>
          <div class="notifications-modal">
            <VelocityModal type="custom">
              <template #component>
                <notifications-component
                  class="notifications-component"
                  @close="toggleNotifications"
                />
              </template>
            </VelocityModal>
          </div>
        </div>
      </div>
      <div class="container-icon">
        <velocity-icon
          class="icon-header"
          :isActive="profileInfoIsVisible"
          icon="icon-icon-person"
          @action-icon="toggleProfileInfo"
        />
        <div v-if="profileInfoIsVisible">
          <div class="profile-desktop">
            <profile-window-component
              class="profile-component"
              v-if="profileInfoIsVisible"
              @close="toggleProfileInfo"
            />
          </div>
          <div class="profile-modal">
            <VelocityModal type="custom">
              <template #component>
                <profile-window-component
                  class="profile-component"
                  @close="toggleProfileInfo"
                />
              </template>
            </VelocityModal>
          </div>
        </div>
      </div>
      <velocity-button
        class="logout-button"
        classesName="text text-secondary"
        icon="icon-icon-logout"
        :text="$t('HOMEFRONT-MODULE.HEADER.LABEL-LOGOUT')"
        type="button"
        @action-button="logout"
      />
      <velocity-icon
        class="icon-header logout-icon"
        icon="icon-icon-logout"
        @action-icon="logout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useHeader from '../../composables/useHeader';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import ProfileWindowComponent from '@/modules/homeFront/components/headerComponent/components/profileWindowComponent/ProfileWindowComponent.vue';
import NotificationsComponent from '@/modules/homeFront/components/headerComponent/components/notificationsComponent/NotificationsComponent.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import { staticsPath } from '@/commons/constants/envConstants';

const {
  navigateHome,
  toggleNotifications,
  toggleProfileInfo,
  logout,
  profileInfoIsVisible,
  notificationsIsVisible,
  getFirstName,
  getLastName,
  getCompanyName,
  companyName,
} = useHeader();

const emit = defineEmits<{
  (e: 'activeSideNav'): void;
}>();
</script>
<style scoped lang="sass" src="./HeaderComponent.sass"></style>
