<template>
  <div class="notification-sticky">
    <div
      v-for="(notification, index) in notifications"
      :key="index"
    >
      <FormNotification
        v-bind="notification"
        dismissable
        announce
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

const { notifications } = useNotificationsStore()
</script>

<style lang="scss" scoped>
.notification {
  border: none;
  padding-left: 0;
}

.notification-sticky {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
