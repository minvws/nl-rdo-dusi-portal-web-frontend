import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useFormSubmit } from '@/composables/useFormSubmit'
import { useTouchedFields } from '@/composables/useTouchedFields'
import { useActiveForm } from '@/composables/useActiveForm'
import { useTouchedForms } from '@/composables/useTouchedForms'
import { useFiles } from '@/composables/useFiles'

export const useFormStore = defineStore('useFormStore', () => {
  const { clearForm, ...forms } = useActiveForm()
  const { clearFiles, ...files } = useFiles(forms)
  const { useTouchedField, setTouchedField, clearTouchedFields } = useTouchedFields(forms)
  const { touchedForms, clearTouchedForms } = useTouchedForms(forms)
  const submit = useFormSubmit()
  const readonly = computed(() => submit.isSubmitting.value)

  const onValidate = () => {
    forms
      .getCurrentScopes()
      .forEach((id: string) => setTouchedField(id, forms.activeForm.value.id, true))
  }

  const onSubmit = () => {
    const id = forms.activeForm.value.id
    const data = forms.formData.value
    submit.onSubmit({ data, id })
  }

  const clearActiveForm = () => {
    const id = forms.activeForm.value?.id
    clearTouchedFields(id)
    clearTouchedForms(id)
    clearFiles(id)
    clearForm(id)
  }

  return {
    readonly,
    submit,
    touchedForms,
    clearActiveForm,
    onSubmit,
    onValidate,
    useTouchedField,
    ...forms,
    ...files
  }
})
