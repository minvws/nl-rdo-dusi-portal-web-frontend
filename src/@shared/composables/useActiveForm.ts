import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import type { Form, FormData, FormError } from '@shared/types/form'

import { getDeepProps, flattenDeep } from '@shared/utils/array'
import { getControlId, getLinkedControlId } from '@shared/utils/control'

type ActiveFormStore = {
  forms: Form[]
  id: string
  index: number
  data: FormData[]
  errors: FormError[]
}

export const useActiveForm = () => {
  const store: Ref<Record<string, ActiveFormStore>> = ref({})
  const formId: Ref<string> = ref('')

  const activeForm = computed(() => store.value[formId.value])

  const index = computed(() => activeForm.value?.index ?? -1)

  const forms = computed(() => activeForm.value?.forms)

  const formsData = computed(() => activeForm.value?.data)

  const formsErrors = computed(() => activeForm.value?.errors)

  const formKey = computed(() => `form-${formId.value}-${index.value}`)

  const form = computed(() => activeForm.value?.forms[index.value])

  const uischema = computed(() => form.value?.uischema)

  const schema = computed(() => form.value?.dataschema)

  const data = computed(() => formsData.value?.[index.value] ?? {})

  const errors = computed(() => formsErrors.value?.[index.value])

  const formData = computed(() => formsData.value.reduce((acc, val) => ({ ...acc, ...val }), {}))

  function setForms({
    forms,
    id,
    values
  }: {
    forms: Form[]
    id: string | number
    values?: FormData
  }) {
    formId.value = `${id}`

    const restoredForm = store.value[formId.value]
    const { data, index } = restoredForm ?? { data: [], index: 0 } // set cache for form
    store.value[formId.value] = { id: formId.value, forms, errors: [], index, data }

    // set values to form when form created
    if (!restoredForm) setFormDataFromValues(values)
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

  function clearForm(id?: string) {
    if (id) delete store.value[id]
    formId.value = ''
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

  return {
    activeForm,
    clearForm,
    data,
    formsData,
    errors,
    events: {
      change: onChange
    },
    formData,
    formKey,
    forms,
    formsErrors,
    getCurrentLinkedScopes,
    getScopedElement,
    getCurrentScopes,
    index,
    schema,
    setFormData,
    setForms,
    setFormStep,
    uischema
  }
}
