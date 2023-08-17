<template>
  <h1 v-if="title">{{ title }}</h1>
  <FormStepper
    :index="index"
    :forms="forms"
    :formsErrors="formsErrors"
    :touched="touchedForms"
    :readonly="readonly"
    @step="onStep"
  />
  <form
    :key="formKey"
    class="form-view"
    :class="{ 'first-step': isFirstStep }"
    @submit.prevent
  >
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
    <FormDebugView v-if="isDebug" />
  </form>
</template>

<script setup lang="ts">
import type { Form } from '@shared/types/form'
import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { JsonForms } from '@jsonforms/vue'

import { useRenderers } from '@shared/composables/useRenderers'
import { useI18n } from '@shared/composables/useI18n'
import { useFormStore } from '@shared/store/useFormStore'
import { useAjv } from '@shared/composables/useAjv'
import { useFormScroll } from '@shared/composables/useFormScroll'

import FormButtons from '@shared/components/FormButtons/FormButtons.vue'
import FormDebugView from '@shared/components/FormDebugView/FormDebugView.vue'
import FormLoaderMessage from '@shared/components/FormLoaderMessage/FormLoaderMessage.vue'
import FormStepper from '@shared/components/FormStepper/FormStepper.vue'

type Props = {
  forms: Form[]
  id: string
  title?: string
  createDraft?: boolean
  hideDebug?: boolean | undefined
}

const emit = defineEmits(['submit'])
const props = defineProps<Props>()

const ajv = useAjv()
const renderers = useRenderers()
const i18n = useI18n()
const formStore = useFormStore()
const error = useFormScroll(formStore)

const { data, index, formKey, formsErrors, readonly, schema, touchedForms, uischema } =
  storeToRefs(formStore)

if (props.createDraft) formStore.createFormDraft()

formStore.setForms(props)

const isDebug = computed(() => {
  if (props.hideDebug) return false
  return !import.meta.env.PROD
})

const isFirstStep = computed(() => index.value === 0 && props.forms.length > 1)

function onChange({ data, errors }: JsonFormsChangeEvent) {
  formStore.events.change({ data, errors })
}

function onStep(index: number) {
  formStore.setFormStep(index)
}

function onSubmit() {
  if (props.createDraft) formStore.onSubmit()
  else emit('submit', formStore.formData)
}

function onValidate() {
  formStore.onValidate()
  error.scrollToError()
}
</script>

<style lang="scss" scoped>
.form-view {
  @include mobile {
    padding: 0;
  }

  &.first-step {
    background-color: white;
    padding: 0;
  }
}
</style>
