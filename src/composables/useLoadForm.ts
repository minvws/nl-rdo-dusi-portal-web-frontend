import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import type { Form, FormResult } from '@/type/form-types'

import { useApiFormsUrl } from '@/composables/useApiUrl'
import {isLabeled, isLayout} from "@jsonforms/core";
import type { JsonSchema } from "@jsonforms/core";

export const transformForm = (form: Form): Form[] => {
  if (form.uischema.type !== 'CustomPageNavigationControl') {
    // assume single page form
    return [form];
  }

  if (!isLayout(form.uischema)) {
    throw 'UI schema is invalid, expected page navigation layout!';
  }

  const baseSchema: JsonSchema = form.schema

  const forms: Form[] = form.uischema.elements.map(function (el)  {
    if (el.type !== 'CustomPageControl' || !isLabeled(el) || !isLayout(el)) {
      throw 'UI schema is invalid, expected page control layout'
    }

    const title: string|undefined = isLabeled(el) ? el.label : undefined

    const schema: JsonSchema = {
      type: 'object',
      properties: baseSchema.properties,
      required: el.options?.['required'] ?? baseSchema.required ?? []
    } as JsonSchema

    const uischema = el.elements[0]
    return { title, schema, uischema }
  });

  return forms
}

export const useLoadForm = () => {
  const titleRef: Ref<string | undefined> = ref(undefined)
  const forms: Ref<Form[] | undefined> = ref(undefined)
  const error: Ref<string> = ref('')
  const isLoading = ref(false)

  const loadFormById = async (id: string | number) => {
    error.value = ''
    forms.value = undefined
    isLoading.value = true

    try {
      const url = useApiFormsUrl(id)
      const response = await fetch(url)
      const json: FormResult = await response.json()
      const { title, dataSchema: schema, uiSchema: uischema } = json
      const form: Form = { title, schema, uischema }
      forms.value = transformForm(form)
      console.log(forms.value)
      titleRef.value =  title
    } catch (e) {
      error.value = `${e}`
    } finally {
      isLoading.value = false
    }
  }

  return {
    forms,
    title: titleRef,
    error,
    isLoading,
    loadFormById
  }
}
