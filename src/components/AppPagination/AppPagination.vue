<template>
  <nav
    v-if="totalPages > 1"
    class="pagination"
    aria-label="Paginering"
  >
    <a
      v-if="withButtons"
      :href="path"
      aria-label="Ga naar de vorige pagina"
      class="adjacent previous"
      :class="{ disabled: currentPage === 1 }"
      @click="goToPreviousPage"
    >
      {{ translate('component.pagination.prev') }}
    </a>
    <ul>
      <li
        v-for="page in totalPages"
        :key="page"
      >
        <a
          :href="path"
          :aria-label="`Ga naar pagina ${page}`"
          :aria-current="isCurrentPage(page)"
          @click.prevent="setCurrentPage(page)"
        >
          {{ page }}
        </a>
      </li>
    </ul>
    <a
      v-if="withButtons"
      :href="path"
      aria-label="Ga naar de volgende pagina"
      class="adjacent next"
      :class="{ disabled: currentPage === totalPages }"
      @click="goToNextPage"
    >
      {{ translate('component.pagination.next') }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@/i18n'

const emit = defineEmits(['page-change'])

type Props = {
  itemsTotal: number
  pageSize: number
  path?: string | '#'
  currentPage: number
  withButtons?: boolean
}

const props = defineProps<Props>()

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
  return props.currentPage === page ? 'true' : undefined
}

function setCurrentPage(page: number) {
  emit('page-change', page)
}
</script>

<style lang="scss" scoped>
// Had to add this styling manually from the documentation to match it ¯\_(ツ)_/¯
// @TODO: remove when Manon is updated to the latest version
.pagination {
  --pagination-justify-content: space-between;
  --pagination-align-items: center;

  display: flex;
  justify-content: var(--pagination-justify-content);
  align-items: var(--pagination-align-items);
  width: 100%;
  border-width: var(--pagination-border-width);
  border-style: var(--pagination-border-style);
  border-color: var(--pagination-border-color);
  padding-top: var(--pagination-padding-top);
  gap: var(--pagination-gap);
}

.pagination > ul {
  --pagination-list-gap: 0.25rem;

  display: flex;
  flex-direction: row;
  padding: 0;
  gap: var(--pagination-list-gap);
  border: none;
  width: auto;
}
</style>
