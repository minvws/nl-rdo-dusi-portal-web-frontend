<template>
  <section>
    <div>
      <h2>Formulier is verzonden</h2>
      <p>[TODO:]</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { ARRANGEMENT_OVERVIEW } from '@shared/router/names'

import { useFormStorage } from '@shared/store/useFormStorage'
import { useClearForm } from '@shared/composables/form/useClearForm'

const props = defineProps<{ id: string }>()
const router = useRouter()
const formStorage = useFormStorage()
const clearForm = useClearForm(props.id)

onBeforeRouteLeave(() => clearForm())

if (!formStorage.get(props.id)) {
  // no active form, redirect
  router.replace({ name: ARRANGEMENT_OVERVIEW })
}
</script>
