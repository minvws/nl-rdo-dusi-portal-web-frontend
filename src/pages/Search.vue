<template>
  <section>
    <div>Search: @TODO</div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@/i18n'
import useSEO from '@/composables/useSeo'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.search.title')}`
})
</script>
