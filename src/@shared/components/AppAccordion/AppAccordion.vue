<template>
  <ul
    class="accordion"
    v-accordion
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import vAccordion from '@shared/directives/accordion'
</script>
