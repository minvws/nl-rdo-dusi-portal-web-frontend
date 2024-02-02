<template>
  <button class="form-field-add-file-button">
    {{ t('form.component.fileInput.addFile') }}
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.form-field-add-file-button {
  color: var(--form-button-background-color);
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  text-decoration: underline;
}
</style>
