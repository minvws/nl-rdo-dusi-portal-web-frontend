<template>
  <span
    class="app-icon icon"
    :class="className"
    :aria-hidden="isHidden"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  name: string
  ariaHidden?: boolean | 'true'
}

const props = defineProps<Props>()

const className = computed(() => `icon-${props.name}`)

const isHidden = computed(() => (props.ariaHidden ? 'true' : undefined))
</script>
