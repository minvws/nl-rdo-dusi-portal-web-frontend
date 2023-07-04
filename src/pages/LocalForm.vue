<template>
  <FormSection>
    <FormLoaderMessage v-if="!forms" v-bind="{ isLoading: true }" />
    <FormView
      v-if="forms"
      v-bind="{
        id: 'local',
        forms,
        title: translate('form.title')
      }"
    />
  </FormSection>
</template>

<script setup lang="ts">
import FormSection from '@/components/form/FormSection/FormSection.vue'
import FormView from '@/components/form/FormView/FormView.vue'
import FormLoaderMessage from '@/components/form/FormLoaderMessage/FormLoaderMessage.vue'

import { translate } from '@/i18n'
import formExample from '@/unit/fixtures/form/FormExample'

import { ref, type Ref } from 'vue'
import type { Form } from '@/type/form-types'

const forms: Ref<Form[] | undefined> = ref(undefined)
formExample().then(value => (forms.value = value))
</script>
