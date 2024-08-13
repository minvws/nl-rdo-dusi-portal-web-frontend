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
        :for="labelFor"
        :class="{ padding: !hasRemoveButton }"
      >
        {{ fileLabel }}
      </label>
      <AppButton
        v-if="hasRemoveButton"
        class="button"
        :disabled="isDisabled"
        @click="onRemoveFile"
      >
        <span class="visually-hidden">
          {{ t('component.formFieldRemoveFile.remove') }}
        </span>
        <AppIcon name="close" />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileType } from '@shared/types/form'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { formatFile } from '@shared/utils/format'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'

type Props = {
  disabled?: boolean
  file?: FileType
  index: number
  isPending: boolean
  labelFor: string
}

const props = defineProps<Props>()

const emit = defineEmits(['removedFile'])

const { t } = useI18n()

const fileLabel = computed<string | undefined>(() => formatFile(props.file?.name))

const hasRemoveButton = computed<boolean>(() => !!props.file || props.index > 0)

const isDisabled = computed<boolean>(() => props.disabled || props.isPending)

function onRemoveFile(): void {
  emit('removedFile', props.index)
}
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
