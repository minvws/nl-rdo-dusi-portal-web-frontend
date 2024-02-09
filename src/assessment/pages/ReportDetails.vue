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
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import DataExport from '@assessment/components/DataExport/DataExport.vue'

import { FDC_DATA_EXPORT } from '@assessment/router/names'

type Props = {
  name: string
}

const props = defineProps<Props>()

const { t } = useI18n()

useSEO({ title: `${t(`pages.${props.name}.title`)} | ${t('app.prefix')}` })

const component = computed<Component | undefined>(() => {
  switch (props.name) {
    case FDC_DATA_EXPORT: {
      return DataExport
    }
    default: {
      return undefined
    }
  }
})
</script>
