import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { type Notification } from '@shared/types/notification'

export const useNotificationsStore = defineStore('useNotificationsStore', () => {
  const notifications: Ref<Notification[]> = ref([])

  const add = (notification: Notification) => {
    notifications.value.unshift(notification)
  }
  return {
    add,
    notifications
  }
})
