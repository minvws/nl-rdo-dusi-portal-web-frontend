<template>
  <section>
    <div>
      <DataExport
        v-if="exportProps"
        :title="t(`pages.${props.name}.title`)"
        :intro="t(`pages.${props.name}.intro`)"
        v-bind="exportProps" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useSEO } from '@shared/composables/useSeo'
import { useDataExport } from '@assessment/composables/useDataExport'

import DataExport from '@assessment/components/DataExport/DataExport.vue'

import { REPORTS_OVERVIEW } from '@assessment/router/names'
import type { DateExportProps } from "@shared/types/data-export"

type Props = {
  name: string
}

const props = defineProps<Props>()
const router = useRouter()

const { t } = useI18n()
const { getDataExportComponentProps } = useDataExport()

useSEO({ title: `${t(`pages.${props.name}.title`)} | ${t('app.prefix')}` })

const exportProps = computed<DateExportProps | undefined>(() => getDataExportComponentProps(props.name))

onBeforeMount(() => {
  if (!exportProps.value) {
    // redirect back to overview page if no export is allowed
    router.replace({ name: REPORTS_OVERVIEW })
  }
})
</script>
