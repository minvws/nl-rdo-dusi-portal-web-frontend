<template>
  <nav
    v-if="totalPages > 1"
    class="pagination"
    :aria-label="translate('component.pagination.pagination')"
  >
    <AppButton
      v-if="withButtons"
      class="adjacent previous"
      :disabled="previousPageDisabled"
      @click.prevent="goToPreviousPage"
    >
      {{ translate('component.pagination.prev') }}
      <span class="visually-hidden">{{ translate('component.pagination.page') }}</span>
    </AppButton>

    <ul>
      <AppPaginationItem
        v-if="condensedLayout && !hideFirstGroup"
        :current-page="currentPage"
        :ellipsis-position="'end'"
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
        v-if="condensedLayout && !hideLastGroup"
        :current-page="currentPage"
        :ellipsis-position="'start'"
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
      {{ translate('component.pagination.next') }}
      <span class="visually-hidden">{{ translate('component.pagination.page') }}</span>
    </AppButton>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppPaginationItem from '@shared/components/AppPaginationItem/AppPaginationItem.vue'

const emit = defineEmits(['page-change'])

type Props = {
  itemsTotal: number
  pageSize: number
  currentPage: number
  withButtons?: boolean
}

const props = defineProps<Props>()

const nextPageDisabled = computed(() => props.currentPage === totalPages.value)

const previousPageDisabled = computed(() => props.currentPage === 1)

const totalPages = computed(() => Math.ceil(props.itemsTotal / props.pageSize))

const condensedLayout = computed(() => totalPages.value >= 10)

const currentPageGroup = computed(() => {
  const maxPages = 5

  if (totalPages.value <= maxPages) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  } else if (props.currentPage <= 3) {
    return Array.from({ length: maxPages }, (_, i) => i + 1)
  } else if (props.currentPage >= totalPages.value - 2) {
    return Array.from({ length: maxPages }, (_, i) => totalPages.value - maxPages + i + 1)
  } else {
    return Array.from({ length: maxPages }, (_, i) => props.currentPage - 2 + i)
  }
})

const hideFirstGroup = computed(() => props.currentPage <= 3)

const hideLastGroup = computed(() => props.currentPage >= totalPages.value - 2)

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
.pagination ul {
  display: flex;
  justify-content: center;
  flex: 0 1 calc(100% - (var(--pagination-adjacent-button-width) * 2));
  overflow-x: auto;
}

@include mobile {
  .pagination ul li {
    --pagination-item-width: 2rem;
  }

  .pagination ul button {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
}

.pagination .adjacent {
  flex: 0 0 var(--pagination-adjacent-button-width);
}
</style>
