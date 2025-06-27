<template>
  <span
    class="nota-bene"
    :class="{ required }"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type Props = {
  required: boolean | undefined
  label?: string
}

const props = defineProps<Props>()

const { t } = useI18n()

const text = computed<string | undefined>(() => {
  const type = props.required ? 'required' : 'optional'
  const field = props.label ?? t('form.fields.error.field')

  return t(`form.fields.error.${type}`, { field })
})
</script>

<style lang="scss" scoped>
@use "@shared/styles/mixins.scss";

span {
  margin-bottom: 0.5em;

  @include mixins.mobile {
    margin: 0;
  }

  &.required {
    // hide required fields
    display: none;
  }
}
</style>
