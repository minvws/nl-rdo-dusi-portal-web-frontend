<template>
  <div class="debug-view">
    <div role="button" class="button" @click="onSetDummyData">set dummy data</div>
    <div role="button" class="button" @click="isVisible = !isVisible">
      {{ isVisible ? 'hide' : 'show' }}
      debug information
    </div>
    <div v-if="isVisible">
      <h2>files:</h2>
      <pre>{{ store.files }}</pre>
      <h2>data:</h2>
      <pre>{{ store.data }}</pre>
      <h2>errors:</h2>
      <pre>{{ store.errors }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormStore } from '@/store/useFormStore'
import { useFormDummyData } from '@/composables/useFormDummyData'

const isVisible = ref(false)
const onSetDummyData = useFormDummyData()
const store = useFormStore()
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
