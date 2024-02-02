<template>
  <div class="case-history-table">
    <AppTable
      :data="sortedData"
      :columns="headings"
      :sorting-id="sortingId"
      :sorting-direction="sortingDirection"
      @sorting-change="onSortingChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@shared/types/table'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useTable } from '@shared/composables/useTable'

import AppTable from '@shared/components/AppTable/AppTable.vue'

import { hasItems } from '@shared/utils/app-table'

type Props = {
  data: any[]
}

const props = defineProps<Props>()

const { t } = useI18n()
const { sortedData, sortingDirection, sortingId, onSortingChange } = useTable({
  data: props.data,
  itemsPerPage: 10
})

const headings = computed<Column[]>(() => {
  const items = [
    { id: 'updated_at', sortable: true },
    { id: 'action', sortable: false },
    { id: 'internalNote', sortable: false },
    { id: 'assessor', sortable: true }
  ].filter(({ id }) => !!hasItems(props.data, id)) as Column[]

  return items.map(({ id, ...item }) => ({
    ...item,
    id,
    text: t(`component.caseHistoryColumn.${id}`)
  }))
})
</script>

<style lang="scss" scoped>
.cases-history-table {
  width: 100%;
}
</style>
