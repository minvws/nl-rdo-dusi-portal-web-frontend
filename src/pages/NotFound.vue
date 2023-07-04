<template>
  <section>
    <div>
      {{ translate('pages.not-found.content.message') }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@/i18n'

import useSEO from '@/composables/useSeo'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.not-found.title')}`
})
</script>
