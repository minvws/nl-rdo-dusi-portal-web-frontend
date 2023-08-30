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
defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  items: { id: string; value: string; checked: boolean }[]
  value?: string
  id: string
}

defineProps<Props>()
</script>

<style>
.radio-control-innner > div {
  flex-direction: row;
}
</style>
