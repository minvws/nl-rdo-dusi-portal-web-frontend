<template>
  <div>
    <p
      :class="type"
      v-for="({ type, message }, index) in validations"
      :key="`validation-${index}`"
      class="form-field-validation-result"
    >
      <span />
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { FormValidationEntry } from '@shared/types/form'

type Props = {
  validations: FormValidationEntry[]
  id?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.form-field-validation-result {
  display: flex;
}
</style>
