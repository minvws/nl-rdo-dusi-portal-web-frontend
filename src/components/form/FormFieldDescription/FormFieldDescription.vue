<template>
  <label
    class="description"
    :for="labelFor"
  >
    {{ description }}
  </label>
</template>

<script setup lang="ts">
type Props = {
  description: string
  labelFor: string
}

defineProps<Props>()
</script>
