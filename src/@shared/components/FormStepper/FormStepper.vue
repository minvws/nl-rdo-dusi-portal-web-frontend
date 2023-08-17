<template>
  <ol
    v-if="steps.length > 1"
    class="form-stepper large"
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
          last: isLast(index)
        }"
        :disabled="isDisabled(step)"
        :aria-current="isAriaCurrent(step)"
        @click="onButtonClick(step)"
      >
        <span>{{ index + 1 }} {{ title }}</span>
      </button>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { FormTitle, FormError } from '@shared/types/form'
import { useFormSteps } from '@shared/composables/useFormSteps'
import { computed } from 'vue'

const emit = defineEmits(['step'])

type Props = {
  forms: FormTitle[]
  formsErrors: FormError[]
  index: number
  readonly: boolean
  touched?: number[]
}

const props = defineProps<Props>()

const { isStepDisabled, isTouched } = useFormSteps(props)

function isActive(index: number) {
  const { index: activeIndex } = props
  return index === activeIndex
}

function isAriaCurrent(index: number) {
  return index === 0 ? 'step' : undefined
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
  return touched?.includes(index) && !formsErrors[index]?.length
}

function onButtonClick(index: number) {
  emit('step', index)
}

const stepsWithTitle = computed(() => {
  return props.forms.map(({ title }, index) => [title, index]).filter(([title]) => !!title) as [
    string,
    number
  ][]
})

const steps = computed(() => {
  const titles = stepsWithTitle.value
  const stepHasTitle = titles.some(([, i]) => i === props.index)
  return stepHasTitle ? titles : []
})
</script>

<style lang="scss" scoped>
.form-stepper {
  width: 100%;
  overflow: hidden;

  --stepper-step-height: 55px;
  --stepper-arrow-size: 15px;
  --stepper-border-size: 12px;
  --stepper-before-position-left: 50%;
  --stepper-before-transform: rotate(90deg) translateX(-9px);

  --stepper-after-position-top: 100%;
  --stepper-after-position-left: 50%;
  --stepper-after-position-transform: rotate(90deg) translateX(-9px);

  &.large {
    flex-direction: row;
    --stepper-step-height: 44px;
    --stepper-arrow-size: calc(var(--stepper-step-height) / 2);
    --stepper-border-size: 26px;
    --stepper-before-position-left: 0;
    --stepper-before-transform: unset;

    --stepper-after-position-top: 0;
    --stepper-after-position-left: unset;
    --stepper-after-position-right: calc(var(--stepper-border-size) * -1);
    --stepper-after-position-transform: unset;
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  gap: 0.75rem;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--grey-1);
    height: var(--stepper-step-height);
    padding: 0;
    position: relative;
    width: 100%;
    max-width: 100%;

    button {
      --button-base-background-color: var(--grey-1);
      --button-base-border-color: var(--grey-1);
      --button-base-text-color: var(--ro-blue-text-color-dark);
      --button-base-active-background-color: var(--ro-blue);
      --button-base-active-border-color: var(--ro-blue);
      --button-base-active-text-color: var(--ro-blue-text-color-light);

      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      position: relative;
      width: 100%;
      height: 100%;
      border: none;
      padding: 0 1rem 0 3rem;
      font-family: var(--application-base-font-family);
      white-space: nowrap;
      width: 100%;
      &.first {
        padding-left: 1rem;
      }

      &:before {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        border-bottom: var(--stepper-arrow-size) solid transparent;
        border-top: var(--stepper-arrow-size) solid transparent;
        border-left: var(--stepper-border-size) solid var(--application-base-background-color);
        top: 0;
        left: var(--stepper-before-position-left);
        transform: var(--stepper-before-transform);
      }

      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;

        border-top: var(--stepper-arrow-size) solid transparent;
        border-bottom: var(--stepper-arrow-size) solid transparent;
        border-left: var(--stepper-border-size) solid var(--grey-1);

        z-index: 1;

        top: var(--stepper-after-position-top);
        left: var(--stepper-after-position-left);
        right: var(--stepper-after-position-right);
        transform: var(--stepper-after-position-transform);
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
      &:hover {
        &:after {
          border-left: var(--stepper-border-size) solid var(--button-base-hover-background-color);
        }
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
