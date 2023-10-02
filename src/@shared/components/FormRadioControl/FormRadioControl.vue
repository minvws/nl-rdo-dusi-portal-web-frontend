<template>
  <div class="radio-control">
    <div class="radio-control-innner">
      <div
        v-for="item in items"
        :key="item.id"
      >
        <input
          v-bind="item"
          :id="`${id}-${item.id}`"
          @mousedown="onMouseDown"
          @input="$emit('input', $event)"
          @change="$emit('change', $event)"
          @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)"
        />
        <label :for="`${id}-${item.id}`">
          {{ item.id }}
        </label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  items: { id: string; value: string; checked: boolean }[]
  value?: string
  id: string
}

defineProps<Props>()

const onMouseDown = (e: MouseEvent) => {
  // when a radio is already checked, uncheck it
  const element = e.target as HTMLInputElement
  if (!element?.checked) return
  e.preventDefault()
  e.stopImmediatePropagation()
  element.value = ''
  emit('input', e)
}
</script>

<style>
.radio-control-innner > div {
  flex-direction: row;
}
</style>
