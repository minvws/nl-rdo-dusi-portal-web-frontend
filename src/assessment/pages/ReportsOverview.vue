<template>
  <section>
    <div>
      <h1>{{ t('pages.reports-overview.title') }}</h1>
      <p>{{ t('pages.reports-overview.intro') }}</p>
    </div>
    <div>
      <div>
        <h3>{{ t('pages.reports-overview.report1Title') }}</h3>
        <p>{{ t('pages.reports-overview.report1Intro') }}</p>
        <RouterLink
          class="ghost button"
          :to="{ name: REPORT_DETAILS, params: { name: FDC_DATA_EXPORT } }"
        >
          {{ t('pages.reports-overview.button') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import { FDC_DATA_EXPORT, REPORT_DETAILS } from '@assessment/router/names'

const { t } = useI18n()

useSEO({ title: `${t('pages.reports-overview.title')} | ${t('app.prefix')}` })
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}
main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
