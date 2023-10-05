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
      <template v-if="condensedLayout && !hideFirstGroup">
        <li>
          <AppButton
            :disabled="isCurrentPage(1)"
            :aria-current="isCurrentPage(1) ? 'true' : undefined"
            @click.prevent="setCurrentPage(1)"
          >
            <span class="visually-hidden">{{ translate('component.pagination.page') }}</span>
            1
          </AppButton>
        </li>
        <li v-if="currentPage > 4">...</li>
      </template>

      <li v-for="page in currentPageGroup" :key="page">
        <AppButton
          :disabled="isCurrentPage(page)"
          :aria-current="isCurrentPage(page) ? 'true' : undefined"
          @click.prevent="setCurrentPage(page)"
        >
          <span class="visually-hidden">{{ translate('component.pagination.page') }}</span>
          {{ page }}
        </AppButton>
      </li>

      <template v-if="condensedLayout  && !hideLastGroup">
        <li v-if="currentPage < totalPages - 2">...</li>
        <li>
          <AppButton
            :disabled="isCurrentPage(totalPages)"
            :aria-current="isCurrentPage(totalPages) ? 'true' : undefined"
            @click.prevent="setCurrentPage(totalPages)"
          >
            <span class="visually-hidden">{{ translate('component.pagination.page') }}</span>
            {{ totalPages }}
          </AppButton>
        </li>
      </template>
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
    setCurrentPage(props.currentPage + 1)
  }
}

function goToPreviousPage() {
  if (props.currentPage > 1) {
    setCurrentPage(props.currentPage - 1)
  }
}

function isCurrentPage(page: number) {
  return props.currentPage === page
}

function setCurrentPage(page: number) {
  emit('page-change', page)
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
