<template>
  <ol
    v-if="steps.length > 1"
    class="form-stepper"
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
  display: flex;
  flex-direction: row;
  padding: 0;
  gap: 0.75rem;

  li {
    --stepper-step-height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--grey-1);
    height: var(--stepper-step-height);
    padding: 0;
    position: relative;

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
      height: 100%;
      border: none;
      padding: 0 1rem 0 3rem;
      font-family: var(--application-base-font-family);

      &.first {
        padding-left: 1rem;
      }

      &:before {
        content: '';
        width: 0;
        height: 0;
        border-top: calc(var(--stepper-step-height) / 2) solid transparent;
        border-left: 26px solid var(--application-base-background-color);
        border-bottom: calc(var(--stepper-step-height) / 2) solid transparent;
        position: absolute;
        top: 0;
        left: 0;
      }

      &:after {
        content: '';
        width: 0;
        height: 0;
        border-top: calc(var(--stepper-step-height) / 2) solid transparent;
        border-left: 26px solid var(--grey-1);
        border-bottom: calc(var(--stepper-step-height) / 2) solid transparent;
        position: absolute;
        top: 0;
        right: -26px;
        z-index: 1;
      }

      &:disabled {
        opacity: 1;
      }

      &:focus {
        outline: var(--link-focus-outline);
        outline-offset: var(--link-focus-outline-offset);
      }

      &:hover {
        background-color: var(--button-base-hover-background-color);
        color: var(--button-base-hover-text-color);
        border-color: var(--button-base-hover-background-color);

        &:after {
          border-left: 26px solid var(--button-base-hover-background-color);
        }
      }

      &.active {
        color: var(--ruby-red-text-color-light);
      }

      &.active:after {
        border-left: 26px solid var(--button-base-active-background-color);
      }

      &.active:hover:after {
        border-left: 26px solid var(--button-base-hover-background-color);
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
