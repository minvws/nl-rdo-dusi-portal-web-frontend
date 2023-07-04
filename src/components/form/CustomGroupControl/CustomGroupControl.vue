<template>
  <component :is="wrapperComponent" class="form-group" :class="{ section: appliedOptions.section }">
    <component :is="labelComponent" class="form-group-label">
      {{ layout.label }}
    </component>
    <div class="form-group-renderer">
      <FormNotification
        v-if="appliedOptions.tip"
        type="explanation"
        :message="translate(appliedOptions.tip)"
      />
      <GroupRenderer :class="groupClassName" v-bind="group" />
    </div>
  </component>
</template>

<script lang="ts">
import { type Layout, type JsonFormsRendererRegistryEntry, rankWith } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsLayout } from '@jsonforms/vue'
import { GroupRenderer, useVanillaLayout } from '@jsonforms/vue-vanilla'
import { translate } from '@/i18n'
import FormNotification from '@/components/form/FormNotification/FormNotification.vue'

const Component = defineComponent({
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
    groupClassName() {
      const size = Math.min(2, this.uischema.elements.length)
      return `size-${size}`
    }
  },
  methods: {
    translate
  }
})

export default Component

export const CustomGroupControlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: Component,
  tester: rankWith(2, ({ type }) => {
    return type === 'CustomGroupControl'
  })
}
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  flex-direction: row;

  &-label {
    flex: 0.25;
  }
  &-renderer {
    width: 100%;
    flex: 0.75;
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
}
</style>
