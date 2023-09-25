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
      <li
        v-for="page in totalPages"
        :key="page"
      >
        <AppButton
          :disabled="isCurrentPage(page)"
          :aria-current="isCurrentPage(page) ? 'true' : undefined"
          @click.prevent="setCurrentPage(page)"
        >
          <span class="visually-hidden">{{ translate('component.pagination.page') }}</span>
          {{ page }}
        </AppButton>
      </li>
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
