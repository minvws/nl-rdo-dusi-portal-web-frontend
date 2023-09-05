<template>
  <section
    v-for="(notification, index) in notifications"
    class="notification-wrapper"
    :class="notification.displayAs"
    :key="index"
  >
    <div class="notification-container">
      <FormNotification
        v-bind="notification"
        class="notification"
      />
    </div>
  </section>
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

  &-wrapper {
    padding: 0;
    margin: 0;
  }

  &-container {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
