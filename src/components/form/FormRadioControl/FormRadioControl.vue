<template>
  <div class="radio-control">
    <template v-for="item in items" :key="item.id">
      <input
        v-bind="item"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <label :for="item.id">
        {{ item.id }}
      </label>
    </template>
  </div>
</template>
<script setup lang="ts">
defineEmits(['input', 'change', 'focus', 'blur'])
defineProps<{
  value?: string
  items: { id: string; value: string; checked: boolean }[]
}>()
</script>
