<template>
  <div :key="store.formKey">
    <h1 v-if="title">{{ title }}</h1>
    <FormStepper
      :index="store.index"
      :forms="store.forms"
      :formsErrors="store.formsErrors"
      :touched="store.touchedForms"
      :readonly="store.readonly"
      @step="store.setFormStep"
    />
    <form class="form-view" @submit.prevent>
      <JsonForms
        class="horizontal-view"
        :renderers="renderers"
        :i18n="i18n"
        :schema="store.schema"
        :uischema="store.uischema"
        :data="store.data"
        :ajv="ajv"
        :readonly="store.readonly"
        v-on="store.events"
      />
      <FormLoaderMessage v-bind="store.submit" />
      <FormButtons
        :index="store.index"
        :forms="store.forms"
        :formsErrors="store.formsErrors"
        :touched="store.touchedForms"
        :readonly="store.readonly"
        @submit="store.onSubmit"
        @step="store.setFormStep"
        @validate="onValidate"
      />
    </form>
    <FormDebugView v-if="isDebug" />
  </div>
</template>

<script setup lang="ts">
import type { Form } from '@/type/form-types'
import { JsonForms } from '@jsonforms/vue'

import { useRenderers } from '@/composables/useRenderers'
import { useI18n } from '@/composables/useI18n'
import { useFormStore } from '@/store/useFormStore'
import { useAjv } from '@/composables/useAjv'
import { useFormScroll } from '@/composables/useFormScroll'

import FormButtons from '@/components/form/FormButtons.vue'
import FormDebugView from '@/components/form/FormDebugView.vue'
import FormStepper from '@/components/form/FormStepper/FormStepper.vue'
import FormLoaderMessage from '@/components/form/FormLoaderMessage/FormLoaderMessage.vue'

type Props = {
  forms: Form[]
  id: string
  title?: string
}

const ajv = useAjv()
const props = defineProps<Props>()

const renderers = useRenderers()
const i18n = useI18n()
const store = useFormStore()
const error = useFormScroll(store)
const isDebug = !import.meta.env.PROD

store.setForms(props)

const onValidate = () => {
  store.onValidate()
  error.scrollToError()
}
</script>
