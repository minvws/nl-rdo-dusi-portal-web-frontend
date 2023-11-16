import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import type { Form, FormData, FormValidationResult } from '@shared/types/form'
import { FormUiTypes } from '@shared/types/form'
import type { FieldProp } from '@shared/types/field'

import { computed, inject } from 'vue'

import { getDeepProps, flattenDeep } from '@shared/utils/array'
import { getControlId, getLinkedControlId } from '@shared/utils/control'

import { useFormStorage } from '@shared/store/useFormStorage'
import { useClearForm } from '@shared/composables/form/useClearForm'
import { transformFormValues } from '@shared/utils/form'

export const useActiveForm = () => {
  const formProps = inject('form') as {
    id: string
    createDraft?: boolean
    hideRequiredLabel?: boolean
  }

  const formStorage = useFormStorage()
  const index = computed(() => activeForm.value?.index ?? -1)
  const activeForm = computed(() => formStorage.get(formId.value))
  const data = computed(() => formsData.value?.[index.value] ?? {})
  const draftId = computed(() => activeForm.value?.draftId)
  const draftIsPending = computed(() => activeForm.value?.draftIsPending)
  const errors = computed(() => activeForm.value?.errors[index.value])
  const form = computed(() => activeForm.value?.forms[index.value])
  const formData = computed(() => formsData.value.reduce((acc, val) => ({ ...acc, ...val }), {}))
  const formId = computed(() => formProps?.id)
  const formKey = computed(() => `form-${formId.value}-${index.value}`)
  const forms = computed(() => activeForm.value?.forms)
  const formsData = computed(() => activeForm.value?.data)
  const createDraft = computed(() => !!formProps.createDraft)
  const isValidationPending = computed(() => activeForm.value?.isValidationPending)
  const validationId = computed(() => activeForm.value?.validationId)

  const validationResult = computed(() => activeForm.value?.validationResult)

  // get all remote-validations of type = 'error'
  const validationResultErrors = computed(() =>
    Object.entries(activeForm.value?.validationResult ?? {})
      .map(([key, value]) => {
        const hasError = value.find(({ type }) => type === 'error')
        return hasError ? key : undefined
      })
      .filter(key => !!key)
  )

  // set remote-validations for each page
  const formsValidationErrors = computed(
    () =>
      activeForm.value?.forms?.map(form => {
        const properties = Object.keys(form.dataschema?.properties ?? {})
        const instancePath = properties.find(instancePath =>
          validationResultErrors.value.includes(instancePath)
        )
        return instancePath ? [{ instancePath }] : undefined
      })
  )

  const formsErrors = computed(() => {
    // combine local validation errors with remote-validation errors
    const combined = activeForm.value?.forms?.map((form, index) => {
      return [
        ...(formsValidationErrors.value[index] || []),
        ...(activeForm.value?.errors[index] || [])
      ]
    })
    return combined
  })

  const readonly = computed(() => (validationId.value ? false : !!activeForm.value?.isSubmitting))
  const schema = computed(() => form.value?.dataschema)
  const uischema = computed(() => form.value?.uischema)
  const isReadOnly = computed(() => form.value?.uiType === FormUiTypes.VIEW)
  const hideRequiredLabel = computed(() => formProps?.hideRequiredLabel === true)

  const clearForm = useClearForm(formId)

  function setForms({ forms, values }: { forms: Form[]; values?: FormData }) {
    const restoredForm = formStorage.get(formId.value) ?? { data: [], index: 0 }
    formStorage.set({ ...restoredForm, id: formId.value, forms, errors: [] })
    setFormDataFromValues(values)
  }

  function setDraft({ reference: draftId, data }: { reference: string; data?: FormData }) {
    formStorage.update(formId.value, { draftId })
    setFormDataFromValues(transformFormValues(data))
    setDraftIsPending(false)
  }

  function setDraftIsPending(isPending: boolean) {
    formStorage.update(formId.value, { draftIsPending: isPending })
  }
  function setValidatingIsPending(isPending: boolean) {
    formStorage.update(formId.value, { isValidationPending: isPending })
    if (!isPending) setIdIsValidating()
  }

  function setIdIsValidating(validationId?: string) {
    formStorage.update(formId.value, { validationId })
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
    if (!activeForm.value) return
    activeForm.value.data[index.value] = data
    activeForm.value.errors[index.value] = errors
  }

  function setSubmitting(isSubmitting: boolean) {
    formStorage.update(formId.value, { isSubmitting })
  }

  function setValidationResult(result?: { validationResult: FormValidationResult }) {
    formStorage.update(formId.value, result ?? { validationResult: undefined })
  }

  return {
    activeForm,
    createDraft,
    data,
    draftId,
    draftIsPending,
    clearForm,
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
    isValidationPending,
    readonly,
    schema,
    setDraft,
    setDraftIsPending,
    setFormData,
    setForms,
    setFormStep,
    setIdIsValidating,
    setSubmitting,
    setValidatingIsPending,
    setValidationResult,
    uischema,
    validationId,
    validationResult
  }
}
