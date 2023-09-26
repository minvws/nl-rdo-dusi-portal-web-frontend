import type { FormData, FormSubmitType } from '@shared/types/form'

import { ref } from 'vue'

import { FormSubmitTypes } from '@shared/types/form'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useSubmitCaseUrl } from '@assessment/composables/useApiUrl'
import { log } from '@/@shared/utils/logger'

export const useSubmitCase = () => {
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
    try {
      locked.value = true
      const result = await useFetchWithCredentials(url).put(payload).json()
      console.log(result)
    } catch (error) {
      log(error)
    } finally {
      locked.value = false
    }
  }

  const onSubmitCase = ({ id, data }: { id: string; data: FormData }) => {
    return onSubmit({ id, data, type: FormSubmitTypes.SUBMIT })
  }

  const onSaveCase = ({ id, data }: { id: string; data: FormData }) => {
    return onSubmit({ id, data, type: FormSubmitTypes.SUBMIT })
  }

  return {
    onSaveCase,
    onSubmitCase,
    locked
  }
}
