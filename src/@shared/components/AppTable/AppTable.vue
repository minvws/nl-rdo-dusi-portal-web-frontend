<template>
  <div class="app-table">
    <div class="horizontal-scroll nowrap">
      <table>
        <caption :class="{ 'visually-hidden': !caption }">
          <span
            v-if="caption"
            v-html="caption"
          />
          <span
            v-if="hasSortableColumns"
            class="visually-hidden"
          >
            <span v-if="caption">,</span>
            {{ translate('component.table.sortableColumnsHint') }}
          </span>
        </caption>
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.id"
              scope="col"
              :class="{ sortable: column.sortable }"
              :abbr="column.text"
              :aria-sort="sortId === column.id ? sortDirection : 'none'"
            >
              <AppButton
                v-if="column.sortable"
                @click="sortTableById(column.id)"
                class="button"
              >
                {{ column.text }}
                <AppIcon
                  :name="sortId === column.id ? sortDirection : 'sort'"
                  :ariaHidden="true"
                />
              </AppButton>
              <template v-else>
                {{ column.text }}
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in tableData"
            :key="item.id"
          >
            <template
              v-for="column in columns"
              :key="column.id"
            >
              <td :class="item[column.id].icon ? item[column.id].icon : null">
                <span v-if="item[column.id].icon" />
                <a
                  v-if="isExternalLink(item[column.id])"
                  :href="item[column.id].to"
                >
                  {{ item[column.id].text }}
                </a>
                <RouterLink
                  v-else-if="isRouterLink(item[column.id])"
                  :class="getRouterLinkClasses(item[column.id])"
                  :to="item[column.id].to"
                >
                  {{ item[column.id].text }}
                </RouterLink>
                <AppButton
                  v-else-if="isAppButton(item[column.id])"
                  class="button ghost"
                  @click="onButtonClick(item[column.id].action)"
                >
                  {{ item[column.id].text }}
                </AppButton>
                <RouterLink
                  v-else-if="isIcon(item[column.id])"
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
    </div>

    <AppPagination
      v-if="itemsPerPage"
      :items-total="totalItems"
      :page-size="itemsPerPage"
      :current-page="currentPage"
      @page-change="onPageChange"
      with-buttons
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Column } from '@shared/types/table'
import type { CaseAction } from '@assessment/composables/useCaseAction'

import { ref, computed, watch } from 'vue'

import { useCaseAction } from '@assessment/composables/useCaseAction'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppPagination from '@shared/components/AppPagination/AppPagination.vue'

import { translate } from '@shared/i18n'

import {
  isAppButton,
  isExternalLink,
  isIcon,
  isRouterLink,
  getRouterLinkClasses
} from '@shared/utils/app-table'

type Props = {
  caption?: string
  columns: Column[]
  data: any[]
  itemsPerPage?: number
}

const props = defineProps<Props>()

const currentPage: Ref<number> = ref(1)
const sortId: Ref<string> = ref('')
const sortDirection: Ref<'ascending' | 'descending'> = ref('ascending')

const caseAction = useCaseAction()

// Reset page when incoming data changes
watch(
  () => props.data,
  () => {
    currentPage.value = 1
  }
)

const totalItems = computed(() => props.data.length ?? 0)

const paginatedData = computed(() => {
  const itemsPerPage = props.itemsPerPage ?? 0
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedData.value.slice(start, end)
})

const hasSortableColumns = computed(() => props.columns.some(column => column.sortable))

const sortedData = computed(() => {
  const clonedData = [...props.data]

  if (sortId.value) {
    clonedData.sort((a: any, b: any) => {
      const aValue = a[sortId.value].text
      const bValue = b[sortId.value].text

      if (aValue === bValue) {
        return 0
      }

      const asc = sortDirection.value === 'ascending'

      return asc ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1
    })
  }

  return clonedData
})

const tableData = computed(() => (props.itemsPerPage ? paginatedData.value : sortedData.value))

function onButtonClick(action: CaseAction) {
  const { type, params } = action
  caseAction.executeAction(type, params)
}

function onPageChange(page: number) {
  currentPage.value = page
}

function sortTableById(id: any) {
  if (id === sortId.value) {
    sortDirection.value = sortDirection.value === 'ascending' ? 'descending' : 'ascending'
  } else {
    sortDirection.value = 'ascending'
  }

  sortId.value = id
}
</script>

<style lang="scss" scoped>
.app-table {
  width: 100%;
}

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

  font-weight: inherit;
}

th .button:only-child {
  /* counteract padding and border-width */
  margin-left: calc(
    (-1 * var(--button-base-padding-left, 0.25rem)) - var(--button-base-border-width, 2px)
  );
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
