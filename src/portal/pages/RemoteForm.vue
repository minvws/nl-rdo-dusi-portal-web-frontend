<template>
  <FormLoader :id="id" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import FormLoader from '@shared/components/FormLoader/FormLoader.vue'

type Props = {
  id: string
}

defineProps<Props>()

const { t } = useI18n()

useSEO({ title: `${t('pages.arrangement-overview.arrangements')} | ${t('app.prefix')}` })
</script>
