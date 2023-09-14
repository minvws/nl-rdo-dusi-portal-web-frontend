<template>
  <AppSuspense v-bind="{ data: forms, error, isFetching }">
    <div class="form-section">
      <FormView v-bind="{ id, title, forms, values }" />
    </div>
  </AppSuspense>
</template>

<script setup lang="ts">
import { useFetchForm } from '@shared/composables/form/useFetchForm'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
  values?: Record<string, string>
}

const props = defineProps<Props>()

const { title, forms, error, isFetching } = useFetchForm(props.id)
</script>
