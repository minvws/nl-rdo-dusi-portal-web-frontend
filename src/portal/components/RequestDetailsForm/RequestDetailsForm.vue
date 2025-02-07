<template>
  <AppSuspense v-bind="{ data: forms, error, isFetching }">
    <div class="form-section">
      <FormView
        :id="reference"
        :forms="forms"
        :values="values"
        no-buttons
        no-style
      />
    </div>
  </AppSuspense>
</template>

<script setup lang="ts">
import type { FormData } from '@shared/types/form'

import { useFetchForm } from '@shared/composables/form/useFetchForm'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
  reference: string
  values?: FormData
}

const props = defineProps<Props>()

const readonlyForm = true
const { forms, error, isFetching } = useFetchForm(props, readonlyForm)
</script>
