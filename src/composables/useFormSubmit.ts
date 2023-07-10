import type { Ref } from 'vue'
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useApiFormsUrl } from '@/composables/useApiUrl'
import name from '@/router/name'

import type { FormResponse, FormData } from '@/type/form-types'

export const useFormSubmit = () => {
  const data: Ref<FormResponse | undefined> = ref(undefined)
  const error: Ref<string> = ref('')
  const isSubmitting = ref(false)

  const router = useRouter()

  const onSubmit = async (payload: { data: FormData; id: string }) => {
    error.value = ''
    data.value = undefined
    isSubmitting.value = true

    try {
      if (payload.id.startsWith('local')) {
        // @TOOD: for local debugging, should be removed
        await new Promise(resolve => {
          setTimeout(() => {
            data.value = { status: 'ok' }
            resolve(undefined)
          }, 1000)
        })
      } else {
        const response = await fetch(useApiFormsUrl(payload.id), {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload.data)
        })
        if (!response.ok) {
          throw new Error(`${response.statusText} code: ${response.status}`)
        }
        data.value = { status: 'ok' }
      }
    } catch (e) {
      error.value = `${e}`
    } finally {
      isSubmitting.value = false
    }
  }

  watch(data, data => {
    if (!data) return
    router.replace({ name: name.FORM_SENT })
    data.value = undefined
  })

  return {
    isSubmitting,
    data,
    error,
    onSubmit
  }
}
