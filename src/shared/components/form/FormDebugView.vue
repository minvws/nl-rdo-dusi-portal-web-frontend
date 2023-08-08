<template>
  <div class="debug-view">
    <div
      role="button"
      class="button"
      @click="onSetDummyData"
    >
      set dummy data
    </div>
    <div
      role="button"
      class="button"
      @click="isVisible = !isVisible"
    >
      {{ isVisible ? 'hide' : 'show' }}
      debug information
    </div>
    <div v-if="isVisible">
      <h2>files:</h2>
      <pre>{{ files }}</pre>
      <h2>data:</h2>
      <pre>{{ data }}</pre>
      <h2>errors:</h2>
      <pre>{{ errors }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useFilesStore } from '@/shared/store/useFilesStore'
import { useFormStore } from '@/shared/store/useFormStore'
import { useFormDummyData } from '@/shared/composables/useFormDummyData'

const isVisible = ref(false)
const onSetDummyData = useFormDummyData()
const fileStore = useFilesStore()
const formStore = useFormStore()

const { files } = storeToRefs(fileStore)
const { data, errors } = storeToRefs(formStore)
</script>

<style lang="scss" scoped>
.debug-view {
  padding: 16px 0;

  .button {
    display: block;
    border: 1px solid blue;
    cursor: pointer;
  }
}
</style>
