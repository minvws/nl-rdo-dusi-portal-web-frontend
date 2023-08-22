<template>
  <div class="request-details">
    <div
      v-for="(item, index) in items"
      :key="index"
    >
      <h2>{{ item.title }}</h2>
      <DescriptionList :items="item.items" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DescriptionList from '@assessment/components/DescriptionList/DescriptionList.vue'

import type { RequestDetailsItem } from '@shared/types/details'

type Props = {
  items: RequestDetailsItem[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.request-details {
  width: 100%;
}

.request-details > div {
  width: 100%;
}
</style>
