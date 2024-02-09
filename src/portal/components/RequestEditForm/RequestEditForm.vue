<template>
  <FormLoader
    :id="id"
    :values="values"
    edit
  />
</template>

<script setup lang="ts">
import type { FormData } from '@shared/types/form'

import FormLoader from '@shared/components/FormLoader/FormLoader.vue'

type Props = {
  id: string
  values?: FormData
}

defineProps<Props>()
</script>
