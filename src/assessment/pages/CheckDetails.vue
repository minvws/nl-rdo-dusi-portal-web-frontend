<template>
  <section>
    <div>
      <component :is="component" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useSEO } from '@shared/composables/useSeo'

import IbanCheck from '@assessment/components/IbanCheck/IbanCheck.vue'

import { translate } from '@shared/i18n'

import { IBAN_CHECK } from '@assessment/router/names'

type Props = {
  name: string
}

const props = defineProps<Props>()

useSEO({ title: `${translate(`pages.${props.name}.title`)} | ${translate('app.prefix')}` })

const component = computed(() => {
  switch (props.name) {
    case IBAN_CHECK:
      return IbanCheck
    default:
      return null
  }
})
</script>
