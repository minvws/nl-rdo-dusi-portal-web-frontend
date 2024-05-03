<template>
  <div class="debug-view">
    <div
      role="button"
      class="button"
      @click="setDummyData"
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
      <h2>remote validation result:</h2>
      <pre>{{ validationResult }}</pre>
      <h2>step data:</h2>
      <pre>{{ data }}</pre>
      <h2>all data:</h2>
      <pre>{{ formsData }}</pre>
      <h2>errors:</h2>
      <pre>{{ errors }}</pre>
      <h2>pending files:</h2>
      <pre>{{ pending }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { usePendingFileStore } from '@shared/store/usePendingFileStore'
import { useForms } from '@shared/composables/form/useForms'
import { useFormDummyData } from '@shared/composables/form/useFormDummyData'

const isVisible = ref<boolean>(false)
const { setDummyData } = useFormDummyData()
const pendingFileStore = usePendingFileStore()

const { pending } = storeToRefs(pendingFileStore)
const { data, formsData, errors, validationResult } = useForms()
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
