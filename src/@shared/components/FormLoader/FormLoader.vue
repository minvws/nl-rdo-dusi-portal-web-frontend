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
        title,
        createDraft: true
      }"
    />
  </FormSection>
</template>

<script setup lang="ts">
import { useFetchForm } from '@shared/composables/useFetchForm'
import FormLoaderMessage from '@shared/components/FormLoaderMessage/FormLoaderMessage.vue'
import FormSection from '@shared/components/FormSection/FormSection.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
}
const props = defineProps<Props>()
const { title, forms, isFetching, error } = useFetchForm(props.id)
</script>
