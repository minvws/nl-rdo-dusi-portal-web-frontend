<template>
  <span class="message-counter" :aria-label="label">{{ value }}</span>
</template>

<script setup lang="ts">
type Props = {
  label?: string
  value: number
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.message-counter {
  margin-left: 0.5em;
}
</style>
