import type { Notification } from '@shared/types/notification'

import { ref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

type AppNotification = Notification & { id: string; pageChangeCount?: number }

export const useNotificationsStore = defineStore('useNotificationsStore', () => {
  const router = useRouter()

  const notifications = ref<AppNotification[]>([])
  const isDeleting = ref<boolean>(false)

  function removeById(id: string) {
    isDeleting.value = true

    while (isDeleting.value) {
      const startIndex = notifications.value.findIndex(
        ({ id: notificationId }) => id === notificationId
      )

      if (startIndex === -1) {
        isDeleting.value = false
      } else {
        notifications.value.splice(startIndex, 1)
      }
    }
  }

  function removeOnPageChange() {
    for (let i = 0; i < notifications.value.length; i++) {
      const notification = notifications.value[i]
      if (notification?.pageChangeCount === undefined) continue
      notification.pageChangeCount--
    }

    isDeleting.value = true

    while (isDeleting.value) {
      const startIndex = notifications.value.findIndex(
        ({ pageChangeCount }) => pageChangeCount !== undefined && pageChangeCount <= 0
      )

      if (startIndex === -1) {
        isDeleting.value = false
      } else {
        notifications.value.splice(startIndex, 1)
      }
    }
  }

  function add(notification: AppNotification) {
    // Remove all previous notifications with that id
    removeById(notification.id)
    // Add new notification to the top
    // Using nextTick to ensure a new DOM element is used (for aria-live)
    nextTick(() => {
      notifications.value.unshift(notification)
    })
  }

  router.beforeEach(() => removeOnPageChange())

  return {
    add,
    notifications,
    removeById
  }
})
