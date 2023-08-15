import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { RequestData } from '@shared/types/table'

import { transformRequestsData } from '@shared/utils/transform'

export const useRequestsStore = defineStore('useRequestsStore', () => {
  const requests = ref({}) as Ref<RequestData>
  const error = ref(null) as any
  const isFetching = ref(false)

  async function fetchAllRequests(url: string) {
    isFetching.value = true

    try {
      const response = await fetch(url)
      const json = await response.json()
      const formattedData = transformRequestsData(json)

      requests.value = formattedData
    } catch (err) {
      // @TODO: handle error
      console.error(err)
      error.value = err
    }

    isFetching.value = false
  }

  return {
    error,
    isFetching,
    requests,
    fetchAllRequests
  }
})
