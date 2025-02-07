<template>
  <button
    :type="type"
    :disabled="disabled"
  >
    {{ text }}
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

type Props = {
  disabled?: boolean
  type?: ButtonHTMLAttributes['type']
  text?: string
}

withDefaults(defineProps<Props>(), { type: 'button' })
</script>
