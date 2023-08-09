import type { Meta, StoryObj } from '@storybook/vue3'
import Component from '@shared/components/FormView/FormView.vue'
import { InputType } from '@shared/types/input'

const meta: Meta<typeof Component> = {
  title: 'core/form/Controls/FormNumberControl',
  component: Component
}

export default meta

type Story = StoryObj<typeof Component>

const form = (type: InputType) => [
  {
    uischema: {
      type: 'FormGroupControl',
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
          type
        }
      }
    }
  }
]

const mapping = {
  number: form(InputType.NUMBER),
  integer: form(InputType.INTEGER)
}

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
  argTypes: {
    forms: {
      options: Object.keys(mapping),
      control: { type: 'select' },
      mapping
    }
  },
  args: {
    id: 'id',
    forms: mapping.number
  }
}
