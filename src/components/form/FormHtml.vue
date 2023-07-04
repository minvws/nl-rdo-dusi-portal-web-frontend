<template>
  <div class="form-html" v-html="appliedOptions.html" />
</template>

<script lang="ts">
import type { ControlElement, JsonFormsRendererRegistryEntry } from '@jsonforms/core'
import { rankWith } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

const Component = defineComponent({
  props: {
    ...rendererProps<ControlElement>()
  },
  setup(props) {
    return {
      ...useVanillaControl(useJsonFormsControl(props))
    }
  }
})

export default Component

export const FormHtmlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: Component,
  tester: rankWith(1, ({ type }) => {
    return type === 'FormHtml'
  })
}
</script>

<style lang="scss" scoped>
.form-html {
  display: block;
}
</style>
