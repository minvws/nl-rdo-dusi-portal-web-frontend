<template>
  <section>
    <div>
      <h1>{{ t('pages.reports-overview.title') }}</h1>
      <p>{{ t('pages.reports-overview.intro') }}</p>
    </div>
    <div v-if="isExportAllowed(DataExportType.FDC_DATA_EXPORT)">
      <h2>{{ t('pages.reports-overview.fdcReportTitle') }}</h2>
      <p>{{ t('pages.reports-overview.fdcReportIntro') }}</p>
      <RouterLink
        class="ghost button"
        :to="{ name: REPORT_DETAILS, params: { name: DataExportType.FDC_DATA_EXPORT } }"
      >
        {{ t('pages.reports-overview.goToButton') }} {{ t('pages.reports-overview.fdcReportTitle') }}
      </RouterLink>
    </div>
    <div v-if="isExportAllowed(DataExportType.DAMU_DATA_EXPORT)">
      <h2>{{ t('pages.reports-overview.damuExportTitle') }}</h2>
      <p>{{ t('pages.reports-overview.damuExportIntro') }}</p>
      <RouterLink
        class="ghost button"
        :to="{ name: REPORT_DETAILS, params: { name: DataExportType.DAMU_DATA_EXPORT } }"
      >
        {{ t('pages.reports-overview.goToButton') }} {{ t('pages.reports-overview.damuExportTitle') }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import { REPORT_DETAILS } from '@assessment/router/names'
import { useDataExport } from '@assessment/composables/useDataExport'
import { DataExportType } from '@shared/types/data-export'

const { t } = useI18n()

useSEO({ title: `${t('pages.reports-overview.title')} | ${t('app.prefix')}` })

const { isExportAllowed } = useDataExport()
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}
main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
