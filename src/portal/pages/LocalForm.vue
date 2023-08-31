<template>
  <FormSection>
    <FormLoaderMessage
      v-if="!form"
      v-bind="{ isFetching: true }"
    />
    <FormView
      v-else
      v-bind="{
        id: 'local',
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
import formExample from '@shared/fixtures/form/PostCovid'

const form: Ref<{ title?: string; data: Form[]; values?: FormData } | undefined> = ref(undefined)
formExample().then(value => (form.value = value))
</script>
