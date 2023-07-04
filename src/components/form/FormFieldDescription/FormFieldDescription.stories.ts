import type { Meta, StoryObj } from '@storybook/vue3'

import FormFieldDescription from '@/components/form/FormFieldDescription/FormFieldDescription.vue'

const meta: Meta<typeof FormFieldDescription> = {
  title: 'forms/FormFieldDescription',
  component: FormFieldDescription
}

export default meta
type Story = StoryObj<typeof FormFieldDescription>

const getComponent = (args: any): Story => {
  return {
    render: (args, { argTypes }) => {
      return {
        props: Object.keys(argTypes),
        components: { FormFieldDescription },
        setup() {
          return { args }
        },
        template: '<FormFieldDescription v-bind="args" :key="JSON.stringify(args)"/>'
      }
    },
    args
  }
}
export const Default: Story = getComponent({ description: 'Example of a message' })
