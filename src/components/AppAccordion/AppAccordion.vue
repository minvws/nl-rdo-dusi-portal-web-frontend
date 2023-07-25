<template>
  <ul
    class="accordion"
    v-accordion
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import vAccordion from '@/directives/accordion'
</script>
