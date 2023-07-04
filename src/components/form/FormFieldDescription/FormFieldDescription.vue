<template>
  <label class="description" :for="labelFor">
    {{ description }}
  </label>
</template>

<script setup lang="ts">
type Props = {
  labelFor: string
  description: string
}

defineProps<Props>()
</script>
