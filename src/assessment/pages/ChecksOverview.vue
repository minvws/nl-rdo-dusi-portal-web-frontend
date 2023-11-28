<template>
  <section>
    <div>
      <h1>{{ translate('pages.checks-overview.title') }}</h1>
      <p>{{ translate('pages.checks-overview.intro') }}</p>
    </div>
    <div>
      <div>
        <h3>{{ translate('pages.checks-overview.check1Title') }}</h3>
        <p>{{ translate('pages.checks-overview.check1Intro') }}</p>
        <RouterLink
          class="ghost button"
          :to="{ name: CHECK_DETAILS, params: { name: IBAN_CHECK } }"
        >
          {{ translate('pages.checks-overview.button') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSEO } from '@shared/composables/useSeo'

import { translate } from '@shared/i18n'

import { CHECK_DETAILS, IBAN_CHECK } from '@assessment/router/names'

useSEO({ title: `${translate('pages.checks-overview.title')} | ${translate('app.prefix')}` })
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}

main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
