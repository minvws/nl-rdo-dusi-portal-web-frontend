<template>
  <FormSection>
    <FormLoaderMessage
      v-if="isLoading || error"
      v-bind="{ isLoading, error }"
    />
    <FormView
      v-else-if="forms"
      v-bind="{
        id,
        forms,
        title,
        createFormDraft: true
      }"
    />
  </FormSection>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

import { useLoadForm } from '@shared/composables/useLoadForm'

import FormLoaderMessage from '@shared/components/FormLoaderMessage/FormLoaderMessage.vue'
import FormSection from '@shared/components/FormSection/FormSection.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { title, forms, isLoading, error, loadFormById } = useLoadForm()

const id = computed(() => props.id)

watch(
  id,
  id => {
    loadFormById(id)
  },
  { immediate: true }
)
</script>
