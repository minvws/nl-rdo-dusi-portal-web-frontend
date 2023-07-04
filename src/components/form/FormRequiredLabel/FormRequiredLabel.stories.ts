import type { Meta, StoryObj } from '@storybook/vue3'

import Component from '@/components/form/FormRequiredLabel/FormRequiredLabel.vue'

const meta: Meta<typeof Component> = {
  title: 'forms/FormRequiredLabel',
  component: Component
}

export default meta
type Story = StoryObj<typeof Component>

const getComponent = (): Story => {
  return {
    render: () => {
      return {
        components: { Component },
        template: '<Component />'
      }
    }
  }
}
export const Default: Story = getComponent()
