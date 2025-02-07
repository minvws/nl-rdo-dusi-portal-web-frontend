<template>
  <CasesOverview :type="CaseType.MY_CASES" />
</template>

<script setup lang="ts">
import { CaseType } from '@shared/types/cases'

import CasesOverview from '@assessment/components/CasesOverview/CasesOverview.vue'
</script>
