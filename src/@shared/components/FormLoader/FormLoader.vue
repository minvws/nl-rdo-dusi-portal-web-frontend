<template>
  <FormSection>
    <FormLoaderMessage
      v-if="isFetching || error"
      v-bind="{ isFetching, error }"
    />
    <FormView
      v-else-if="forms"
      v-bind="{
        id,
        forms,
        values,
        title,
        buttonLabels,
        createDraft: true
      }"
    />
  </FormSection>
</template>

<script setup lang="ts">
import type { FormData } from '@shared/types/form'

import { computed } from 'vue'
import { translate } from '@/@shared/i18n'

import { useFetchForm } from '@shared/composables/form/useFetchForm'
import FormLoaderMessage from '@shared/components/FormLoaderMessage/FormLoaderMessage.vue'
import FormSection from '@shared/components/FormSection/FormSection.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
  values?: FormData
  edit?: boolean
}

const props = defineProps<Props>()

const { title, forms, isFetching, error, values } = useFetchForm(props)

// when editing the form, change the label of the start-button to next-button
const buttonLabels = computed(() =>
  props.edit ? { start: translate('form.button.next') } : undefined
)
</script>
