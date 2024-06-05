<template>
  <div class="cases-table">
    <AppTable
      :data="data"
      :columns="headings"
      :sorting-id="sortingId"
      :sorting-direction="sortingDirection"
      @sorting-change="onSortingChange"
    />

    <AppPagination
      :items-total="pagination.total"
      :page-size="pagination.perPage"
      :current-page="pagination.currentPage"
      @page-change="onPageChange"
      with-buttons
    />
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@shared/types/table'
import type { SortDirection, SortItem } from '@shared/types/sort'
import type { PaginationMetaData } from '@shared/types/pagination'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppPagination from '@shared/components/AppPagination/AppPagination.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'

import { hasItems } from '@shared/utils/app-table'

const emit = defineEmits(['page-change', 'sorting-change'])

type Props = {
  pagination: PaginationMetaData
  data: any[]
  sortingId: string
  sortingDirection: SortDirection
}

const props = defineProps<Props>()

const { t } = useI18n()

const headings = computed<Column[]>(() => {
  const items = [
    { id: 'case', sortable: false },
    { id: 'action', sortable: false },
    { id: 'file', sortable: false },
    { id: 'stage_title', sortable: false },
    { id: 'status', sortable: false },
    { id: 'final_review_deadline', sortable: true },
    { id: 'updated_at', sortable: true },
    { id: 'reviewer', sortable: false }
  ].filter(({ id }) => !!hasItems(props.data, id)) as Column[]

  return items.map(({ id, ...item }) => ({
    ...item,
    id,
    text: t(`component.caseColumn.${id}`)
  }))
})

function onSortingChange(newSorting: SortItem) {
  emit('sorting-change', newSorting)
}

function onPageChange(newPage: number) {
  emit('page-change', newPage)
}
</script>

<style lang="scss" scoped>
.cases-table {
  width: 100%;
}
</style>
