<template>
  <AppHtml
    class="html"
    :html="html"
  />
</template>

<script setup lang="ts">
import AppHtml from "@shared/components/AppHtml/AppHtml.vue"

type Props = {
  html: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.html {
  /**
   * Override the default styles for the HTML message.
   * Styling should be the same as the letter.
   */
  --section-content-wrapper-gap: 0;

  --h1-font-size: 1.2rem;
  --h2-font-size: 1.1rem;
  --h3-font-size: 1rem;
  --h4-font-size: 1rem;
  --h5-font-size: 1rem;
  --h6-font-size: 1rem;

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6),
  :deep(p+p),
  :deep(p+ul),
  :deep(ul+p) {
    margin-top: 1rem;
  }
}
</style>
