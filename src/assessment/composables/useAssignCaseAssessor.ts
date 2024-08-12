import { NotificationType } from '@shared/types/notification'

import { useRouter } from 'vue-router'

import { useAppModalStore } from '@shared/store/useAppModalStore'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { useApiAssignCaseAssessorUrl } from '@assessment/composables/useApiUrl'

import { REFRESH, HOME } from '@assessment/router/names'

import { log } from '@shared/utils/logger'
import { t } from '@shared/i18n'

export const useAssignCaseAssessor = () => {
  const router = useRouter()
  const { closeModal } = useAppModalStore()
  const notificationsStore = useNotificationsStore()

  async function onSubmitCaseAssessor(caseId: string, userId: string) {
    const url = useApiAssignCaseAssessorUrl(caseId)
    const payload = { id: userId }

    try {
      const { statusCode, error } = await useFetchWithCredentials(url).put(payload).json()

      if (statusCode.value === 200) {
        const { name, params } = router.currentRoute.value

        await router.replace({ name: REFRESH })
        router.replace({ name: name ?? HOME, params })

        closeModal()

        notificationsStore.add({
          id: 'assign-case-assessor-success',
          displayAs: NotificationType.CONFIRMATION,
          label: t('notification.assign-case-assessor-success.label') ?? '',
          message: t('notification.assign-case-assessor-success.message') ?? '',
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
        label: t('notification.assign-case-assessor-error.label') ?? '',
        message: t('notification.assign-case-assessor-error.message') ?? '',
        pageChangeCount: 1
      })

      log(error)
    }
  }

  return {
    onSubmitCaseAssessor
  }
}
