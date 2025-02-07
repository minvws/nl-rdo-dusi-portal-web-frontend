<template>
  <FormNotification v-bind="appliedOptions" />
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'

import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

export default defineComponent({
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
</script>
