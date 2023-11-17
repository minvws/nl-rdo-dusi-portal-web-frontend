<template>
  <div class="form-field-remove-file">
    <div class="form-field-remove-file-content">
      <AppLoader
        v-if="isPending"
        class="loader"
        :class="{ padding: !hasRemoveButton }"
      />
      <label
        v-else
        v-bind="{ for: labelFor, class: { padding: !hasRemoveButton } }"
        :innerText="file?.name || label"
      />
      <AppButton
        v-if="hasRemoveButton"
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
import type { FileType } from '@shared/types/form'

import { computed, watch } from 'vue'

import { useFieldFileRemove } from '@shared/composables/form/useField'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'

import { getControlId } from '@shared/utils/control'

type Props = {
  handleChange?: (_path: string, _value: any) => void
  id: string
  index: number
  labelFor: string
  error: string
  disabled?: boolean
  files?: FileType[]
  isPending: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['blur'])

const { hasFile, label, removeFileByIdAndIndex } = useFieldFileRemove(props)

const file = computed(() => props.files?.[props.index])
const hasRemoveButton = computed(() => hasFile.value || !!file.value)

function onRemoveFile() {
  removeFileByIdAndIndex(props.id, props.index)
  const files = [...(props.files || [])]
  files.splice(props.index, 1)
  props.handleChange?.(getControlId(props.id), files)
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
  width: 100%;
  height: 100%;
  pointer-events: none;

  &-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    float: right;
    text-overflow: ellipsis;

    label {
      display: block;
      max-width: calc(100% - 220px);
      overflow: hidden;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      pointer-events: none;

      &.padding {
        max-width: calc(100% - 130px);
        padding-right: 1em;
      }
    }

    .button {
      width: 60px;
      height: 100%;
      pointer-events: all;
    }

    .loader {
      width: auto;
      height: auto;

      &.padding {
        padding-right: 1em;
      }
    }
  }
}
</style>
