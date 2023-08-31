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
      <h2>step data:</h2>
      <pre>{{ data }}</pre>
      <h2>all data:</h2>
      <pre>{{ formsData }}</pre>
      <h2>errors:</h2>
      <pre>{{ errors }}</pre>
      <h2>files:</h2>
      <pre>{{ files }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useFileStore } from '@shared/store/useFileStore'
import { useFormStore } from '@shared/store/useFormStore'
import { useFormDummyData } from '@shared/composables/useFormDummyData'

const isVisible = ref(false)
const onSetDummyData = useFormDummyData()
const fileStore = useFileStore()
const formStore = useFormStore()

const { files } = storeToRefs(fileStore)
const { data, formsData, errors } = storeToRefs(formStore)
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
