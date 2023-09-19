<template>
  <div class="form-field-remove-file">
    <div class="form-field-remove-file-content">
      <AppLoader v-if="isPending" />
      <label
        v-else
        v-bind="{ for: labelFor, class: { padding: !hasFile } }"
        :innerText="file?.name || label"
      />
      <AppButton
        v-if="hasFile || !!file"
        class="button"
        :disabled="disabled || isPending"
        @click="onRemoveFile"
      >
        <AppIcon name="close" />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileType } from '@/@shared/types/form'

import { watch } from 'vue'

import { useFieldFileRemove } from '@shared/composables/form/useField'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'

import { getControlId } from '@shared/utils/control'

type Props = {
  handleChange?: (_path: string, _value: any) => void
  id: string
  labelFor: string
  error: string
  disabled?: boolean
  file?: FileType
  isPending: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['blur'])

const { hasFile, label, addOrRemoveFile } = useFieldFileRemove(props)

function onRemoveFile() {
  addOrRemoveFile(props.id)
  props.handleChange?.(getControlId(props.id), undefined)
  emit('blur')
}

watch(
  () => props.error,
  error => {
    if (!error) return
    // when there is an error
    // remove the file
    onRemoveFile()
  }
)
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
