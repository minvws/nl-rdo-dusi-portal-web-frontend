<template>
  <section></section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'
import { usePasswordReset } from '@assessment/composables/usePasswordReset'
import { useRoute } from 'vue-router'

useSEO({ title: `${translate('pages.password-reset.title')} | ${translate('app.prefix')}` })

const route = useRoute()

usePasswordReset(route.query)
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
