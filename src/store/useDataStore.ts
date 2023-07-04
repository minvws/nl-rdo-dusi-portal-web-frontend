import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

type LoadingState = {
  error: any
  data: any
  id: string
  isLoading: boolean
  url: string
}

export const useDataStore = defineStore('useDataStore', () => {
  const route = useRoute()

  const activeRequests = ref([] as LoadingState[])

  // reset loading states on route change
  watch(route, (newRoute, oldRoute) => {
    if (newRoute.path !== oldRoute.path) {
      activeRequests.value = []
    }
  })

  function getRequest(id: string) {
    return activeRequests.value.find(state => state.id === id)
  }

  async function fetchData(url: string, id: string) {
    const loadingState: LoadingState = {
      id,
      url,
      data: null,
      isLoading: true,
      error: null
    }

    activeRequests.value.push(loadingState)

    try {
      const response = await fetch(url, options)
      const content = await response.json()

      activeRequests.value.forEach(req => req.id === id && (req.data = content))
    } catch (error) {
      activeRequests.value.forEach(req => req.id === id && (req.error = error))
    } finally {
      activeRequests.value.forEach(req => {
        if (req.id === id) {
          // simulate loading
          setTimeout(() => {
            req.isLoading = false
          }, 500)
        }
      })
    }
  }

  return {
    fetchData,
    getRequest,
    activeRequests
  }
})
