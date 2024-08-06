<template>
  <h1 v-if="title">{{ title }}</h1>
  <FormStepper
    :index="index"
    :forms="forms"
    :forms-errors="formsErrors"
    :validation-result="validationResult"
    :touched="touchedForms"
    :readonly="readonly || !!locked"
    @step="onStep"
  />
  <form
    :key="formKey"
    class="form-view"
    :class="{
      'no-style': isFirstStep || noStyle
    }"
    :aria-label="props.ariaLabel"
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
      :readonly="readonly || !!locked"
      @change="onChange"
    />
    <FormButtons
      v-if="isReadOnly ? false : !noButtons"
      :index="index"
      :forms="forms"
      :forms-errors="formsErrors"
      :touched="touchedForms"
      :readonly="readonly"
      :button-labels="buttonLabels"
      :has-save-button="hasSaveButton || isRemoteForm"
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

import { computed, onBeforeUnmount } from 'vue'
import { JsonForms } from '@jsonforms/vue'

import { useRenderers } from '@shared/composables/useRenderers'
import { useI18n } from '@shared/composables/useI18n'
import { useForms } from '@shared/composables/form/useForms'
import { useAjv } from '@shared/composables/useAjv'
import { useFormScroll } from '@shared/composables/form/useFormScroll'

import FormButtons from '@shared/components/FormButtons/FormButtons.vue'
import FormDebugView from '@shared/components/FormDebugView/FormDebugView.vue'
import FormStepper from '@shared/components/FormStepper/FormStepper.vue'

const emit = defineEmits(['submit', 'save', 'init'])
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
  validationResult,
  readonly,
  schema,
  touchedForms,
  uischema,
  setForms,
  isReadOnly,
  clearForm
} = form

setForms(props)

emit('init', form.formData.value)

const isRemoteForm = computed<boolean>(() => !!form.reference.value)
const isDebug = computed<boolean>(() => (props.hideDebug ? false : !import.meta.env.PROD))

const isFirstStep = computed<boolean>(() => index.value === 0 && props.forms.length > 1)

function onChange({ data, errors }: JsonFormsChangeEvent) {
  form.events.change({ data, errors })
}

function onStep(index: number) {
  form.setFormStep(index)
}

function onSubmit() {
  if (isRemoteForm.value) form.onSubmitForm()
  else emit('submit', form.formData.value)
}

function onSave() {
  if (isRemoteForm.value) form.onSubmitDraft()
  else emit('save', form.formData.value)
}

function onValidate() {
  form.onValidate()
  error.scrollToError()
}

onBeforeUnmount(() => {
  if (props.persistent) return
  clearForm()
})
</script>

<style lang="scss" scoped>
.form-view {
  @include mobile {
    padding: 1rem;
  }

  &.no-style {
    background-color: transparent;
    padding: 0;
  }
}
</style>
