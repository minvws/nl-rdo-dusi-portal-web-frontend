<template>
  <FormSection>
    <FormLoaderMessage
      v-if="!forms"
      v-bind="{ isLoading: true }"
    />
    <FormView
      v-if="forms"
      v-bind="{
        id: 'local',
        forms,
        createFormDraft: true,
        title: translate('form.title')
      }"
    />
  </FormSection>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

import { translate } from '@shared/i18n'

import FormSection from '@shared/components/FormSection/FormSection.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import FormLoaderMessage from '@shared/components/FormLoaderMessage/FormLoaderMessage.vue'

import formExample from '@shared/unit/fixtures/form/FormExample'

import type { Form } from '@shared/types/form'

const forms: Ref<Form[] | undefined> = ref(undefined)
formExample().then(value => (forms.value = value))
</script>
