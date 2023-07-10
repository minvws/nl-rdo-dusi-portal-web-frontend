import type { Meta, StoryObj } from '@storybook/vue3'

import FormRequiredLabel from '@/components/form/FormRequiredLabel/FormRequiredLabel.vue'

const meta: Meta<typeof FormRequiredLabel> = {
  title: 'forms/FormRequiredLabel',
  component: FormRequiredLabel
}

export default meta

type Story = StoryObj<typeof FormRequiredLabel>

export const Default: Story = {
  render: () => {
    return {
      components: { FormRequiredLabel },
      template: '<FormRequiredLabel />'
    }
  }
}
