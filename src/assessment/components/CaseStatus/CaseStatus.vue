<template>
  <span class="case-status">
    <strong>{{ t('component.caseStatus.status') }}: </strong>
    <span class="tag tags-color-1">
      {{ t(`component.caseStatus.${type}`) }}
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
