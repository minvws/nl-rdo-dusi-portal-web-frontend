import type { Meta, StoryObj } from '@storybook/vue3'

import FormStepper from '@/shared/components/form/FormStepper/FormStepper.vue'

const meta: Meta<typeof FormStepper> = {
  title: 'forms/FormStepper',
  component: FormStepper
}

export default meta

type Story = StoryObj<typeof FormStepper>

const forms = [
  {
    title: 'Start'
  },
  {
    title: 'Contactgegevens aanvrager'
  },
  {
    title: 'Controleren, uploaden en verzenden'
  }
]

export const Default: Story = {
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: { FormStepper },
      setup() {
        return { args }
      },
      template: '<FormStepper v-bind="args" :key="JSON.stringify(args)"/>'
    }
  },
  argTypes: {
    index: {
      options: new Array(forms.length).fill(1).map((value, index) => index),
      control: {
        type: 'select'
      }
    }
  },
  args: {
    index: 0,
    touched: [],
    formsErrors: [],
    forms
  }
}
