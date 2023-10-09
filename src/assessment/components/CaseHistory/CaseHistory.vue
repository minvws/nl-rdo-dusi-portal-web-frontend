<template>
  <AppSuspense v-bind="{ data, error, isFetching }">
    <div class="case-history">
      <AppTable
        :data="data"
        :columns="columns"
        :items-per-page="10"
      />
    </div>
  </AppSuspense>
</template>

<script setup lang="ts">
import { useFetchCaseHistory } from '@assessment/composables/useFetchCaseHistory'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { columns, data, error, isFetching } = useFetchCaseHistory(props.id)
</script>
