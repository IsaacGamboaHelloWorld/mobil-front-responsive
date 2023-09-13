<template>
  <div class="container-main">
    <div class="container-header">
      <p :class="`text-${companyName} vel-text-body-1 vel-text-semibold`">
        {{ $t('HOMEFRONT-MODULE.NOTIFICATIONS-WINDOW.NOTIFICATIONS-LABEL') }}
      </p>
      <velocity-icon
        class="icon-general"
        icon="icon-icon-close"
        @action-icon="$emit('close')"
      />
    </div>
    <div class="container-pendings">
      <p :class="`text-${companyName} vel-text-body-1 vel-text-semibold`">
        ({{ !!getTotalPendingTransactions ? getTotalPendingTransactions : 0 }})
      </p>
      <p class="vel-text-body-2 vel-text-semibold color-neutral-400 m-l-4">
        {{ $t('HOMEFRONT-MODULE.NOTIFICATIONS-WINDOW.PENDING-AUTHORIZATIONS') }}
      </p>
    </div>
    <div
      class="container-no-notifications"
      v-if="!getNotificationsList?.length"
    >
      <p class="vel-text-body-2 color-neutral">
        {{ $t('HOMEFRONT-MODULE.NOTIFICATIONS-WINDOW.NO-NOTIFICATIONS-LABEL') }}
      </p>
    </div>
    <div class="container-notifications" v-else>
      <item-notification-component
        v-for="(notification, index) in getNotificationsList"
        :key="index"
        :date="notification.createDate"
        :title="notification.params[0].fieldName"
        :content="notification.params[0].fieldValue"
        :company="`${companyName}`"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import useNotifications from '@/modules/homeFront/composables/useNotifications';
import ItemNotificationComponent from '../itemNotificationComponent/ItemNotificationComponent.vue';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';

const { companyName, getNotificationsList, getTotalPendingTransactions } =
  useNotifications();
</script>
<style scoped lang="sass" src="./NotificationsComponent.sass"></style>
