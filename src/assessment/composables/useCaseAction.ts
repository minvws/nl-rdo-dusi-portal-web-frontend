import type { ReviewerActionType } from '@shared/types/reviewer'
import { ModalType } from '@shared/types/modal'
import { ReviewerAction } from '@shared/types/reviewer'

import { markRaw } from 'vue'
import { useRouter } from 'vue-router'

import { useApiSetCaseUrl } from '@assessment/composables/useApiUrl'

import { useAppModalStore } from '@shared/store/useAppModalStore'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import AssignAssessor from '@assessment/components/AssignAssessor/AssignAssessor.vue'

import { REVIEW_CASE, REFRESH, HOME } from '@assessment/router/names'

import { translate } from '@shared/i18n'

export type CaseAction = {
  type: ReviewerActionType
  params: Record<string, string>
}

export const useCaseAction = () => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()
  const { openModal, setPersistence } = useAppModalStore()

  function updateReviewer(remove: boolean, id: string) {
    const url = useApiSetCaseUrl(id)
    const method = remove ? 'DELETE' : 'PUT'
    const options: RequestInit = {
      method
    }
    const { onFetchResponse, onFetchError } = useFetchWithCredentials(url, options)

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

  function createModal(id: string) {
    const title = translate('modal.assignAssessor.title')
    const message = translate('modal.assignAssessor.message')

    setPersistence(false)

    return {
      type: ModalType.DEFAULT,
      title,
      message,
      component: {
        name: markRaw(AssignAssessor),
        props: { id }
      }
    }
  }

  function executeAction(type: ReviewerActionType, params: Record<string, string>) {
    switch (type) {
      case ReviewerAction.ASSIGN:
        openModal(createModal(params.id))
        break
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
