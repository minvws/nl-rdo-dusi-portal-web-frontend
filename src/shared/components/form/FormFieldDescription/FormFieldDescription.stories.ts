import type { Meta, StoryObj } from '@storybook/vue3'

import FormFieldDescription from '@/shared/components/form/FormFieldDescription/FormFieldDescription.vue'

const meta: Meta<typeof FormFieldDescription> = {
  title: 'forms/FormFieldDescription',
  component: FormFieldDescription
}

export default meta

type Story = StoryObj<typeof FormFieldDescription>

export const Default: Story = {
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: { FormFieldDescription },
      setup() {
        return { args }
      },
      template: '<FormFieldDescription v-bind="args" />'
    }
  },
  args: {
    labelFor: 'labelFor',
    description: 'description'
  }
}
