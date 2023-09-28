import type { FormData, FormSubmitType } from '@shared/types/form'
import { FormSubmitTypes } from '@shared/types/form'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useFormSubmitNotification } from '@shared/composables/form/useFormSubmitNotification'
import { useSubmitCaseUrl } from '@assessment/composables/useApiUrl'

import { log } from '@shared/utils/logger'

import { MY_CASES_OVERVIEW } from '@assessment/router/names'

export const useSubmitCase = () => {
  const router = useRouter()
  const notification = useFormSubmitNotification()

  const locked = ref(false)

  const onSubmit = async ({
    id,
    data,
    type
  }: {
    id: string
    data: FormData
    type: FormSubmitType
  }) => {
    const url = useSubmitCaseUrl(id)
    const payload = {
      submit: type === FormSubmitTypes.SUBMIT,
      data
    }

    locked.value = true

    try {
      const { statusCode, data, error } = await useFetchWithCredentials(url).put(payload).json()
      if (statusCode.value === 200) return undefined
      throw new Error(error?.value?.message ?? data.value?.message)
    } catch (error) {
      log(error)
      return error as Error
    } finally {
      locked.value = false
    }
  }

  function showNotification({ type, error }: { type: FormSubmitType; error?: Error }) {
    if (error) {
      notification.showError({ type, error })
    } else {
      notification.showSuccess(type)
    }
  }

  async function onSubmitForm({ id, data }: { id: string; data: FormData }) {
    const type = FormSubmitTypes.SUBMIT
    const error = await onSubmit({ id, data, type: FormSubmitTypes.SUBMIT })
    showNotification({ type, error })
    if (error) return
    return router.replace({ name: MY_CASES_OVERVIEW })
  }

  async function onSubmitDraft({ id, data }: { id: string; data: FormData }) {
    const type = FormSubmitTypes.DRAFT
    const error = await onSubmit({ id, data, type: FormSubmitTypes.DRAFT })
    showNotification({ type, error })
  }

  return {
    onSubmitForm,
    onSubmitDraft,
    locked
  }
}
