<template>
  <span
    class="app-icon icon"
    :class="[`icon-${name}`]"
    role="presentation"
    :aria-hidden="ariaHidden"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
type Props = {
  name: string
  ariaHidden?: string
}

defineProps<Props>()
</script>
