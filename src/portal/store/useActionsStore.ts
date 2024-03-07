import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { useFetchActionsCount } from '@portal/composables/useFetchActionsCount'

export const useActionsStore = defineStore('useActionsStore', () => {
  const applicationCount = ref<number>(0)
  const messageCount = ref<number>(0)

  const { data, execute: getActionsCount } = useFetchActionsCount()

  function setApplicationCount(count: number): void {
    applicationCount.value = count
  }

  function setMessageCount(count: number): void {
    messageCount.value = count
  }

  watch(data, (newData, oldData) => {
    if (newData !== oldData) {
      const { applicationCount, messageCount } = newData

      setApplicationCount(applicationCount)
      setMessageCount(messageCount)
    }
  })

  return {
    applicationCount,
    messageCount,
    getActionsCount,
    setApplicationCount,
    setMessageCount
  }
})
