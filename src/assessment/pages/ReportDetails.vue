<template>
  <section>
    <div>
      <component :is="component" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component, ComputedRef } from 'vue'

import { computed } from 'vue'

import { useSEO } from '@shared/composables/useSeo'

import DataExport from '@assessment/components/DataExport/DataExport.vue'

import { translate } from '@shared/i18n'

import { FDC_DATA_EXPORT } from '@assessment/router/names'

type Props = {
  name: string
}

const props = defineProps<Props>()

useSEO({ title: `${translate(`pages.${props.name}.title`)} | ${translate('app.prefix')}` })

const component = computed<Component | null>(() => {
  switch (props.name) {
    case FDC_DATA_EXPORT:
      return DataExport
    default:
      return null
  }
})
</script>
