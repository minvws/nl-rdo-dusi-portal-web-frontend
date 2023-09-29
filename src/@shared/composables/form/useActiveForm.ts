import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import { FormUiTypes, type Form, type FormData } from '@shared/types/form'
import type { FieldProp } from '@shared/types/field'

import { computed, inject } from 'vue'

import { getDeepProps, flattenDeep } from '@shared/utils/array'
import { getControlId, getLinkedControlId } from '@shared/utils/control'
import { useFormStorage } from '@shared/store/useFormStorage'

export const useActiveForm = () => {
  const formProps = inject('form') as { id: string; hideRequiredLabel?: boolean }

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
  const isReadOnly = computed(() => form.value?.uiType === FormUiTypes.VIEW)
  const hideRequiredLabel = computed(() => formProps?.hideRequiredLabel === true)

  function setForms({ forms, values }: { forms: Form[]; values?: FormData }) {
    const restoredForm = formStorage.get(formId.value)
    const { data, index } = restoredForm ?? { data: [], index: 0 } // set cache for form
    formStorage.set({ id: formId.value, forms, errors: [], index, data })
    setFormDataFromValues(values)
  }

  function setDraftId(draftId: string) {
    formStorage.update(formId.value, { draftId })
  }

  function setFormDataFromValues(values?: FormData) {
    if (!values) return
    const data = forms.value?.map(({ dataschema: { properties = {} } }) => {
      return Object.keys(properties).reduce((cul, key) => {
        if (key in values) cul[key] = values[key]
        return cul
      }, {} as FormData)
    })
    activeForm.value.data = data
  }

  function getAllProperties() {
    return forms.value?.reduce(
      (cul, { dataschema: { properties } }) => {
        const values = properties as Record<string, FieldProp>
        return { ...cul, ...values }
      },
      {} as Record<string, FieldProp>
    )
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
    getAllProperties,
    getCurrentLinkedScopes,
    getCurrentScopes,
    getScopedElement,
    hideRequiredLabel,
    index,
    isReadOnly,
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
