<template>
  <div class="form-field-remove-file">
    <div class="form-field-remove-file-content">
      <label v-bind="{ for: labelFor, class: { padding: !hasFile } }">{{ label }}</label>
      <AppButton
        v-if="hasFile"
        class="button"
        @click="onRemoveFile"
      >
        <AppIcon name="close" />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFieldFileRemove } from '@shared/composables/useField'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { getControlId } from '@shared/utils/control'

type Props = {
  handleChange?: (_path: string, _value: any) => void
  id: string
  labelFor: string
}

const props = defineProps<Props>()

const emit = defineEmits(['blur'])

const { hasFile, label, addOrRemoveFile } = useFieldFileRemove(props)

function onRemoveFile() {
  addOrRemoveFile(props.id)
  props.handleChange?.(getControlId(props.id), undefined)
  emit('blur')
}
</script>
<style lang="scss" scoped>
.form-field-remove-file {
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
  height: 100%;

  &-content {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;

    label {
      white-space: nowrap;
      &.padding {
        padding-right: 1em;
      }
    }
    .button {
      height: 100%;
    }
  }
}
</style>
