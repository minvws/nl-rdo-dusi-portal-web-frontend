<template>
  <section>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <RequestEditForm :id="data.form.id" />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { useFetchRequestStatus } from '@portal/composables/useFetchRequestStatus'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestEditForm from '@portal/components/RequestEditForm/RequestEditForm.vue'

type Props = {
  reference: string
}

const props = defineProps<Props>()

const { data, error, isFetching } = useFetchRequestStatus(props.reference)
</script>
