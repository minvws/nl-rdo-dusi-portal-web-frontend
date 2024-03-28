<template>
  <div class="app-pagination">
    <nav
      v-if="totalPages > 1"
      class="pagination"
      :aria-label="t('component.app-pagination.pagination')"
    >
      <AppButton
        v-if="withButtons"
        class="adjacent previous"
        :disabled="previousPageDisabled"
        @click.prevent="goToPreviousPage"
      >
        {{ t('component.pagination.prev') }}
        <span class="visually-hidden">{{ t('component.pagination.page') }}</span>
      </AppButton>

      <ul>
        <AppPaginationItem
          v-if="condensedLayout && showFirstGroup"
          :current-page="currentPage"
          ellipsis-position="end"
          label="1"
          :page-index="1"
          @page-change="onPageChange"
        />

        <AppPaginationItem
          v-for="page in currentPageGroup"
          :key="page"
          :current-page="currentPage"
          :label="page"
          :page-index="page"
          @page-change="onPageChange"
        />

        <AppPaginationItem
          v-if="condensedLayout && showLastGroup"
          :current-page="currentPage"
          ellipsis-position="start"
          :label="totalPages"
          :page-index="totalPages"
          @page-change="onPageChange"
        />
      </ul>

      <AppButton
        v-if="withButtons"
        class="adjacent next"
        :disabled="nextPageDisabled"
        @click.prevent="goToNextPage"
      >
        {{ t('component.pagination.next') }}
        <span class="visually-hidden">{{ t('component.pagination.page') }}</span>
      </AppButton>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppPaginationItem from '@shared/components/AppPaginationItem/AppPaginationItem.vue'

const MAX_GROUP_SIZE = 3
const CONDENSED_LAYOUT_THRESHOLD = 8

const emit = defineEmits(['page-change'])

type Props = {
  itemsTotal: number
  pageSize: number
  currentPage: number
  withButtons?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()

const nextPageDisabled = computed<boolean>(() => props.currentPage === totalPages.value)

const previousPageDisabled = computed<boolean>(() => props.currentPage === 1)

const totalPages = computed<number>(() => Math.ceil(props.itemsTotal / props.pageSize))

const condensedLayout = computed<boolean>(() => totalPages.value >= CONDENSED_LAYOUT_THRESHOLD)

const groupSize = computed<number>(() =>
  condensedLayout.value ? MAX_GROUP_SIZE : totalPages.value
)

const currentPageGroup = computed<number[]>(() => {
  if (totalPages.value <= groupSize.value) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  } else if (props.currentPage <= 3) {
    return Array.from({ length: MAX_GROUP_SIZE }, (_, i) => i + 2)
  } else if (props.currentPage >= totalPages.value - 2) {
    return Array.from({ length: MAX_GROUP_SIZE }, (_, i) => totalPages.value - MAX_GROUP_SIZE + i)
  } else {
    return Array.from({ length: MAX_GROUP_SIZE }, (_, i) => props.currentPage - 1 + i)
  }
})

const showFirstGroup = computed<boolean>(() => props.currentPage >= 1)

const showLastGroup = computed<boolean>(() => props.currentPage <= totalPages.value)

function goToNextPage() {
  if (props.currentPage < totalPages.value) {
    const page = props.currentPage + 1
    onPageChange(page)
  }
}

function goToPreviousPage() {
  if (props.currentPage > 1) {
    const page = props.currentPage - 1
    onPageChange(page)
  }
}

function onPageChange(index: number) {
  emit('page-change', index)
}
</script>

<style lang="scss" scoped>
:root {
  --pagination-adjacent-button-width: 120px;
}

.app-pagination {
  width: 100%;
}

.pagination {
  width: calc(100% - 4px);
  padding: 2px;
}

:deep(.pagination ul) {
  display: flex;
  flex: 0 1 calc(100% - (var(--pagination-adjacent-button-width) * 2));
  justify-content: center;
  overflow-x: auto;
  padding: 2px;
}

@include mobile {
  :deep(.pagination ul li) {
    --pagination-item-width: 2rem;
  }

  :deep(.pagination ul button) {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
}

:deep(.pagination .adjacent) {
  flex: 0 0 var(--pagination-adjacent-button-width);
}
</style>
