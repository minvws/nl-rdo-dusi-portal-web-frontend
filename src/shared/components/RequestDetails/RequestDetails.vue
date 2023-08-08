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

import DescriptionList from '@/shared/components/DescriptionList/DescriptionList.vue'

import formatDetailsData from '@/shared/util/format-details-data'

import type { RequestDetailsItem } from '@/shared/type/details-types'

type Props = {
  items: RequestDetailsItem[]
}

const props = defineProps<Props>()

const details = computed(() => formatDetailsData(props.items))
</script>

<style scoped lang="scss">
.request-details {
  width: 100%;
}

.request-details > div {
  width: 100%;
}
</style>
