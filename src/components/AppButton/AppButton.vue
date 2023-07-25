<template>
  <button
    :type="type"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

type Props = {
  disabled?: boolean
  type?: ButtonHTMLAttributes['type']
}

defineProps<Props>()
</script>
