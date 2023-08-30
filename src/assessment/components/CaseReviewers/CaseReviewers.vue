<template>
  <div class="case-reviewers">
    <p>
      {{ translate('component.caseReviers.intro') }}
    </p>
    <p>
      {{ translate('component.caseReviers.handledBy') }}
    </p>
    <p>
      <strong>{{ reviewer }}</strong>
    </p>

    <AppButton class="ghost">
      {{ translate('component.caseReviers.removeReviewer') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

type Props = {
  reviewer: string
}

defineProps<Props>()
</script>
