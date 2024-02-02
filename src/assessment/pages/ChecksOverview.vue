<template>
  <section>
    <div>
      <h1>{{ t('pages.checks-overview.title') }}</h1>
      <p>{{ t('pages.checks-overview.intro') }}</p>
    </div>
    <div>
      <div>
        <h3>{{ t('pages.checks-overview.check1Title') }}</h3>
        <p>{{ t('pages.checks-overview.check1Intro') }}</p>
        <RouterLink
          class="ghost button"
          :to="{ name: CHECK_DETAILS, params: { name: IBAN_CHECK } }"
        >
          {{ t('pages.checks-overview.button') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import { CHECK_DETAILS, IBAN_CHECK } from '@assessment/router/names'

const { t } = useI18n()

useSEO({ title: `${t('pages.checks-overview.title')} | ${t('app.prefix')}` })
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}

main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
