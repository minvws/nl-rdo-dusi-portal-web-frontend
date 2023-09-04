import { useRouter } from 'vue-router'
import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useApiFormsSubmitUrl } from '@shared/composables/useApiUrl'
import { FORM_SENT } from '@shared/router/names'
import { log } from '@shared/utils/logger'

export const useFormSubmit = () => {
  const forms = useActiveForm()
  const router = useRouter()

  async function onSubmit() {
    const { draftId, formData } = forms
    const url = useApiFormsSubmitUrl(draftId.value)
    // @TODO: send stringified data for now, until we know how we want to encrypt it.
    const body = { data: JSON.stringify(formData.value) }

    const options: RequestInit = {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    forms.setSubmitting(true)

    try {
      const response = await fetch(url, options)

      if (response.ok) {
        router.replace({ name: FORM_SENT })
      }
    } catch (error) {
      log(error)
    } finally {
      forms.setSubmitting(false)
    }
  }

  return {
    onSubmit
  }
}
