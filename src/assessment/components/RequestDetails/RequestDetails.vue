<template>
  <div class="request-details">
    <div
      v-for="(item, index) in details"
      :key="index"
    >
      <h2>{{ item.title }}</h2>
      <DescriptionList :items="item.data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import DescriptionList from '@assessment/components/DescriptionList/DescriptionList.vue'

// import { formatDetailsData } from '@shared/utils/format'

import type { RequestDetailsItem } from '@shared/types/details'

type Props = {
  items: RequestDetailsItem[]
}

const props = defineProps<Props>()

const details = computed(() => props.items)
</script>

<style scoped lang="scss">
.request-details {
  width: 100%;
}

.request-details > div {
  width: 100%;
}
</style>
