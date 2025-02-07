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
            {{ t('component.table.sortableColumnsHint') }}
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
              :aria-sort="setAriaSort(column.id)"
            >
              <AppButton
                v-if="column.sortable"
                class="button"
                @click="onClickSort(column.id)"
              >
                {{ column.text }}
                <AppIcon
                  :name="setIconName(column.id)"
                  aria-hidden
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
            v-for="item in data"
            :key="item.id"
          >
            <template
              v-for="column in columns"
              :key="column.id"
            >
              <td>
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
                    aria-hidden
                  />
                </RouterLink>
                <template v-else-if="isLinkList(item[column.id])">
                  <template
                    v-for="(link, index) in item[column.id].list"
                    :key="index"
                  >
                    <RouterLink :to="link.to">
                      {{ link.text }}
                    </RouterLink>
                    <template v-if="index !== item[column.id].list.length - 1">, </template>
                  </template>
                </template>
                <template v-else-if="item[column.id].icon">
                  <p :class="item[column.id].icon"><span/>{{ item[column.id].text }}</p>
                </template>
                <template v-else>
                  {{ item[column.id].text }}
                </template>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@shared/types/table'
import type { SortDirection, SortItem } from '@shared/types/sort'
import type { CaseAction } from '@assessment/composables/useCaseAction'

import { computed, ref } from 'vue'

import { useCaseAction } from '@assessment/composables/useCaseAction'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { useI18n } from 'vue-i18n'

import {
  isAppButton,
  isExternalLink,
  isIcon,
  isLinkList,
  isRouterLink,
  getRouterLinkClasses
} from '@shared/utils/app-table'

const emit = defineEmits(['sorting-change'])

type Props = {
  caption?: string
  columns: Column[]
  data: any[]
  sortingId?: string
  sortingDirection?: SortDirection
}

const props = withDefaults(defineProps<Props>(), {
  caption: '',
  sortingId: '',
  sortingDirection: 'ascending'
})

const { t } = useI18n()
const caseAction = useCaseAction()

const sortingDirection = ref<SortDirection>(props.sortingDirection)
const sortingId = ref<string>(props.sortingId)

const hasSortableColumns = computed<boolean>(() => props.columns.some((column) => column.sortable))

function onClickSort(id: string) {
  if (id === sortingId.value) {
    sortingDirection.value = sortingDirection.value === 'ascending' ? 'descending' : 'ascending'
  } else {
    sortingDirection.value = 'ascending'
  }

  sortingId.value = id

  const sorting: SortItem = { id, direction: sortingDirection.value }
  emit('sorting-change', sorting)
}

function onButtonClick(action: CaseAction) {
  const { type, params } = action
  caseAction.executeAction(type, params)
}

function setAriaSort(id: string) {
  return props.sortingId === id && props.sortingDirection ? props.sortingDirection : 'none'
}

function setIconName(id: string) {
  return props.sortingId === id && props.sortingDirection ? props.sortingDirection : 'sort'
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

.error,
.confirmation,
.warning {
  --notification-background-color: transparent;
  --notification-error-background-color: transparent;
  --notification-confirmation-background-color: transparent;
  --notification-warning-background-color: transparent;

  --notification-paragraph-padding-top: 0;
  --notification-paragraph-padding-right: 0;
  --notification-paragraph-padding-bottom: 0;
  --notification-paragraph-padding-left: 0;

  --notification-border-width: 0;
  --notification-error-border-width: 0;
  --notification-confirmation-border-width: 0;
  --notification-warning-border-width: 0;

  --notification-error-text-color: var(--notification-error-color-intense);
  --notification-confirmation-text-color: var(--notification-confirmation-color-intense);
  --notification-warning-text-color: var(--notification-warning-color-intense);
}
</style>
