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
        title
      }"
    />
  </FormSection>
</template>

<script setup lang="ts">
import FormSection from '@/components/form/FormSection/FormSection.vue'
import FormLoaderMessage from '@/components/form/FormLoaderMessage/FormLoaderMessage.vue'
import FormView from '@/components/form/FormView/FormView.vue'

import { useLoadForm } from '@/composables/useLoadForm'
import { computed, watch } from 'vue'

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
