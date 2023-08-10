<template>
  <section>
    <div>
      <h2>Formulier is verzonden</h2>
      <p>[TODO:]</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFormStore } from '@shared/store/useFormStore'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { ARRANGEMENT_OVERVIEW } from '@shared/router/names'

const forms = useFormStore()
const router = useRouter()

onBeforeRouteLeave(() => forms.clearActiveForm())

if (!forms.activeForm) {
  // no active form, redirect
  router.replace({ name: ARRANGEMENT_OVERVIEW })
}
</script>
