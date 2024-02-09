<template>
  <ol
    v-if="steps.length > 1"
    ref="el"
    class="form-stepper"
    :class="{ large: isLarge }"
  >
    <li
      v-for="([title, step], index) in steps"
      :key="index"
    >
      <button
        :class="{
          active: isActive(step),
          valid: isValid(step),
          first: isFirst(index),
          last: isLast(index),
          large: isLarge
        }"
        :disabled="isDisabled(step)"
        :aria-current="ariaCurrent(step)"
        @click="onButtonClick(step)"
      >
        <span>{{ index + 1 }} {{ title }}</span>
      </button>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { FormTitle, FormErrors, FormValidationResult } from '@shared/types/form'

import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import { useFormSteps } from '@shared/composables/form/useFormSteps'

const emit = defineEmits(['step'])

type Props = {
  forms: FormTitle[]
  formsErrors: FormErrors
  index: number
  readonly: boolean
  touched?: number[]
  validationResult?: FormValidationResult
}

const props = defineProps<Props>()

const { isStepDisabled, isTouched } = useFormSteps(props)
const isLarge = useMediaQuery('(min-width: 800px)')

const stepsWithTitle = computed<[string, number][]>(
  () =>
    props.forms.map(({ title }, index) => [title, index]).filter(([title]) => !!title) as [
      string,
      number
    ][]
)

const steps = computed<[string, number][]>(() => {
  const titles = stepsWithTitle.value
  const stepHasTitle = titles.some(([, i]) => i === props.index)
  return stepHasTitle ? titles : []
})

function isActive(index: number) {
  const { index: activeIndex } = props
  return index === activeIndex
}

function ariaCurrent(index: number) {
  return index === props.index ? 'step' : undefined
}

function isDisabled(index: number) {
  const { readonly } = props
  return readonly || isStepDisabled(index - 1) || !isTouched(index - 1)
}

function isFirst(index: number) {
  return index === 0
}

function isLast(index: number) {
  const { forms } = props
  return index === forms.length - 1
}

function isValid(index: number) {
  const { touched, formsErrors } = props
  const errors = formsErrors[index]
  const hasErrorsArray = Array.isArray(errors) && errors.length > 0
  const hasErrorsObject = typeof errors === 'object' && Object.keys(errors).length > 0

  return touched?.includes(index) && !hasErrorsArray && !hasErrorsObject
}

function onButtonClick(index: number) {
  emit('step', index)
}
</script>

<style lang="scss" scoped>
.form-stepper {
  --stepper-step-height: 55px;
  --stepper-arrow-size: 15px;
  --stepper-border-size: 12px;
  --stepper-before-position-left: calc(50% - calc(var(--stepper-arrow-size) / 2));
  --stepper-before-transform: rotate(90deg) translateX(-9px);
  --stepper-after-position-top: 100%;
  --stepper-after-position-left: calc(50% - calc(var(--stepper-arrow-size) / 2));
  --stepper-after-position-transform: rotate(90deg) translateX(-9px);

  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  width: 100%;
  padding: 0;
  overflow: hidden;

  &.large {
    --stepper-step-height: 44px;
    --stepper-arrow-size: calc(var(--stepper-step-height) / 2);
    --stepper-border-size: 26px;
    --stepper-before-position-left: 0;
    --stepper-before-transform: unset;
    --stepper-after-position-top: 0;
    --stepper-after-position-left: unset;
    --stepper-after-position-right: calc(var(--stepper-border-size) * -1);
    --stepper-after-position-transform: unset;

    flex-direction: row;
    width: auto;
    overflow: visible;
  }

  li {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    height: var(--stepper-step-height);
    padding: 0;
    background-color: var(--grey-1);

    button {
      --button-base-background-color: var(--grey-1);
      --button-base-border-color: var(--grey-1);
      --button-base-text-color: var(--ro-blue-text-color-dark);
      --button-base-active-background-color: var(--ro-blue);
      --button-base-active-border-color: var(--ro-blue);
      --button-base-active-text-color: var(--ro-blue-text-color-light);

      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border: none;
      font-family: var(--application-base-font-family);
      text-decoration: none;
      white-space: nowrap;

      &.large {
        padding: 0 1rem 0 3rem;

        &.last {
          padding: 0 2rem 0 3rem;
        }
      }

      &.first {
        padding-left: 1rem;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: var(--stepper-before-position-left);
        width: 0;
        height: 0;
        transform: var(--stepper-before-transform);
        border-top: var(--stepper-arrow-size) solid transparent;
        border-bottom: var(--stepper-arrow-size) solid transparent;
        border-left: var(--stepper-border-size) solid var(--application-base-background-color);
      }

      &:after {
        content: '';
        position: absolute;
        z-index: 1;
        top: var(--stepper-after-position-top);
        right: var(--stepper-after-position-right);
        left: var(--stepper-after-position-left);
        width: 0;
        height: 0;
        transform: var(--stepper-after-position-transform);
        border-top: var(--stepper-arrow-size) solid transparent;
        border-bottom: var(--stepper-arrow-size) solid transparent;
        border-left: var(--stepper-border-size) solid var(--grey-1);
      }

      &:disabled {
        opacity: 1;
      }

      &:hover,
      &:active,
      &:focus,
      &.active {
        color: var(--button-base-hover-text-color);
      }

      &:hover:after {
        border-left: var(--stepper-border-size) solid var(--button-base-hover-background-color);
      }

      &:focus {
        outline: var(--link-focus-outline);
        outline-offset: var(--link-focus-outline-offset);

        &:after {
          border-left: var(--stepper-border-size) solid var(--button-base-focus-background-color);
        }

        &.active,
        &:active {
          &:after {
            border-left: var(--stepper-border-size) solid var(--button-base-focus-background-color);
          }
        }
      }

      &:active,
      &.active {
        &:after {
          border-left: var(--stepper-border-size) solid var(--button-base-active-background-color);
        }
      }

      &:hover:disabled {
        // when step is disabled, do not set the hover classes for touch devices
        @include is-touch-device {
          background: var(--button-base-background-color);
          color: var(--button-base-text-color);

          &:after {
            border-left: var(--stepper-border-size) solid var(--button-base-background-color);
          }
        }
      }
    }

    &:first-child button:before {
      content: none;
    }

    &:last-child button:after {
      content: none;
    }
  }
}
</style>
