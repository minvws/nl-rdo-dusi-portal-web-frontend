<template>
  <FormLoader :id="id" />
</template>

<script setup lang="ts">
import FormLoader from '@shared/components/FormLoader/FormLoader.vue'

type Props = {
  id: string
  values?: Record<string, string> // @TODO
}

defineProps<Props>()
</script>
