<template>
  <component
    :is="wrapperComponent"
    class="form-group"
    :class="formGroupClassName"
  >
    <component
      v-if="layout.label"
      :is="labelComponent"
      class="form-group-label"
    >
      {{ layout.label }}
    </component>
    <div class="form-group-renderer">
      <FormNotification
        v-if="message"
        displayAs="explanation"
        :message="message"
      />
      <GroupRenderer
        :class="groupClassName"
        v-bind="group"
      />
    </div>
  </component>
</template>

<script lang="ts">
import { type Layout } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsLayout } from '@jsonforms/vue'
import { GroupRenderer, useVanillaLayout } from '@jsonforms/vue-vanilla'

import { translate } from '@shared/i18n'

import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

export default defineComponent({
  components: {
    GroupRenderer,
    FormNotification
  },
  props: {
    ...rendererProps<Layout>()
  },
  setup(props) {
    return useVanillaLayout(useJsonFormsLayout(props))
  },
  computed: {
    wrapperComponent() {
      return this.appliedOptions.section ? 'fieldset' : 'div'
    },
    labelComponent() {
      return this.appliedOptions.section ? 'legend' : 'div'
    },
    group() {
      const { uischema, ...props } = this.$props
      const { elements } = uischema
      return {
        uischema: {
          ...uischema,
          elements: elements.map(({ options, ...element }) => {
            return {
              ...element,
              options: {
                ...options,
                type: this.appliedOptions.type
              }
            }
          }),
          label: undefined
        },
        ...props
      }
    },
    formGroupClassName() {
      const { section, group } = this.appliedOptions
      return { section, group }
    },
    groupClassName() {
      const size = Math.min(2, this.uischema.elements.length)
      return `size-${size}`
    },
    message() {
      return translate(`${this.appliedOptions.tip}`) || ''
    }
  }
})
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  flex-direction: column;

  @include desktop {
    flex-direction: row;
  }

  &-label {
    flex: 0.25;
  }

  &-renderer {
    width: 100%;
    flex: 0.75;

    :deep(.group-label) {
      padding-bottom: 0.5em;
    }

    :deep(.size-1 > .group + .group) {
      padding-top: 2em;

      @include desktop {
        padding-top: 3em;
      }
    }

    :deep(.size-1 > .group-item + .group-item) {
      padding-top: 2em;

      @include desktop {
        padding-top: 3em;
      }
    }
  }

  &:not(.section) {
    .size-1 {
      &:deep(.group-item) {
        width: 100%;
      }
    }

    .size-2 {
      &:deep(.group-item) {
        width: calc(50% - var(--form-group-gap) / 2);
      }
    }

    &:deep(.group) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: var(--form-group-gap);
      padding: 0;
      outline: 0;
      border: 0;
    }
  }

  &.section {
    display: block;
  }

  &.group {
    background-color: var(--form-base-background-color, inherit);

    legend {
      // styles are added, so we can have a background on the group
      display: table;
      float: left;
      width: 100%;
    }
  }
}
</style>
