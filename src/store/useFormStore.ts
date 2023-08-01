import type { Ref } from 'vue'
import type { FormData } from '@/type/form-types'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { useFilesStore } from '@/store/useFilesStore'

import { useActiveForm } from '@/composables/useActiveForm'
import { useApiDraftFormUrl, useApiFormsSubmitUrl } from '@/composables/useApiUrl'
import { useTouchedFields } from '@/composables/useTouchedFields'
import { useTouchedForms } from '@/composables/useTouchedForms'

import { FORM_SENT } from '@/router/names'
import { log } from '@/util/logger-util'

export const useFormStore = defineStore('useFormStore', () => {
  const draftFormId: Ref<string> = ref('')
  const isSubmitting: Ref<boolean> = ref(false)

  const { clearForm, ...forms } = useActiveForm()
  const { useTouchedField, setTouchedField, clearTouchedFields } = useTouchedFields(forms)
  const { touchedForms, clearTouchedForms } = useTouchedForms(forms)
  const filesStore = useFilesStore()
  const route = useRoute()
  const router = useRouter()

  const readonly = computed(() => isSubmitting.value)

  function onValidate() {
    forms
      .getCurrentScopes()
      .forEach((id: string) => setTouchedField(id, forms.activeForm.value.id, true))
  }

  async function onSubmit() {
    const formData: FormData = forms.formData.value
    const url = useApiFormsSubmitUrl(draftFormId.value)
    // @TODO: send stringified data for now, until we know how we want to encrypt it.
    const body = { data: JSON.stringify(formData) }

    const options: RequestInit = {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    isSubmitting.value = true

    try {
      const response = await fetch(url, options)

      if (response.ok) {
        router.replace({ name: FORM_SENT })
      }
    } catch (error) {
      log(error)
    } finally {
      isSubmitting.value = false
    }
  }

  function clearActiveForm() {
    const { id } = forms.activeForm.value
    clearTouchedFields(id)
    clearTouchedForms(id)
    filesStore.clearFiles(id)
    clearForm(id)
  }

  async function createFormDraft() {
    const { id } = route.params
    const url = useApiDraftFormUrl(id as string)
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include'
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (data.id) {
      draftFormId.value = data.id
    }
  }

  return {
    clearActiveForm,
    createFormDraft,
    draftFormId,
    onSubmit,
    onValidate,
    readonly,
    touchedForms,
    useTouchedField,
    ...forms,
    ...filesStore.files
  }
})
