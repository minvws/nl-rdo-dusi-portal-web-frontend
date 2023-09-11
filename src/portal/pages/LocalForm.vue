<template>
  <FormSection>
    <FormNotification
      v-if="error"
      display-as="error"
      :message="error"
    />
    <FormLoaderMessage
      v-else-if="!form"
      v-bind="{ isFetching: true }"
    />
    <FormView
      v-else
      v-bind="{
        id,
        createDraft: true,
        forms: form.data,
        values: form.values,
        title: form.title
      }"
    />
  </FormSection>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Form, FormData } from '@shared/types/form'

import { ref } from 'vue'

import FormSection from '@shared/components/FormSection/FormSection.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import FormLoaderMessage from '@shared/components/FormLoaderMessage/FormLoaderMessage.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

const forms = Object.entries(import.meta.glob('@shared/fixtures/form/*.ts')).reduce(
  (cul, [key, value]) => {
    const name = key.split('/').splice(-1)[0].split('.')[0]
    return { [name]: value, ...cul }
  },
  {} as Record<string, () => any>
)

const props = defineProps<{ name?: string; id: string }>()
const form: Ref<{ title?: string; data: Form[]; values?: FormData } | undefined> = ref(undefined)
const error: Ref<string | undefined> = ref(undefined)

const load = async () => {
  const name = props.name ?? 'post-covid'

  try {
    const { default: localForm } = await forms[name]()
    form.value = await localForm()
  } catch (e) {
    error.value = `form "${name}" cannot be loaded`
  }
}

load()
</script>
