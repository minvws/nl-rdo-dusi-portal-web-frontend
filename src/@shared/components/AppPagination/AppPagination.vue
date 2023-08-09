<template>
  <nav
    v-if="totalPages > 1"
    class="pagination"
    :aria-label="translate('component.pagination.label')"
  >
    <AppButton
      v-if="withButtons"
      :aria-label="translate('component.pagination.prev')"
      class="adjacent previous"
      :class="{ disabled: previousPageDisabled }"
      @click.prevent="goToPreviousPage"
    >
      {{ translate('component.pagination.prev') }}
    </AppButton>
    <ul>
      <li
        v-for="page in totalPages"
        :key="page"
      >
        <AppButton
          :aria-label="translate('component.pagination.pageLabel', { page })"
          :disabled="isCurrentPage(page)"
          @click.prevent="setCurrentPage(page)"
        >
          {{ page }}
        </AppButton>
      </li>
    </ul>
    <AppButton
      v-if="withButtons"
      :aria-label="translate('component.pagination.nextLabel')"
      class="adjacent next"
      :class="{ disabled: nextPageDisabled }"
      @click.prevent="goToNextPage"
    >
      {{ translate('component.pagination.next') }}
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
