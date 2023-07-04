<template>
  <label :for="`${id}-input`" class="label" :class="{ required }">
    {{ label }}
  </label>
</template>

<script setup lang="ts">
type Props = {
  id: string
  required: boolean
  label: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.label {
  &.required {
    &:after {
      content: '*';
    }
  }
}
</style>
