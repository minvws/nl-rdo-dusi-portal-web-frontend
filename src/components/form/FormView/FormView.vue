<template>
  <div :key="formKey">
    <h1 v-if="title">{{ title }}</h1>
    <FormStepper
      :index="index"
      :forms="forms"
      :formsErrors="formsErrors"
      :touched="touchedForms"
      :readonly="readonly"
      @step="onStep"
    />
    <form class="form-view" @submit.prevent>
      <JsonForms
        class="horizontal-view"
        :renderers="renderers"
        :i18n="i18n"
        :schema="schema"
        :uischema="uischema"
        :data="data"
        :ajv="ajv"
        :readonly="readonly"
        @change="onChange"
      />
      <FormLoaderMessage v-bind="onSubmit" />
      <FormButtons
        :index="index"
        :forms="forms"
        :formsErrors="formsErrors"
        :touched="touchedForms"
        :readonly="readonly"
        @submit="onSubmit"
        @step="onStep"
        @validate="onValidate"
      />
    </form>
    <FormDebugView v-if="isDebug" />
  </div>
</template>

<script setup lang="ts">
import type { Form } from '@/type/form-types'
import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import { storeToRefs } from 'pinia'
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

const props = defineProps<Props>()

const ajv = useAjv()
const renderers = useRenderers()
const i18n = useI18n()
const formStore = useFormStore()
const error = useFormScroll(formStore)
const isDebug = !import.meta.env.PROD

const { data, index, formKey, formsErrors, readonly, schema, touchedForms, uischema } =
  storeToRefs(formStore)

formStore.createFormDraft()
formStore.setForms(props)

function onChange({ data, errors }: JsonFormsChangeEvent) {
  formStore.events.change({ data, errors })
}

function onStep(index: number) {
  formStore.setFormStep(index)
}

function onSubmit() {
  formStore.onSubmit()
}

function onValidate() {
  formStore.onValidate()
  error.scrollToError()
}
</script>
