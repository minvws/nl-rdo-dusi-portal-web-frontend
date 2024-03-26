<template>
  <FormSection>
    <FormLoaderMessage
      v-if="isFetching || error"
      :is-fetching="isFetching"
      :error="error"
    />
    <FormView
      v-else-if="forms && formId"
      :reference="reference"
      :id="formId"
      :forms="forms"
      :values="values"
      :title="title"
      :button-labels="buttonLabels"
    />
  </FormSection>
</template>

<script setup lang="ts">
import type { FormData } from '@shared/types/form'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchForm } from '@shared/composables/form/useFetchForm'

import FormLoaderMessage from '@shared/components/FormLoaderMessage/FormLoaderMessage.vue'
import FormSection from '@shared/components/FormSection/FormSection.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
  reference?: string
  values?: FormData
}

const props = defineProps<Props>()

const { t } = useI18n()
const { id: formId, title, forms, isFetching, error, values } = useFetchForm(props)

const hasValues = computed(() => Object.keys(values.value ?? {}).length > 0)

// when editing the form, change the label of the start-button to next-button
const buttonLabels = computed<{ start: string | undefined } | undefined>(() =>
  hasValues.value ? { start: t('form.button.next') } : undefined
)
</script>
