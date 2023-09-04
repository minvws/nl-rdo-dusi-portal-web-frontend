<template>
  <div class="case-history">
    <AppTable
      :data="items"
      :columns="headings"
      :items-per-page="10"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AppTable from '@shared/components/AppTable/AppTable.vue'

type HistoryItem = {
  datetime: string
  action: string
  note: string
  performed_by: string
}

type Props = {
  items: HistoryItem[]
}

defineProps<Props>()

const headings = ref([
  { id: 'datetime', text: 'Datum en tijd', sortable: true },
  { id: 'action', text: 'Actie', sortable: false },
  { id: 'note', text: 'Notitie', sortable: false },
  { id: 'performed_by', text: 'Uitgevoerd door', sortable: true }
])
</script>
