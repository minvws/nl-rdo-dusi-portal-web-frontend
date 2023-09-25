<template>
  <FormNotification v-bind="appliedOptions" />
</template>

<script lang="ts">
import type { ControlElement, JsonFormsRendererRegistryEntry } from '@jsonforms/core'
import { rankWith } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

const Component = defineComponent({
  components: {
    FormNotification
  },
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

export const FormNotificationRenderer: JsonFormsRendererRegistryEntry = {
  renderer: Component,
  tester: rankWith(2, ({ type }) => {
    return type === 'FormNotification'
  })
}
</script>
