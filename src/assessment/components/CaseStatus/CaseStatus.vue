<template>
  <span class="case-status">
    <strong>{{ translate('component.caseStatus.status') }} </strong>
    <span class="tag tags-color-1">
      {{ translate(`component.caseStatus.${type}`) }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

type StatusTypes = 'new' | 'inProgress' | 'approved' | 'rejected'

type Props = {
  type: StatusTypes
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.tag {
  margin-left: 0.5rem;
}
</style>
