<template>
  <div class="form-field-remove-file">
    <div class="form-field-remove-file-content">
      <label v-bind="{ for: labelFor, class: { padding: !hasFile } }">{{ label }}</label>
      <AppButton v-if="hasFile" class="button" @click="onRemoveFile">
        <AppIcon name="close" />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton/AppButton.vue'
import AppIcon from '@/components/AppIcon/AppIcon.vue'
import { useFieldFileRemove } from '@/composables/useField'
import { getControlId } from '@/util/control-util'

const props = defineProps<{
  id: string
  labelFor: string
  handleChange?: (path: string, value: any) => void
}>()

const emit = defineEmits(['blur'])
const { hasFile, label, addOrRemoveFile } = useFieldFileRemove(props)

const onRemoveFile = () => {
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
