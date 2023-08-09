<template>
  <span
    class="nota-bene"
    :class="{ required }"
    >{{ text }}</span
  >
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@shared/i18n'

const props = defineProps<{ required: boolean | undefined; label?: string }>()

const text = computed(() => {
  const type = props.required ? 'required' : 'optional'
  return translate(`form.fields.error.${type}`, {
    field: props.label ?? translate('form.fields.error.field') ?? ''
  })
})
</script>

<style lang="scss" scoped>
span {
  margin-bottom: 0.5em;
  &.required {
    // hide required fields
    display: none;
  }
}
</style>
