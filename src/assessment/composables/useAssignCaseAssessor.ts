import { NotificationType } from '@shared/types/notification'

import { useFetch } from '@vueuse/core'
import { useRouter } from 'vue-router'

import { useAppModalStore } from '@shared/store/useAppModalStore'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { useApiAssignCaseAssessorUrl } from '@assessment/composables/useApiUrl'

import { REFRESH, HOME } from '@assessment/router/names'

import { translate } from '@shared/i18n'
import { log } from '@shared/utils/logger'

export const useAssignCaseAssessor = () => {
  const router = useRouter()
  const { closeModal } = useAppModalStore()
  const notificationsStore = useNotificationsStore()

  async function onSubmitCaseAssessor(caseId: string, userId: string) {
    const url = useApiAssignCaseAssessorUrl(caseId)
    const options: RequestInit = {
      credentials: 'include'
    }
    const payload = { id: userId }

    try {
      const { statusCode, error } = await useFetch(url, options).put(payload).json()

      if (statusCode.value === 200) {
        const { name, params } = router.currentRoute.value

        await router.replace({ name: REFRESH })
        router.replace({ name: name ?? HOME, params })

        closeModal()

        notificationsStore.add({
          id: 'assign-case-assessor-success',
          displayAs: NotificationType.CONFIRMATION,
          label: translate('notification.assign-case-assessor-success.label') ?? '',
          message: translate('notification.assign-case-assessor-success.message') ?? '',
          pageChangeCount: 2
        })
      }

      if (error.value?.message) {
        throw new Error(error.value.message)
      }
    } catch (error) {
      notificationsStore.add({
        id: 'assign-case-assessor-error',
        displayAs: NotificationType.ERROR,
        label: translate('notification.assign-case-assessor-error.label') ?? '',
        message: translate('notification.assign-case-assessor-error.message') ?? '',
        pageChangeCount: 1
      })

      log(error)
    }
  }

  return {
    onSubmitCaseAssessor
  }
}
