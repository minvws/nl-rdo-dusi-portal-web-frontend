<template>
  <div v-if="title || intro || body">
    <h1 v-if="title">{{ title }}</h1>
    <p
      v-if="intro"
      class="emphasized"
    >
      {{ intro }}
    </p>
    <p v-if="body">{{ body }}</p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title?: string
  intro?: string
  body?: string
}

defineProps<Props>()
</script>
