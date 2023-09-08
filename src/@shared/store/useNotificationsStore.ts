import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { type Notification } from '@shared/types/notification'
import { useRouter } from 'vue-router'

export const useNotificationsStore = defineStore('useNotificationsStore', () => {
  type AppNotification = Notification & { id?: string; pageChangeCount?: number }
  const notifications: Ref<AppNotification[]> = ref([])
  const router = useRouter()

  const removeById = ({ id }: { id?: string }) => {
    if (!id) return
    let deleting = true
    while (deleting) {
      const index = notifications.value.findIndex(({ id: notificationId }) => id === notificationId)
      if (index !== -1) notifications.value.splice(index, 1)
      else deleting = false
    }
  }

  const removeOnPageChange = () => {
    notifications.value.forEach(notification => {
      if (notification?.pageChangeCount === undefined) return
      notification.pageChangeCount--
    })
    let deleting = true
    while (deleting) {
      const index = notifications.value.findIndex(
        ({ pageChangeCount }) => pageChangeCount !== undefined && pageChangeCount <= 0
      )
      if (index !== -1) notifications.value.splice(index, 1)
      else deleting = false
    }
  }

  const add = (notification: AppNotification) => {
    removeById(notification) // if notification has an id, remove all previous notifications with that id
    notifications.value.unshift(notification)
  }

  router.beforeEach(() => {
    removeOnPageChange()
  })

  return {
    add,
    notifications
  }
})
