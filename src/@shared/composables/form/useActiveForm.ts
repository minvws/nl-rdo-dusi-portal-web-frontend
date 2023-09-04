import { computed, inject } from 'vue'

import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import type { Form, FormData } from '@shared/types/form'

import { getDeepProps, flattenDeep } from '@shared/utils/array'
import { getControlId, getLinkedControlId } from '@shared/utils/control'
import { useFormStorage } from '@shared/store/useFormStorage'

export const useActiveForm = () => {
  const formProps = inject('form') as { id: string }

  const formStorage = useFormStorage()

  const activeForm = computed(() => formStorage.get(formId.value))
  const data = computed(() => formsData.value?.[index.value] ?? {})
  const draftId = computed(() => activeForm.value?.draftId)
  const errors = computed(() => formsErrors.value?.[index.value])
  const form = computed(() => activeForm.value?.forms[index.value])
  const formData = computed(() => formsData.value.reduce((acc, val) => ({ ...acc, ...val }), {}))
  const formId = computed(() => formProps?.id)
  const formKey = computed(() => `form-${formId.value}-${index.value}`)
  const forms = computed(() => activeForm.value?.forms)
  const formsData = computed(() => activeForm.value?.data)
  const formsErrors = computed(() => activeForm.value?.errors)
  const index = computed(() => activeForm.value?.index ?? -1)
  const readonly = computed(() => !!activeForm.value?.isSubmitting)
  const schema = computed(() => form.value?.dataschema)
  const uischema = computed(() => form.value?.uischema)

  function setForms({ forms, values }: { forms: Form[]; values?: FormData }) {
    const restoredForm = formStorage.get(formId.value)
    const { data, index } = restoredForm ?? { data: [], index: 0 } // set cache for form
    formStorage.set({ id: formId.value, forms, errors: [], index, data })

    // set values to form when form created
    if (!restoredForm) {
      setFormDataFromValues(values)
    }
  }

  function setDraftId(draftId: string) {
    formStorage.update(formId.value, { draftId })
  }

  function setFormDataFromValues(values?: FormData) {
    if (!values) return
    activeForm.value.data = forms.value?.map(({ dataschema: { properties = {} } }) => {
      return Object.keys(properties).reduce((cul, key) => {
        if (key in values) cul[key] = values[key]
        return cul
      }, {} as FormData)
    })
  }

  function getScopesFromElements() {
    const key = 'elements'
    const elements = (uischema.value as any)?.[key] ?? []
    return getDeepProps(elements, key, 'scope')
  }

  function getCurrentScopes() {
    return getScopesFromElements().map((scope: string) => getControlId(scope))
  }

  function getCurrentLinkedScopes() {
    return getScopesFromElements().map((scope: string) => getLinkedControlId(scope))
  }

  function getScopedElement(id: string) {
    const key = 'elements'
    const elements = (uischema.value as any)?.[key] ?? []
    return flattenDeep(elements, key)?.find(({ scope }: { scope: string }) =>
      scope ? getControlId(scope) === id : false
    )
  }

  function setFormStep(value: number) {
    activeForm.value.index = value
  }

  function setFormData(data: any) {
    formsData.value[index.value] = data
  }

  function onChange({ data, errors }: JsonFormsChangeEvent) {
    activeForm.value.data[index.value] = data
    activeForm.value.errors[index.value] = errors
  }

  function setSubmitting(isSubmitting: boolean) {
    formStorage.update(formId.value, { isSubmitting })
  }

  return {
    activeForm,
    data,
    draftId,
    errors,
    events: {
      change: onChange
    },
    formData,
    formId,
    formKey,
    forms,
    formsData,
    formsErrors,
    getCurrentLinkedScopes,
    getCurrentScopes,
    getScopedElement,
    index,
    readonly,
    schema,
    setDraftId,
    setFormData,
    setForms,
    setFormStep,
    setSubmitting,
    uischema
  }
}
