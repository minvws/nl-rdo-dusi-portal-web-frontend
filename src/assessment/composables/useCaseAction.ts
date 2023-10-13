import type { ReviewerActionType } from '@shared/types/reviewer'

import { useRouter } from 'vue-router'
import { useFetch } from '@vueuse/core'

import { useApiSetCaseUrl } from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { REVIEW_CASE, REFRESH, HOME } from '@assessment/router/names'
import { ReviewerAction } from '@shared/types/reviewer'

export type CaseAction = {
  type: ReviewerActionType
  params: Record<string, string>
}

export const useCaseAction = () => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()

  function updateReviewer(remove: boolean, id: string) {
    const url = useApiSetCaseUrl(id)
    const method = remove ? 'DELETE' : 'PUT'
    const options: RequestInit = {
      method,
      credentials: 'include'
    }
    const { onFetchResponse, onFetchError } = useFetch(url, options)

    onFetchResponse(async () => {
      if (remove) {
        const { name, params } = router.currentRoute.value
        await router.replace({ name: REFRESH })
        router.replace({ name: name ?? HOME, params })
      } else router.push({ name: REVIEW_CASE, params: { id } })
    })

    onFetchError(error => {
      notificationsStore.add({
        message: error,
        displayAs: 'error',
        id: 'case-action',
        pageChangeCount: 1
      })
    })
  }

  function executeAction(type: ReviewerActionType, params: Record<string, string>) {
    switch (type) {
      case ReviewerAction.CLAIM:
        updateReviewer(false, params.id)
        break
      case ReviewerAction.RELEASE:
        updateReviewer(true, params.id)
        break
      default:
        throw new Error(`unknown type: ${type}`)
    }
  }

  return {
    executeAction
  }
}
