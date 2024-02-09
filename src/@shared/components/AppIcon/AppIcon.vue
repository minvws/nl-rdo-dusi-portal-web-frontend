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
  ariaHidden?: boolean
}

const props = defineProps<Props>()

const className = computed<string>(() => `icon-${props.name}`)
const isHidden = computed<boolean | undefined>(() => props.ariaHidden || undefined)
</script>
