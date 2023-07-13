<template>
  <div class="form-html" v-html="appliedOptions.html" />
</template>

<script lang="ts">
import type { ControlElement, JsonFormsRendererRegistryEntry } from '@jsonforms/core'
import { rankWith } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

export default defineComponent({
  props: {
    ...rendererProps<ControlElement>()
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
}
</style>
