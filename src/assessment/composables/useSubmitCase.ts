import type { FormData, FormSubmit, FormSubmitReturnType } from '@shared/types/form'

import { FormSubmitType } from '@shared/types/form'

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useFormSubmitNotification } from '@shared/composables/form/useFormSubmitNotification'
import { useApiSubmitCaseUrl } from '@assessment/composables/useApiUrl'

import { log } from '@shared/utils/logger'

import { PREVIEW_CASE_SUBMIT } from '@assessment/router/names'

export const useSubmitCase = () => {
  const router = useRouter()
  const notification = useFormSubmitNotification()

  const locked = ref<boolean>(false)

  async function onSubmit({ id, data, type }: { id: string; data: FormData; type: FormSubmit }): Promise<FormSubmitReturnType> {
    const url = useApiSubmitCaseUrl(id)
    const payload = {
      submit: type === FormSubmitType.SUBMIT,
      data
    }

    locked.value = true

    const statusCodeRef = ref<number | null>(null)
    const isValidationError = computed<boolean>(() => statusCodeRef.value === 422)

    try {
      const { statusCode, data, error } = await useFetchWithCredentials(url).put(payload).json()
      if (statusCode.value === 200) {
        return { data: undefined, statusCode: statusCode.value }
      }

      statusCodeRef.value = statusCode.value
      throw new Error(error?.value?.message ?? data.value?.message)
    } catch (error) {
      log(error)
      return { data: undefined, error: { error: error as Error, isValidationError: isValidationError.value }, statusCode: statusCodeRef.value }
    } finally {
      locked.value = false
    }
  }

  async function onSubmitForm({ id, data }: { id: string; data: FormData }) {
    const type = FormSubmitType.DRAFT
    const { error} = await onSubmit({ id, data, type })
    if (error) {
      notification.showError({ type, error })
      return
    }
    notification.showSuccess(type)
    return router.replace({ name: PREVIEW_CASE_SUBMIT, params: { id } })
  }

  async function onSubmitDraft({ id, data }: { id: string; data: FormData }) {
    const type = FormSubmitType.DRAFT
    const { error } = await onSubmit({ id, data, type })
    if (error) {
      notification.showError({ type, error })
      return
    }
    notification.showSuccess(type)
  }

  return {
    onSubmitForm,
    onSubmitDraft,
    locked
  }
}
