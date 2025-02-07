<template>
  <AppHtml
    class="form-html"
    :html="appliedOptions.html"
  />
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'

import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import AppHtml from '@shared/components/AppHtml/AppHtml.vue'

export default defineComponent({
  props: {
    ...rendererProps<ControlElement>()
  },
  components: {
    AppHtml
  },
  setup(props) {
    return {
      ...useVanillaControl(useJsonFormsControl(props))
    }
  }
})
</script>

<style lang="scss" scoped>
.form-html {
  display: block;
  max-width: var(--max-line-length-max-width);

  &:deep(h2),
  &:deep(p) {
    width: 100%;
    max-width: 100%;
    padding: 0.5em 0;
  }

  &:deep(ol) {
    padding-bottom: 0.5em;
  }

  &:deep(.error),
  &:deep(.warning),
  &:deep(.confirmation),
  &:deep(.explanation) {
    margin-bottom: 0.5em;
    padding: 1rem;
  }
}
</style>
