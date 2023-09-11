import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useTouchedFields } from '@shared/composables/form/useTouchedFields'
import { useTouchedForms } from '@shared/composables/form/useTouchedForms'
import { useFormDraft } from '@shared/composables/form/useFormDraft'
import { useFormSubmit } from '@shared/composables/form/useFormSubmit'

export const useForms = () => {
  const forms = useActiveForm()
  const { useTouchedField, setTouchedField } = useTouchedFields(forms)
  const { touchedForms } = useTouchedForms(forms)
  const { createFormDraft } = useFormDraft()
  const { onSubmit } = useFormSubmit()

  function onValidate() {
    forms.getCurrentScopes().forEach((id: string) => {
      setTouchedField(id, forms.activeForm.value.id, true)
    })
  }

  return {
    createFormDraft,
    onSubmit,
    onValidate,
    touchedForms,
    useTouchedField,
    ...forms
  }
}
