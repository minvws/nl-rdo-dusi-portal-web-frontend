<template>
  <span class="app-icon icon" :class="[`icon-${name}`]" role="presentation">
    <slot />
  </span>
</template>

<script setup lang="ts">
type Props = {
  name: string
}

defineProps<Props>()
</script>
