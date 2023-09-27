<template>
  <FormViewRenderer
    v-bind="$props"
    @submit="onSubmit"
    @save="onSave"
  />
</template>

<script setup lang="ts">
import type { FormViewProps } from '@shared/types/form'

import { provide } from 'vue'
import FormViewRenderer from '@shared/components/FormView/FormViewRenderer.vue'

const props = defineProps<FormViewProps>()
provide('form', props)

const emit = defineEmits(['submit', 'save'])

function onSubmit(data: FormData) {
  emit('submit', data)
}

function onSave(data: FormData) {
  emit('save', data)
}
</script>
