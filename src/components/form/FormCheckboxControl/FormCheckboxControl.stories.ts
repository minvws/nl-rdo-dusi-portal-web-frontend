import type { Meta, StoryObj } from '@storybook/vue3'
import Component from '@/components/form/FormView/FormView.vue'

const meta: Meta<typeof Component> = {
  title: 'forms/control/FormCheckboxControl',
  component: Component
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: { Component },
      setup() {
        return { args }
      },
      template: '<Component v-bind="args" :key="JSON.stringify(args)"/>'
    }
  },
  args: {
    forms: [
      {
        uischema: {
          type: 'CustomGroupControl',
          options: { section: true },
          elements: [
            {
              type: 'CustomControl',
              scope: '#/properties/storybook'
            }
          ]
        },
        schema: {
          required: ['storybook'],
          properties: {
            storybook: {
              type: 'boolean',
              const: true
            }
          }
        }
      }
    ]
  }
}
