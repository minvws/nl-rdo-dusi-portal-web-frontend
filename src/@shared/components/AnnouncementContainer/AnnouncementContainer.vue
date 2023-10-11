<template>
  <div
    class="visually-hidden"
    aria-atomic="true"
    :aria-live="announcement.politeness"
    v-text="announcement.message"
  />
</template>

<script setup lang="ts">
import { useAnnouncementStore } from '@shared/store/useAnnouncementStore'

const announcement = useAnnouncementStore()
</script>
