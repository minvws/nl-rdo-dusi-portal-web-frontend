import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import type {
  Form,
  FormData,
  FormError,
  FormErrors,
  FormValidationResult
} from '@shared/types/form'
import { FormUiType } from '@shared/types/form'
import type { FieldProp } from '@shared/types/field'
import type { StoredForm } from '@shared/store/useFormStorage'

import { computed, inject, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useFormStorage } from '@shared/store/useFormStorage'

import { useClearForm } from '@shared/composables/form/useClearForm'

import { getControlId, getLinkedControlId } from '@shared/utils/control'
import { getDeepProps, flattenDeep } from '@shared/utils/array'
import { transformFormValues } from '@shared/utils/form'

const VALIDATION_RESULT_FIELD_NAME = 'validationResult'

export const useActiveForm = () => {
  const formProps = inject('form') as {
    id: string
    createDraft?: boolean
    hideRequiredLabel?: boolean
  }

  const formStorage = useFormStorage()
  const { formIds, storage } = storeToRefs(formStorage)

  const activeFormErrors = ref<FormErrors>([])

  onMounted(() => (activeFormErrors.value = activeForm.value?.errors ?? []))

  const activeForm = computed<StoredForm>(() => formStorage.get(formId.value))

  const activeFormId = computed<string>(() => {
    return formIds.value[formIds.value.length - 1]
  })

  const activeInputStage = computed<StoredForm | undefined>(() =>
    Object.values(storage.value).find((form) =>
      form.forms.some((f) => f.uiType === FormUiType.INPUT)
    )
  )

  const activeInputStageForm = computed<Form | undefined>(() => {
    if (!activeInputStage.value) {
      return undefined
    }

    const form = activeInputStage.value.forms[index.value]

    if (!form) {
      return undefined
    }

    return form
  })

  const createDraft = computed<boolean>(() => !!formProps.createDraft)

  const data = computed<FormData>(() => formsData.value?.[index.value] ?? {})

  const draftId = computed<string | undefined>(() => activeForm.value?.draftId)

  const draftIsPending = computed<boolean | undefined>(() => activeForm.value?.draftIsPending)

  const errors = computed<FormError[]>(() => {
    const errors = activeFormErrors.value[index.value] || []
    return errors as FormError[]
  })

  const form = computed<Form>(() => activeForm.value?.forms[index.value])

  const formData = computed<FormData>(() => Object.assign({}, ...formsData.value))

  const formId = computed<string>(() => formProps?.id)

  const formKey = computed<string>(() => `form-${formId.value}-${index.value}`)

  const forms = computed<Form[]>(() => activeForm.value?.forms)

  const formsData = computed<FormData[]>(() => activeForm.value?.data)

  const index = computed<number>(() => activeForm.value?.index ?? -1)

  const isValidationPending = computed<boolean | undefined>(
    () => activeForm.value?.isValidationPending
  )

  const validationId = computed<string | undefined>(() => activeForm.value?.validationId)

  const validationResult = computed<FormValidationResult | undefined>(
    () => activeForm.value?.validationResult
  )

  // get all remote-validations of type = 'error'
  const validationResultErrors = computed<(string | undefined)[]>(() =>
    Object.entries(activeForm.value?.validationResult ?? {})
      .map(([key, value]) => {
        const hasError = value.find(({ type }) => type === 'error')
        return hasError ? key : undefined
      })
      .filter((key) => !!key)
  )

  // set remote-validations for each page
  const formsValidationErrors = computed<({ instancePath: string }[] | undefined)[]>(() =>
    activeForm.value?.forms?.map((form) => {
      const properties = Object.keys(form.dataschema?.properties ?? {})
      const instancePath = properties.find((instancePath) =>
        validationResultErrors.value.includes(instancePath)
      )
      return instancePath ? [{ instancePath }] : undefined
    })
  )

  // combine local validation errors with remote-validation errors
  const formsErrors = computed<FormErrors>(() => {
    if (!activeForm.value?.forms) return []

    return activeForm.value?.forms?.map((_form: Form, index) => {
      const validationErrors = formsValidationErrors.value[index] || []
      const formErrors = [...(activeForm.value?.errors[index] || [])].flat()

      return [...validationErrors, ...formErrors] as FormError[]
    })
  })

  const readonly = computed<boolean>(() =>
    validationId.value ? false : !!activeForm.value?.isSubmitting
  )

  const schema = computed<JsonSchema>(() => form.value?.dataschema)

  const uischema = computed<UISchemaElement>(() => form.value?.uischema)

  const isReadOnly = computed<boolean>(() => form.value?.uiType === FormUiType.VIEW)

  const hideRequiredLabel = computed<boolean>(() => formProps?.hideRequiredLabel === true)

  const { clear } = useClearForm(formId)

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
    if (!values) {
      return
    }

    const formsValue = forms.value
    const newData: FormData[] = []

    if (formsValue) {
      for (const {
        dataschema: { properties = {} }
      } of formsValue) {
        const formDataEntry: FormData = {}

        for (const key in properties) {
          if (key in values) {
            formDataEntry[key] = values[key]
          }
        }

        newData.push(formDataEntry)
      }
    }

    activeForm.value.data = newData
  }

  function getAllProperties() {
    const formsValue = forms.value
    let acc: Record<string, FieldProp> = {}

    if (formsValue) {
      for (const {
        dataschema: { properties }
      } of formsValue) {
        const values = properties as Record<string, FieldProp>

        for (const key in values) {
          if (Object.prototype.hasOwnProperty.call(values, key)) {
            acc[key] = values[key]
          }
        }
      }
    }

    return acc
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
    activeForm.value.errors[index.value] = errors as FormError[]
  }

  function setSubmitting(isSubmitting: boolean) {
    formStorage.update(formId.value, { isSubmitting })
  }

  function setValidationResult(result?: { validationResult: FormValidationResult }) {
    formStorage.update(formId.value, result ?? { validationResult: undefined })
  }

  function setActionResult({ values }: { values: FormData }) {
    if (!values) {
      return
    }

    setFormDataFromValues(transformFormValues(values))
  }

  function getFormData() {
    const data = { ...formData.value }
    // do not submit VALIDATION_RESULT_FIELD_NAME with request
    delete data[VALIDATION_RESULT_FIELD_NAME]
    return data
  }

  watch(validationResult, (result) => {
    if (!activeForm.value) {
      return
    }

    // when validation-result changes, add it to the data of the form
    let target = activeForm.value.data.find((page) => VALIDATION_RESULT_FIELD_NAME in page)

    if (!target) {
      // always add field when it is not found
      target = activeForm.value.data[index.value]
    }

    Object.assign(target, { [VALIDATION_RESULT_FIELD_NAME]: result })
  })

  return {
    activeForm,
    activeFormId,
    activeInputStageForm,
    clearForm: clear,
    createDraft,
    data,
    draftId,
    draftIsPending,
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
    getFormData,
    getScopedElement,
    hideRequiredLabel,
    index,
    isReadOnly,
    isValidationPending,
    readonly,
    schema,
    setActionResult,
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
