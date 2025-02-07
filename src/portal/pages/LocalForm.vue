<template>
  <FormSection>
    <FormNotification
      v-if="error"
      display-as="error"
      :message="error"
    />
    <FormLoaderMessage
      v-else-if="!form"
      is-fetching
    />
    <FormView
      v-else
      :id="name"
      :forms="form.data"
      :values="form.values"
      :title="form.title"
    />
  </FormSection>
</template>

<script setup lang="ts">
import type { Form, FormData } from '@shared/types/form'

import { ref } from 'vue'

import FormSection from '@shared/components/FormSection/FormSection.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import FormLoaderMessage from '@shared/components/FormLoaderMessage/FormLoaderMessage.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

const forms: Record<string, () => any> = {}

const formFiles = import.meta.glob('@shared/fixtures/form/*.ts')

for (const [key, value] of Object.entries(formFiles)) {
  const name = key.split('/').splice(-1)[0].split('.')[0]
  forms[name] = value
}

type Props = {
  name: string
}

const props = defineProps<Props>()

const form = ref<{ title?: string; data: Form[]; values?: FormData } | undefined>(undefined)
const error = ref<string | undefined>(undefined)

async function load() {
  try {
    const { default: localForm } = await forms[props.name]()
    form.value = await localForm()
  } catch {
    error.value = `form "${props.name}" cannot be loaded`
  }
}

load()
</script>
