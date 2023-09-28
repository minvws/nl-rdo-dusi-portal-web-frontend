<template>
  <section>
    <AppIntro
      v-bind="{
        title: translate('pages.not-found.title'),
        intro: translate('pages.not-found.subtitle'),
        body: translate('pages.not-found.intro')
      }"
    />
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.not-found.title')}`
})
</script>
