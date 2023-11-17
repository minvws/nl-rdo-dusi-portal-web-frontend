<template>
  <button class="form-field-add-file-button">
    {{ translate('form.component.fileInput.addFile') }}
  </button>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'
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
