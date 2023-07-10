import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import type { Form, FormData, FormError } from '@/type/form-types'

import { getDeepProps } from '@/util/array-util'
import { getControlId, getLinkedControlId } from '@/util/control-util'

export const useActiveForm = () => {
  const store: Ref<
    Record<
      string,
      { forms: Form[]; id: string; index: number; data: FormData[]; errors: FormError[] }
    >
  > = ref({})

  const formId: Ref<string> = ref('')

  const setForms = ({ forms, id }: { forms: Form[]; id: string | number }) => {
    formId.value = `${id}`
    const { data, index } = store.value[formId.value] ?? { data: [], index: 0 } // set cache for form
    store.value[formId.value] = { id: formId.value, forms, errors: [], index, data }
  }

  const clearForm = (id?: string) => {
    if (id) delete store.value[id]
    formId.value = ''
  }

  const activeForm = computed(() => {
    return store.value[formId.value]
  })

  const index = computed(() => {
    return activeForm.value?.index ?? -1
  })

  const forms = computed(() => {
    return activeForm.value?.forms
  })

  const formsData = computed(() => {
    return activeForm.value?.data
  })

  const formsErrors = computed(() => {
    return activeForm.value?.errors
  })

  const formKey = computed(() => {
    return `form-${formId.value}-${index.value}`
  })

  const form = computed(() => {
    return activeForm.value?.forms[index.value]
  })

  const uischema = computed(() => {
    return form.value?.uischema
  })

  const schema = computed(() => {
    return form.value?.schema
  })

  const data = computed(() => {
    return formsData.value?.[index.value] ?? {}
  })

  const errors = computed(() => {
    return formsErrors.value?.[index.value]
  })

  const formData = computed(() => {
    return formsData.value.reduce((cul, cur) => {
      return { ...cul, ...cur }
    }, {})
  })

  const getScopesFromElements = () => {
    const key = 'elements'
    const elements = (uischema.value as any)?.[key] ?? []
    return getDeepProps(elements, key, 'scope')
  }
  const getCurrentScopes = () => {
    return getScopesFromElements().map((scope: string) => getControlId(scope))
  }

  const getCurrentLinkedScopes = () => {
    return getScopesFromElements().map((scope: string) => getLinkedControlId(scope))
  }

  const setFormStep = (value: number) => {
    activeForm.value.index = value
  }

  const setFormData = (data: any) => {
    formsData.value[index.value] = data
  }

  const onChange = ({ data, errors }: JsonFormsChangeEvent) => {
    activeForm.value.data[index.value] = data
    activeForm.value.errors[index.value] = errors
  }

  return {
    activeForm,
    data,
    errors,
    formData,
    formKey,
    forms,
    formsErrors,
    index,
    schema,
    uischema,
    getCurrentScopes,
    getCurrentLinkedScopes,
    setForms,
    setFormStep,
    setFormData,
    clearForm,
    events: {
      change: onChange
    }
  }
}
