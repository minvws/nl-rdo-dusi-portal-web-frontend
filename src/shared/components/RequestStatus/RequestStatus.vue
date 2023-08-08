<template>
  <span class="request-status">
    <strong>{{ t('component.requestStatus.status') }} </strong>
    <span class="tag tags-color-1">
      {{ t(`component.requestStatus.${type}`) }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

type StatusTypes = 'new' | 'inProgress' | 'approved' | 'rejected'

type Props = {
  type: StatusTypes
}

defineProps<Props>()

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.tag {
  margin-left: 0.5rem;
}
</style>
