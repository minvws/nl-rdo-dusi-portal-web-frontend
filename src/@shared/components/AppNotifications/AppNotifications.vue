<template>
  <div class="notification-sticky">
    <div
      v-for="({ dismissable, displayAs, label, message, id }, index) in notifications"
      :key="index"
    >
      <FormNotification
        :display-as="displayAs"
        :label="label"
        :message="message"
        :id="id"
        :dismissable="dismissable"
        announce
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

const notificationsStore = useNotificationsStore()

const { notifications } = storeToRefs(notificationsStore)
</script>

<style lang="scss" scoped>
.notification {
  padding-left: 0;
  border: none;
}

.notification-sticky {
  position: sticky;
  z-index: 2;
  top: 0;
}
</style>
