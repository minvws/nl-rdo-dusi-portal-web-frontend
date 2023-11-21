<template>
  <section>
    <div>
      <h1>Toegankelijkheidsverklaring Mijn DUS-I</h1>
      <img
        src="/img/accessibility-label.svg"
        alt="Status toegankelijkheidslabel van Mijn DUS-I. Volg de link voor de volledige toegankelijkheidsverklaring."
        width="692"
        height="324"
      />
      <p>
        Lees de volledige verklaring op
        <a v-bind="externalUrls.accessibilityStatement">
          {{ externalUrls.accessibilityStatement.href }}
        </a>
        .
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'
import { externalUrls } from '@shared/external-links'

useSEO({
  title: `${translate('pages.accessibility.title')} | ${translate('app.prefix')}`
})
</script>
