<template>
  <AppButton
    class="form-field-add-file-button"
    @click.prevent="onClick"
  >
    {{ t('form.component.fileInput.addFile') }}
  </AppButton>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

const emit = defineEmits(['add-file'])

const { t } = useI18n()

function onClick(): void {
  emit('add-file')
}
</script>

<style lang="scss" scoped>
.form-field-add-file-button {
  width: auto;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--form-button-background-color);
  text-decoration: underline;
}
</style>
