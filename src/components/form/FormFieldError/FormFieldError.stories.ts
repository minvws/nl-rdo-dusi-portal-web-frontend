import type { Meta, StoryObj } from '@storybook/vue3'

import FormFieldError from '@/components/form/FormFieldError/FormFieldError.vue'

const meta: Meta<typeof FormFieldError> = {
  title: 'forms/FormFieldError',
  component: FormFieldError
}

export default meta
type Story = StoryObj<typeof FormFieldError>

const getComponent = (args: any): Story => {
  return {
    render: (args, { argTypes }) => {
      return {
        props: Object.keys(argTypes),
        components: { FormFieldError },
        setup() {
          return { args }
        },
        template: '<FormFieldError v-bind="args" :key="JSON.stringify(args)"/>'
      }
    },
    args
  }
}
export const Default: Story = getComponent({ errors: 'Something went wrong' })
