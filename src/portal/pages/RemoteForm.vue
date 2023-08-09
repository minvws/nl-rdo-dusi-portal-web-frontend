<template>
  <FormLoader v-bind="{ id }" />
</template>

<script setup lang="ts">
import FormLoader from '@shared/components/FormLoader/FormLoader.vue'

type Props = {
  id: string
}

defineProps<Props>()
</script>
