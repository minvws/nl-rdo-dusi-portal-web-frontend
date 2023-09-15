import type { Ref } from 'vue'
import { useApiDraftFormUrl } from '@shared/composables/useApiUrl'
import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useNotificationsStore } from '@/@shared/store/useNotificationsStore'
import { translate } from '@/@shared/i18n'
import { useRouter } from 'vue-router'
import { HOME } from '@/@shared/router/names'
import { log } from '@shared/utils/logger'

export const useFormDraft = (formId: Ref<string>) => {
  const { setDraftId } = useActiveForm()
  const router = useRouter()
  const notification = useNotificationsStore()

  async function createFormDraft() {
    const id = formId.value
    const url = useApiDraftFormUrl(id)

    const options: RequestInit = {
      method: 'POST'
    }

    const {
      data: { value: data },
      error: { value: error }
    } = await useFetchWithCredentials(url, options).json()

    if (error?.code) {
      notification.add({
        message:
          translate(`form.message.${error.code}`) ||
          translate('form.message.loadingError', { error: error.message }) ||
          '',
        displayAs: 'error',
        id: 'form-draft-error',
        pageChangeCount: 2
      })
      log('error creating draft',  error)
      router.replace({ name: HOME })
      return
    }
    setDraftId(data.reference)
  }

  return {
    createFormDraft
  }
}
