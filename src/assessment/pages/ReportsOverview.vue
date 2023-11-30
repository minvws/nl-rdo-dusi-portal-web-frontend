<template>
  <section>
    <div>
      <h1>{{ translate('pages.reports-overview.title') }}</h1>
      <p>{{ translate('pages.reports-overview.intro') }}</p>
    </div>
    <div>
      <div>
        <h3>{{ translate('pages.reports-overview.report1Title') }}</h3>
        <p>{{ translate('pages.reports-overview.report1Intro') }}</p>
        <RouterLink
          class="ghost button"
          :to="{ name: REPORT_DETAILS, params: { name: FDC_DATA_EXPORT } }"
        >
          {{ translate('pages.reports-overview.button') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSEO } from '@shared/composables/useSeo'

import { translate } from '@shared/i18n'

import { FDC_DATA_EXPORT, REPORT_DETAILS } from '@assessment/router/names'

useSEO({ title: `${translate('pages.reports-overview.title')} | ${translate('app.prefix')}` })
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}
main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
