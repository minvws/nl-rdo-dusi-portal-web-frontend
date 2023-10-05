import type { Ref } from 'vue'
import type { Notification } from '@shared/types/notification'

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useNotificationsStore = defineStore('useNotificationsStore', () => {
  type AppNotification = Notification & { id: string; pageChangeCount?: number }
  const notifications: Ref<AppNotification[]> = ref([])
  const isDeleting: Ref<boolean> = ref(false)
  const router = useRouter()

  function removeById(id: string) {
    isDeleting.value = true

    while (isDeleting.value) {
      const startIndex = notifications.value.findIndex(
        ({ id: notificationId }) => id === notificationId
      )

      startIndex !== -1 ? notifications.value.splice(startIndex, 1) : (isDeleting.value = false)
    }
  }

  function removeOnPageChange() {
    notifications.value.forEach(notification => {
      if (notification?.pageChangeCount === undefined) return
      notification.pageChangeCount--
    })

    isDeleting.value = true

    while (isDeleting.value) {
      const startIndex = notifications.value.findIndex(
        ({ pageChangeCount }) => pageChangeCount !== undefined && pageChangeCount <= 0
      )

      startIndex !== -1 ? notifications.value.splice(startIndex, 1) : (isDeleting.value = false)
    }
  }

  function add(notification: AppNotification) {
    // Remove all previous notifications with that id
    removeById(notification.id)
    // Add new notification to the top
    notifications.value.unshift(notification)
  }

  router.beforeEach(() => removeOnPageChange())

  return {
    add,
    notifications,
    removeById
  }
})
