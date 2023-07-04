import type { Meta, StoryObj } from '@storybook/vue3'

import FormRow from '@/components/form/FormRow/FormRow.vue'

const meta: Meta<typeof FormRow> = {
  title: 'forms/FormRow',
  component: FormRow
}

export default meta
type Story = StoryObj<typeof FormRow>

const getComponent = (args: any): Story => {
  return {
    render: (args, { argTypes }) => {
      return {
        props: Object.keys(argTypes),
        components: { FormRow },
        setup() {
          return { args }
        },
        template: '<FormRow v-bind="args" :key="JSON.stringify(args)"><input /></FormRow>'
      }
    },
    args
  }
}

export const Default: Story = getComponent({
  id: 'row',
  label: 'storybook'
})

export const Error: Story = getComponent({
  id: 'row',
  label: 'storybook',
  errors: 'Something went wrong'
})
