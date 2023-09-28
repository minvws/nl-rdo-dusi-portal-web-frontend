import { useRouter } from 'vue-router'
import { useFetch } from '@vueuse/core'

import { useApiSetCaseUrl } from '@assessment/composables/useApiUrl'

import { MY_CASE_DETAILS } from '@assessment/router/names'

export const useSetCaseReviewer = (remove: boolean, id: string) => {
  const router = useRouter()
  const url = useApiSetCaseUrl(id)
  const options: RequestInit = {
    method: remove ? 'DELETE' : 'PUT',
    credentials: 'include'
  }
  const { onFetchResponse, execute, ...fetch } = useFetch(url, options, { immediate: false }).json()

  onFetchResponse(response => {
    switch (response.status) {
      case 200:
        console.log('200')
        router.push({ name: MY_CASE_DETAILS, params: { id } })
        break
      case 403:
        console.log('403')
        break
      default:
        console.log('default', response.status)
    }
  })

  return {
    execute,
    ...fetch
  }
}
