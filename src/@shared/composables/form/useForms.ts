import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useFormSubmit } from '@shared/composables/form/useFormSubmit'
import { useRemoteAction } from '@shared/composables/form/useRemoteAction'
import { useRemoteValidation } from '@shared/composables/form/useRemoteValidation'
import { useTouchedFields } from '@shared/composables/form/useTouchedFields'
import { useTouchedForms } from '@shared/composables/form/useTouchedForms'

export const useForms = () => {
  const forms = useActiveForm()
  const { touchedForms } = useTouchedForms(forms)
  const { useTouchedField, setTouchedField } = useTouchedFields(forms)
  const { onSubmitForm, onSubmitDraft, onSubmitValidation, onSubmitAction } = useFormSubmit()
  const { onRemoteValidation } = useRemoteValidation(forms, onSubmitValidation)
  const { onRemoteAction } = useRemoteAction(forms, onSubmitAction)

  function onValidate() {
    for (const id of forms.getCurrentScopes()) {
      setTouchedField(id, forms.activeForm.value.id, true)
    }
  }

  return {
    onRemoteAction,
    onRemoteValidation,
    onSubmitDraft,
    onSubmitForm,
    onValidate,
    touchedForms,
    useTouchedField,
    ...forms
  }
}
