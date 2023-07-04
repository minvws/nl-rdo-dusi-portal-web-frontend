<template>
  <button :type="type" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType, ButtonHTMLAttributes } from 'vue'

defineProps({
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
