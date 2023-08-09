import type { Meta, StoryObj } from '@storybook/vue3'
import Component from '@shared/components/FormView/FormView.vue'

const meta: Meta<typeof Component> = {
  title: 'forms/control/FormSelectControl',
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
    id: 'id',
    forms: [
      {
        uischema: {
          type: 'FormGroupControl',
          options: { section: true },
          elements: [
            {
              type: 'CustomControl',
              scope: '#/properties/storybook',
              options: {
                format: 'select',
                placeholder: 'Select below'
              }
            }
          ]
        },
        schema: {
          required: ['storybook'],
          properties: {
            storybook: {
              type: 'string',
              enum: ['One', 'Two', 'Three']
            }
          }
        }
      }
    ]
  }
}
