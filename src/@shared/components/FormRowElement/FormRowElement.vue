<template>
  <div
    class="form-row-field"
    :class="{ center: !isNotCentered }"
  >
    <div><slot name="left" /></div>
    <div :class="contentClass">
      <slot name="right" />
      <slot name="description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ contentClass?: string }>()

const isNotCentered = computed(() => {
  switch (props.contentClass) {
    case 'radio':
    case undefined:
      return true
  }
  return false
})
</script>

<style lang="scss" scoped>
.form-row-field {
  display: flex;
  flex-direction: column;

  &.center {
    align-items: center;
  }

  @include mobile {
    gap: 0.2rem;
  }

  @include desktop {
    flex-direction: row;
    * {
      flex: 0.75;
      align-items: center;
      &:first-child {
        flex: 0.25;
      }
    }
  }
}
</style>
