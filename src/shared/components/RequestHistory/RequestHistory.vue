<template>
  <div class="request-history">
    <AppTable
      :data="mockData"
      :columns="headings"
      :items-per-page="10"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppTable from '@/assessment/components/AppTable/AppTable.vue'

const headings = ref([
  { field: 'datetime', text: 'Datum en tijd', sortable: true },
  { field: 'action', text: 'Actie', sortable: false },
  { field: 'note', text: 'Notitie', sortable: false },
  { field: 'performed_by', text: 'Uitgevoerd door', sortable: true }
])
const mockData = ref([
  {
    datetime: { type: 'date', text: '12-04-2023 15:42:29' },
    action: { type: 'string', text: 'Tweede beoordeling goedgekeurd' },
    note: { type: 'string', text: '-' },
    performed_by: { type: 'string', text: 'Bram Adema' }
  },
  {
    datetime: { type: 'date', text: '24-03-2023 11:53:23' },
    action: { type: 'string', text: 'Eerste beoordeling goedgekeurd' },
    note: { type: 'string', text: '-' },
    performed_by: { type: 'string', text: 'Bram Adema' }
  },
  {
    datetime: { type: 'date', text: '12-05-2023 12:31:43' },
    action: { type: 'string', text: 'Aangemaakt' },
    note: { type: 'string', text: '-' },
    performed_by: { type: 'string', text: 'Bram Adema' }
  }
])
</script>
