<template>
  <section>
    <div>
      <h1>{{ translate('pages.home.title') }}</h1>
      <p class="emphasized">{{ translate('pages.home.subtitle') }}</p>
      <AppHtml
        as="p"
        :html="translate('pages.home.content.intro')"
      />
    </div>
  </section>
  <section>
    <div>
      <h2>{{ translate('pages.home.content.section1Title') }}</h2>
      <AppHtml
        as="p"
        :html="translate('pages.home.content.section1Intro')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'

import AppHtml from '@shared/components/AppHtml/AppHtml.vue'

useSEO({
  title: `${translate('app.prefix')}`
})
</script>
