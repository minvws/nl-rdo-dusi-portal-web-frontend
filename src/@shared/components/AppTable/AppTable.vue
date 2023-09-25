<template>
  <div class="horizontal-scroll nowrap">
    <table>
      <caption
        v-if="caption"
        v-html="caption"
      />
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.id"
            scope="col"
            class="sortable"
            :abbr="`Sorteer per ${column.text}`"
          >
            {{ column.text }}
            <AppButton
              v-if="column.sortable"
              @click="sortTableById(column.id)"
              class="button"
            >
              <span class="visually-hidden">Sorteren</span>
              <AppIcon
                v-if="sortId === column.id"
                :name="sortDirection === 'asc' ? 'ascending' : 'descending'"
              />
              <AppIcon
                v-else
                name="sort"
              />
            </AppButton>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in paginatedData"
          :key="item.id"
        >
          <template
            v-for="column in columns"
            :key="column.id"
          >
            <td :class="item[column.id].icon ? item[column.id].icon : null">
              <span v-if="item[column.id].icon" />
              <a
                v-if="item[column.id].type === 'external-link'"
                :href="item[column.id].to"
              >
                {{ item[column.id].text }}
              </a>
              <RouterLink
                v-else-if="
                  item[column.id].type === 'link' || item[column.id].type === 'button-link'
                "
                :class="{
                  button: item[column.id].type === 'button-link'
                }"
                :to="item[column.id].to"
              >
                {{ item[column.id].text }}
              </RouterLink>
              <AppButton
                v-else-if="item[column.id].type === 'button'"
                class="button ghost"
                @click="item[column.id].onClick"
              >
                {{ item[column.id].text }}
              </AppButton>
              <RouterLink
                v-else-if="item[column.id].type === 'icon'"
                :to="item[column.id].to"
              >
                <AppIcon
                  :name="item[column.id].text"
                  aria-hidden="true"
                />
              </RouterLink>
              <template v-else>
                {{ item[column.id].text }}
              </template>
            </td>
          </template>
        </tr>
      </tbody>
    </table>

    <AppPagination
      :items-total="totalItems"
      :page-size="itemsPerPage"
      :current-page="currentPage"
      @page-change="onPageChange"
      with-buttons
    />
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@shared/types/table'

import { ref, computed, watch } from 'vue'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppPagination from '@shared/components/AppPagination/AppPagination.vue'

type Props = {
  caption?: string
  columns: Column[]
  data: any[]
  itemsPerPage: number
}

const props = defineProps<Props>()

const currentPage = ref(1)
const sortId = ref('')
const sortDirection = ref('asc')

// Reset page when incoming data changes
watch(
  () => props.data,
  () => {
    currentPage.value = 1
  }
)

const totalItems = computed(() => props.data.length ?? 0)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return sortedData.value.slice(start, end)
})

const sortedData = computed(() => {
  const clonedData = [...props.data]

  if (sortId.value) {
    clonedData.sort((a: any, b: any) => {
      const aValue = a[sortId.value].text
      const bValue = b[sortId.value].text

      if (aValue === bValue) {
        return 0
      }

      return sortDirection.value === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1
    })
  }

  return clonedData
})

function onPageChange(page: number) {
  currentPage.value = page
}

function sortTableById(id: any) {
  if (id === sortId.value) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortDirection.value = 'asc'
  }

  sortId.value = id
}
</script>

<style lang="scss" scoped>
table tr th,
table tr td {
  border-top: none;
  border-bottom: none;
  border-width: var(--table-first-row-cell-border-width);
  border-color: var(--grey-1);
}

table tr th {
  --table-head-cell-padding: 0.5rem 1rem;
}

table tr td {
  --table-cell-padding: 0.5rem 1rem;
}

table thead th .button,
table td .button {
  --button-base-line-height: 1.5;
  --button-base-min-width: none;
  --button-base-min-height: none;
  --button-base-padding-top: 0;
  --button-base-padding-bottom: 0;
  --button-base-padding-left: 0.5rem;
  --button-base-padding-right: 0.5rem;

  display: inline-block;
}
table thead th .button {
  --button-base-padding-right: 0.25rem;
  --button-base-padding-left: 0.25rem;
  --button-base-background-color: transparent;
  --button-base-border-color: transparent;
  --button-base-focus-background-color: transparent;
  --button-base-focus-border-color: transparent;
}

// we need to overwrite the 'notification' class styles...
.error,
.confirmation,
.warning {
  background-color: transparent;
}
.error {
  color: red;
}

.confirmation {
  color: green;
}
</style>
