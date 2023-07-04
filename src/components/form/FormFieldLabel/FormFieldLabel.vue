<template>
  <label class="label">
    {{ label }}
  </label>
</template>

<script setup lang="ts">
type Props = {
  label: string
}

defineProps<Props>()
</script>
