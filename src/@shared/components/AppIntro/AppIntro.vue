<template>
  <div v-if="title || intro || body">
    <h1 v-if="title">{{ title }}</h1>
    <p
      v-if="intro"
      class="emphasized"
    >
      {{ intro }}
    </p>
    <AppHtml
      v-if="body"
      as="p"
      :html="body"
    />
  </div>
</template>

<script setup lang="ts">
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'

type Props = {
  title?: string
  intro?: string
  body?: string
}

defineProps<Props>()
</script>
