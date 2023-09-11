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
    :class="{
      'no-style': isFirstStep || noStyle
    }"
    @submit.prevent.stop
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
    <FormButtons
      v-if="!noButtons"
      :index="index"
      :forms="forms"
      :formsErrors="formsErrors"
      :touched="touchedForms"
      :readonly="readonly"
      :buttonLabels="buttonLabels"
      @save="onSave"
      @submit="onSubmit"
      @step="onStep"
      @validate="onValidate"
    />
    <FormDebugView v-if="isDebug" />
  </form>
</template>

<script setup lang="ts">
import type { FormViewProps } from '@shared/types/form'
import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import { computed } from 'vue'
import { JsonForms } from '@jsonforms/vue'

import { useRenderers } from '@shared/composables/useRenderers'
import { useI18n } from '@shared/composables/useI18n'
import { useForms } from '@shared/composables/form/useForms'
import { useAjv } from '@shared/composables/useAjv'
import { useFormScroll } from '@shared/composables/form/useFormScroll'

import FormButtons from '@shared/components/FormButtons/FormButtons.vue'
import FormDebugView from '@shared/components/FormDebugView/FormDebugView.vue'
import FormStepper from '@shared/components/FormStepper/FormStepper.vue'

const emit = defineEmits(['submit', 'init'])
const props = defineProps<FormViewProps>()

const ajv = useAjv()
const renderers = useRenderers()
const i18n = useI18n()
const form = useForms()
const error = useFormScroll(form)

const {
  data,
  index,
  formKey,
  formsErrors,
  readonly,
  schema,
  touchedForms,
  uischema,
  createFormDraft,
  setForms
} = form

if (props.createDraft) createFormDraft()

setForms(props)

const isDebug = computed(() => {
  if (props.hideDebug) return false
  return !import.meta.env.PROD
})

const isFirstStep = computed(() => index.value === 0 && props.forms.length > 1)

function onChange({ data, errors }: JsonFormsChangeEvent) {
  form.events.change({ data, errors })
}

function onStep(index: number) {
  form.setFormStep(index)
}

emit('init', form.formData.value)

function onSubmit() {
  if (props.createDraft) form.onSubmitForm()
  else emit('submit', form.formData.value)
}

function onSave() {
  if (props.createDraft) form.onSubmitDraft()
}

function onValidate() {
  form.onValidate()
  error.scrollToError()
}
</script>

<style lang="scss" scoped>
.form-view {
  @include mobile {
    padding: 0;
  }

  &.no-style {
    background-color: transparent;
    padding: 0;
  }
}
</style>
