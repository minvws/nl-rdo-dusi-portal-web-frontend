<template>
  <section>
    <div>
      <component :is="component" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import IbanCheck from '@assessment/components/IbanCheck/IbanCheck.vue'

import { IBAN_CHECK } from '@assessment/router/names'

type Props = {
  name: string
}

const props = defineProps<Props>()

const { t } = useI18n()

useSEO({ title: `${t(`pages.${props.name}.title`)} | ${t('app.prefix')}` })

const component = computed<Component | undefined>(() => {
  switch (props.name) {
    case IBAN_CHECK: {
      return IbanCheck
    }
    default: {
      return undefined
    }
  }
})
</script>
