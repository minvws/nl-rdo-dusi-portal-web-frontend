<template>
  <component
    :is="isGroup ? 'fieldset' : 'div'"
    class="form-row-field"
    :class="{
      center: !isNotCentered,
      multiple: hasSlotLeft
    }"
  >
    <div v-if="hasSlotLeft">
      <slot name="left" />
    </div>
    <div :class="contentClass">
      <slot name="right" />
      <slot name="description" />
    </div>
  </component>
</template>

<script setup lang="ts">
import type { Slot, VNodeChild } from 'vue'

import { InputType } from '@shared/types/input'
import { Comment, computed, useSlots } from 'vue'

type Props = {
  hasLeft?: boolean
  contentClass?: string
  isGroup?: boolean
}
const props = defineProps<Props>()

const slots = useSlots()

const isNotCentered = computed<boolean>(() => {
  switch (props.contentClass) {
    case InputType.RADIO:
    case InputType.CHECKBOX:
    case InputType.CHECKBOX_GROUP:
    case InputType.TEXTAREA:
    case InputType.FILE:
    case undefined: {
      return true
    }
    default: {
      return false
    }
  }
})

// logic based on: https://mokkapps.de/vue-tips/check-if-slot-is-empty/
const hasSlotLeft = computed<boolean>(() => props.hasLeft || !isSlotEmpty(slots?.left))

function isSlotEmpty(slot: Slot<any> | undefined, props = {}) {
  return isNodeEmpty(slot?.(props))
}

function isNodeEmpty(node: VNodeChild) {
  return !node || asArray(node).every((node: any) => node.type === Comment)
}

function asArray(arg: VNodeChild) {
  return Array.isArray(arg) ? arg : arg === null ? [] : [arg]
}
</script>

<style lang="scss" scoped>
.form-row-field {
  display: flex;
  flex-direction: column;
  gap: var(--form-group-gap);

  @include mobile {
    gap: 0.2rem;
  }

  &.center {
    align-items: center;
  }

  &.multiple {
    @include desktop {
      flex-direction: row;

      > * {
        flex: 0.75;
        align-items: center;

        &:first-child {
          flex: 0.25;
        }
      }
    }
  }
}
</style>
