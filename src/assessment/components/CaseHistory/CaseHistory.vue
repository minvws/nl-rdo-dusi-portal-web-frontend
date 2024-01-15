<template>
  <AppSuspense v-bind="{ data, error, isFetching }">
    <CaseHistoryTable
      v-if="data.length > 0"
      :data="data"
    />
  </AppSuspense>
</template>

<script setup lang="ts">
import { useFetchCaseHistory } from '@assessment/composables/useFetchCaseHistory'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import CaseHistoryTable from '@assessment/components/CaseHistoryTable/CaseHistoryTable.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { data, error, isFetching } = useFetchCaseHistory(props.id)
</script>
