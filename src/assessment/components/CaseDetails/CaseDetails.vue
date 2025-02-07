<template>
  <div class="case-details">
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
import type { CaseDetailsItem } from '@shared/types/details'

import DescriptionList from '@shared/components/DescriptionList/DescriptionList.vue'

type Props = {
  items: CaseDetailsItem[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.case-details {
  width: 100%;
}

.case-details > div {
  width: 100%;
}
</style>
