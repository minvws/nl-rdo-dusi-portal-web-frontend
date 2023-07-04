import type { Meta, StoryObj } from '@storybook/vue3'

import FormFieldLabel from '@/components/form/FormFieldLabel/FormFieldLabel.vue'

const meta: Meta<typeof FormFieldLabel> = {
  title: 'forms/FormFieldLabel',
  component: FormFieldLabel
}

export default meta
type Story = StoryObj<typeof FormFieldLabel>

const getComponent = (args: any): Story => {
  return {
    render: (args, { argTypes }) => {
      return {
        props: Object.keys(argTypes),
        components: { FormFieldLabel },
        setup() {
          return { args }
        },
        template: '<FormFieldLabel v-bind="args" :key="JSON.stringify(args)"/>'
      }
    },
    args
  }
}
export const Default: Story = getComponent({})
export const Secondary: Story = getComponent({ required: true })
