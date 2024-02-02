<template>
  <div class="iban-check-table">
    <AppTable
      :data="paginatedData"
      :columns="headings"
      :sorting-id="sortingId"
      :sorting-direction="sortingDirection"
      @sorting-change="onSortingChange"
    />

    <AppPagination
      :items-total="data.length"
      :page-size="itemsPerPage"
      :current-page="currentPage"
      @page-change="onPageChange"
      with-buttons
    />
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@shared/types/table'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useTable } from '@shared/composables/useTable'

import AppPagination from '@shared/components/AppPagination/AppPagination.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'

import { hasItems } from '@shared/utils/app-table'

type Props = {
  data: any[]
}

const props = defineProps<Props>()

const itemsPerPage = 10

const { t } = useI18n()
const { currentPage, paginatedData, sortingDirection, sortingId, onPageChange, onSortingChange } =
  useTable({
    data: props.data,
    itemsPerPage
  })

const headings = computed<Column[]>(() => {
  const items = [
    { id: 'count', sortable: true },
    { id: 'applications', sortable: false }
  ].filter(({ id }) => !!hasItems(props.data, id)) as Column[]

  return items.map(({ id, ...item }) => ({
    ...item,
    id,
    text: t(`component.ibanCheckColumn.${id}`)
  }))
})
</script>

<style lang="scss" scoped>
.iban-check-table {
  width: 100%;
}
</style>
