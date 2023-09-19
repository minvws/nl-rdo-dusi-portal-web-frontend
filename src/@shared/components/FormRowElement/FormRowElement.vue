<template>
  <div
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
  </div>
</template>

<script setup lang="ts">
import { InputType } from '@/@shared/types/input'
import type { Slot, VNodeChild } from 'vue'
import { Comment, computed, useSlots } from 'vue'

type Props = {
  hasLeft?: boolean
  contentClass?: string
}
const props = defineProps<Props>()

const slots = useSlots()

const isNotCentered = computed(() => {
  switch (props.contentClass) {
    case InputType.RADIO:
    case InputType.CHECKBOX:
    case InputType.CHECKBOX_GROUP:
    case undefined:
      return true
  }
  return false
})

// logic based on: https://mokkapps.de/vue-tips/check-if-slot-is-empty/
const hasSlotLeft = computed(() => props.hasLeft || !isSlotEmpty(slots?.left))

function isSlotEmpty(slot: Slot<any> | undefined, props = {}) {
  return isNodeEmpty(slot?.(props))
}

function isNodeEmpty(node: VNodeChild) {
  return !node || asArray(node).every((node: any) => node.type === Comment)
}

function asArray(arg: VNodeChild) {
  return Array.isArray(arg) ? arg : arg !== null ? [arg] : []
}
</script>

<style lang="scss" scoped>
.form-row-field {
  display: flex;
  flex-direction: column;

  &.center {
    align-items: center;
  }

  @include mobile {
    gap: 0.2rem;
  }

  &.multiple {
    @include desktop {
      flex-direction: row;
      * {
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
