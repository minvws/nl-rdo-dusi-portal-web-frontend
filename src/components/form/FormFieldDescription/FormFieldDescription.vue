<template>
  <div class="description">
    {{ description }}
  </div>
</template>

<script setup lang="ts">
type Props = {
  description: string
}

defineProps<Props>()
</script>
