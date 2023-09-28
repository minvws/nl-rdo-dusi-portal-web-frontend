<template>
  <CasesOverview :type="Case.MY_CASES" />
</template>

<script setup lang="ts">
import { Case } from '@shared/types/cases'
import CasesOverview from '@assessment/components/CasesOverview/CasesOverview.vue'
</script>
