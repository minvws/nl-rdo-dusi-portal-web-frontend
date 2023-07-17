<template>
  <p :class="type">
    <span>{{ translate(`component.formNotification.${type}`) }}:</span> {{ message }}
  </p>
</template>

<script setup lang="ts">
import { translate } from '@/i18n'

type Props = {
  message: string
  type: 'error' | 'warning' | 'explanation' | 'success'
}

defineProps<Props>()
</script>
