<template>
  <component
    :is="wrapperComponent"
    class="form-group"
    :class="formGroupClassName"
    :role="role"
    :aria-labelledby="labelId"
  >
    <component
      v-if="label"
      :is="labelComponent"
      class="form-group-label"
      :class="labelClass"
      :id="labelId"
    >
      {{ label }}
    </component>
    <div class="form-group-renderer">
      <FormNotification
        v-if="message"
        display-as="explanation"
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
import type { Layout } from '@jsonforms/core'

import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { rendererProps, useJsonFormsLayout } from '@jsonforms/vue'
import { GroupRenderer, useVanillaLayout } from '@jsonforms/vue-vanilla'
import { v4 as uuid } from 'uuid'

import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'

export default defineComponent({
  components: {
    GroupRenderer,
    FormNotification,
    AppHtml
  },
  props: {
    ...rendererProps<Layout>()
  },
  setup(props) {
    const jsonFormsLayout = useJsonFormsLayout(props)
    const vanillaLayout = useVanillaLayout(jsonFormsLayout)
    const { t } = useI18n()

    return {
      ...vanillaLayout,
      labelId: uuid(),
      t
    }
  },
  computed: {
    role() {
      return this.wrapperComponent === 'div' ? 'group' : undefined
    },
    wrapperComponent() {
      return this.appliedOptions.section ? 'fieldset' : 'div'
    },
    labelComponent() {
      return this.appliedOptions.section ? 'legend' : 'div'
    },
    labelClass() {
      const { headingLevel } = this.appliedOptions
      return headingLevel ? `h${headingLevel}` : undefined
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
      return this.appliedOptions.tip ? this.t(`${this.appliedOptions.tip}`) : ''
    },
    label() {
      return this.layout.label
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
    padding: 1em;
    background-color: var(--form-base-background-color, inherit);

    legend {
      // styles are added, so we can have a background on the group
      display: table;
      float: left;
      width: 100%;
    }
  }

  :deep(.vertical-layout-item) {
    // when an vertical-layout-item has no items, due to conditional fields
    // make sure this element does not take any space
    &:empty {
      display: none;
    }
  }
}

.form-group-label {
  flex: 0.25;

  @include heading;
}

.form-group-renderer {
  width: 100%;
  flex: 0.75;

  :deep(.group-label) {
    padding-bottom: 0.5em;
    padding-left: 0;

    &:not(:last-child) {
      @include mobile {
        margin-bottom: 0;
      }
    }
  }

  :deep(.group) {
    padding-bottom: 0;

    @include desktop {
      padding-bottom: 1em;
    }
  }

  > :deep(.group) {
    > .group-item:last-of-type > .group {
      padding-bottom: 0;
    }
  }

  :deep(.group-item > .form-row),
  :deep(.group-item > .vertical-layout > .vertical-layout-item > .form-row) {
    margin-bottom: 2rem;
  }
}
</style>
