<template>
  <div
    class="visually-hidden"
    aria-atomic="true"
    :aria-live="politeness"
    v-text="message"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAnnouncementStore } from '@shared/store/useAnnouncementStore'

const announcementStore = useAnnouncementStore()

const { message, politeness } = storeToRefs(announcementStore)
</script>
